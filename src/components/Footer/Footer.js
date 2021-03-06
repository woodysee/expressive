//Importing required packages
import React, { Component } from 'react';
import {Row} from 'react-bootstrap';

//Importing static assets (i.e. stylesheets, images)
import './Footer.css';

//Importing React Components

/**
 * Footer
 */
 class Footer extends Component {
  render() {
    return (
      <Row>
        <footer>
          <div id="footer-group-left">
            <img src ="../../images/logo_v1.png" id="footer-logo" alt="logo"/>
            <p id="footer-credits">
              <b>expressive</b> is a Q & A management web service created by Robyn Kwok, Bryan Lee, Dionne Phua & Woody See
            </p>
          </div>
        </footer>
      </Row>
    );
  }
 }

 export default Footer;
