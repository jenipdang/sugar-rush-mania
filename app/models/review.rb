class Review < ApplicationRecord
  has_one_attached :image, dependent: :destroy
  belongs_to :product
  belongs_to :event
  belongs_to :reviewer, class_name: "User", foreign_key: :user_id

  validates :title, presence: true
  validates :rating, presence: true, numericality: { less_than_or_equal_to: 5, greater_than_or_equal_to: 1 }
  validates :content, presence: true, length: { in: 3..2000} 
  before_save :format_title

  def format_title
    if self.title[0] != self.title[0].upcase
      self.title = self.title.capitalize
    end
  end

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached? 
  end
end
