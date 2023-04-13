const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs');
require("dotenv").config();
require('@tensorflow/tfjs-node');
const sharp = require('sharp');

const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 150;
const BATCH_SIZE = 32;


async function loadImage(imagePath, label) {
  const imageBuffer = fs.readFileSync(imagePath);
  const {data} = await sharp(imageBuffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
    .raw()
    .toBuffer({resolveWithObject: true});

  const imageData = new Float32Array(data).map((value) => value / 255);
  return {imageData, label};
}

async function loadImageFromBuffer(imageBuffer, label){
  const {data} = await sharp(imageBuffer)
    .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
    .raw()
    .toBuffer({resolveWithObject: true});

  const imageData = new Float32Array(data).map((value) => value / 255);
  return {imageData, label};
}


async function loadImages(imagePath) {
  const labels = fs.readdirSync(imagePath).filter((f) => fs.statSync(path.join(imagePath, f)).isDirectory());
  const images = [];
  labels.forEach((label) => {
    const labelPath = path.join(imagePath, label);
    fs.readdirSync(labelPath).forEach((imageFile) => {
      const imageFullPath = path.join(labelPath, imageFile);
      if (fs.statSync(imageFullPath).isFile()) {
        images.push(loadImage(imageFullPath, label));
      }
    });
  });
  return await Promise.all(images);
}

function createModel(numClasses) {
  const model = tf.sequential();
  model.add(tf.layers.conv2d({filters: 32, kernelSize: 3, activation: 'relu', inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, 3]}));
  model.add(tf.layers.maxPooling2d({poolSize: 2}));
  model.add(tf.layers.conv2d({filters: 64, kernelSize: 3, activation: 'relu'}));
  model.add(tf.layers.maxPooling2d({poolSize: 2}));
  model.add(tf.layers.conv2d({filters: 128, kernelSize: 3, activation: 'relu'}));
  model.add(tf.layers.maxPooling2d({poolSize: 2}));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({units: 512, activation: 'relu'}));
  model.add(tf.layers.dense({units: numClasses, activation: 'softmax'}));

  model.compile({optimizer: 'adam', loss: 'sparseCategoricalCrossentropy', metrics: ['accuracy']});
  return model;
}

async function trainModel(model, data, classToIndex) {
  const xsValues = data.map(({imageData}) => {
    const reshaped = [];
    for (let i = 0; i < IMAGE_HEIGHT; i++) {
      const row = [];
      for (let j = 0; j < IMAGE_WIDTH; j++) {
        const startIndex = (i * IMAGE_WIDTH + j) * 3;
        const pixel = imageData.slice(startIndex, startIndex + 3);
        row.push(pixel);
      }
      reshaped.push(row);
    }
    return reshaped;
  });

  const xs = tf.tensor4d(xsValues, [data.length, IMAGE_HEIGHT, IMAGE_WIDTH, 3]);
  const ys = tf.tensor1d(data.map(({label}) => classToIndex[label]), 'float32');
  await model.fit(xs, ys, {
    batchSize: BATCH_SIZE,
    epochs: process.env.EPOCHS,
    shuffle: true,
    verbose: 1,
  });

  xs.dispose();
  ys.dispose();
}

async function getLabel(imageBuffer) {
  try {
    let model;
    const images = await loadImages(process.env.TRAIN_DIR);
    const uniqueLabels = Array.from(new Set(images.map(({label}) => label)));
    const classToIndex = uniqueLabels.reduce((acc, label, index) => ({...acc, [label]: index}), {});
    if (fs.existsSync(process.env.MODEL_PATH)) {
      console.log('Loading existing model...');
      model = await tf.loadLayersModel(`file://${process.env.MODEL_PATH}/model.json`);
      console.log('Loaded existing model.');
    } else {
      

      model = createModel(uniqueLabels.length);
      console.log('Created a new model.');

      await trainModel(model, images, classToIndex);
      console.log('Finished training the model.');

      await model.save(`file://${process.env.MODEL_PATH}`);
      console.log(`Saved the model to ${process.env.MODEL_PATH}`);
    }

    // Test the model
    const testImageData = (await loadImageFromBuffer(imageBuffer, "")).imageData;

    const reshaped = [];
    for (let i = 0; i < IMAGE_HEIGHT; i++) {
      const row = [];
      for (let j = 0; j < IMAGE_WIDTH; j++) {
        const startIndex = (i * IMAGE_WIDTH + j) * 3;
        const pixel = testImageData.slice(startIndex, startIndex + 3);
        row.push(pixel);
      }
      reshaped.push(row);
    }

    const testXs = tf.tensor4d([reshaped]);
    const prediction = model.predict(testXs);
    const predictedIndex = prediction.argMax(-1).dataSync()[0];
    testXs.dispose();
    prediction.dispose();

    // Create a reverse mapping of classToIndex
    const indexToClass = Object.entries(classToIndex).reduce((acc, [label, index]) => ({...acc, [index]: label}), {});

    console.log('Predicted label:', indexToClass[predictedIndex]);
    return indexToClass[predictedIndex];
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = {
  loadImage,
  loadImageFromBuffer,
  loadImages,
  createModel,
  trainModel,
  getLabel
}