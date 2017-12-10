import React         from "react"
import ReactDOM      from "react-dom"
import Main          from "./components/main"
import ProductDetail from "./components/product_detail"

document.addEventListener("turbolinks:load", function(){
  const root = document.getElementById("store-page")
  if(root){
    const store  = JSON.parse(root.dataset.store)
    ReactDOM.render(<Main store={store}/>, root)
  }
})

document.addEventListener("turbolinks:load", function(){
  const root = document.getElementById("book-detail")
  if(root){
    const productDetail = JSON.parse(root.dataset.detail)
    ReactDOM.render(<ProductDetail {...(productDetail.data.attributes)} />, root)
  }
})
