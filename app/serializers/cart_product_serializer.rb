class CartProductSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :quantity, :user_id


end
