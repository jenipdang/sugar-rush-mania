class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :datetime, :location, :address, :total_cost
end
