import React from "react";
import { Link } from "react-router-dom";
import img from "../../splash-06.png";
import lunar from "../assets/lunar.mp3";
import "./intro.scss";

class intro extends React.Component {
  audio = new Audio(lunar);

  componentDidMount = () => {
    this.audio.play();
  };
	
	pauseMusic = () => {
			this.audio.pause();
	}

  render() {
    return (
      <>
        <Link to="/race">
          <img className="background" src={img} alt="" onClick={this.pauseMusic}/>
        </Link>
      </>
    );
  }
}

export default intro;
