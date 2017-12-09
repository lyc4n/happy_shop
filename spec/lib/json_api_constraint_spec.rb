require "rails_helper"

RSpec.describe JsonApiConstraint do
  describe "#matches?" do
    context "when passed request object has proper content AND accept header" do
      it "returns true" do
        request = double(:request, content_type: "application/vnd.api+json", accept: "application/vnd.api+json")
        constraint = JsonApiConstraint.new
        result = constraint.matches?(request)
        expect(result).to be true
      end
    end

    context "when passed request object has NO proper content and accept header" do
      it "returns false" do
        request = double(:request, content_type: "application/vnd.api+json", accept: "")
        constraint = JsonApiConstraint.new
        result = constraint.matches?(request)
        expect(result).to be false
      end
    end
  end
end
