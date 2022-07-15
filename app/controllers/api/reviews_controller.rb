class Api::ReviewsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    before_action :find_review, only: [:show, :update, :destroy]

   
    def index 
        if params[:product_id]
            product = Product.find(params[:product_id])
            render json: product.reviews
        else 
            render json: Review.all
        end
    end


    def show 
        render json: @review
    end

   
    def create 
        params[:product_id]
        product = Product.find(params[:product_id])
        @review = current_user.reviews.create!(product: product, title: params[:title], content: params[:content], rating: params[:rating])
        render json: @review, status: :created
        
    end

   
    def update 
        @review&.update!(review_params)
        render json: @review, status: :ok
    end

   
    def destroy 
        if @review&.destroy
            render json: {message: "Successfully destroyed review!"}
        else
            render json: {errors: @review.errors.full_messages.to_sentence}
        end
    end

    private

    def find_review
        @review = Review.find(params[:id])
    end

    def review_params
        params.permit(:title, :rating, :content, :product_id, :user_id, :image)
    end
end
