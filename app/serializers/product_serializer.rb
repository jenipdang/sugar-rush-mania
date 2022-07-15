class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :description, :category, :image_url, :updated_at, :total_sale, :item_quantity, :item_total, :ordered

  has_many :reviews, as: :reviewers

  include Rails.application.routes.url_helpers
  
  def image_url
    return nil unless object.image.attached?
        object.image.blob.attributes.slice('filename', 'byte_size').merge(url: rails_blob_path(object.image, only_path: true)).tap { |attrs| attrs['name'] = attrs.delete('filename') }
  end

end
