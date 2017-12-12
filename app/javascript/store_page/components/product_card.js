import React, {Component} from "react"
import {Link}             from "react-router-dom"

class ProductCard extends Component{
  constructor(props){
    super(props)
  }

  handleWishListButton(e){
    e.preventDefault()
    this.props.toggleWish(this.props.id)
  }

  handleWaitListButton(e){
    e.preventDefault()
    this.props.toggleWait(this.props.id)
  }

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

  outOfStockLabel(){
      if(this.props.sold_out){
        return(
          <div className="product-card__oos-label">OUT OF STOCK</div>
        )
      }
  }

  waitListButton(){
    if(this.props.sold_out){
      let klass = ["product-card__waitlist-button"]
      let text  = "WAITLIST ME"
      if(this.props.isWaitListed){
        text = "WAITLISTED"
        klass.push("product-card__waitlist-button--done")
      }

      return(
        <button onClick={this.handleWaitListButton.bind(this)}
                className={klass.join(" ")}>{text}</button>
      )
    }
  }

  wishListButton(){
    let klass = ["fa fa-2x"]
    if(this.props.isWishListed){
      klass.push("fa-heart")
    }else{
      klass.push("fa-heart-o")
    }

    return(
      <div onClick={this.handleWishListButton.bind(this)}
         className="product-card__wishlink-button">
        <i className={klass.join(" ")}></i>
      </div>
    )
  }

  addToBagButton(){
    if(!this.props.sold_out){
      return(
        <button onClick={(e)=>{ e.preventDefault()}}
                className="product-card__add-to-bag-button">ADD TO BAG</button>
      )
    }
  }

  render(){
    const productPath = `/products/${this.props.id}`
    return(
      <li className="product-card">
        <Link to={productPath} className="product-card__link">
          <div className="product-card__image">
            {this.wishListButton()}
            {this.outOfStockLabel()}
            {this.waitListButton()}
            {this.addToBagButton()}
          </div>
        </Link>
        <div className="product-card__tags">
          <span className="new-tag">NEW</span>
          &nbsp;|&nbsp;
          <span className="text-muted">LIMITED EDITION</span>
        </div>
        <div className="product-card__infos">
          <p className="product-card__info-category">{this.props.category}</p>
          <p className="product-card__info-name">{this.props.name}</p>
          <p className="product-card__info-price">
            <span>{this.priceDisplay()}</span>
          </p>
          <p className="product-card__info-stars">
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star"/>
            <i className="fa fa-star fa-star--empty"/>
          </p>
        </div>
      </li>
    )
  }
}

export default ProductCard
