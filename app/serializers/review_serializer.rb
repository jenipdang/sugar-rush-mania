class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :post_by, :image_url
  # belongs_to :product

  def post_by
    "#{self.object.reviewers.username}"
  end

end
