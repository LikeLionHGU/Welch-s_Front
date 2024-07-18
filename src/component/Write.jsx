import React, { Component } from 'react';
import '../styles/write.css'

import { CKEditor } from '../component/index'; 

class Write extends Component {
  
  render() {
    const { _getContents, contents } = this.props;

    return (
        <div className='Write'>
          <div id='Title'>
            <input type='text' autoComplete='off' id='title_txt' name='title' placeholder='제목'/>
          </div>

          <div>
            <CKEditor 
              _getContents = { _getContents } 
              contents = { contents }
            /> 
          </div>
        </div>
    );
  }
}

export default Write;