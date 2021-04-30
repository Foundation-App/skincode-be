const Clarifai = require('clarifai');
const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });
require('dotenv').config();

const faceDetect = async (photo) => {
  try {
    const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, photo);
    const result = data.outputs[0].data;
    const key = Object.keys(result).length;

    return Number(key);
  } catch (e) {
    return Number(key);
  }
};

module.exports = {
  faceDetect,
};
