class Order < ApplicationRecord
    belongs_to :event
    belongs_to :user
    belongs_to :cart_product
    has_many :products
    has_many :reviews
 

end
