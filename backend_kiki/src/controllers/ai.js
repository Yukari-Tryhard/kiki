require("dotenv").config();
const fs = require("fs");
const { fork } = require('child_process');
const tf = require('@tensorflow/tfjs');
const { loadImages, createModel } = require("../services/ai-image/index")
const epochTimeInSeconds = 0.89;

exports.train = async (req, res) => {
    try{
        const startTime = new Date();
        // start training

        // calculate estimated time
        const endTime = new Date(startTime.getTime() + (process.env.EPOCHS * epochTimeInSeconds * 1000));
        const estimatedTime = endTime.toLocaleTimeString();
        const images = await loadImages(process.env.TRAIN_DIR);
        const uniqueLabels = Array.from(new Set(images.map(({label}) => label)));

        const trainProcess = fork('./src/services/ai-image/train-model.js');
        console.log('Started child process');

        trainProcess.on('message', (message) => {
            console.log(`Child process sent message: ${message}`);
        });

        trainProcess.send('startTraining');
        res.status(200).send({'estimatedTime': estimatedTime});

    }
    catch(e){
        console.error(e);
        res.status(404).send(e);
    }
  };