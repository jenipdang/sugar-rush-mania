class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.reference :event
      t.reference :product
      t.integer :quantity

      t.timestamps
    end
  end
end
