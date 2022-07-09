class Product < ApplicationRecord
    belongs_to :user
    has_one_attached :image, dependent: :destroy
    has_many :orders
    has_many :events, through: :orders
    has_many :reviews, dependent: :destroy
    has_many :reviewers, through: :reviews, source: :reviewer

    has_many :cart_products, dependent: :destroy
    validates :name, :price, :description, :category, presence: true
    validates :price, numericality: { in: 0..500 }

    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached? 
    end

    def item_quantity
        self.cart_products.sum{|product| product.quantity}
    end

    def item_total
        (self.price) * item_quantity
    end
    
    # def ordered
    #     self.events.length
    # end

    # def total_sale
    #     self.orders.all.sum{|p| p.total_order}
    # end

    # def total_reviwers
    #     self.reviewers.uniq.length
    # end

    # def self.most_popular
    #     self.joins(:cart_products).group("products.id").order("count(products.id) desc").limit(3)
    # end

end
