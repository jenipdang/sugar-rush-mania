class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.references :event, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.string :rating
      # t.string :images_url

      t.timestamps
    end
  end
end
