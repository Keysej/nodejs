const tf = require('@tensorflow/tfjs');

// Example: A simple function to create a basic model
function createModel() {
    const model = tf.sequential();

    // Add a dense layer with 1 unit (output) and an input shape matching your input data
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Compile the model with a mean squared error loss function and an Adam optimizer
    model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

    return model;
}

// Example: Training the model with sample data
async function trainModel(model, inputs, labels) {
    const xs = tf.tensor2d(inputs, [inputs.length, 1]);
    const ys = tf.tensor2d(labels, [labels.length, 1]);

    await model.fit(xs, ys, { epochs: 10 });
    console.log('Model trained!');
}

// Example: Making predictions with the trained model
function makePrediction(model, input) {
    const inputTensor = tf.tensor2d([input], [1, 1]);
    const prediction = model.predict(inputTensor);
    return prediction.dataSync()[0];
}

module.exports = {
    createModel,
    trainModel,
    makePrediction
};
