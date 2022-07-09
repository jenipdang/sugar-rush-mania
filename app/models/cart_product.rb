class CartProduct < ApplicationRecord
    belongs_to :user
    belongs_to :product

    validates :quantity, numericality: { only_integer: true, greater_than_or_equal_to: 1, less_than_or_equal_to: 10 }

    # def self.cart_id
    #     self.all.index_by(&:id)
    # end



end
