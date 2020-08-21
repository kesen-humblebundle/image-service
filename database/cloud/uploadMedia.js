require('dotenv').config();
const cloudinary = require('cloudinary');
const pexelsClient = require('pexels').createClient;
const videos = require('../sampleDatas/videoList.js')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET
});

var pexel = pexelsClient(process.env.PEXELS_API);
var amount = 2;
var video_categories = ['games', 'fantasy', 'medieval', 'animation', 'sports']

for (var i = 0; i < amount; i++) {
  //carousel images
  cloudinary.v2.uploader.upload("https://picsum.photos/741/429",{folder: 'images_carousel', public_id: i}, (error, result) => {
    if (error) {console.log(error)}
  })

  //cover images
  cloudinary.v2.uploader.upload("https://picsum.photos/135/78",{folder: 'cover_images', public_id: i}, (error, result) => {
    if (error) {console.log(error)}
  })

  //description images
  cloudinary.v2.uploader.upload("https://picsum.photos/616/116",{folder: 'description_images', public_id: i}, (error, result) => {
    if (error) {console.log(error)}
  })

  var randomPicker = Math.floor(Math.random() * video_categories.length);
  var video_query = video_categories[randomPicker];
  //uploads video amount * 30 (per page amount)
  pexel.videos.search({query: video_query, per_page: 30}).then(videoObj => {
    videoObj.videos.forEach(video => {
      //console.log(video.video_files[0].link);
      var videoDownloadLink = video.video_files[0].link;
      cloudinary.v2.uploader.upload_large(videoDownloadLink, {folder: 'videos', resource_type: 'video', chunk_size: 6000000}, (error, result) => {
        if (error) {console.log(error)}
      })
    })
  })
}