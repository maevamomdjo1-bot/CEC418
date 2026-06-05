// Image utility functions
const imageUtils = {
  // Default images by category
  defaultImages: {
    'electronics': ['../assets/products/electronic1.jpg', '../assets/products/electronic2.jpg', '../assets/products/electronic3.jpg', '../assets/products/electronic4.jpg', '../assets/products/electronic5.jpg'],
    'clothing': ['../assets/products/apparel1.jpg', '../assets/products/apparel2.jpg', '../assets/products/apparel3.jpg', '../assets/products/apparel4.jpg', '../assets/products/apparel5.jpg', '../assets/products/apparel6.jpg'],
    'shoes': ['../assets/products/shoe1.jpg', '../assets/products/shoe2.jpg', '../assets/products/shoe3.jpg', '../assets/products/shoe4.jpg', '../assets/products/shoe5.jpg'],
    'home & garden': ['../assets/products/home1.jpg', '../assets/products/home2.jpg', '../assets/products/home3.jpg', '../assets/products/home4.jpg', '../assets/products/home5.jpg'],
    'sports': ['../assets/products/shoe1.jpg', '../assets/products/apparel4.jpg', '../assets/products/shoe2.jpg']
  },

  // Get product image with fallback system
  getProductImage(product) {
    // If product has uploaded images, use the first one
    if (product.images && product.images.length > 0) {
      return 'http://localhost:5000' + product.images[0];
    }
    
    // Otherwise, use category-based default image
    const categoryName = product.category?.name?.toLowerCase() || 'electronics';
    const categoryImages = this.defaultImages[categoryName] || this.defaultImages['electronics'];
    
    // Use product ID hash to consistently pick same image for same product
    const imageIndex = Math.abs(product._id.slice(-1).charCodeAt(0)) % categoryImages.length;
    return categoryImages[imageIndex];
  },

  // Get fallback image
  getFallbackImage() {
    return '../assets/products/electronic1.jpg';
  }
};