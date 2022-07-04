class Api::CartProductsController < ApplicationController
    include CurrentCart
    before_action :find_cart_product, only: [:show, :edit, :update, :destroy]
    before_action :current_cart, only: [:create]
  
    def index
      @cart_products = CartProduct.all
    end
  

    def create
        product = Product.find(params[:product_id])
        if current_cart.products.include? 
          @cart_product = current_cart.cart_products.find_by(product_id: product)
          @cart_product.quanity += 1
        else
          @cart_product = CartProduct.new
          @cart_product.cart = current_cart
          @cart_product.product = product
        end
        @cart_product.save
        render json: @cart_product, status: :created
    end
  
    def update
        @cart_product.update(cart_product_params)
        render json: @cart_product, status :created
    end
  
    def destroy
        @cart = Cart.find(session[:cart_id])
        @cart_product.destroy
        render json: { message: "Item successfully removed"}
    end
  
    def add_quantity
      @cart_product = CartProducts.find(params[:id])
      @cart_product.quantity += 1
      @cart_product.save
    end
  
    def reduce_quantity
      @cart_product = CartProduct.find(params[:id])
      if @cart_product.quantity > 1
        @cart_product.quantity -= 1
      end
      @line_item.save
    end
  
    private
    def find_cart_product
    @cart_product = CartProduct.find(params[:id])
    end

    def cart_product_params
    params.require(:cart_products).permit(:product_id, :cart_id, :quantity)
    end
end
