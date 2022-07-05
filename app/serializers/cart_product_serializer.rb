class CartProductSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :quantity, :cart_id
end
