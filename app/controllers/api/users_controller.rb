class Api::UsersController < ApplicationController

  def create
      user = User.create!(user_params)
      session[:user_id] = user.id
      render json: user, status: :created
    end
  
    def show
      render json: @current_user
    end
  
    def update
        @current_user.update!(params.permit(:email, :username))
        render json: @current_user
    end
  
    def destroy
      @current_user.destroy
      head :no_content
    end
  
    private
  
    def user_params
      params.permit(:username, :password, :password_confirmation, :email)
    end
    
end
