class SerializableProduct < JSONAPI::Serializable::Resource
  type "products"
  attributes :name, :price, :sale_price, :sale_text, :under_sale, :sold_out

  attribute :category do
    @object.category_name
  end

  attribute :price_display do
    "$#{'%.2f' % (@object.price / 100.0)}"
  end

  attribute :sale_price_display do
    "$#{'%.2f' % (@object.sale_price / 100.0)}"
  end
end

