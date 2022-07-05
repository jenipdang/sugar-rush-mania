class CartSerializer < ActiveModel::Serializer
  attributes :id

  has_many :cart_products
  has_many :products, through: :cart_products
end
