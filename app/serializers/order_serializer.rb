class OrdersSerializer < ActiveModel::Serializer
  attributes :id, :event_name

  def event_name
    "#{self.object.event.name}"
  end

end
