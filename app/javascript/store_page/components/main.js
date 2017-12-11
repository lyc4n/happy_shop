import React, {Component}     from "react"
import ProductList            from "./product_list"
import {Route, BrowserRouter} from "react-router-dom"
import ProductDetail          from "./product_detail"

class ProductsFetcher{
  constructor(){
    this.endpoint = "/api/v1/products"
  }

  perform(fetchOptions, beforeSendCallback, successCallback){
    this.beforeSendCallback =  beforeSendCallback
    $.ajax({
      url:        this.endpoint,
      data:       fetchOptions,
      beforeSend: ((request) => {
        this.beforeSendCallback()
        request.setRequestHeader("Content-Type", "application/vnd.api+json")
        request.setRequestHeader("Accept",       "application/vnd.api+json")
      }).bind(this),
      success: successCallback,
      error:   (response) => {
        alert("Woops, an error occured.")
      }
    })
  }
}

class Main extends Component{
  constructor(props){
    super(props)
    this.state = {
      loading:      false,
      products:     [],
      fetchOptions: {page: {number: 1}},
      waitList:     [],
      wishList:     []
    }
  }

  componentDidMount(){
    this.fetchRecords()
  }

  handlePageClick(pageNumber){
    const fetchOptions = $.extend({}, this.state.fetchOptions)
    const size = fetchOptions.page.size
    fetchOptions.page  = {number: pageNumber}
    this.setState({fetchOptions: fetchOptions}, (() =>{
      this.fetchRecords()
    }))
  }

  handleFilterSubmission(fetchOptions){
    const fetcher     = new ProductsFetcher
    fetchOptions.page = {number: 1}
    this.setState({fetchOptions: fetchOptions}, (() =>{
      this.fetchRecords()
    }))
  }

  fetchRecords(){
    const fetcher = new ProductsFetcher
    fetcher.perform(
      this.state.fetchOptions,
      ((_) =>{
      this.setState({loading: true})}).bind(this),
      ((response) =>{
      this.setState({products: response.data, meta: response.meta, loading: false})
    }).bind(this))
  }

  toggleWait(id){
    let   list  = this.state.waitList.slice()
    const index = this.state.waitList.indexOf(Number(id))
    if(index > -1){
      list.splice(index, 1)
    }else{
      list.push(Number(id))
    }

    this.setState({waitList: list})
  }

  toggleWish(id){
    let   list  = this.state.wishList.slice()
    const index = this.state.wishList.indexOf(Number(id))
    if(index > -1){
      list.splice(index, 1)
    }else{
      list.push(Number(id))
    }
    this.setState({wishList: list})
  }

  render(){
    return(
      <BrowserRouter>
        <div>
          <Route exact path="/" render={()=>{
            return(
              <ProductList
                toggleWish={this.toggleWish.bind(this)}
                toggleWait={this.toggleWait.bind(this)}
                wishList={this.state.wishList}
                waitList={this.state.waitList}
                loading={this.state.loading}
                handleFilterSubmission={this.handleFilterSubmission.bind(this)}
                store={this.props.store}
                handlePageClick={this.handlePageClick.bind(this)}
                products={this.state.products}
                meta={this.state.meta} />)
          }} />

          <Route path="/products/:id" render={(props)=>{
              const id      = props.match.params.id
              const product = this.state.products.find((product) =>{ return(product.id == id)})
              return(<ProductDetail {...product.attributes} id={product.id} />)
          }}/>


        </div>
      </BrowserRouter>
    )
  }
}

export default Main
