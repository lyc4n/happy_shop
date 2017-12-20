class Product < ApplicationRecord
  belongs_to :category

  validates_presence_of :name, :category

  delegate :name, to: :category, prefix: true
end
