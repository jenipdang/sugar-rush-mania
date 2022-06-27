class Product < ApplicationRecord
    has_many_attached :images
    has_many :orders
    has_many :events, through: :orders
    has_many :reviews, through: :orders

    validates :name, :price, :description, :category, presence: true
    validates :price, numericality: { greater_than_or_equal_to: 0, less_than: BigDecimal(10**3) },
    format: { with: /\A\d{1,3}(\.\d{1,2})?\z/ }

    # def images_url
    #     Rails.application.routes.url_helpers.url_for(images) if images.attached? 
    # end
end
