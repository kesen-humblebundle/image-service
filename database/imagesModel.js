require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL,  {useNewUrlParser: true})

const db = mongoose.connection;
db.on('error', () => {
  console.log('connection error');
})
db.once('open', () => {
  console.log('connected to mongodb')
})

const images = new mongoose.Schema({
  product_id: Number,
  carousel_images: [String],
  carousel_videos: [String],
  description_images: [String],
  description_gifs: [String],
  thumbnail: String,
  cover_image: String
})

const Images = mongoose.model('Images', images);

module.exports = {
  Images,
  images
};