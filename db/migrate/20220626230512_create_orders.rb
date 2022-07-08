class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.references :event
      t.references :user
      t.references :cart_product

      t.timestamps
    end
  end
end
