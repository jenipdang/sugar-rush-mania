class Order < ApplicationRecord
    belongs_to :event
    belongs_to :user
    # has_many :products
    has_many :reviews
 

end
