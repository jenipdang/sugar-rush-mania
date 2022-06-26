class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.decimal :price, precision: 8, scale: 2
      t.string :description
      t.string :category
      t.boolean :seasonal
      t.string :images_url

      t.timestamps
    end
  end
end
