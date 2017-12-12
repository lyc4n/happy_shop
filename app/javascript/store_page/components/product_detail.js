import React, {Component} from "react"
import {Link} from "react-router-dom"

class ProductFetcher{
  constructor(){
    this.endpoint = "/api/v1/products"
  }

  perform(id, beforeSendCallback, successCallback, errorCallback){
    this.productId          = id
    this.beforeSendCallback =  beforeSendCallback
    this.errorCallback      =  errorCallback
    $.ajax({
      url:        `${this.endpoint}/${this.productId}`,
      beforeSend: ((request) => {
        this.beforeSendCallback()
        request.setRequestHeader("Content-Type", "application/vnd.api+json")
        request.setRequestHeader("Accept",       "application/vnd.api+json")
      }).bind(this),
      success: successCallback,
      error:   (response) => {
        if(typeof(this.errorCallback) == "function") {
          this.errorCallback(response)
        }else{
          alert("Woops, an error occured.")
        }
      }
    })
  }
}

class ProductDetail extends Component{
  constructor(props){
    super(props)
    const product = this.props.currentProducts.find((product) =>{ return(product.id == this.props.id)})
    const details = (product || {}).attributes
    this.state = $.extend({}, {hasData: !!product}, details)
  }

  componentDidMount(){
    const fetcher = new ProductFetcher
    if(!this.state.hasData){
      fetcher.perform(this.props.id,
        (() =>{
          // noop
        }).bind(this),
        ((response) =>{
          const product  = response.data
          const newState = $.extend({hasData: true}, product.attributes)
          this.setState(newState)
        }).bind(this),
        ((request) =>{
          const response = request.responseJSON
          if(response.errors){
            this.props.renderErrorPage(response.errors, this.props.history)
          }
        }).bind(this)
      )
    }
  }

  renderPrice(){
    if(this.state.under_sale){
      return(
        <p className="product-detail__price">
          <strike>{this.state.price_display}</strike>
          <strong>{this.state.sale_price_display}</strong>
        </p>
      )
    }else{
      return(
        <p className="product-detail__price">
          <strong>
            {this.state.price_display}
          </strong>
        </p>
      )
    }

  }
  render(){
    return(
      <div className="container product-detail">
        <h1>
          <Link to="/">Products</Link>
          { " / "}
          {this.state.name}
        </h1>
        <hr/>

        <div className="product-detail__content">
          <h3>
            <small><em>{this.state.category}</em></small>
            {this.renderPrice()}
          </h3>
          <div className="product-detail__image"></div>
        </div>
      </div>
    )
  }
}

export default ProductDetail
