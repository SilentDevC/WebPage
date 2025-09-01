import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Key } from 'lucide-react';

const AdminPanel = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState([
    { id: 1, name: 'Classic Logo Tee', price: 35, stock: 100 },
    { id: 2, name: 'Minimalist Hoodie', price: 75, stock: 50 },
    { id: 3, name: 'Signature Cap', price: 25, stock: 120 },
  ]);
  const [newItem, setNewItem] = useState({ name: '', price: '', stock: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price || !newItem.stock) {
      toast({ title: 'Error', description: 'Please fill all fields.', variant: 'destructive' });
      return;
    }
    const newProduct = {
      id: products.length + 1,
      name: newItem.name,
      price: parseFloat(newItem.price),
      stock: parseInt(newItem.stock, 10),
    };
    setProducts(prev => [...prev, newProduct]);
    setNewItem({ name: '', price: '', stock: '' });
    toast({ title: 'Success', description: 'New product added successfully.' });
  };

  const handleDeleteItem = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: 'Success', description: 'Product removed.', variant: 'destructive' });
  };

  const handleFeatureNotImplemented = () => {
    toast({
      title: '🚧 Feature In Progress',
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900">Admin Panel</h1>
          <p className="text-lg text-gray-600 mt-2">Manage your store's products and settings.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Management */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">Manage Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 font-semibold">Product Name</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Stock</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b last:border-b-0">
                      <td className="p-4">{product.name}</td>
                      <td className="p-4">${product.price.toFixed(2)}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4 flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" onClick={handleFeatureNotImplemented}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteItem(product.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Product & Settings */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Add New Product</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input type="text" name="name" id="name" value={newItem.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900" />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="number" name="price" id="price" value={newItem.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900" />
                </div>
                <div>
                  <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                  <input type="number" name="stock" id="stock" value={newItem.stock} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900" />
                </div>
                <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </form>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-medium text-gray-900 mb-6">Admin Settings</h2>
              <Button onClick={handleFeatureNotImplemented} className="w-full" variant="outline">
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminPanel;