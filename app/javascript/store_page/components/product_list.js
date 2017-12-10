import React, {Component} from "react"
import ProductCard        from "./product_card"
import Pagination         from "rc-pagination"
import PaginationLocale   from "rc-pagination/lib/locale/en_US"
import "rc-pagination/assets/index.css";

class ProductList extends Component{
  renderPagination(){
    if(this.props.products.length == 0){
      return(null)
    }else{
      return(
        <div className="product-list__pagination-container">
          <Pagination locale={PaginationLocale} onChange={this.props.handlePageClick}
            current={this.props.meta.current_page}
            total={this.props.meta.total_entries}
          />
        </div>
      )
    }
  }

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
        {this.renderPagination()}
        {this.renderItems()}
        {this.renderPagination()}
      </div>
    )
  }
}

export default ProductList
