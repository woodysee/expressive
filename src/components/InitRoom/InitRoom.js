import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {Col} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

//Importing static assets (i.e. stylesheets, images)
import './InitRoom.css';

// Import firebase
import firebase from '../../firebase';

//Importing React Components
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Room from '../Room/Room';
import MasterRoom from '../MasterRoom/MasterRoom';

import { isFetching } from '../../actions/fetchingActions';
import { joinRoom, leaveRoom } from '../../actions/roomActions';

/**
 * Room Join
 */
export class InitRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.props.isFetching(true);

    this.state = {
      roomExists: true
    }

  }

  // this.props.match.params.id
  componentDidMount() {

    if (this.props.user.isSignedIn) {
      const db = firebase.database();

      const roomRef = db.ref("rooms/" + this.props.match.params.id);
      roomRef.once("value")
      .then((snapshot) => {
        this.props.isFetching(false);
        if (snapshot.exists()) {
          this.setState({
            roomExists: true
          })


          const roomInfo = {
            roomName: snapshot.val().name,
            roomId: this.props.match.params.id,
            user: this.props.user,
            isMaster: snapshot.val().masterId === this.props.user.uid,
            isActive: snapshot.val().isActive
            }
          this.props.joinRoom(roomInfo);
        } else {
          this.setState({
            roomExists: false
          })
        }
      })
    } else {
      firebase.auth().signInAnonymously().then(() => {
        const db = firebase.database();

        const roomRef = db.ref("rooms/" + this.props.match.params.id);
        roomRef.once("value")
        .then((snapshot) => {
          this.props.isFetching(false);
          if (snapshot.exists()) {
            this.setState({
              roomExists: true
            })


            const roomInfo = {
              roomName: snapshot.val().name,
              roomId: this.props.match.params.id,
              user: this.props.user,
              isMaster: snapshot.val().masterId === this.props.user.uid,
              isActive: snapshot.val().isActive
              }
            this.props.joinRoom(roomInfo);
          } else {
            this.setState({
              roomExists: false
            })
          }
        })
      })
      .catch((error) => {
        console.log('Anonymous Sign In Failed: ', error.message);
        window.location.href = '/';
      })
    }

    // remove user from room userList on close window and back button
    window.onbeforeunload = (e) => {
      const roomInfo = {
        roomName: this.props.room.roomName,
        roomId: this.props.match.params.id,
        user: this.props.user
      }
      this.props.leaveRoom(roomInfo);
    }



  } // end of componentDidMount

  componentWillUnmount() {
    // remove user from room userList when component dismounts
    console.log('componentwillunmount');
    console.log(this.props.user);
    const roomInfo = {
      roomName: this.props.room.roomName,
      roomId: this.props.match.params.id,
      user: this.props.user
    }
    this.props.leaveRoom(roomInfo);
  }

  render() {
    const isRoom = this.state.roomExists;
    const isMaster = this.props.room.isMaster;
    return (
    <div>
      { this.props.fetchState ? (
        <div className="container-fluid join-room-container">
          <Col md={8} className="join-room-text">
            Fetching Your Room...
          </Col>
          <Col md={8} className="join-room-animation ">
            <div className="error404page">
              <div className="newcharacter404">
                <div className="chair404"></div>
                <div className="leftshoe404"></div>
                <div className="rightshoe404"></div>
                <div className="legs404"></div>
                <div className="torso404">
                  <div className="body404"></div>
                  <div className="leftarm404"></div>
                  <div className="rightarm404"></div>
                  <div className="head404">
                    <div className="eyes404"></div>
                  </div>
                </div>
                <div className="laptop404"></div>
              </div>
            </div>
          </Col>
        </div>
      ) : (
        <div>
        { isRoom ? ( <div>
          {
            isMaster ? (
              <MasterRoom roomString= {this.props.match.params.id}/>
            ) : (
              <Room roomString= {this.props.match.params.id}/>
            )
          }
        </div> ) : (
          <div> Your Princess Is In Another Castle. </div>
        )

        }
        </div>

      ) }
    </div>

    )
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      fetchState: state.isFetching,
      room: state.room
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    isFetching: (bool) => {
      dispatch(isFetching(bool))
    },
    joinRoom: (roomInfo) => {
      dispatch(joinRoom(roomInfo))
    },
    leaveRoom: (roomInfo) => {
      dispatch(leaveRoom(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitRoom);
