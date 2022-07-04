class Order < ApplicationRecord
    belongs_to :event
    belongs_to :cart
    # has_many :products, through: :cart
    has_many :reviews
 

end
