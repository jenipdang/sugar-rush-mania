class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :post_by, :image_url
  

  def post_by
    "#{self.object.reviewer.username}"
  end

end
