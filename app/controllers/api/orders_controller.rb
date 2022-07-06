class Api::OrdersController < ApplicationController
    before_action :find_order, only: [:show, :update, :destroy]
    # before_action :check_admin, except: [:index, :show]
  
  
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
        byebug
        order = Order.create!(user_id: params[:user_id], event: event)
        current_user.cart_products.each do |cart_product|
            purchase.products << cart_product.product
            # cart_product.destroy
        end
    end


    # #PATCH "/orders/:id"
    # def update
    #     @order&.update!(order_params)
    #     render json: @order
    # end

    # #DELETE "/orders/:id"
    # def destroy
    #     @order&.destroy
    #     render json: {message: "Successfully destroyed the order"}
    # end


    private

    def find_order
        @order = Order.find(params[:id])
    end

    def order_params
        params.permit(:event_id, :user_id)
    end

    # def check_admin
    # render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    # end
end
