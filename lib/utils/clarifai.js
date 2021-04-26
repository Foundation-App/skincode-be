const Clarifai = require('clarifai');
// const {COLOR_MODEL, FACE_DETECT_MODEL} = require('clarifai');
const {foundationFetch} = require('./foundations')

const app = new Clarifai.App({
    apiKey: 'b49283c601fd4dc4bf9c854a3b09552f',
});

// console.log('helloooooo')

const handleAPICall = (req, res) => {
    // console.log(req.body[0].input)
    // app.models
    //     .predict(Clarifai.FACE_DETECT_MODEL, req.body[0].input)
    //     .then(data => {
    //         // console.log(data.outputs)
    //         res.json(data);

    //     })
    //     .then(() => 
        
        app.models
        .predict(Clarifai.COLOR_MODEL, req.body[0].input)
        .then(color => {
            console.log("in color")
            const colorAndValues = color.outputs[0].data.colors.map((hex_val) => ({
                rawHex: hex_val.raw_hex,
                rawValue: Math.floor(hex_val.value * 100)
            }))
            console.log("in color2")
            const dominantHex = colorAndValues.sort((a, b) => b.rawValue - a.rawValue)[0];
            const skinCode = dominantHex.rawHex
            console.log("in color3")
            console.log(skinCode);

            // res.send(foundationFetch(skinCode));
            return foundationFetch(skinCode);

        }).then(data => {
            console.log(data, 'is this zero?')
            res.send(data)
            // res.json(data)
        })

        .catch(err => res.status(400).json(err))

}


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
    handleAPICall
};


