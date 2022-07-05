class CreateOrderedProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :ordered_products do |t|
      t.references :event
      t.references :product

      t.timestamps
    end
  end
end
