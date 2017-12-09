# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding products..."
products = []

10.times do
  products << FactoryBot.attributes_for(:product)
end

5.times do
  products << FactoryBot.attributes_for(:product, :sold_out)
end

5.times do
  products << FactoryBot.attributes_for(:product, :under_sale)
end

Product.create!(products)

puts "#{Product.count} are now in the database!"
puts "Done."
