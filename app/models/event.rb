class Event < ApplicationRecord
    belongs_to :host, class_name: "User", foreign_key: :user_id
    has_many :orders, dependent: :destroy
    has_many :products, through: :orders
    has_many :reviews

    validates :name, :datetime, :location, presence: true
    # validates :datetime, comparison: { greater_than: DateTime.now}

    def total_cost
        self.products.sum(:price) * self.orders.sum(:quantity)
    end

end
