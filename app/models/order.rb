class Order < ApplicationRecord
    belongs_to :event
    belongs_to :user
    belongs_to :product
    has_many :reviews
 

end
