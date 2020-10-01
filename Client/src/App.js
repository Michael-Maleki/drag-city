import React from "react";
import "./App.scss";
import axios from "axios";

import Dice from "./components/dice/dice";
import Dice2 from "./components/dice/dice2";
import back from "./components/assets/back.svg";
import restart from "./components/assets/restart.svg";
import play from "./components/assets/play.svg";
import pause from "./components/assets/pause.svg";
import retro from "./components/assets/retro.mp3";

// import { tupleTypeAnnotation } from '@babel/types';

class App extends React.Component {
  state = {
    url: {},
    p1Counter: 0,
    p2Counter: 0,
    p1Height: {
      height: "75x",
    },
    p2Height: {
      height: "75px",
    },
    dice1: true,
    dice2: false,
    p1Visibility: {
      visibility: "hidden",
    },
    p2Visibility: {
      visibility: "hidden",
    },
    num1: 0,
    num2: 0,
    p1Car: null,
    p1SelectorVis: {
      visibility: "visible",
    },
    p2Car: null,
    p2SelectorVis: {
      visibility: "visible",
    },
    p1Check: false,
    p2Check: false,
    play: true,
    pause: false,
  };


  componentDidMount = () => {
    axios.get("http://localhost:8080").then((response) => {
      this.setState({
        url: response.data,
      });
    });

    this.setState({ initial: true, p1Visibility: { visibility: "hidden" } });
    this.playMusic()
  };

  componentWillUnmount = () => {
    this.pauseMusic()
  }

  url = retro;
  audio = new Audio(retro);

  playMusic = () => {
    this.setState({ play: true, pause: false })

    this.audio.play();
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }

  pauseMusic = () => {
    this.setState({ play: false, pause: true })
    this.audio.pause();
  }


  p1Move = (num, initial) => {
    if (initial === false) {
      this.setState({ p1Counter: this.state.p1Counter + num, num1: num });
      this.p1Increment();
    }

    if (this.state.dice1 === true) {
      this.setState({
        dice1: false,
        dice2: true,
      });
    }

    if (this.state.dice1 === false) {
      setTimeout(
        this.setState({
          p1Visibility: {
            visibility: "hidden",
          },
        }),
        2000
      );

      this.setState({
        p2Visibility: {
          visibility: "visible",
        },
      });
    }
  };

  p2Move = (num, initial) => {
    if (initial === false) {
      this.setState({ p2Counter: this.state.p2Counter + num, num2: num });
      this.p2Increment();
    }

    if (this.state.dice2 === true) {
      this.setState({
        dice1: true,
        dice2: false,
      });
    }

    if (this.state.dice2 === false) {
      setTimeout(
        this.setState({
          p2Visibility: {
            visibility: "hidden",
          },
        }),
        2000
      );
    }

    this.setState({
      p1Visibility: {
        visibility: "visible",
      },
    });
  };

  p1Increment = () => {
    const p1Count = this.state.p1Counter;
    const change = 75 + p1Count * 30;
    this.setState({ p1Height: { height: `${change}px` } });

    if (this.state.p1Counter >= 19) {
      setTimeout(function () {
        alert("P1 WINS!");
        window.location.reload(false);
      }, 1000);
    }
  };

  p2Increment = () => {
    const p2Count = this.state.p2Counter;
    const change = 75 + p2Count * 30;
    this.setState({ p2Height: { height: `${change}px` } });

    if (this.state.p2Counter >= 19) {
      setTimeout(function () {
        alert("P2 WINS!");
        window.location.reload(false);
      }, 1000);
    }
  };

  p1Orange = (e) => {
    this.setState({
      p1Car: this.state.url.orange,
      p1SelectorVis: { visibility: "hidden" },
      p1Check: true,
    });
    this.checkPlayers();
  };

  p1Purple = () => {
    this.setState({
      p1Car: this.state.url.purple,
      p1SelectorVis: { visibility: "hidden" },
      p1Check: true,
    });
    this.checkPlayers();
  };

  p1Red = () => {
    this.setState({
      p1Car: this.state.url.red,
      p1SelectorVis: { visibility: "hidden" },
      p1Check: true,
    });
    this.checkPlayers();
  };

  p1Green = () => {
    this.setState({
      p1Car: this.state.url.green,
      p1SelectorVis: { visibility: "hidden" },
      p1Check: true,
    });
    this.checkPlayers();
  };

