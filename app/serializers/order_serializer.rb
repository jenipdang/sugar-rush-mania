class OrderSerializer < ActiveModel::Serializer
  attributes :id, :event_name

  has_many :products
  
  def event_name
    "#{self.object.event.name}"
  end


end
