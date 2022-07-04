Rails.application.routes.draw do

  namespace :api do
 
    resources :products do 
      resources :reviews, shallow: true
    end
    
    resources :users, only: [:show]
    get "/most-popular", to: "products#most_popular"
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    post "/reduce-quanity", to: "cart_products#reduce_quantity"
    post "/add-quanity", to: "cart_products#add_quantity"

    resources :reviews, only: [:index]
    resources :orders, only: [:update, :destroy, :show]

    resources :events do 
      resources :orders, shallow: true

    resources :cart_products
    resources :carts

    root "products#most_popular"
    end

    # resources :products do 
    #   member do
    #     delete :delete_file
    #   end
    # end

  end
  # all other routes will be load our React application
  # this route definition matches:
  # - *path: all paths not matched by one of the routes defined above
  # - constraints:
  #   - !req.xhr?: it's not a XHR (fetch) request
  #   - req.format.html?: it's a request for a HTML document
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
