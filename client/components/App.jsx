import React from "react";
import ReactDOM from "react-dom";
import Viewer from "./Viewer.jsx";
import Cards from "./Cards.jsx";
import $ from "jquery";
//something unimportant
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      main: "http://res.cloudinary.com/fec-image-services/image/upload/v1592873078/images_carousel/55.jpg",
      medias: ["http://res.cloudinary.com/fec-image-services/image/upload/v1592873078/images_carousel/55.jpg","http://res.cloudinary.com/fec-image-services/image/upload/v1592873074/images_carousel/26.jpg","http://res.cloudinary.com/fec-image-services/image/upload/v1592873074/images_carousel/26.jpg","http://res.cloudinary.com/fec-image-services/video/upload/v1592873589/videos/ibz415yguyahchttatbe.mp4","http://res.cloudinary.com/fec-image-services/video/upload/v1592873588/videos/wif2g69fs616vhmlcis8.mp4"],
      key: 0
    }
    this.getProductId = this.getProductId.bind(this);
    this.onClick = this.onClick.bind(this);
    this.arrowClick = this.arrowClick.bind(this);
  }

  getProductId() {
    //console.log(window.location.pathname);
    var path = window.location.pathname;
    var arrayPath = path.split('/');
    var product_id;
    arrayPath.forEach(str => {
      if (!isNaN(parseInt(str))) {
        product_id = parseInt(str);
      } else {
        console.log('String is not a parseable number')
      }
    })
    return product_id;
  }

  componentDidMount() {
    console.log(this.getProductId());
    if (this.getProductId()) {
      var product_id = this.getProductId();
      $.ajax(`http://ec2-52-14-126-227.us-east-2.compute.amazonaws.com:3001/api/${product_id}`, {
        method: 'GET',
        success: (data) => {
          console.log("SUCCESS GET REQUEST")
          var mappedMedias = (videoArray, imageArray) => {
            var combinedMedia = [];
            videoArray.forEach(e => {
              combinedMedia.push(e);
            });
            imageArray.forEach(e => {
              combinedMedia.push(e)
            })
            return combinedMedia;
          }
          var processedData = mappedMedias(data.carousel_videos, data.carousel_images)
          this.setState({
            main: processedData[0],
            medias: processedData
          })
          console.log(this.state);
        },
        error: (err) => {
          console.log("Failed to fetch product images")
        }
      })
    } else {
      console.log('Cannot find product id from path!');
    }

  }

  onClick(e) {
    var key = this.state.key;
    key++;
    if (e.target.attributes.length === 0 || e.target.childNodes.length) {
      var videoSource = e.target.childNodes[0].src;
      let newMediaCollection = this.mediaCollectionRotator(this.state.medias, videoSource);
      this.setState({
        main: videoSource,
        medias: newMediaCollection,
        key: key
      })
    } else {
      var targetSource = e.target.attributes.src.nodeValue;
      let newMediaCollection = this.mediaCollectionRotator(this.state.medias, targetSource);
      this.setState({
        main: targetSource,
        medias: newMediaCollection,
        key: key
      })
    }
  }

  arrowClick(e) {
    //console.log(e.target.className.baseVal)
    var className = e.target.className.baseVal;
    var currentView = this.state.main;
    var index = this.state.medias.indexOf(currentView);
    var mediaLength = this.state.medias.length;
    var key = this.state.key;
    key++;
    if (className === 'arrows arrows-right') {
      if (index < mediaLength) {
        var newCollection = this.mediaCollectionRotator(this.state.medias, currentView, 'right');
        this.setState({
          main: newCollection[0],
          medias: newCollection,
          key: key
        })
      }
    } else if (className === 'arrows arrows-left') {
        var newCollection = this.mediaCollectionRotator(this.state.medias, currentView, 'left');
        this.setState({
          main: newCollection[0],
          medias: newCollection,
          key: key
        })
    }
  }

  mediaCollectionRotator(collection, selected, arrow = false) {
    let rotate = () => {
      let newArray = collection;
      let currentLocation = newArray.indexOf(selected);
      let temp = newArray.slice(0, currentLocation);
      newArray.splice(0,currentLocation);
      temp.forEach((e) => {
        newArray.push(e);
      });
      return newArray;
    }
    let rotateRight = () => {
      let newArray = collection;
      newArray.push(newArray.shift());
      return newArray;
    }
    let rotateLeft = () => {
      let newArray = collection;
      let temp = newArray[newArray.length - 1];
      newArray.pop();
      newArray.unshift(temp);
      return newArray;
    }
    if (arrow === 'left') {
      return rotateLeft();
    } else if (arrow === 'right') {
      return rotateRight();
    }
    return rotate();
  }

  render() {
    return <div>
        <Viewer medias={this.state} onClick={this.onClick} arrowClick={this.arrowClick}/>
      </div>
  }
}

export default App;