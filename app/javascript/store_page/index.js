import React         from "react"
import ReactDOM      from "react-dom"
import Main          from "./components/main"
import ProductDetail from "./components/product_detail"

$(function(){
  const root = document.getElementById("store-page")
  if(root){
    const store  = JSON.parse(root.dataset.store)
    ReactDOM.render(<Main store={store}/>, root)
  }
})
