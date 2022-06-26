class OrderSerializer < ActiveModel::Serializer
  attributes :id, :event, :product, :quantity, :total_order

  def product_name
    "#{self.object.product.name}"
  end

end
