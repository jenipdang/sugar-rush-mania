class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :seasonal, :images_url
end
