import React, { Component } from "react";

class Loader extends Component {
  render(){
    const baseClass  = "loader"
    const smallClass = this.props.small ? "loader--small" : ""
    const htmlClass  = `${baseClass} ${smallClass}`

    return(
      <div className={htmlClass}>
        <svg className="circular" viewBox="25 25 50 50">
          <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
        </svg>
      </div>
    )
  }
}

export default Loader
