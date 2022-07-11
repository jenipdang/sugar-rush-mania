class Api::EventsController < ApplicationController

before_action :find_event, only: [:show, :update, :destroy]
before_action :check_admin, only: [:update, :destroy]
  
  def index
    render json: Event.all
  end

  def show
    render json: @event
  end


  def create
      event = current_user.hosted_events.create!(event_params)
      render json: event, status: :created
  end

 
  def update
    @event&.update!(event_params)
    render json: @event, status: :created
  end


  def destroy
    @event&.destroy
    render json: { message: "Successfully destroyed event!"}
  end


  private

    def find_event
      @event = Event.find(params[:id])
    end

    def event_params
      params.require(:event).permit(:name, :datetime, :location, :address)
    end

    def check_admin
      render json: { errors: ["Not Authorized"]}, status: :unauthorized unless @current_user.admin?
    end

end
