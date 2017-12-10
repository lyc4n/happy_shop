import React, {Component} from "react"

class ProductCard extends Component{
  priceDisplay(){
    const basePrice = `$${(this.props.price / 100)}`
    const salePrice = `$${(this.props.sale_price / 100)}`

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
    return(
      <li className="product-card">
        <div className="product-card__image"></div>
        <div className="product-card__tags">
          NEW | LIMITED EDITION
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
