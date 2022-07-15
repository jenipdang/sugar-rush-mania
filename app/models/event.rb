class Event < ApplicationRecord
    belongs_to :host, class_name: "User", foreign_key: :user_id, dependent: :destroy
    has_many :orders, dependent: :destroy
    has_many :products, through: :orders
    has_many :reviews

    validates :name, :datetime, :location, presence: true
 
    def total_products_ordered
        self.products.uniq.count
    end

    def products_ordered
        self.products.map{|p| p.name}
    end

    def event_total
        self.orders.sum{|o| (o.quantity * o.product.price)}
    end

end
