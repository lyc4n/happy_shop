import React, {Component} from "react"
import Slider, { Range }  from "rc-slider"
import "rc-slider/assets/index.css"
import {ButtonToolbar,ToggleButtonGroup, ToggleButton} from "react-bootstrap"

class ProductFilterForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      priceSort: "price",
      minPriceFilter: this.props.store.min_price,
      maxPriceFilter: this.props.store.max_price
    }
  }

  componentDidMount(){
    this.categorySelect.selectedIndex = -1
    $(this.categorySelect).multiselect({
      includeSelectAllOption: true,
      buttonClass: "category-multiselect btn btn-sm btn-info btn-sm",
      numberDisplayed: 1})
  }

  handleFilterSubmission(){
    const categoryOptions = $.map(this.categorySelect.selectedOptions, (option)=>{
      return option.value
    })

    debugger
    const filterData = {
      sort: this.state.priceSort,
      page: {size: this.perPageSelect.value || 10},
      filter: {
        category_in: categoryOptions,
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

    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Filter Category:</label>
        <select ref={(select) => this.categorySelect = select} multiple={true}>{options}</select>
      </div>
    )
  }

  changePriceSort(priceSort){
    this.setState({priceSort: priceSort})
  }

  renderPriceSortSelect(){
    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Sort Price:</label>
        <ToggleButtonGroup type="checkbox" name="options" defaultValue={this.state.priceSort}>
          <ToggleButton value="price" className="btn-sm btn-info" onClick={this.changePriceSort.bind(this, "price")}>
            <i className="fa fa-sort-amount-asc"></i>&nbsp;
            Cheap first
          </ToggleButton>
          <ToggleButton value="-price" className="btn-sm btn-info" onClick={this.changePriceSort.bind(this, "-price")}>
            <i className="fa fa-sort-amount-desc"></i>&nbsp;
            Expensive first
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    )
  }

  renderPriceRangeSelect(){
    const wrapperStyle = {width: "150px", margin: "0px", display: "inline-block"}
    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Filter Price:</label>
        <div style={wrapperStyle}>
          <Range updateWhenDrag={true} defaultValue={[this.props.store.min_price, this.props.store.max_price]}
            min={this.props.store.min_price}
            max={this.props.store.max_price}
            onChange={this.handlePriceFilterChange.bind(this)}
            onAfterChange={this.handlePriceFilterChange.bind(this)} />
          <small className="range-label">{this.priceFilterLabel()}</small>
        </div>
      </div>
    )
  }

  renderSubmit(){
    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">&nbsp;</label>
        <button className="product-filter-form__submit-button btn btn-primary btn-sm"
          onClick={this.handleFilterSubmission.bind(this)}>
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

      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Per page</label>
        <select className="form-control" ref={(select)=>{this.perPageSelect = select}}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
        </select>
      </div>
        {this.renderPriceSortSelect()}
        {this.renderCategorySelect()}
        {this.renderPriceRangeSelect()}
        {this.renderSubmit()}
      </div>
    )
  }
}

export default ProductFilterForm
