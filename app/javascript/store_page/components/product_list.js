import React, {Component} from "react"
import ProductCard        from "./product_card"
import ProductFilterForm  from "./product_filter_form"
import Pagination         from "rc-pagination"
import PaginationLocale   from "rc-pagination/lib/locale/en_US"
import Loader             from "../../shared/loader"
import "rc-pagination/assets/index.css";

class ProductList extends Component{
  renderFilterForm(){
      return(
        <ProductFilterForm
          handleFilterSubmission={this.props.handleFilterSubmission}
          store={this.props.store}/>
      )
  }

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
    if(this.props.products.length == 0){
      return(<div className="product-list__empty-label">No product found</div>)
    }else{
      return(
        <ul className="product-list">
          {
            $.map(this.props.products, ((product) => {
              return <ProductCard
                          {...product.attributes}
                          id={product.id}
                          key={product.id}
                          toggleWish={this.props.toggleWish.bind(this)}
                          toggleWait={this.props.toggleWait.bind(this)}
                          isWishListed={this.props.wishList.indexOf(Number(product.id)) > -1}
                          isWaitListed={this.props.waitList.indexOf(Number(product.id)) > -1}
                     />
            }))
          }
        </ul>
      )
    }
  }

  renderLoader(){
    if(this.props.loading){
      return(
        <div className="product-list__loader-container">
          <Loader small="true" />
          <span style={{marginLeft: "5px"}}> Loading...</span>
        </div>)
    }else{
      return null
    }
  }
  render(){
    return(
      <div className="product-list--container">
        {this.renderLoader()}
        <div className="product-list-label">Product List</div>
        {this.renderFilterForm()}
        {this.renderPagination()}
        {this.renderItems()}
        {this.renderPagination()}
      </div>
    )
  }
}

export default ProductList
