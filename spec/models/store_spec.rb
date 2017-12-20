require "rails_helper"

RSpec.describe Store do
  context "Initialization" do

    let(:store){Store.new}
    let(:sports_category){create(:category, name: "Sports")}
    let(:kitchen_category){create(:category, name: "Kitchen")}

    before do
      create(:product, price: 5000, category: kitchen_category)
      create(:product, price: 16000, category: sports_category)
    end

    it "sets @category correctly" do
      expect(store.instance_variable_get("@categories")).to match_array(["Kitchen", "Sports"])
    end

    it "sets @min_price correctly" do
      expect(store.instance_variable_get("@min_price")).to eq(5000)
    end

    it "sets @max_price correctly" do
      expect(store.instance_variable_get("@max_price")).to eq(16000)
    end
  end
end

