const { Router } = require('express');
const fetch = require('node-fetch');
var cd = require('color-difference');
const { hexDistances } = require('./hextodec');

//This value will be the dominant color chosen from Clarifai
// let skinCode = '#cba499';
// let clarHex = findMe.split('').splice(0, 4).join('').toLowerCase();
// //This is where HEX should be
// console.log(clarHex, 'FIND ME HEX!')

const foundationFetch = (skinCode) => {
  console.log('hellooo');
  // let clarHex = skinCode.split('').splice(0, 4).join('').toLowerCase();
  return fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation'
  )
    .then((res) => res.json())
    .then((allColor) => {
      // Loop through the length of the product colors array
      // check if hex is in Array if so make data object from that hex and then return the object
      // else return no match
      let productArr = [];
      // console.log(allColor)
      for (let i of allColor) {
        let name = i.name;
        let brand = i.brand;
        let image_link = i.image_link;
        for (let j of i.product_colors) {
          console.log;
          //   console.log(skinCode, j.hex_value, 'inside the loop');
          const hexDistance = cd.compare(skinCode, j.hex_value);
          console.log(hexDistance);
          //   finalProducts = hexToDec.sortHexDistances(hexDistance);
          // const hexVaule = j.hex_value.split('').splice(0, 4).join('').toLowerCase();

          //   const recommendObj = {
          //     name: name,
          //     brand: brand,
          //     image_link: image_link,
          //     hex: j.hex_value,
          //     color: j.colour_name,
          //   };

          if (hexDistance < 4) {
            const recommendObj = {
              name: name,
              brand: brand,
              image_link: image_link,
              hex: j.hex_value,
              color: j.colour_name,
            };

            // if (hexVaule === clarHex) {
            // const recommendObj = {
            //     name: name,
            //     brand: brand,
            //     image_link: image_link,
            //     hex: j.hex_value,
            //     color: j.colour_name
            // }
            productArr.push(recommendObj);
          }
        }
      }
      console.log(productArr);
      return productArr;
    });
};

// foundationFetch(skinCode)

module.exports = {
  foundationFetch,
};
