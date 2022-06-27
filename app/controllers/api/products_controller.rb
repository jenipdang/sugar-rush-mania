class Api::ProductsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show]
  before_action :find_product, only: [:show, :update, :destroy]
  before_action :check_admin, except: [:index, :show]


  #GET "/products" or GET "/events/:event_id/products"
  def index 
      if params[:event_id]
          event = Event.find(params[:event_id])
          render json: event.products
      else
          render json: Product.all
      end

  end

  #POST "/products" or "/events/:event_id/products"
  def create
      if params[:event_id]
          event = Event.find(params[:event_id])
          @product = event.create!(product_params)
          Order.create(product: @product, event: event, quantity: params[:quantity])
          render json: serialized_prodcut, status: :created
      else
          @product = Product.create!(product_params)
          render json: serialized_product, status: :created
      end
  end


  #GET "/products/:id"
  def show 
      render json: serialized_product
  end

  #PATCH "/products/:id"
  def update
      @product&.update!(product_params)
      render json: serialized_product
  end

  #DELETE "/products/:id"
  def destroy
      @product&.destroy
      render json: {message: "Successfully destroyed the product"}
  end


  private

  def find_product
    @product = Product.find(params[:id])
  end

  def serialized_product
    @product.to_json
  end

  def product_params
    params.require(:product).permit(:event_id,:name, :price, :description, images: [])
  end

  def check_admin
    render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
  end
end
