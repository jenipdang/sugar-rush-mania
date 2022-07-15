class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :location, :address, :event_total, :total_products_ordered, :products_ordered
  has_many :products
 
end
