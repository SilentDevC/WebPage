
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Grid, List, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const allProducts = [
  {
    id: 4, name: 'Classic Logo Tee', price: 35, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop', rating: 4.8, reviews: 203, category: 'Apparel', color: 'Black', size: ['S', 'M', 'L', 'XL']
  },
  {
    id: 6, name: 'Minimalist Hoodie', price: 75, image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=500&h=500&fit=crop', rating: 4.9, reviews: 150, category: 'Apparel', color: 'Gray', size: ['M', 'L', 'XL']
  },
  {
    id: 8, name: 'Signature Cap', price: 25, image: 'https://images.unsplash.com/photo-1588850561407-57c7b7493d83?w=500&h=500&fit=crop', rating: 4.7, reviews: 112, category: 'Apparel', color: 'White', size: ['One Size']
  },
  {
    id: 7, name: 'Canvas Tote Bag', price: 45, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop', rating: 4.5, reviews: 78, category: 'Accessories', color: 'Beige', size: ['One Size']
  },
  {
    id: 9, name: 'Logo Sticker Pack', price: 15, image: 'https://images.unsplash.com/photo-1621955931499-c34456a86834?w=500&h=500&fit=crop', rating: 4.9, reviews: 301, category: 'Accessories', color: 'Multi', size: ['One Size']
  },
  {
    id: 10, name: 'Enamel Pin Set', price: 20, image: 'https://images.unsplash.com/photo-1611542858935-441674c19235?w=500&h=500&fit=crop', rating: 4.8, reviews: 95, category: 'Accessories', color: 'Multi', size: ['One Size']
  },
  {
    id: 11, name: 'Graphic Sweatshirt', price: 65, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=500&fit=crop', rating: 4.7, reviews: 132, category: 'Apparel', color: 'White', size: ['S', 'M', 'L']
  },
  {
    id: 12, name: 'Beanie Hat', price: 30, image: 'https://images.unsplash.com/photo-1576871335624-72750b6de3e2?w=500&h=500&fit=crop', rating: 4.6, reviews: 88, category: 'Apparel', color: 'Black', size: ['One Size']
  },
];

const categories = ['Apparel', 'Accessories'];
const sizes = ['S', 'M', 'L', 'XL', 'One Size'];
const colors = ['Black', 'White', 'Gray', 'Beige', 'Multi'];

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    colors: [],
    price: [0, 100],
  });

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      const currentValues = prev[type];
      if (currentValues.includes(value)) {
        return { ...prev, [type]: currentValues.filter(v => v !== value) };
      }
      return { ...prev, [type]: [...currentValues, value] };
    });
  };

  const handlePriceChange = (value) => {
    setFilters(prev => ({ ...prev, price: value }));
  };

  const clearFilters = () => {
    setFilters({ categories: [], sizes: [], colors: [], price: [0, 100] });
  };
  
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    if (filters.categories.length > 0) {
      products = products.filter(p => filters.categories.includes(p.category));
    }
    if (filters.sizes.length > 0) {
      products = products.filter(p => p.size.some(s => filters.sizes.includes(s)));
    }
    if (filters.colors.length > 0) {
      products = products.filter(p => filters.colors.includes(p.color));
    }
    products = products.filter(p => p.price >= filters.price[0] && p.price <= filters.price[1]);

    return products;
  }, [filters]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return a.name.localeCompare(b.name);
      }
    });
  }, [filteredProducts, sortBy]);

  const handleAddToCart = (product) => {
    addToCart(product);
    toast({
      title: 'Added to cart!',
      description: `${product.name} has been added to your cart.`
    });
  };

  const FilterSection = ({ title, options, selected, onchange }) => (
    <div className="py-6 border-b border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {options.map(option => (
          <div key={option} className="flex items-center">
            <Checkbox
              id={`${title}-${option}`}
              checked={selected.includes(option)}
              onCheckedChange={() => onchange(title.toLowerCase(), option)}
            />
            <Label htmlFor={`${title}-${option}`} className="ml-3 text-gray-600">
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 mb-4">All Merch</h1>
          <p className="text-xl text-gray-600">Discover our complete collection of premium apparel and accessories</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="lg:col-span-1">
            <div className="sticky top-24 max-h-[calc(100vh-10rem)] overflow-y-auto pr-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-light">Filters</h2>
                <Button variant="ghost" onClick={clearFilters} className="text-sm">Clear All</Button>
              </div>
              <FilterSection title="Categories" options={categories} selected={filters.categories} onchange={handleFilterChange} />
              <FilterSection title="Sizes" options={sizes} selected={filters.sizes} onchange={handleFilterChange} />
              <FilterSection title="Colors" options={colors} selected={filters.colors} onchange={handleFilterChange} />
              <div className="py-6">
                <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
                <Slider defaultValue={[0, 100]} max={100} step={5} value={filters.price} onValueChange={handlePriceChange} />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${filters.price[0]}</span>
                  <span>${filters.price[1]}</span>
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Products */}
          <main className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <p className="text-gray-600 mb-4 sm:mb-0">{sortedProducts.length} products found</p>
              <div className="flex items-center space-x-4">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}>
                    <Grid className="h-4 w-4" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}>
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {sortedProducts.length > 0 ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {sortedProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.05 }} className={`group ${viewMode === 'list' ? 'flex space-x-6' : ''}`}>
                    <div className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex w-full' : ''}`}>
                      <div className={`overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square'}`}>
                        <Link to={`/product/${product.id}`}>
                          <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" />
                        </Link>
                      </div>
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="flex items-center">{[...Array(5)].map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />))}</div>
                            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                          </div>
                          <Link to={`/product/${product.id}`}><h3 className="text-xl font-medium text-gray-900 mb-2 hover:text-gray-700 transition-colors cursor-pointer">{product.name}</h3></Link>
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                          <p className="text-2xl font-light text-gray-900 mb-4">${product.price}</p>
                        </div>
                        <Button onClick={() => handleAddToCart(product)} className="w-full bg-gray-900 hover:bg-gray-800 text-white">Add to Cart</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                 <X className="mx-auto h-12 w-12 text-gray-400" />
                 <h3 className="mt-2 text-xl font-medium text-gray-900">No products found</h3>
                 <p className="mt-1 text-sm text-gray-500">Try adjusting your filters or clearing them to see all products.</p>
                 <div className="mt-6">
                   <Button onClick={clearFilters}>Clear Filters</Button>
                 </div>
               </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
