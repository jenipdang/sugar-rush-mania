class Event < ApplicationRecord
    belongs_to :host, class_name: "User", foreign_key: :user_id, dependent: :destroy
    has_many :orders, dependent: :destroy
    has_many :products, through: :orders
    has_many :reviews

    validates :name, :datetime, :location, presence: true
 

end
