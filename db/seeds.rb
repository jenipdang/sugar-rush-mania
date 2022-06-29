puts "🌱 Creating users..."
racheal = User.create(username: "racheal", email: "racheal@yahoo.com", password: "1234567ra")
kim = User.create(username: "kimdang", email: "kimlee@yahoo.com", password: "1234567kd")
jeni = User.create(username: "jenidang", email: "jeni@yahoo.com", password: "1234567jd", role: 1)

puts "🌱 Creating events..."
e1 = Event.create!(name: "Leon's HS Graduation Party", datetime: "Sat, 02 JUL 2022", location: "Blanco Urban Venue", address: "12 N San Pedro St, San Jose, CA 95110", user_id: kim.id)
e2 = Event.create!(name: "Aliza's HS Graduation Party", datetime: "Sat, 09 JUL 2022", location: "Starlite", address: "680 Minnesota Ave, San Jose, CA 95125", user_id: kim.id)
e3 = Event.create!(name: "Racheal's Babyshower", datetime: "Sat, 16 JUL 2022", location: "San Jose Armory", address: "240 N 2nd St, San Jose, CA 95112", user_id: racheal.id)

puts "🌱 Creating products..."
p1 = Product.create!(user_id: jeni.id, name: "Dinosaur Party", price: "5.00", description: "Dinosaur Theme Party. A roarsome way to celebrate! ", category: "Cake Pop").image.attached(to: File.open('/Users/jenidang/Development/code/Phase5/SRM_Images/dinosaur_cakepop.png'), filename: 'dinosaur_cakepop.png')

p2 = Product.create!(user_id: jeni.id, name: "Cute Monsters Attack!", price: "7.50", description: "Who said monsters are scary...? Cute colorful monsters are coming to crash the party!", category: "Muffin/Cupcake").image.attached(to: File.open('/Users/jenidang/Development/code/Phase5/SRM_Images/monsters_cupcake.png'), filename: 'monsters_cupcake.png')

p3 = Product.create!(user_id: jeni.id, name: "Blooming Succulent Cupcakes", price: "8.50", description: "Turn your cupcakes into little mini gardens with these Blooming Succulent Cupcakes", category: "Muffin/Cupcake").image.attached(to: File.open('/Users/jenidang/Development/code/Phase5/SRM_Images/succulent_cupcake.png'), filename: 'succulent_cupcake.png')

p4 = Product.create!(user_id: jeni.id, name: "Monster Cake", price: "100", description: "Mini monster making its way onto the dessert table!!", category: "Cake").image.attached(to: File.open('/Users/jenidang/Development/code/Phase5/SRM_Images/monster_cake.png'), filename: 'monster_cake.png')

p5 = Product.create!(user_id: jeni.id, name: "Creme Brulee", price: "8.50", description: "Available Flavors: Vanilla, Chocolate, Lemon, Green Tea, and Ube", category: "Cake").image.attached(to: File.open('/Users/jenidang/Development/code/Phase5/SRM_Images/ube_creme_burle.png'), filename: 'ube_creme_burle.png') 

p6 = Product.create!(user_id: jeni.id, name: "Cookie", price: "4.50", description: "Available Flavors: Chocolate Chip, Oatmeal Raisin, White Chocolate Chip, Peanut Butter and Butter", category: "Cookie").image.attached(to: File.open('/Users/jenidang/Development/code/Phase5/SRM_Images/cookies.png'), filename: 'cookies.png')


puts "🌱 Creating orders..."
Order.create(event_id: 1, product_id: 3, quantity: 50)
Order.create(event_id: 1, product_id: 5, quantity: 100)
Order.create(event_id: 1, product_id: 6, quantity: 100)
Order.create(event_id: 2, product_id: 4, quantity: 1)
Order.create(event_id: 2, product_id: 3, quantity: 50)
Order.create(event_id: 2, product_id: 6, quantity: 50)
Order.create(event_id: 3, product_id: 2, quantity: 1)
Order.create(event_id: 3, product_id: 1, quantity: 50)
Order.create(event_id: 3, product_id: 3, quantity: 50)


puts "🌱 Creating reviews..."
Review.create!(event_id: 1, user_id: 2, product_id: 3, title: "Best Desserts in Town!", content: "The dessert table setup was so pretty! Love the result of the theme cupcake! Would definite recommend this to all my friends and family.", rating: "5")

puts "🌱 Seeding done!"
