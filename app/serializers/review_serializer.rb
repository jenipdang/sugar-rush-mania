class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :product_name, :created_at
  belongs_to :product

  def product_name
    "#{self.object.product.name}"
  end


  # def post_by
  #   "#{self.object.reviewer.username}"
  # end

end
