Rails.application.routes.draw do
  root to: "stores#show"
  resources :products, only: :show
  namespace :api do
    namespace :v1 do
      resources :products, constraints: JsonApiConstraint.new
    end
  end
end
