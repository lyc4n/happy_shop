import React, {Component} from "react"
import Slider, { Range }  from "rc-slider"
import "rc-slider/assets/index.css"
import {ButtonToolbar,ToggleButtonGroup, ToggleButton} from "react-bootstrap"

class ProductFilterForm extends Component{
  constructor(props){
    super(props)
    this.state = {
      priceSort:       this.selectedPriceSort(),
      minPriceFilter:  this.selectedPriceRange()[0],
      maxPriceFilter:  this.selectedPriceRange()[1]
    }
  }

  selectedPriceRange(){
    const priceFilters  = this.props.fetchOptions.filter || {}
    const defaults      = [this.props.store.min_price, this.props.store.max_price]
    const min           = priceFilters.price_gteq || defaults[0]
    const max           = priceFilters.price_lteq || defaults[1]
    return [Number(min), Number(max)]
  }

  selectedPerPage(){
    const defaultPerPage = this.props.fetchOptions.page || {page: {size: 10}}
    return defaultPerPage.size || 10
  }

  selectedCategoryFilters(){
    const defaultFilter = {
      category_in: []
    }
    return ((this.props.fetchOptions.filter || defaultFilter).category_in || [])
  }

  selectedPriceSort(){
    const defaultSort = "price"
    return (this.props.fetchOptions.sort) || defaultSort
  }

  componentDidMount(){
    $(this.categorySelect).multiselect({
      includeSelectAllOption: true,
      buttonClass: "category-multiselect btn btn-sm btn-info btn-sm",
      numberDisplayed: 1})
  }

  handleCategorySelection(){
    const selectedCategoryOptions = $.map(this.categorySelect.selectedOptions, (option)=>{
      return option.value
    })

    this.setState({categoryFilter: selectedCategoryOptions})
  }
  handleFilterSubmission(){
    const categoryOptions = $.map(this.categorySelect.selectedOptions, (option)=>{
      return option.value
    })

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
        <select value={this.selectedCategoryFilters()} onChange={this.handleCategorySelection.bind(this)} ref={(select) => this.categorySelect = select} multiple={true}>{options}</select>
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
        <ToggleButtonGroup type="radio" name="options" defaultValue={this.selectedPriceSort()}>
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
    return(
      <div className="product-filter-form__field">
        <label className="product-filter-form__label">Filter Price:</label>
        <div className="range-select-wrapper">
          <Range updateWhenDrag={true} defaultValue={this.selectedPriceRange()}
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
          <select className="form-control" defaultValue={this.selectedPerPage()} ref={(select)=>{this.perPageSelect = select}}>
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
