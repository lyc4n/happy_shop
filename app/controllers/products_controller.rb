class ProductsController < ApplicationController
  def show
    product  = Product.find(params[:id])
    renderer = JSONAPI::Serializable::Renderer.new
    @product = renderer.render(product, {class: {Product: SerializableProduct}}).to_json
  end
end
