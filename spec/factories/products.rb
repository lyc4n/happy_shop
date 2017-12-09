FactoryBot.define do
  sequence :name do |n|
    "#{Faker::Commerce.product_name} ##{n}"
  end

  factory :product do
    name
    price      {Faker::Commerce.price.to_i * 100}
    sale_price {price * 0.5}
    sale_text  "50% off"
    category   {Faker::Commerce.department}
    under_sale false
    sold_out   false

    trait :sold_out do
      sold_out true
    end

    trait :under_sale do
      under_sale true
    end
  end
end
