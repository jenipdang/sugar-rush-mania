class CreateOrders < ActiveRecord::Migration[6.1]
  def change
    create_table :orders do |t|
      t.references :event
      t.references :cart

      t.timestamps
    end
  end
end
