require "rails_helper"

RSpec.describe "V1 Products API", type: :request do
  let(:jsonapi_headers) do
    {
      "CONTENT_TYPE" => "application/vnd.api+json",
      "ACCEPT"       => "application/vnd.api+json",
    }
  end

  describe "GET /api/v1/products" do
    context "when given correct Content-Type and Accept headers" do
      before do
        create_list(:product, 3)
      end


      it "renders correctly" do
        get api_v1_products_path, headers: jsonapi_headers
        expect(response).to have_http_status(200)
        expect(response.content_type).to eq("application/vnd.api+json")
        json = JSON.parse(response.body)
        expect(json["data"].length).to eq(3)
      end
    end

    context "giving filter parameter" do
      before do

        create(:product, category: "Clothing")
        create(:product, category: "Sports")
        create(:product, category: "Computers")
      end


      it "returns correct response format of filtered products" do
        get api_v1_products_path, params: {filter: {category_matches: "Sports"}}, headers: jsonapi_headers

        json = JSON.parse(response.body)
        expect(json["data"].length).to eq(1)
      end
    end

    context "pagination" do
      before do
        create_list(:product, 10, category: "Religion")
        create_list(:product, 2, category:  "Scifi")
      end

      it "returns correct response for the links of pagination" do
        get api_v1_products_path, params: {filter: {category_matches: "religion"}, page: {size: 2}}, headers: jsonapi_headers

        json = JSON.parse(response.body)
        expect(json["meta"]["total_entries"]).to eq(10)
        expect(json["meta"]["total_pages"]).to eq(5)
        expect(json["meta"]["current_page"]).to eq(1)
      end
    end
  end
end
