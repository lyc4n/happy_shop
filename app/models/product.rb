class Product < ApplicationRecord

  validates_presence_of :name, :category, :under_sale, :sale_text
end
