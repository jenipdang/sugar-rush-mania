class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :role, :email, :created_at

  has_many :reviews
  has_many :posted_products
  has_many :hosted_events
  has_many :orders, through: :hosted_events

end
