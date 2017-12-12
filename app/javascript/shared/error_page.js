import React, {Component}   from "react"
import {Link}               from "react-router-dom"

class ErrorPage extends Component{

  renderErrorDetails(){
    if((this.props.errors || []).length == 0){
      return(<h3>Ooops, something went wrong...</h3>)
    }else{
      return(
        $.map(this.props.errors, (error) =>{
          return(
            <div>
              <h3>
                <strong>{error.detail.status}</strong> -
                <span>{error.detail.title}</span>
              </h3>
              <p>{error.detail.detail}</p>
            </div>
          )
        })
      )
    }
  }
  render(){
    return(
      <div className="error-page">
        {this.renderErrorDetails()}
        <Link to="/">Go back to Product List</Link>
      </div>
    )
  }
}

export default ErrorPage
