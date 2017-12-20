FactoryBot.define do
  sequence :name do |n|
    "#{Faker::Commerce.product_name} ##{n}"
  end

  factory :product do
    name
    price      do
                 temp_price = Faker::Commerce.price.to_i
                 price      = temp_price == 0 ? 70 : temp_price
                 price * 100
               end
    sale_price {price * 0.5}
    sale_text  "50% off"
    under_sale false
    sold_out   false
    category

    trait :sold_out do
      sold_out true
    end

    trait :under_sale do
      under_sale true
    end
  end
end
