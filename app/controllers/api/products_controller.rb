class Api::ProductsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create, :destroy, :most_popular]
  before_action :find_product, only: [:show, :update, :destroy]


  def index 
        render json: Product.all
  end


  def show 
      render json: @product
  end

  def most_popular
    render json: Product.most_popular
  end


  def create
    product = current_user.posted_products.create!(product_params)
    render json: product, status: :created
  end


  def update
      @product&.update!(product_params)
      render json: @product, status: :ok
  end

 
  def destroy
      @product&.destroy
      render json: {message: "Successfully destroyed the product"}
  end


  private

  def find_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:user_id, :name, :price, :description, :category, :image)
  end


end
