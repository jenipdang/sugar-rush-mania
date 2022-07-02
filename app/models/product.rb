class Product < ApplicationRecord
    has_one_attached :image, dependent: :destroy
    has_many :orders
    has_many :events, through: :orders
    has_many :reviews
    has_many :reviewers, through: :reviews, source: :reviewer

    validates :name, :price, :description, :category, presence: true
    validates :price, numericality: { in: 0..500 }

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached? 
    end

    def ordered
        self.events.length
    end

    def self.most_popular
        self.preload(:orders).max_by{|p| p.orders.count}
    end

    def total_sale
        self.orders.all.sum{|p| p.total_order}
    end

    def total_reviwers
        self.reviewers.uniq.length
    end

end
