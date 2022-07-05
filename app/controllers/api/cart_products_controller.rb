class Api::CartProductsController < ApplicationController

    def index
        render json: current_user.cart_products
      end
    
      def show
          render json: current_user.cart_products.find_by!(id: params[:product_id])
      end
  
      def create
          cart_product = current_user.cart_products.find_by(product_id: params[:product_id])
          if(cart_product)
              cart_product.quantity ||= 1
              cart_product.quantity += 1
              cart_product.save
          else
            params[:quantity] = 1
              cart_product = current_user.cart_products.create!(product_id: params[:product_id], quantity: params[:quantity])
          end
          render json: current_user.cart_products, status: :created
      end

    #   def update
    #     cart_product = current_user.cart_products.find_by(product_id: params[:product_id])
    #     if cart_product.quantity > 1
    #        cart_product.quantity -= 1
    #     end
    #     cart_product.save
    #     render json: current_user.cart_products, status: :created
    #   end

    
      def destroy
          cart_product = current_user.cart_products.find_by(product_id: params[:id])
          cart_product.destroy
          render json: { message: "Item successfully removed"}
      end
    
      private
      def cart_product_params
      params.permit(:product_id, :user_id, :quantity)
      end
end
