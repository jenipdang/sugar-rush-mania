class Api::OrdersController < ApplicationController
    before_action :find_order, only: [:show, :update, :destroy]
    before_action :check_admin, except: [:index, :show]
  
  
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
        render json: serialized_order
    end


    #PATCH "/orders/:id"
    def update
        @order&.update!(order_params)
        render json: serialized_order
    end

    #DELETE "/orders/:id"
    def destroy
        @order&.destroy
        render json: {message: "Successfully destroyed the order"}
    end


    private

    def find_order
        @order = Order.find(params[:id])
    end

    def serialized_order
        @order.to_json(include: :event)
    end

    def order_params
        params.require(:order).permit(:event_id, :product_id, :quantity)
    end

    def check_admin
    render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    end
end
