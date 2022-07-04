class Api::CartsController < ApplicationController

    before_action :set_cart, only: [:show, :edit, :update, :destroy]
  
    def index
      @carts = Cart.all
    end
  
    def show
    end

    def create
      @cart = Cart.create(cart_params)
      render json: @cart status: :created
    end
  
    def update
        @cart.update(cart_params)
        render json: @cart, status: :created
    end
  
    def destroy
      @cart.destroy if @cart.id == session[:cart_id]
      session[:cart_id] = nil
      render json: { message: "Succesfully destroyed cart"}
    end
  
    private

      def set_cart
        @cart = Cart.find(params[:id])
      end
  
      def cart_params
        params.fetch(:cart, {})
      end
  

end
