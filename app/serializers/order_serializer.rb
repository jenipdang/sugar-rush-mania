class OrderSerializer < ActiveModel::Serializer
  attributes :id, :event_name, :product_list

  # belongs_to :cart
  # has_many :cart_products, through: :cart

  def event_name
    "#{self.object.event.name}"
  end


end
