class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :rating, :images_url
  has_one :event
end
