class User < ApplicationRecord
  enum role: [:guest, :admin]
  has_secure_password
  has_many :posted_products, foreign_key: :user_id, class_name: "Product", dependent: :destroy
  has_many :hosted_events, foreign_key: :user_id, class_name: "Event", dependent: :destroy
  has_many :orders, through: :hosted_events
  has_many :reviews
  has_many :reviewed_products, through: :reviews, source: :product

  validates :email, presence: true, uniqueness: true, format: {with: /\A(?<username>[^@\s]+)@((?<domain_name>[-a-z0-9]+)\.(?<domain>[a-z]{2,}))\z/i}
  validates :username, presence: true, length: {in: 6..25}
  validates :password, length: {in: 8..25}

  def sort_products
    self.posted_products.order(name: 'asc')
  end

  def total_products_reviewed
    self.reviewed_products.uniq.length
  end

  # def total_hosted_events_ordered
  #   self.hosted_events.uniq.length
  # end

  def total_ordered
    self.orders.uniq.length
  end

end
