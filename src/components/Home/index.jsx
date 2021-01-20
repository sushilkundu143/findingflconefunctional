import React, { PureComponent } from 'react';
import FromComponent from '../../App/commonComponents/FromComponent';
import './Home.css';

class Home extends PureComponent {
  render() {
    return (
      <div className="column">
        <h4 className="title is-4 has-text-centered">Select Planet you want to Search in:</h4>
        <FromComponent />
      </div>
    );
  }
}

export default Home;
