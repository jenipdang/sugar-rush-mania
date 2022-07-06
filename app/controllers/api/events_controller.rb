class Api::EventsController < ApplicationController

before_action :find_event, only: [:show, :update, :destroy]
before_action :check_admin, only: [:update, :destroy]
  
  #GET "/events" 
  def index
    render json: Event.all
  end

  #GET "/events/:id"
  def show
    render json: @event
  end

  #POST "/events"
  def create
      @event = current_user.hosted_events.create!(event_params)
      render json: @event, status: :created
  end

  #PATCH "/events/:id"
  def update
    @event&.update!(event_params)
    render json: @event, status: :created
  end

  #DELETE "/event"
  def destroy
    @event&.destroy
    render json: { message: "Successfully destroyed event!"}
  end


  private

    def find_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.permit(:name, :datetime, :location, :address)
    end

    def check_admin
      render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    end

end
