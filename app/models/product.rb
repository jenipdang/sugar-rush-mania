class Product < ApplicationRecord
    has_one_attached :image, dependent: :destroy
    has_many :orders
    has_many :events, through: :orders
    has_many :reviews

    validates :name, :price, :description, :category, presence: true
    validates :price, numericality: { in: 0..500 }

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached? 
    end

    def ordered
        self.orders.length
    end

end
