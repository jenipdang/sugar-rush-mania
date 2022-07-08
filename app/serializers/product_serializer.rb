class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :image_url, :updated_at, :item_quantity, :item_total

  has_many :reviews, as: :reviewers

  
end
