class User < ApplicationRecord
  enum role: [:guest, :admin]
  has_secure_password

  has_many :hosted_events, foreign_key: :user_id, class_name: "Event", dependent: :destroy

  validates :email, presence: true, uniqueness: true, format: {with: /\A(?<username>[^@\s]+)@((?<domain_name>[-a-z0-9]+)\.(?<domain>[a-z]{2,}))\z/i}
  validates :username, presence: true, length: {in: 6..25}
  validates :password, length: {in: 8..25}
end
