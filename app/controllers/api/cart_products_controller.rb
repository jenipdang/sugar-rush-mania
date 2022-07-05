class Api::CartProductsController < ApplicationController

    before_action :find_cart_product, only: [:show, :edit, :update, :destroy]
    before_action :current_cart, only: [:create]
  
    def index
      @cart_products = current_user.
    end
  
    def create
        product = Product.find(params[:product_id])
        @cart_product = current_user.cart_products.create(product: product, quantity: params[:quantity])
        render json: @cart_product, status: :created
    end
  
    def update
        @cart_product.update(cart_product_params)
        render json: @cart_product, status :created
    end
  
    def destroy
        # @cart_product = Cart.find(session[:cart_id])
        @cart_product.destroy
        render json: { message: "Item successfully removed"}
    end
  
    # def add_quantity
    #   @cart_product = CartProducts.find(params[:id])
    #   @cart_product.quantity += 1
    #   @cart_product.save
    # end
  
    # def reduce_quantity
    #   @cart_product = CartProduct.find(params[:id])
    #   if @cart_product.quantity > 1
    #     @cart_product.quantity -= 1
    #   end
    #   @line_item.save
    # end
  
    private
    def find_cart_product
    @cart_product = CartProduct.find(params[:id])
    end

    def cart_product_params
    params.permit(:product_id, :cart_id, :quantity)
    end
end
