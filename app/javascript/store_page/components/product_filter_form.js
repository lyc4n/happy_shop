import React, {Component} from "react"
import Slider, { Range }  from "rc-slider"
import "rc-slider/assets/index.css"

class ProductFilterForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      minPriceFilter: this.props.store.min_price,
      maxPriceFilter: this.props.store.max_price
    }
  }

  handleFilterSubmission(){
    const filterData = {
      sort: this.priceSortSelect.value,
      filter: {
        category_matches: this.categoryFilterSelect.value,
        price_gteq: this.state.minPriceFilter,
        price_lteq: this.state.maxPriceFilter
      }
    }
    this.props.handleFilterSubmission(filterData)
  }

  handlePriceFilterChange(priceData){
    const min = priceData[0]
    const max = priceData[1]
    this.setState({minPriceFilter: min, maxPriceFilter: max})
  }

  priceFilterLabel(){
    const min = `$${this.state.minPriceFilter / 100}`
    const max = `$${this.state.maxPriceFilter / 100}`
    return `${min} - ${max}`
  }


  renderCategorySelect(){
    const options = $.map(this.props.store.categories, function(category){
      return <option key={category} value={category}>{category}</option>
    })

    options.unshift(<option value="" key="Any" default>Any</option>)

    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Filter Category:</label>
        <select className="form-control" ref={(select) => this.categoryFilterSelect = select}>{options}</select>
      </div>
    )
  }

  renderPriceSortSelect(){
    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Sort Price:</label>
        <select className="form-control" ref={(select) => this.priceSortSelect = select}>
          <option value="price">Low to High</option>
          <option value="-price">High to Low</option>
        </select>
      </div>
    )
  }

  renderPriceRangeSelect(){
    const wrapperStyle = {width: "150px", margin: "0px", display: "inline-block"}
    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Filter Price:</label>
        <div style={wrapperStyle}>
          <Range defaultValue={[this.props.store.min_price, this.props.store.max_price]}
            min={this.props.store.min_price}
            max={this.props.store.max_price}
            onAfterChange={this.handlePriceFilterChange.bind(this)} />
          <small className="range-label">{this.priceFilterLabel()}</small>
        </div>
      </div>
    )
  }

  renderSubmit(){
    return(
      <div className="product-filter-form__field">
        <button className="product-filter-form__submit-button btn btn-primary" onClick={this.handleFilterSubmission.bind(this)}>
          <i className="fa fa-filter"></i>
          Filter Products
        </button>
        <div className="clearfix"></div>
      </div>
    )
  }


  render(){
    return(
      <div className="product-filter-form">
        {this.renderPriceSortSelect()}
        {this.renderCategorySelect()}
        {this.renderPriceRangeSelect()}
        {this.renderSubmit()}
      </div>
    )
  }
}

export default ProductFilterForm
