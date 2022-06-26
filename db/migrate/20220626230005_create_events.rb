class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.string :name
      t.string :datetime
      t.string :location
      t.string :address

      t.timestamps
    end
  end
end
