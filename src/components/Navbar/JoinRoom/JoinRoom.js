import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkExisting } from '../../../actions/roomActions';
import {Modal, Button} from 'react-bootstrap';
import { createRoom } from '../../../actions/roomActions';

import "./JoinRoom.css";

/**
 * JoinRoom
 */
export class JoinRoom extends Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props){
    super(props);

    this.state = ({
      errMessage: false,
      //define input fields as an empty string by default.
      roomname: "",
      roomstring: ""
    })

  }

  createRoom = (e) => {
    e.preventDefault();
    const name = this.state.roomname;
    const id = this.state.roomstring
    // unique string checker to input here
    if (!this.props.existing) {
      // pass room info to actions for firebase call. current user object is passed.
      const roomInfo = {
        name: name,
        uid: id,
        master: this.props.user,
        }
      // this sets the state of the 2 input fields to "" after room is created.
      this.setState({roomname: "", roomstring: ""});

      // shady shit
      document.getElementById('close').click();
      this.setState({errMessage: false,});
      this.props.createRoom(roomInfo);
    } else {
      this.setState({errMessage: true});
      console.log("false here");
      console.log(this.state.errMessage);
    }
  }

  checkExisting = (e) => {
    e.preventDefault();
    let value = e.target.value;
    this.setState({roomstring: value});
    // const roomString = document.getElementById('roomstring').value;
    const roomString = value;
    console.log(roomString);
    this.props.checkExisting(roomString);
  }

  onChange = (e) => {
    let value = e.target.value;
    this.setState({roomname: value});
  }

  preventSpaces = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  }

  onClick = (e) => {
    this.setState({roomname: "", roomstring: ""});
  }

  render() {
    console.log(this.props.existing);
    return (

      <div id="myModal" className="modal fade" >

        <Modal.Dialog dialogClassName="create-new-room">

          <Modal.Header>
            <Button className="close"
                    onClick={this.onClick}
                    data-dismiss="modal">×
            </Button>
            <Modal.Title>Create A New Room</Modal.Title>
          </Modal.Header>

        <Modal.Body>

            <form>
                      <div className="float-label-control">
                          <label className="roomname-modal-label">Room Name:</label>
                          <div className="roomname-label-text">Room Name:</div>
                          <input type="text"
                                 required=''
                                  className="form-control"
                                  placeholder="Type your room name here"
                                  id="roomname"
                                  onChange={this.onChange}
                                  value={this.state.roomname}/>

                      </div>

                      <div className="float-label-control">
                          <label htmlFor="">Room URL:</label>
                          <div className="roomurl-label-text">Room URL:</div>
                          <input type="text"
                                  className="form-control"
                                  placeholder="Type your URL here"
                                  id="roomstring"
                                  onKeyPress={this.preventSpaces}
                                  onChange={this.checkExisting}
                                  value={this.state.roomstring}/>
                      </div>
                      <div className="flash-message">
                      {/* flash message */}
                      {this.props.existing ? (
                        <div>
                        <h4 className="errormsg" data-content="This room has been taken">This room has been taken</h4>
                        <svg version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="-10 -10 160.2 160.2">
                          <circle className="path circle"
                                  fill="none"
                                  stroke="#D06079"
                                  stroke-width={6}
                                  stroke-miterlimit={10}
                                  cx="65.1"
                                  cy="65.1"
                                  r="62.1"/>
                         <line className="path line"
                               fill="none"
                               stroke="#D06079"
                               stroke-width={6}
                               stroke-linecap="round"
                               stroke-miterlimit={10}
                               x1="34.4" y1="37.9"
                               x2="95.8"
                               y2="92.3"/>
                         <line className="path line"
                               fill="none"
                               stroke="#D06079"
                               stroke-width={6}
                               stroke-linecap="round"
                               stroke-miterlimit={10}
                               x1="95.8"
                               y1={38}
                               x2="34.4"
                               y2="92.2"/>

                        </svg>

                        </div>
                      ) : (
                        <div>
                        <h4 className="successmsg">This room is available</h4>
                        <svg version="1.1"
                             xmlns="http://www.w3.org/2000/svg"
                             viewBox="-10 -10 160.2 160.2">
                          <circle className="path circle"
                                  fill="none"
                                  stroke="#73AF55"
                                  stroke-width={6}
                                  stroke-miterlimit={10}
                                  cx="65.1"
                                  cy="65.1"
                                  r="62.1"/>
                          <polyline className="path check"
                                    fill="none"
                                    stroke="#73AF55"
                                    stroke-width={50}
                                    stroke-linecap="round"
                                    stroke-miterlimit={10}
                                    points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                        </svg>

                        </div>
                      )}

                    {this.state.errMessage &&
                      <h1>not allowed</h1>
                    }
                    </div>
            </form>

        </Modal.Body>

        <Modal.Footer>
          <button id="close"
                  onClick={this.onClick}
                  data-dismiss="modal">
                  Close
          </button>
          <Button
                  id="createBtn"
                  onClick={this.createRoom}
                  disabled={!(this.state.roomstring && this.state.roomname && !(this.props.existing))}>
                  Save
          </Button>
      </Modal.Footer>

    </Modal.Dialog>

</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    existing: state.checkExist,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkExisting: (roomString) => {
      dispatch(checkExisting(roomString))
    },

    createRoom: (roomInfo) => {
      dispatch(createRoom(roomInfo))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);