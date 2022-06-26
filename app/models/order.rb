class Order < ApplicationRecord
    belongs_to :event
    belongs_to :product
    has_many :reviews
  
    def total_order
      (self.product.price) * (self.quantity)
    end
  
  
end
