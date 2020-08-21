const Images = require('../database/imagesModel');
const mongoose = require('mongoose');
const assert = require('chai').assert;
const expect = require('chai').expect;
const fetch = require('fetch').fetchUrl;

describe('Mongoose model set up correctly', () => {
  it('Images should have an instance of Mongoose Schema', () => {
    expect(Images.images).to.be.instanceof(mongoose.Schema);
  });
  //console.log(mongoose.model);
  it('Images should have a model', () => {
    expect(Images.Images).to.be.instanceof(Function);
  });
});

describe('Testing server endpoints', () => {
  fetch('http://localhost:3000/api/1?type=carousel_images', (error, meta, body) => {
    var data = body.toString();

    it('Data should be an object', () => {
      assert.isObject(data)
    })

    it('Data received should have product ID property', () => {
      expect(data).to.have.ownPropertyDescriptor('product_id')
    })

  })
});