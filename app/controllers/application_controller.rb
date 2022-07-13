class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  rescue_from ActiveRecord::RecordInvalid, with: :not_processed

  before_action :authorize

  private

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def authorize
    render json: { errors: ["not authorize"]}, status: :unauthorized unless current_user
  end

  def not_found(exception)
    render json: { errors: ["#{exception.model} not found"]}, status: :not_found
  end

  def not_processed(invalid)
    render json: { errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  private 

  
end
