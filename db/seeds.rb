puts "🌱 Creating users..."
racheal = User.create(username: "racheal", email: "racheal@yahoo.com", password: "1234567ra")
kim = User.create(username: "kimdang", email: "kimlee@yahoo.com", password: "1234567kd")
jeni = User.create(username: "jenidang", email: "jeni@yahoo.com", password: "1234567jd", role: 1)

puts "🌱 Creating events..."
e1 = Event.create!(name: "Leon's HS Graduation Party", datetime: "Sat, 02 JUL 2022", location: "Blanco Urban Venue", address: "12 N San Pedro St, San Jose, CA 95110", user_id: kim.id)
e2 = Event.create!(name: "Aliza's HS Graduation Party", datetime: "Sat, 09 JUL 2022", location: "Starlite", address: "680 Minnesota Ave, San Jose, CA 95125", user_id: kim.id)
e3 = Event.create!(name: "Racheal's Babyshower", datetime: "Sat, 16 JUL 2022", location: "San Jose Armory", address: "240 N 2nd St, San Jose, CA 95112", user_id: racheal.id)

puts "🌱 Creating products..."
p1 = Product.create!(name: "Customize Cake Pop", price: "5.00", description: "Available Flavors: Strawberry, Chocolate, and Vanilla. Color/Design: Event Theme", category: "Cake Pop", in_stock: true, images_url: ["https://www.instagram.com/p/CdmCD4xPCWE/, https://www.instagram.com/p/Ccf9w3tJj-0/, https://www.instagram.com/p/Cai9Z0TLEuQ/, https://www.instagram.com/p/CUf-0G6PSjW/, https://www.instagram.com/p/CSW6YoYHIeg/"])
p2 = Product.create!(name: "Breakable Heart", price: "100.00", description: "Available Flavors: White, Milk or Dark Chocolate. Color/Design: Event Theme", category: "Chocolate", in_stock: true, images_url: ["https://www.instagram.com/p/CbQhL3sPMu7/", "https://www.instagram.com/p/Cc0h7AzLBkj/", "https://www.instagram.com/p/CP2EcO3DatF/", "https://www.instagram.com/p/CIhi8jsDQmx/", "https://www.instagram.com/p/CIGZ1Q0DsnC/"])
p3 = Product.create!(name: "Theme Cupcake", price: "5.00", description: "Available Flavors: Chocolate and Vanilla. Color/Design: Event Theme", category: "Muffin Cupcake", in_stock: true, images_url: ["https://www.instagram.com/p/CdWoPrLv9Ei/", "https://www.instagram.com/p/CWkLT_GMopz/", "https://www.instagram.com/p/CWUBbFPvI_I/", "https://www.instagram.com/p/CTQ3gfRLcBY/", "https://www.instagram.com/p/CN6QXDjDYXw/"])
p4 = Product.create!(name: "6 inch Cake", price: "70", description: "We have a cake for every occassion. Every cake has a story.", category: "Cake", in_stock: true, images_url: ["https://www.instagram.com/p/CQJt7rcDDL9/"])
p5 = Product.create!(name: "Creme Brulee", price: "8.50", description: "Available Flavors: Vanilla, Chocolate, Lemon, Green Tea, and Ube", category: "Cake", in_stock: true, images_url: ["https://www.instagram.com/p/CRzfjW9DgwM/", "https://www.instagram.com/p/CQUV-fLjJec/", "https://www.instagram.com/p/CCTy1-MDAAf/", "https://www.instagram.com/p/CTxG8ceJfNU/"])
p6 = Product.create!(name: "Cookie", price: "4.50", description: "Available Flavors: Chocolate Chip, Oatmeal Raisin, White Chocolate Chip, Peanut Butter and Butter", category: "Cookie", in_stock: true, images_url: ["https://www.instagram.com/p/BrRxr67nYq4/", "https://www.instagram.com/p/CSE6doHHT0y/", "https://www.instagram.com/p/CXbziDQPR-O/"])


puts "🌱 Creating orders..."
Order.create!(event_id: e1.id, product_id: p3.id, quantity: 50)
Order.create!(event_id: e1.id, product_id: p5.id, quantity: 100)
Order.create!(event_id: e1.id, product_id: p6.id, quantity: 100)
Order.create!(event_id: e2.id, product_id: p4.id, quantity: 1)
Order.create!(event_id: e2.id, product_id: p3.id, quantity: 50)
Order.create!(event_id: e2.id, product_id: p6.id, quantity: 50)
Order.create!(event_id: e3.id, product_id: p2.id, quantity: 1)
Order.create!(event_id: e3.id, product_id: p1.id, quantity: 50)
Order.create!(event_id: e3.id, product_id: p3.id, quantity: 50)


puts "🌱 Creating reviews..."
Review.create!(event_id: e1.id, user_id: kim.id, title: "Best Desserts in Town!", content: "The dessert table setup was so pretty! Would definite recommend this to all my friends and family.", rating: "5")

puts "🌱 Seeding done!"
