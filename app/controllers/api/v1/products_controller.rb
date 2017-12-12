class Api::V1::ProductsController < ApplicationController
  resource_description do
    short "Happy Shop Products API"
    api_version "1"
    formats ["jsonapi"]
    description "This is the documentation for the Products JSONAPI of Happy Shop."
  end

  api   :GET, "/products", "Fetch or filter list of products"
  param :filter,  Hash do
    param :category_in, Array, of:  String, desc: "Array of categories to filter the products"
    param :price_gteq,  :number, "Minimum price to filter the products"
    param :price_lteq,  :number, "Maximum price to filter the products"
  end
  param :sort,    String, "Comma separated names of field(s) to apply sort." +
                          "Prepend minus (-) sign to the field name to sort descendingly."
  param :page,    Hash do
    param :number, :number, "Specific page on of the products"
    param :size,   :number, "Count of products per page"
  end

  def index
    products_index = Api::V1::ProductsIndex.new(self)
    render jsonapi: products_index.products,
           meta: {
             per_page:      products_index.per_page,
             total_entries: products_index.total_entries,
             total_pages:   products_index.total_pages,
             current_page:  products_index.current_page}
  end

  api   :GET, "/products/:id", "Fetch a specific product"
  param :id, :number, required: true
  error code: 404, desc: "Product not found"
  def show
    begin
      product = Product.find(params[:id])
      render jsonapi: product
    rescue ActiveRecord::RecordNotFound
      render jsonapi_errors:
        {detail:
         {
          id: params[:id],
          status: 404,
          code:   "not-found",
          title:  "Product not found",
          detail: "Product #{params[:id]} not available on this server"
        }
      }, status: 404
    end
  end

  def jsonapi_pagination(products)
    if products.respond_to? :each
      {
        first: products.any? ? paged_path(1) : nil,
        last:  products.any? ? paged_path(products.total_pages) : nil,
        prev:  products.previous_page &&  paged_path(products.previous_page),
        next:  products.next_page && paged_path(products.next_page)
      }
    end
  end

  private

  def paged_path(page)
    index_options = params.slice(:page, :sort, :filter).permit!
    index_options.merge!({page: {number: page}})
    api_v1_products_path(index_options)
  end
end
