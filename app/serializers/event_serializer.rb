class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :location, :address
  has_many :products
 
end
