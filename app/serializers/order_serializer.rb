class OrderSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :product_name, :quantity, :total_order

  def product_name
    "#{self.object.product.name}"
  end

  def event_name
    "#{self.object.event.name}"
  end

end
