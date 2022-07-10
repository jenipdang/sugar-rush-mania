class OrderSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :sweet_name

  # has_many :products
  
  def event_name
    "#{self.object.event.name}"
  end

  def sweet_name
    "#{self.object.product.name}"
  end


end
