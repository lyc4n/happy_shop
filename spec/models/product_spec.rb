require "rails_helper"

RSpec.describe Product, type: :model do
  describe "attributes" do
    [:name, :sold_out, :category, :under_sale, :price, :sale_price, :sale_text].each do |attribute|
      it "responds_to #{attribute}" do
        expect(subject).to respond_to(attribute)
      end
    end
  end

  describe "Validations" do
    [:name, :category].each do |attribute|
      it {is_expected.to validate_presence_of(attribute)}
    end
  end
end
