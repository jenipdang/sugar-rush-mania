class Api::OrdersController < ApplicationController
    before_action :find_order, only: [:show, :update, :destroy]
  
  

    #GET "/orders" or GET "/events/:event_id/orders"
    def index 
        if params[:event_id]
            event = Event.find(params[:event_id])
            render json: event.orders
        else
            render json: Order.all
        end

    end

    #GET "/orders/:id"
    def show 
        render json: current_user.orders
    end


    #DID NOT HIT THIS BYEBUG => HIT DEBUGGER IN THE FRONTEND
    def create
        event = Event.find_by!(params[:event_id])
        # current_user.cart_products.each do | cart_product | 
        order = current_user.orders.create(order_params)
        byebug
        # order.cart_products.each do |cart_product|
        #     order.products << cart_product.product
            # cart_product.destroy
        # end
    end

    private

    def find_order
        @order = Order.find(params[:id])
    end

    def order_params
        params.require(:order).permit(:event_id, :cart_product_id)
    end

end
