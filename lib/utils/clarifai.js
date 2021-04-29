const Clarifai = require('clarifai');
require('dotenv').config();
const { foundationFetch } = require('./foundations');
const { faceDetect } = require('./facedetect');
const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });

const handleAPICall = async (req, res) => {
  try {
    const faceData = await faceDetect(req.body[0].input);

    if (Number(faceData) === 1) {
      app.models
        .predict(Clarifai.COLOR_MODEL, req.body[0].input)
        .then((color) => {
          const colorAndValues = color.outputs[0].data.colors.map(
            (hex_val) => ({
              rawHex: hex_val.raw_hex,
              rawValue: Math.floor(hex_val.value * 100),
            })
          );
          const dominantHex = colorAndValues.sort(
            (a, b) => b.rawValue - a.rawValue
          )[0];
          const skinCode = dominantHex.rawHex;
          return foundationFetch(skinCode);
        })
        .then((data) => {
          res.send(data);
        })

        .catch((err) => res.status(400).json(err));
    } else {
      res.send([]);
    }
  } catch (e) {
    return false;
  }
};

module.exports = {
  handleAPICall,
};
