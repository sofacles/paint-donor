import React, { Component} from 'react';

class UploadPhoto extends Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return <div>
          <input type="file" id="uploadPhoto" ref={this.myRef} />
          </div>;
    }
  }

export { UploadPhoto};