class UserSerializer < ActiveModel::Serializer
  attributes :username, :role, :email, :created_at

  has_many :reviews, as: :reviewers
  has_many :orders

end
