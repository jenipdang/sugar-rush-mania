Rails.application.routes.draw do

  namespace :api do
 
    resources :products do 
      resources :reviews, shallow: true
    end
    
    resources :users, only: [:index, :show]
    get "/most-popular", to: "products#most_popular"
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    post "/checkout", to: "orders#create"
  
  
    resources :reviews, only: [:index]
    resources :orders, only: [:update, :destroy, :show]

    resources :users do
      resources :events, only: [:index, :show, :create] do
      end
      resources :orders, shallow: true
    end
    
    resources :users do
      resources :cart_products, shallow: true
    end

    root "products#most_popular"


  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
