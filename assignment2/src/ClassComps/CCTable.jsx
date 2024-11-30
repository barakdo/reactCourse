import React, { Component } from 'react'

export default class CCTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: "100%"
    }
  }

  clicked = () => {
    this.setState({width : "50%"});
  }

  dbClicked = () => {
    this.setState({width : "100%"});
  }

  render() {
    return (
      <div style={{ border: "2px solid white", borderRadius: 10, padding: 5}}>
        <table id="table" onClick={this.clicked} onDoubleClick={this.dbClicked} style={{ backgroundColor: "red", width: this.state.width, height: "300px", margin: "auto" }}>
          <tr>
            <td style={{ backgroundColor: "black" }}></td>
            <td style={{ backgroundColor: "black" }}></td>
            <td style={{ backgroundColor: "black" }}></td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "black" }}></td>
            <td style={{ backgroundColor: "black" }}></td>
            <td style={{ backgroundColor: "black" }}></td>
          </tr>
        </table>
      </div>
    )
  }
}
