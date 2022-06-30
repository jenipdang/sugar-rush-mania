class Api::ReviewsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]
    before_action :find_review, only: [:show, :update, :destroy]

    #GET "/reviews" or GET "/products/:product_id/reviews"
    def index 
        if params[:product_id]
            product = Product.find(params[:product_id])
            render json: product.reviews
        else 
            render json: Review.all
        end
    end

    #GET "/reviews/:id"
    def show 
        render json: serialized_review
    end

    #POST "/reviews" or "/products/:product_id/reviews"
    def create 
        params[:product_id]
        product = Product.find(params[:product_id])
        params[:event_id]   
        event = Event.find(params[:event_id])
        @review = current_user.reviews.create!(product: product, event: event, title: params[:title], content: params[:content], rating: params[:rating], image: params[:image])
        render json: serialized_review, status: :created
        
    end

    #PATCH "/reviews/:id"
    def update 
        @review&.update!(review_params)
        render json: @review, status: :ok
    end

    #DELETE "/reviews/:id"
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

    def serialized_review
        @review.to_json
    end

    def review_params
        params.permit(:title, :rating, :content, :product_id, :user_id, :image)
    end
end
