import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Mock product data - in real app, this would come from API
  const product = {
    id: parseInt(id),
    name: 'Classic Logo Tee',
    price: 35,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=800&h=800&fit=crop'
    ],
    rating: 4.8,
    reviews: 203,
    category: 'Apparel',
    description: 'The perfect t-shirt, combining a classic fit with ultra-soft fabric. A timeless staple for any wardrobe, featuring our signature minimalist logo.',
    features: [
      '100% premium combed cotton',
      'Pre-shrunk for a perfect fit',
      'Tagless for maximum comfort',
      'Durable, high-quality print',
      'Ethically sourced materials'
    ],
    specifications: {
      'Fabric': '100% Cotton',
      'Fit': 'Modern Classic',
      'Neck': 'Crewneck',
      'Care': 'Machine wash cold, tumble dry low',
      'Origin': 'Designed in-house'
    }
  };

  const handleAddToCart = () => {
    const itemToAdd = { ...product, quantity };
    addToCart(itemToAdd);
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`
    });
  };

  const handleWishlist = () => {
    toast({
      title: "💝 Wishlist",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const handleShare = () => {
    toast({
      title: "📤 Share Product",
      description: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                    selectedImage === index ? 'border-gray-900' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-gray-500 mb-2">{product.category}</p>
              <h1 className="text-4xl font-light text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <p className="text-3xl font-light text-gray-900 mb-6">${product.price}</p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="w-2 h-2 bg-gray-900 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-3"
                >
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="p-3"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="p-3"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Specifications */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-3xl font-light text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {id: 6, name: 'Minimalist Hoodie', image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=500&h=500&fit=crop'},
              {id: 8, name: 'Signature Cap', image: 'https://images.unsplash.com/photo-1588850561407-57c7b7493d83?w=500&h=500&fit=crop'},
              {id: 7, name: 'Canvas Tote Bag', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'},
              {id: 9, name: 'Logo Sticker Pack', image: 'https://images.unsplash.com/photo-1621955931499-c34456a86834?w=500&h=500&fit=crop'}
            ].map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="group">
                <div className="bg-gray-100 rounded-2xl aspect-square overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{item.name}</h3>
              </Link>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductDetail;