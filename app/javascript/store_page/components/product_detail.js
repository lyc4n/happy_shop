import React, {Component} from "react"

class ProductDetail extends Component{
  renderPrice(){
    if(this.props.under_sale){
      return(
        <p className="product-detail__price">
          <strike>{this.props.price_display}</strike>
          <strong>{this.props.sale_price_display}</strong>
        </p>
      )
    }else{
      return(
        <p className="product-detail__price">
          <strong>
            {this.props.price_display}
          </strong>
        </p>
      )
    }

  }
  render(){
    return(
      <div className="product-detail">
        <h1>
          <a href="/">Products</a>
          { " / "}
          {this.props.name}
        </h1>
        <hr/>

        <div className="product-detail__content">
          <h3>
            <small>Category: <em>{this.props.category}</em></small>
            {this.renderPrice()}
          </h3>
          <div className="product-detail__image"></div>
        </div>
      </div>
    )
  }
}

export default ProductDetail
