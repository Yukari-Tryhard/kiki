const { loadImages,createModel, trainModel } = require("./index")
require("dotenv").config();


const training = async () => {
    // training logic here

    const images = await loadImages(process.env.TRAIN_DIR);
    const uniqueLabels = Array.from(new Set(images.map(({label}) => label)));
    const classToIndex = uniqueLabels.reduce((acc, label, index) => ({...acc, [label]: index}), {});
    let model

    model = createModel(uniqueLabels.length);
    console.log('Created a new model.');
    await trainModel(model, images, classToIndex);
    console.log('Finished training the model.');
    
    await model.save(`file://${process.env.MODEL_PATH}`);
    console.log(`Saved the model to ${process.env.MODEL_PATH}`);
  };
  
process.on('message', async (message) => {
    if (message === 'startTraining') {
      console.log('Training started');
      await training();
      console.log('Training completed');
      process.send('Training completed');
    }
  });