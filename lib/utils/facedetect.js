const Clarifai = require('clarifai');
const app = new Clarifai.App({ apiKey: process.env.CLARIFAI_API_KEY });
require('dotenv').config();

const faceDetect = async (photo) => {
  //   console.log(photo, 'this is in face detect');
  try {
    const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, photo);
    //   console.log(data.outputs[0].data);

    const result = data.outputs[0].data;
    const key = Object.keys(result).length;
    console.log(key, 'key');
    return Number(key);
  } catch (e) {
    console.log(false);
    return Number(key);
  }
};

module.exports = {
  faceDetect,
};

//   console.log(Object.keys(result).length);

//   if (key !== 0) {
//     //   console.log('false');
//     console.log(result.regions[0].region_info.bounding_box)
//     return result.regions[0].region_info.bounding_box;
//   } else {
//     console.log(false, 'face detect error handling working');
//     return 0;
//   }
//     });
//   }
//   catch (e) {
//     return false;
//   }
// };

// const boundingBox =
// data.outputs[0].data.regions[0].region_info.bounding_box;
