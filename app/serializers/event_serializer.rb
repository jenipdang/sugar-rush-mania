class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :location, :address, :total_cost
  has_many :products
  has_many :orders, serializer: OrderSerializer
end
