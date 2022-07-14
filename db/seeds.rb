puts "🌱 Deleting users, products, events, orders and reviews..."
User.delete_all
Product.delete_all
Order.delete_all
Review.delete_all
CartProduct.delete_all

puts "🌱 Creating users..."
racheal = User.create(username: "racheal", email: "racheal@yahoo.com", password: "1234567ra")
kim = User.create(username: "kimdang", email: "kimlee@yahoo.com", password: "1234567kd")
jeni = User.create(username: "jenidang", email: "jeni@yahoo.com", password: "1234567jd", role: 1)

puts "🌱 Creating events..."
e1 = Event.create!(name: "Leon's HS Graduation Party", datetime: "Sat, 02 JUL 2022", location: "Blanco Urban Venue", address: "12 N San Pedro St, San Jose, CA 95110", user_id: kim.id)
# e2 = Event.create!(name: "Aliza's HS Graduation Party", datetime: "Sat, 09 JUL 2022", location: "Starlite", address: "680 Minnesota Ave, San Jose, CA 95125", user_id: kim.id)
e3 = Event.create!(name: "Racheal's Babyshower", datetime: "Sat, 16 JUL 2022", location: "San Jose Armory", address: "240 N 2nd St, San Jose, CA 95112", user_id: racheal.id)

puts "🌱 Creating products..."
p1 = Product.create!(user_id: jeni.id, name: "Dinosaur Party", price: 60, description: "Dinosaur Theme Party. A roarsome way to celebrate! 12 pops per order", category: "Cake Pop").image.attach(io: File.open('app/assets/dinosaur_cakepop.png'), filename: 'dinosaur_cakepop.png')

p2 = Product.create!(user_id: jeni.id, name: "Cute Monsters Attack!", price: 45, description: "Who said monsters are scary...? Cute colorful monsters are coming to crash the party! 6 cupcakes per order", category: "Muffin/Cupcake").image.attach(io: File.open('app/assets/monsters_cupcake.png'), filename: 'monsters_cupcake.png')

p3 = Product.create!(user_id: jeni.id, name: "Blooming Succulent Cupcakes", price: 51, description: "Turn your cupcakes into little mini gardens with these Blooming Succulent Cupcakes. 6 cupcakes per order", category: "Muffin/Cupcake").image.attach(io: File.open('app/assets/succulent_cupcake.png'), filename: 'succulent_cupcake.png')

p4 = Product.create!(user_id: jeni.id, name: "Monster Cake", price: 100, description: "Mini monster making its way onto the dessert table!!", category: "Cake").image.attach(io: File.open('app/assets/monster_cake.png'), filename: 'monster_cake.png')

p5 = Product.create!(user_id: jeni.id, name: "Creme Brulee", price: 51, description: "Available Flavors: Vanilla, Chocolate, Lemon, Green Tea, and Ube. 6 per order", category: "Cake").image.attach(io: File.open('app/assets/ube_creme_burle.png'), filename: 'ube_creme_burle.png') 

p6 = Product.create!(user_id: jeni.id, name: "Cookie", price: 54, description: "Available Flavors: Chocolate Chip, Oatmeal Raisin, White Chocolate Chip, Peanut Butter and Butter. 12 cookies per order", category: "Cookie").image.attach(io: File.open('app/assets/cookies.png'), filename: 'cookies.png')



# puts "🌱 Creating cart_products..."
# CartProduct.create(user_id: 1, product_id: 2, quantity: 50)
# CartProduct.create(user_id: 1, product_id: 4, quantity: 1)
# CartProduct.create(user_id: 1, product_id: 5, quantity: 50)
# CartProduct.create(user_id: 2, product_id: 6, quantity: 100)
# CartProduct.create(user_id: 2, product_id: 4, quantity: 1)
# CartProduct.create(user_id: 2, product_id: 5, quantity: 100)
# CartProduct.create(cart_id: 3, product: p1, quantity: 70)
# CartProduct.create(cart_id: 3, product: p6, quantity: 140)
# CartProduct.create(cart_id: 3, product: p1, quantity: 1)

# puts "🌱 Creating orders..."
# Order.create(event_id: 1, user_id: 1)
# Order.create(event_id: 2, user_id: 2)

# puts "🌱 Creating ordered_products..."


puts "🌱 Creating reviews..."
Review.create!(event_id: 1, user_id: 2, product_id: 5, title: "Best Desserts in Town!", content: "The dessert table setup was so pretty! Love the taste, not too sweet...just perfect! Would definite recommend this to all my friends and family.", rating: "5")

puts "🌱 Seeding done!"
