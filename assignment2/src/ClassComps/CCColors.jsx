import { Component } from 'react'

export default class CCColors extends Component {
  constructor(props) {
    super(props);
    this.state = { bgColor: "grey" }
  };

  btnClicked = (e) => {
    this.setState({ bgColor: e.target.textContent });
  }

  render() {
    return (
      <div id="colorCont" style={{ padding: "10px", backgroundColor: this.state.bgColor, border: "2px solid white", borderRadius: 10}}>
        <h1 style={{color:"black"}}>Color Changer</h1>
        <button onClick={this.btnClicked}>blue</button>
        <button onClick={this.btnClicked}>red</button>
        <button onClick={this.btnClicked}>yellow</button>
        <button onClick={this.btnClicked}>green</button>
        <button onClick={this.btnClicked}>orange</button>
        <button onClick={this.btnClicked}>grey</button>
        <button onClick={this.btnClicked}>white</button>
        <button onClick={this.btnClicked}>purple</button>
      </div>
    )
  }
}
