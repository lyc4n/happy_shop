class Api::V1::ProductsIndex
  extend Forwardable

  attr_reader    :params, :products
  def_delegators :products, :total_entries, :total_pages, :current_page

  DEFAULT_SORT_OPTION = "price asc"

  def initialize(controller)
    @params = controller.params
    filter_and_sort_products
  end

  private

  def filter_and_sort_products
    search       = Product.ransack(filter_options)
    search.sorts = sort_options
    @products    = search.result.paginate(page_options)
  end

  def sort_options
    options = params.fetch(:sort, DEFAULT_SORT_OPTION)
    options.split(",").collect do |modified_field|
      modifier, field = modified_field[0], modified_field.sub("-", "")
      "#{field} #{modifier == '-' ? 'desc' : ''}"
    end
  end

  def filter_options
    params.fetch(:filter, {}).permit([:category_matches, :price_gteq, :price_lteq]).to_h
  end

  def page_options
    options = params.fetch(:page, {}).permit([:number, :size])
    {
      page:     options[:number],
      per_page: options[:size] || 10
    }
  end
end
