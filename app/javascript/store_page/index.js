import React    from "react"
import ReactDOM from "react-dom"
import Main     from "./components/main"

document.addEventListener("turbolinks:load", function(){
  const root = document.getElementById("store-page")
  if(root){
    ReactDOM.render(<Main />, root)
  }
})
