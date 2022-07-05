class Order < ApplicationRecord
    belongs_to :event
    belongs_to :cart
    has_many :cart_products, through: :cart
    has_many :reviews
 

    def product_list
        self.cart_products.map{|p| p.product.name}
    end

end
