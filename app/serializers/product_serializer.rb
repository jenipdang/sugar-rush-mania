class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :seasonal, :image_url

end
