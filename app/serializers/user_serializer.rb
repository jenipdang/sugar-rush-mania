class UserSerializer < ActiveModel::Serializer
  attributes :username, :role, :email, :created_at, :sort_products, :total_products_reviewed, :total_ordered

  has_many :reviews, as: :reviewers
  has_many :posted_products
  has_many :hosted_events
  has_many :orders, through: :hosted_events

end
