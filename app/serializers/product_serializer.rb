class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :image_url, :updated_at, :total_sale, :item_quantity, :item_total, :ordered

  has_many :reviews, as: :reviewers

  
end
