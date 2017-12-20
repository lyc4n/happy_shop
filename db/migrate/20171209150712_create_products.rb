class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string     :name,       null: false
      t.boolean    :sold_out,   null: false, default: false
      t.belongs_to :category,   null: false
      t.boolean    :under_sale, null: false, default: false
      t.integer    :price,      null: false
      t.integer    :sale_price, null: false
      t.string     :sale_text,  null: false

      t.timestamps
    end
  end
end
