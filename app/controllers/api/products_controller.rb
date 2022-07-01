class Api::ProductsController < ApplicationController
  skip_before_action :authorize, only: [:index, :show, :create, :destroy]
  before_action :find_product, only: [:show, :update, :destroy]
  # before_action :check_admin, except: [:index, :show]


  #GET "/products" 
  def index 
        render json: Product.all
  end

  #POST "/products"
  def create
    product = current_user.posted_products.create!(product_params)
    render json: product, status: :created
  end


  #GET "/products/:id"
  def show 
      render json: @product
  end

  #PATCH "/products/:id"
  def update
      @product&.update!(product_params)
      render json: @product, status: :ok
  end

  #DELETE "/products/:id"
  def destroy
      @product&.destroy
      render json: {message: "Successfully destroyed the product"}
  end

  # def delete_file
  #   file = ActiveStorage::Attachment.find(params[:id])
  #   file.purge
  # end

  private

  def find_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:user_id, :name, :price, :description, :category, :image)
  end

  # def check_admin
  #   render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
  # end

end
