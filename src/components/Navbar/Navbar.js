//Importing required packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../actions/userActions';
import { toggleMaster } from '../../actions/roomActions';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

//Importing static assets (i.e. stylesheets, images)
import './Navbar.css';
import squareLogo from './logo_v1.png';
import titledLogo from './logo_v1.png';
import monkeyPic1 from './monkey1.png';
import monkeyPic2 from './monkey2.png';
import monkeyPic3 from './monkey3.png';

//Importing React Components
import JoinRoom from './JoinRoom/JoinRoom';

/**
 * Navbar
 */
class Navbar extends Component {
 constructor(props) {
   super(props);
   this.state = {
       value: '',
       joinroom: ""
   };
 };

 onChange = (e) => {
   let value = e.target.value;
   this.setState({joinroom: value});
   console.log(this.state.joinroom);
 }

 signOut = (e) => {
   e.preventDefault();
   if (this.props.room.isMaster) {
     this.props.toggleMaster(false);
   }
   this.props.signOut();
   window.location = "/";
 }

 render() {
  const isSignedIn = this.props.user.isSignedIn;

  let profileElement = null;
  let squareLogoElement = null;
  let titledLogoElement = null;

  //Add profile picture to navbar
  let profilePicture = null;
  var user = firebase.auth().currentUser;

  if (this.props.user.photoURL == null || this.props.user.photoURL == "") {
    let getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    };
    switch (getRandomInt(1,4)) {
      case 1:
        profilePicture = monkeyPic1;
        console.log(1);
        break;
      case 2:
        profilePicture = monkeyPic2;
        console.log(2);
        break;
      case 3:
        profilePicture = monkeyPic3;
        console.log(3);
        break;
      default:
    };
  } else if (user != null) {
      profilePicture = this.props.user.photoURL;
  } else {
    profilePicture = monkeyPic3;
  }

  if (isSignedIn) {

    squareLogoElement = (
      <a href="/dashboard" className="navbar-brand">
        <img src={squareLogo} alt="squareLogo"/>
      </a>
    )

    titledLogoElement = (
      <a href="/dashboard" className="navbar-brand">
        <img src={titledLogo} alt="titledLogo"/>
      </a>
    )

    /* Navbar unordered list of buttons if user is LOGGED IN */
    profileElement = (
      <ul className="nav navbar-nav" id="navbar-list">
        <li>
          <a id="navbar-profile-pic-a">
            <img id="navbar-profile-pic" src={profilePicture}/>
          </a>
        </li>
        <li>
          <Link to="/profile"
                className="col-lg-1 col-md-1 col-sm-2"
                id="navbar-first-Link">
            <button className="btn btn-success navbar-first-btn">
              {this.props.user.displayName}
            </button>
          </Link>
        </li>
        <li>
          <Link to="#"
                className="col-lg-1 col-md-1 col-sm-2"
                id="navbar-middle-Link">
            <button className="btn btn-success navbar-middle-btn"
                    data-toggle="modal"
                    data-target="#navbar-join-room-modal">
              Join room
            </button>
          </Link>
        </li>
        <li>
          <Link to="/dashboard"
                className="col-lg-1 col-md-1 col-sm-2"
                id="navbar-middle-Link">
            <button className="btn btn-success navbar-middle-btn">
              Dashboard
            </button>
          </Link>
        </li>
        <li>
          <Link to="/login" className="col-lg-1 col-md-1 col-sm-2" id="navbar-last-Link">
            <button type="submit"
                    className="btn btn-default navbar-last-btn" onClick={this.signOut}>
                Log out
            </button>
          </Link>
        </li>
      </ul>
    )
  } else { // not signedin

    squareLogoElement = (
      <a href="/" className="navbar-brand">
        <img src={squareLogo} alt="squareLogo"/>
      </a>
    )

    titledLogoElement = (
      <a href="/" className="navbar-brand">
        <img src={titledLogo} alt="titledLogo"/>
      </a>
    )

    profileElement = (
       <ul className="nav navbar-nav" id="navbar-list">
        <li>
          <Link to="/signup" className="col-sm-2" id="navbar-first-Link">
            <button className="btn btn-success navbar-first-btn">
            Sign up
            </button>
          </Link>
        </li>
        <li>
          <Link to="#"
                className="col-lg-1 col-md-1 col-sm-2"
                id="navbar-middle-Link">
            <button className="btn btn-success navbar-middle-btn"
                    data-toggle="modal"
                    data-target="#navbar-join-room-modal">
              Join room
            </button>
          </Link>
        </li>
        <li>
          <Link to="/login" className="col-sm-2" id="navbar-last-Link">
            <button className="btn btn-default navbar-last-btn">
              Log in
            </button>
          </Link>
        </li>
      </ul>
    )
  }

  return (

    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container nav-container">
        <div className="navbar-header">
          {squareLogoElement}
          <button type="button"
                  className="navbar-toggle"
                  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            {/*Three Icon Bars in mobile displays*/}
            <span className="glyphicon glyphicon-menu-hamburger" aria-hidden="true"></span>
          </button>
          <h1 className="navbar-page-title">{this.props.pageTitle}</h1>
        </div>
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <div className="row">
            <div className="col-sm-3 col-md-4 col-lg-6 navbar-header-fix">
              <div className="navbar-header" id="navbar-header-md-lg">
                {titledLogoElement}
              </div>
              <div className="navbar-page-title">
                <p>{this.props.pageTitle}</p>
              </div>{/*/.navbar-page-title*/}
            </div> {/* /.navbar-header-fix */}
            <div className="col-sm-9 col-md-8 col-lg-6">
              {profileElement}
            </div>
          </div>
        </div>{/* /bs-example-navbar-collapse-1 */}
        <div className="row">
          {/* Notification bar - if any */}
          <JoinRoom />
        </div>{/* /row */}
      </div>{/* container */}
    </nav>
  )
 };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    room: state.room
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => {
      dispatch(signOut())
    },
    toggleMaster: (toggle) => {
      dispatch(toggleMaster(toggle))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
