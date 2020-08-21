const express = require('express');
//const sampleData = require('../database/sampleDatas/imageServiceSample.js')
const Images = require('../database/imagesModel.js').Images;
const path = require('path');
var cors = require('cors');


const app = express();

console.log(__dirname);
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded())


//console.log(__dirname + '/public/lib')
//temporary endpoint to server webpack
app.get('/images', (req,res) => {
  const package = path.join(__dirname, '../public/lib/bundle.js')
  res.sendFile(package);
})

app.get('/api/:productId', (req, res) => {
  //console.log('****HIT CHECK****')
  var param_id = parseInt(req.params.productId);
  var type = req.query.type;

  if (!type && param_id) {
    // res.send({product_id, carousel_images, carousel_videos, description_images, description_gifs, thumbnail, cover_image});
    Images.find({product_id: param_id})
    .then((docs) => {
      res.send(docs[0]);
    })
  }

  if (type === 'carousel_images') {
    Images.find({product_id: param_id})
    .then((docs) => {
      res.send(docs[0].carousel_images);
    })
  }

  if (type === 'carousel_videos') {
    Images.find({product_id: param_id})
    .then((docs) => {
      res.send(docs[0].carousel_videos);
    })
  }

  if (type === 'thumbnail') {
    var arrayOfId = JSON.parse(req.params.productId);
    //console.log(arrayOfId);
    var packageData = async () => {
      var dataArray = []
      for (var i = 0; i < arrayOfId.length; i++) {
        //console.log(typeof arrayOfId[i])
        await Images.find({product_id: arrayOfId[i]})
        .then((docs) => {
          var id = docs[0].product_id;
          var thumbnail = docs[0].thumbnail;
          dataArray.push({product_id: id, thumbnail});
          //console.log(dataArray);
        })
        .catch(err => console.log(err))
      }
      return dataArray;
    }
    Promise.resolve(packageData()).then((data) => {
      console.log(data)
      console.log('**SENDING DATA TO CHRIS**')
      res.json(data)
      //res.send(data)
    })
  }

  if (type === 'cover') {
    Images.find({product_id: param_id})
    .then((docs) => {
      res.send(docs[0].cover_image);
    })
  }

  if (type === 'description_images') {
    Images.find({product_id: param_id})
    .then((docs) => {
      res.send(docs[0].description_images);
    })
  }

})

/*
Queries
{ type: 'carousel_images' }
Params
{ productId: '123' }
*/

var port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server Live listening on port ${port}`);
});