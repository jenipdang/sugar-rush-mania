class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :post_by
  # belongs_to :product

  def post_by
    "#{self.object.commenter.username}"
  end

end
