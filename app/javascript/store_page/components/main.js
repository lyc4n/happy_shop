import React, {Component} from "react"
import ProductList from "./product_list"

class ProductsFetcher{
  constructor(){
    this.endpoint = "/api/v1/products"
  }

  perform(fetchOptions, successCallback){
    $.ajax({
      url:        this.endpoint,
      data:       fetchOptions,
      beforeSend: (request) => {
        request.setRequestHeader("Content-Type", "application/vnd.api+json")
        request.setRequestHeader("Accept",       "application/vnd.api+json")
      },
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
    this.state = {products: [], fetchOptions: {}}
  }

  componentDidMount(){
    this.fetchRecords()
  }

  fetchRecords(){
    const fetcher = new ProductsFetcher
    fetcher.perform(this.state.fetchOptions, ((response) =>{
      this.setState({products: response.data, meta: response.meta})
    }).bind(this))
  }

  render(){
    return(
      <div>
        <ProductList products={this.state.products} />
      </div>
    )
  }
}

export default Main
