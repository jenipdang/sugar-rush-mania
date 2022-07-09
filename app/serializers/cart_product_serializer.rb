class CartProductSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :quantity, :user_id

  # def cart_products
  #   Hash[CartProduct.all.map { |h| h.values_at(:key, :value) }]
  # end

end
