import React, {Component} from "react"
import {Link} from "react-router-dom"

class ProductCard extends Component{
  priceDisplay(){
    const basePrice = this.props.price_display
    const salePrice = this.props.sale_price_display

    if(this.props.under_sale){
      return(
        <span>
          <strike className="price-detail">{basePrice}</strike>
          <strong className="price-detail">{salePrice}</strong>
          ({this.props.sale_text})
        </span>
      )
    }else{
      return(
        <span>
          <strong>{basePrice}</strong>
        </span>
      )
    }
  }
  render(){
    const productPath = `/products/${this.props.id}`
    return(
      <li className="product-card">
        <Link to={productPath} className="product-card__link">
          <div className="product-card__image"></div>
        </Link>
        <div className="product-card__tags">
          <span className="new-tag">NEW</span> | LIMITED EDITION
        </div>
        <div className="product-card__infos">
          <p className="product-card__info-name">{this.props.name}</p>
          <p className="product-card__info-category">{this.props.category}</p>
          <p className="product-card__info-price">
            <span>{this.priceDisplay()}</span>
          </p>
          <p className="product-card__info-stars">
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star-o"/>
          </p>
        </div>
      </li>
    )
  }
}

export default ProductCard
