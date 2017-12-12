require "rails_helper"

RSpec.describe Api::V1::ProductsIndex do

  let(:empty_params){ActionController::Parameters.new({})}
  let(:sort_and_filtered_params) do
    ActionController::Parameters.new({
      sort:   "-price",
      filter: {category_in: ["Kitchen", "Computer"],
               price_gteq: 1000,
               price_lteq: 8000}
      })
  end

  before do
    @product_1 = create(:product, price: 4500, category: "Gadgets")
    @product_2 = create(:product, price: 1000, category: "Kitchen")
    @product_3 = create(:product, price: 1200, category: "Kitchen")
    @product_4 = create(:product, price: 8001, category: "Kitchen")
    @product_5 = create(:product, price: 8000, category: "Kitchen")
  end

  describe "initialization" do
    it "sorts products by price ascendingly by default" do
      controller = double(:controller, params: empty_params)
      products_index = Api::V1::ProductsIndex.new(controller)

      expected = [@product_2, @product_3, @product_1, @product_5, @product_4]
      expect(products_index.products.to_a).to match_array(expected)
    end

    it "filters/sorts products based on params and stores it on @products" do
      controller = double(:controller, params: sort_and_filtered_params)
      products_index = Api::V1::ProductsIndex.new(controller)

      expected = [@product_5, @product_3, @product_2]
      expect(products_index.products.to_a).to eq(expected)
    end
  end

  describe "delegation" do
    before do
      controller = double(:controller, params: empty_params)
      @products_index = Api::V1::ProductsIndex.new(controller)
    end

    it{expect(@products_index).to delegate_method(:total_entries).to(:products)}
    it{expect(@products_index).to delegate_method(:total_pages).to(:products)}
    it{expect(@products_index).to delegate_method(:current_page).to(:products)}
    it{expect(@products_index).to delegate_method(:per_page).to(:products)}
  end
end
