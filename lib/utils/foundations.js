const { Router } = require('express');
const fetch = require('node-fetch');
var cd = require('color-difference');
const { hexDistances } = require('./hextodec');

const foundationFetch = (skinCode) => {
  return fetch(
    'http://makeup-api.herokuapp.com/api/v1/products.json?product_type=foundation'
  )
    .then((res) => res.json())
    .then((allColor) => {
      let productArr = [];

      for (let i of allColor) {
        let name = i.name;
        let brand = i.brand;
        let image_link = i.image_link;
        let product_link = i.product_link;
        for (let j of i.product_colors) {
          const hexDistance = cd.compare(skinCode, j.hex_value);

          if (hexDistance < 4) {
            const recommendObj = {
              name: name,
              brand: brand,
              image_link: image_link,
              product_link: product_link,
              hex: j.hex_value,
              color: j.colour_name,
              hex_distance: hexDistance,
            };

            console.log(recommendObj, 'recommendObj')

            productArr.push(recommendObj);
          }
        }
      }
      sortedArr = productArr.sort((a, b) => a.hex_distance - b.hex_distance);
      slicedArr = sortedArr.slice(0, 5);
      return slicedArr;
    });
};

module.exports = {
  foundationFetch,
};
