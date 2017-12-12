Rails.application.routes.draw do
  apipie
  root to: "stores#show"
  namespace :api do
    namespace :v1 do
      resources :products, constraints: JsonApiConstraint.new
    end
  end
end
