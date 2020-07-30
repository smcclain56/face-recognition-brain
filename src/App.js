import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai, { COLOR_MODEL } from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'; 
import Rank from './components/Rank/Rank'; 
import FaceRecognition from './components/FaceRecognition/FaceRecognition'; 
import './App.css';

const app = new Clarifai.App({
  apiKey: '097b59d88e6142c1bc9ccb3a998e06e7'
}); 

const ParticlesOptions = {
  particles: {
    number: {
      value: 175,
      density: {
        enable: true,
        value_area: 1000,
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
    function(response) {
      // do something with response
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={ParticlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
           onInputChange={this.onInputChange} 
           onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
