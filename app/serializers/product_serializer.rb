class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :image_url, :ordered, :updated_at, :total_sale

  has_many :reviews, as: :reviewers
  # has_many :orders, serializer: OrderSerializer
  
  
end