  p2Orange = () => {
    this.setState({
      p2Car: this.state.url.orange,
      p2SelectorVis: { visibility: "hidden" },
      p2Check: true,
    });
    this.checkPlayers();
  };

  p2Purple = () => {
    this.setState({
      p2Car: this.state.url.purple,
      p2SelectorVis: { visibility: "hidden" },
      p2Check: true,
    });
    this.checkPlayers();
  };

  p2Red = () => {
    this.setState({
      p2Car: this.state.url.red,
      p2SelectorVis: { visibility: "hidden" },
      p2Check: true,
    });
    this.checkPlayers();
  };

  p2Green = () => {
    this.setState({
      p2Car: this.state.url.green,
      p2SelectorVis: { visibility: "hidden" },
      p2Check: true,
    });
    this.checkPlayers();
  };

  checkPlayers = () => {

    if (this.state.p1Check === true || this.state.p2Check === true) {
      this.setState({
        p1Visibility: {
          visibility: "visible",
        },
      });
    }
  };

  startOver = () => {
    window.location.reload(false);
  }

  goBack = () => {
    window.location.pathname = '/'
  }

  render() {
    return (
      <>
        <div className="track-bg">
          <div className="abs-box">
            <div className="container unselectable">
              <div className="container__side">
                <div className="back-restart">
                  <img onClick={this.goBack} src={back} alt="" />
                  <img onClick={this.startOver} src={restart} alt="" />
                </div>
                <div className="car-select" style={this.state.p1SelectorVis}>
                  <h4 className="choose">Choose <br /> Your Car</h4>
                  <img
                    id="car1"
                    className="car"
                    src={this.state.url.orange}
                    onClick={this.p1Orange}
                    alt=""
                  ></img>
                  <img
                    className="car"
                    src={this.state.url.purple}
                    onClick={this.p1Purple}
                    alt=""
                  ></img>
                  <img
                    className="car"
                    src={this.state.url.red}
                    onClick={this.p1Red}
                    alt=""
                  ></img>
                  <img
                    className="car"
                    src={this.state.url.green}
                    onClick={this.p1Green}
                    alt=""
                  ></img>
                </div>
                <div
                  style={this.state.p1Visibility}
                  className="container__side__invis"
                >
                  {/* <div className="control-vis"> */}
                  <h2 className="container__side__player">P1 Roll</h2>
                  <Dice p1Move={this.p1Move} />
                  {/* </div> */}
                </div>
                <h3 className="container__side__roll">
                  P1 <br /> rolled <br />
                  {this.state.num1}
                </h3>
              </div>
              <div className="container__center">
                <div
                  className="container__center--p1"
                  style={this.state.p1Height}
                >
                  <img className="car" src={this.state.p1Car} alt=""></img>
                  <p></p>
                </div>
                <div
                  className="container__center--p2"
                  style={this.state.p2Height}
                >
                  <img className="car" src={this.state.p2Car} alt=""></img>
                </div>
              </div>
              <div className="container__side">
                <div className="audio">
                  <img id="play" onClick={this.playMusic} src={play} alt="" />
                  <img id="pause" onClick={this.pauseMusic} src={pause} alt="" />
                </div>
                <div className="car-select" style={this.state.p2SelectorVis}>
                  <h4 className="choose">Choose <br /> Your Car</h4>
                  <img
                    className="car"
                    src={this.state.url.orange}
                    onClick={this.p2Orange}
                    alt=""
                  ></img>
                  <img
                    className="car"
                    src={this.state.url.purple}
                    onClick={this.p2Purple}
                    alt=""
                  ></img>
                  <img
                    className="car"
                    src={this.state.url.red}
                    onClick={this.p2Red}
                    alt=""
                  ></img>
                  <img
                    className="car"
                    src={this.state.url.green}
                    onClick={this.p2Green}
                    alt=""
                  ></img>
                </div>
                <div
                  style={this.state.p2Visibility}
                  className="container__side__invis"
                >
                  <div className="control-vis">
                    <h2 className="container__side__player">P2 Roll</h2>
                    <Dice2 p2Move={this.p2Move} />
                  </div>
                </div>
                <h3 className="container__side__roll">
                  P2 <br /> rolled <br />
                  {this.state.num2}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
