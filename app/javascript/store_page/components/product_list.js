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
          fetchOptions={this.props.fetchOptions}
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
          <Pagination
            locale={PaginationLocale}
            showTitle={false}
            onChange={this.props.handlePageClick}
            pageSize={this.props.meta.per_page}
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

  backToTop(e){
    e.preventDefault()
    $("html, body").animate({ scrollTop: 0 }, "fast")
  }

  render(){
    return(
      <div className="product-list--container">
        {this.renderLoader()}
        <div className="product-list-label">&nbsp;</div>
        {this.renderFilterForm()}
        {this.renderPagination()}
        {this.renderItems()}
        {this.renderPagination()}
        <a href="#happy-store-navbar" className="product-list__link-to-top" onClick={this.backToTop}>
          <i className="fa fa-arrow-up"></i>
          Back to top
        </a>
      </div>
    )
  }
}

export default ProductList
