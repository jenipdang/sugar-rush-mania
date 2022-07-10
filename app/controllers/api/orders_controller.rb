class Api::OrdersController < ApplicationController
    before_action :find_order, only: [:show, :update, :destroy]
  
  
    def index 
        if params[:event_id]
            event = Event.find(params[:event_id])
            render json: event.orders
        else
            render json: Order.all
        end

    end

    def show 
        render json: current_user.orders
    end


    def create
        event = Event.find_by!(id: params[:event_id])
        current_user.cart_products.each do | cart_product | 
            Order.create(user_id: current_user.id, product_id: cart_product.product_id, event_id: event.id)
            cart_product.destroy
        end
    end

    private

    def find_order
        @order = Order.find(params[:id])
    end

    # def order_params
    #     params.require(:order).permit(:event_id, :user_id)
    # end

end
