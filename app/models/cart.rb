class Cart < ApplicationRecord
    has_many :cart_products, dependent: :destroy
    has_many :products, through: :cart_products
    belongs_to :user
    
    # def sub_total
    #     sum = 0
    #     self.cart_products.each do |cart_product|
    #       sum+= cart_products.total_price
    #     end
        
    #     return sum
    # end
end
