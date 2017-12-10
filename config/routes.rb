Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products, constraints: JsonApiConstraint.new
    end
  end
end
