import React, {Component} from "react"

class ProductCard extends Component{
  render(){
    return(
      <li className="product-card">
        <p>{this.props.name}</p>
        <p>{this.props.category} | ${this.props.price}</p>
      </li>
    )
  }
}

export default ProductCard
