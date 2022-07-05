class OrderedProductsSerializer < ActiveModel::Serializer
  attributes :id, :product_id, :event_id
end
