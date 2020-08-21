require('dotenv').config();
const Images = require('./imagesModel.js').Images;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
});

//MEDIA ARRAY CONTAINERS
var videos = [];
var coverImages = [];
var descriptionImages = [];
var carouselImages = [];

var randomVideoPackage = () => {
  //var videoPackage = [];
  var max_results = 30
  return new Promise ((resolve,reject) => {
    cloudinary.search
    .expression('folder=videos')
    .max_results(max_results)
    .execute().then(results => {
      var videosArray = results.resources;
      for (var i = 0; i < max_results; i++) {
        //var randomPicker = Math.floor(Math.random() * max_results);
        //console.log(videosArray[randomPicker].url);
        videos.push(videosArray[i].url);
      }
      //console.log(videoPackage);

      resolve(videos);
    })
    .catch(err => {
      reject(err);
    })
  })
}

var randomCoverImages = () => {
  //var coverImages = [];
  var max_results = 90

  return new Promise ((resolve,reject) => {
    cloudinary.search
    .expression('folder=cover_images')
    .max_results(max_results)
    .execute().then(results => {
      var resultsArray = results.resources;
      for (var i = 0; i < max_results; i++) {
        //var randomPicker = Math.floor(Math.random() * max_results);
        //console.log(videosArray[randomPicker].url);
        coverImages.push(resultsArray[i].url);
      }
      //console.log(coverImages);
      resolve(coverImages)
    })
    .catch(err => {
      console.log(err);
      reject(err);
    })
  })
}

var randomDescriptionImages = () => {
  //var descriptionImages = [];
  var max_results = 90

  return new Promise((resolve,reject) => {
    cloudinary.search
    .expression('folder=description_images')
    .max_results(max_results)
    .execute().then(results => {
      var resultsArray = results.resources;
      for (var i = 0; i < max_results; i++) {
        //var randomPicker = Math.floor(Math.random() * max_results);
        //console.log(videosArray[randomPicker].url);
        descriptionImages.push(resultsArray[i].url);
      }
      //console.log(descriptionImages);
      resolve(descriptionImages);
    })
    .catch(err => {
      console.log(err);
      reject(err)
    })
  })
}

var randomCarouselImages = () => {
  //var carouselImages = [];
  var max_results = 90

  return new Promise((resolve,reject) => {
    cloudinary.search
    .expression('folder=images_carousel')
    .max_results(max_results)
    .execute().then(results => {
      var resultsArray = results.resources;
      for (var i = 0; i < max_results; i++) {
        //var randomPicker = Math.floor(Math.random() * max_results);
        //console.log(videosArray[randomPicker].url);
        carouselImages.push(resultsArray[i].url);
      }
      //console.log(carouselImages);
      resolve(carouselImages);
    })
    .catch(err => {
      console.log(err);
      reject(carouselImages);
    })
  })
}
//random picker helper function
var randomPicker = (mediaArray, amount) => {
  var result = [];
  for (var i = 0; i < amount; i++) {
    var randomGenerator = Math.floor(Math.random() * mediaArray.length);
    result.push(mediaArray[randomGenerator]);
  }
  return result;
}

//amount of seeding = the amount of documents to save to mongodb
var packageForDatabase = (amountOfSeeding) => {
  var id = 1;
  Promise.all([randomCarouselImages(),randomVideoPackage(), randomDescriptionImages(), randomCoverImages()])
  .then(() => {
    for (var i = 0; i < amountOfSeeding; i++) {
      var randomCarouselAmount = Math.floor(Math.random() * 6) + 3;
      var randomVideoAmount = Math.floor(Math.random() * 4) + 1;
      var randomDescriptionAmount = Math.floor(Math.random() * 4) + 2;
      var cover_image = randomPicker(coverImages, 1)[0];
      var imageDocument = new Images ({
        product_id: id,
        carousel_images: randomPicker(carouselImages, randomCarouselAmount),
        carousel_videos: randomPicker(videos, randomVideoAmount),
        description_images: randomPicker(descriptionImages, randomDescriptionAmount),
        description_gifs: descriptionImages[0], //still need to figure out using a gif provider to upload gifs to cloud
        thumbnail: cover_image,
        cover_image
      })

      id++;

      imageDocument.save((err, document) => {
        if (err) {console.log(err)}
        console.log("Saved document")
      });
    }
  })
  .catch(err => console.log(err));
}

//Invoke packageForDatabase to start saving to mongoDB

packageForDatabase(100);