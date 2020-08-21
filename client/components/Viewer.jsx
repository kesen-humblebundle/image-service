import React from 'react';
import Cards from './Cards.jsx';
import styled from 'styled-components';

const ViewerBox = styled.div`
  padding-right: 20px;
`;
const Container = styled.div`
  padding-bottom: 20px;
  background-color: #282c34;
`;
const Title = styled.h1`
  color: #a1a7b3;
`;
const ViewerMain = styled.div`
  .media-viewer {
    width: 741px;
    height: 429px;
  }
`;

//741x429
export default class Viewer extends React.Component {
  mediaCheck(url) {
    if (url) {
      console.log('MEDIA CHECK TRIGGERED');
      if (url.includes('.mp4')) {
        var key = this.props.medias.key;
        return (
          <video className='media-viewer' key={key.toString()} id="videoPlayer" controls>
            <source src={url} type="video/mp4"></source>
          </video>
        );
      } else if (url.includes('.jpg')) {
        return <img className='media-viewer' src={url}></img>;
      }
    } else {
      console.log("no more images!")
    }
  }

  render() {
    return (
      <Container>
        <ViewerBox>
          <ViewerMain>{this.mediaCheck(this.props.medias.main)}</ViewerMain>
        </ViewerBox>
        <Cards
          medias={this.props.medias.medias}
          onClick={this.props.onClick}
          arrowClick={this.props.arrowClick}
        ></Cards>
      </Container>
    );
  }
}
