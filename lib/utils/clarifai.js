const Clarifai = require('clarifai');
require('dotenv').config();
// const {COLOR_MODEL, FACE_DETECT_MODEL} = require('clarifai');
const { foundationFetch } = require('./foundations');
const { faceDetect } = require('./facedetect');
const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });

const handleAPICall = async (req, res) => {
  try {
    const faceData = await faceDetect(req.body[0].input);
    console.log(faceData, 'facedata');
    // await faceDetect(req.body[0].input).then((data) => {
    if (Number(faceData) === 1) {
      console.log('true');

      app.models
        .predict(Clarifai.COLOR_MODEL, req.body[0].input)
        .then((color) => {
          console.log(req.body[0].input, 'in color');
          const colorAndValues = color.outputs[0].data.colors.map(
            (hex_val) => ({
              rawHex: hex_val.raw_hex,
              rawValue: Math.floor(hex_val.value * 100),
            })
          );
          //   console.log('in color2');
          const dominantHex = colorAndValues.sort(
            (a, b) => b.rawValue - a.rawValue
          )[0];
          const skinCode = dominantHex.rawHex;
          console.log(skinCode);

          return foundationFetch(skinCode);
        })
        .then((data) => {
          //   console.log(data, 'is this zero?');
          res.send(data);
          // res.json(data)
        })

        .catch((err) => res.status(400).json(err));
    } else {
      console.log(false, 'in clarifai');
      res.send([]);
    }
    // });
  } catch (e) {
    return false;
  }
};

//   faceDetect(req.body[0].input);
//   console.log(faceDetect(req.body[0].input), 'detect face');
//   if ((await faceDetect(req.body[0].input)) === false) {
//     console.log('in clarify');
//     return res.status(400).json('no face in photo');
//   } else
//     app.models
//       .predict(Clarifai.COLOR_MODEL, req.body[0].input)
//       .then((color) => {
//         //   console.log('in color');
//         const colorAndValues = color.outputs[0].data.colors.map((hex_val) => ({
//           rawHex: hex_val.raw_hex,
//           rawValue: Math.floor(hex_val.value * 100),
//         }));
//         //   console.log('in color2');
//         const dominantHex = colorAndValues.sort(
//           (a, b) => b.rawValue - a.rawValue
//         )[0];
//         const skinCode = dominantHex.rawHex;
//         console.log(skinCode);

//         return foundationFetch(skinCode);
//       })
//       .then((data) => {
//         //   console.log(data, 'is this zero?');
//         res.send(data);
//         // res.json(data)
//       })

//       .catch((err) => res.status(400).json(err));
// };

// const handleImageUpdate = (req, res, db) => {
//     const {id} = req.body;
//     db('users').where('id', '=', id)
//         .increment('entries', 1)
//         .returning('entries')
//     console.log(getOutputInfo(COLOR_MODEL))
//         .then(entries => {
//             res.json(entries[0]);
//         })
//         .catch(err => res.status(400).json('unable to get entries'))

// }

module.exports = {
  // handleImageUpdate,
  handleAPICall,
};
