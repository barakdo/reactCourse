import React, { Component } from 'react'

export default class CCForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fNTitle: "",
      lNTitle: "",
      gTitle: "",
      colorMessage: "red"
    }
  }

  textboxEnter = (e) => {
    switch (e.target.name) {
      case "fName":
        this.setState({ fNTitle: "Enter first name:" });
        break;
      case "lName":
        this.setState({ lNTitle: "Enter last name:" });
        break;

      default:
        this.setState({ gTitle: "Enter grade:" });
        break;
    }
  }

  textboxLeave = (e) => {
    switch (e.target.name) {
      case "fName":
        this.setState({ fNTitle: "" });
        break;
      case "lName":
        this.setState({ lNTitle: "" });
        break;

      default:
        this.setState({ gTitle: "" });
        let temp;
        let color = "red";
        if (e.target.value == "") {
          temp = "";
        }
        else if (Number(e.target.value) > 555) {
          temp = "Accepted to studies!";
          color = "green";
        }
        else {
          temp = "Try again next year"
        }
        this.setState({ message: temp, colorMessage: color });
        break;
    }
  }

  render() {
    return (
      <div style={{border: "2px solid white", borderRadius: 10}}>
        <label htmlFor="fName" style={{ color: "red" }}>{this.state.fNTitle}</label>
        <br />
        <input type="text" name='fName' onMouseEnter={this.textboxEnter} onMouseLeave={this.textboxLeave} required />
        <br />
        <label htmlFor="lName" style={{ color: "red" }}>{this.state.lNTitle}</label>
        <br />
        <input type="text" name='lName' onMouseEnter={this.textboxEnter} onMouseLeave={this.textboxLeave} required />
        <br />
        <label htmlFor="grade" style={{ color: "red" }}>{this.state.gTitle}</label>
        <br />
        <input type="number" name='grade' onMouseEnter={this.textboxEnter} onMouseLeave={this.textboxLeave} required />
        <h3 style={{ color: this.state.colorMessage }}>{this.state.message}</h3>
      </div>
    )
  }
}
