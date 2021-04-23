const Clarifai = require('clarifai');
const {COLOR_MODEL} = require('clarifai');
const {foundationFetch} = require('./foundations')

const app = new Clarifai.App({
    apiKey: '6adb3b5cbeb54cd3b14d5605dc3ed5d3',
});

// const colorResponse = handleAPICallCOLOR()



const handleAPICall = (req, res) => {
    // console.log(req.body.input)
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            console.log('first one')
            // res.json(data);
        })
        .then(() => app.models.predict(Clarifai.COLOR_MODEL, req.body.input))
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

            return foundationFetch(skinCode);
            console.log(finalProduct);
            // res.send(foundationFetch(skinCode));

        }).then(data => {
            console.log(data, 'is this zero?')
            // res.send(data)
        })

    // .catch(err => res.status(400).json('Unable to work with API'))

}


const handleImageUpdate = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
    console.log(getOutputInfo(COLOR_MODEL))
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))

}

module.exports = {
    handleImageUpdate,
    handleAPICall,
};


