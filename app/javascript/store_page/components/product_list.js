import React, {Component} from "react"
import ProductCard        from "./product_card"

class ProductList extends Component{
  renderItems(){
    return(
      <ul className="product-list">
        {
          $.map(this.props.products, ((product) => {
            return <ProductCard {...product.attributes} key={product.id} />
          }))
        }
      </ul>
    )
  }
  render(){
    return(
      <div className="product-list--container">
        <p className="product-list-label">Product List</p>
        {this.renderItems()}
      </div>
    )
  }
}

export default ProductList
