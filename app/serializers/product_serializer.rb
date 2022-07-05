class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :image_url, :updated_at

  has_many :reviews, as: :reviewers
  # has_many :orders
  # has_many :events, through: :orders
  
end
