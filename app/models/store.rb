class Store
  def initialize
    @categories = Category.distinct.pluck(:name)
    get_price_range
  end

  private

  def get_price_range
    row = Product.select("min(price) as min_price, max(price) as max_price")[0]
    @min_price = row.min_price || 1000
    @max_price = row.max_price || 100000
  end
end
