// Demo script to populate database with sample products
// Run this in the browser console after logging in as a vendor

const sampleProducts = [
  // Electronics
  { name: 'Wireless Headphones', price: 89.99, stock: 25, category: 'Electronics', description: 'High-quality wireless headphones with noise cancellation' },
  { name: 'Smartphone', price: 599.99, stock: 15, category: 'Electronics', description: 'Latest smartphone with advanced features' },
  { name: 'Laptop', price: 899.99, stock: 10, category: 'Electronics', description: 'Powerful laptop for work and gaming' },
  { name: 'Bluetooth Speaker', price: 49.99, stock: 30, category: 'Electronics', description: 'Portable bluetooth speaker with great sound' },
  { name: 'Tablet', price: 299.99, stock: 20, category: 'Electronics', description: '10-inch tablet for entertainment and productivity' },

  // Clothing  
  { name: 'Cotton T-Shirt', price: 19.99, stock: 50, category: 'Clothing', description: 'Comfortable cotton t-shirt in multiple colors' },
  { name: 'Denim Jeans', price: 59.99, stock: 35, category: 'Clothing', description: 'Classic denim jeans with perfect fit' },
  { name: 'Summer Dress', price: 39.99, stock: 25, category: 'Clothing', description: 'Elegant summer dress for casual wear' },
  { name: 'Hoodie', price: 49.99, stock: 40, category: 'Clothing', description: 'Warm and cozy hoodie for cool weather' },
  { name: 'Business Shirt', price: 34.99, stock: 30, category: 'Clothing', description: 'Professional shirt for office wear' },

  // Shoes
  { name: 'Running Shoes', price: 79.99, stock: 45, category: 'Shoes', description: 'Comfortable running shoes for athletes' },
  { name: 'Casual Sneakers', price: 64.99, stock: 55, category: 'Shoes', description: 'Stylish sneakers for everyday wear' },
  { name: 'Leather Boots', price: 119.99, stock: 20, category: 'Shoes', description: 'Premium leather boots for formal occasions' },
  { name: 'Sandals', price: 29.99, stock: 35, category: 'Shoes', description: 'Comfortable sandals for summer' },
  { name: 'High Heels', price: 89.99, stock: 25, category: 'Shoes', description: 'Elegant high heels for special events' },

  // Home & Garden
  { name: 'Coffee Maker', price: 149.99, stock: 18, category: 'Home & Garden', description: 'Automatic coffee maker with timer' },
  { name: 'Indoor Plant', price: 24.99, stock: 60, category: 'Home & Garden', description: 'Beautiful indoor plant for home decoration' },
  { name: 'Kitchen Knife Set', price: 69.99, stock: 25, category: 'Home & Garden', description: 'Professional kitchen knife set' },
  { name: 'Throw Pillow', price: 19.99, stock: 40, category: 'Home & Garden', description: 'Decorative throw pillow for sofa' },
  { name: 'Garden Tools', price: 39.99, stock: 30, category: 'Home & Garden', description: 'Essential tools for gardening' },

  // Sports
  { name: 'Yoga Mat', price: 29.99, stock: 50, category: 'Sports', description: 'Non-slip yoga mat for exercise' },
  { name: 'Tennis Racket', price: 89.99, stock: 15, category: 'Sports', description: 'Professional tennis racket' },
  { name: 'Fitness Tracker', price: 199.99, stock: 25, category: 'Sports', description: 'Advanced fitness tracker with heart rate monitor' }
];

async function createSampleProducts() {
  console.log('Creating sample products...');
  
  try {
    // First get categories
    const categoriesResponse = await fetch('http://localhost:5000/api/categories', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    const categoriesData = await categoriesResponse.json();
    const categories = categoriesData.categories;
    
    console.log('Available categories:', categories);
    
    for (const product of sampleProducts) {
      // Find matching category
      const category = categories.find(c => 
        c.name.toLowerCase().includes(product.category.toLowerCase()) || 
        product.category.toLowerCase().includes(c.name.toLowerCase())
      );
      
      if (!category) {
        console.warn(`Category not found for ${product.name}, skipping...`);
        continue;
      }
      
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price.toString());
      formData.append('stock', product.stock.toString());
      formData.append('category', category._id);
      
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: formData
      });
      
      if (response.ok) {
        console.log(`✓ Created: ${product.name}`);
      } else {
        console.error(`✗ Failed to create: ${product.name}`);
      }
      
      // Small delay to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log('Sample products creation completed!');
    
  } catch (error) {
    console.error('Error creating sample products:', error);
  }
}

// Run the function
createSampleProducts();