class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :not_processed

  before_action :authorize
  before_action :current_cart
  # before_action :find_cart

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authorize
    render json: { errors: ["not authorize"]}, status: :unauthorized unless current_user
  end

  def current_cart
    if session[:cart_id]
      @cart = Cart.find_by(id: session[:cart_id])
      if @cart.present?
        @current_cart = @cart
      else 
        session[:cart_id] = nil
      end
    end

    if session[:cart_id] == nil
      @current_cart = Cart.create
      session[:cart_id] = @current_cart.id
    end
  end

  def not_found(exception)
    render json: { errors: ["#{exception.model} not found"]}, status: :not_found
  end

  def not_processed(invalid)
    render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  private 

  # def current_cart
  #   session[:cart] ||= []
  # end

  # def find_cart
  #   @cart = Product.find(session[:cart])
  # end
  
end
