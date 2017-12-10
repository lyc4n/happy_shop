class SerializableProduct < JSONAPI::Serializable::Resource
  type "products"
  attributes :name, :category, :price, :sale_price, :sale_text, :under_sale, :sold_out
end

