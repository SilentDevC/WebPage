import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Edit, Trash2, Key, X, Upload } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Classic Logo Tee', price: 35, stock: 100, image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop', description: 'A timeless tee with our classic logo. Made from 100% premium cotton for ultimate comfort.' },
  { id: 2, name: 'Minimalist Hoodie', price: 75, stock: 50, image: 'https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=500&h=500&fit=crop', description: 'Stay cozy and stylish with our minimalist hoodie. Perfect for any season.' },
  { id: 3, name: 'Signature Cap', price: 25, stock: 120, image: 'https://images.unsplash.com/photo-1588850561407-57c7b7493d83?w=500&h=500&fit=crop', description: 'The perfect accessory to complete your look. Our signature cap features an embroidered logo.' },
];

const AdminPanel = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const fileInputRef = useRef(null);

  const openModal = (product = null) => {
    setEditingProduct(product ? { ...product } : { name: '', price: '', stock: '', description: '', image: null });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditingProduct(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct.name || !editingProduct.price || !editingProduct.stock || !editingProduct.description) {
      toast({ title: 'Error', description: 'Please fill all fields.', variant: 'destructive' });
      return;
    }
    
    if (editingProduct.id) { // Editing existing product
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      toast({ title: 'Success', description: 'Product updated successfully.' });
    } else { // Adding new product
      const newProduct = {
        ...editingProduct,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        price: parseFloat(editingProduct.price),
        stock: parseInt(editingProduct.stock, 10),
      };
      setProducts([...products, newProduct]);
      toast({ title: 'Success', description: 'New product added successfully.' });
    }
    closeModal();
  };

  const handleDeleteItem = (id) => {
    setProducts(products.filter(p => p.id !== id));
    toast({ title: 'Success', description: 'Product removed.', variant: 'destructive' });
  };
  
  const handleFeatureNotImplemented = () => {
    toast({
      title: '🚧 Feature In Progress',
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-secondary/30 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-light text-foreground">Admin Panel</h1>
              <p className="text-lg text-muted-foreground mt-2">Manage your store's products and settings.</p>
            </div>
            <Button onClick={() => openModal()} className="bg-primary hover:bg-primary/90">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
            <h2 className="text-2xl font-medium text-foreground mb-6">Manage Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 font-semibold">Product</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Stock</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} className="border-b border-border last:border-b-0">
                      <td className="p-4 flex items-center gap-4">
                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                        {product.name}
                      </td>
                      <td className="p-4">${parseFloat(product.price).toFixed(2)}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4 flex justify-end space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => openModal(product)}>
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
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border mt-8">
            <h2 className="text-2xl font-medium text-foreground mb-6">Admin Settings</h2>
            <Button onClick={handleFeatureNotImplemented} className="w-full max-w-xs" variant="outline">
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </Button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl shadow-xl w-full max-w-lg relative border border-border"
            >
              <button onClick={closeModal} className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent">
                <X className="h-5 w-5" />
              </button>
              <div className="p-8">
                <h2 className="text-2xl font-medium text-foreground mb-6">
                  {editingProduct && editingProduct.id ? 'Edit Product' : 'Add New Product'}
                </h2>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-32 h-32 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                      {editingProduct.image ? (
                        <img src={editingProduct.image} alt="preview" className="w-full h-full object-cover"/>
                      ) : (
                        <Upload className="h-8 w-8 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="image-upload" className="block text-sm font-medium text-foreground mb-2">Product Image</label>
                      <input type="file" id="image-upload" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                      <Button type="button" variant="outline" onClick={() => fileInputRef.current.click()}>
                        Upload Image
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">Recommended: 500x500px</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">Product Name</label>
                    <input type="text" name="name" id="name" value={editingProduct.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">Description</label>
                    <textarea name="description" id="description" value={editingProduct.description} onChange={handleInputChange} rows="3" className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">Price</label>
                      <input type="number" name="price" id="price" value={editingProduct.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                    </div>
                    <div>
                      <label htmlFor="stock" className="block text-sm font-medium text-foreground mb-1">Stock</label>
                      <input type="number" name="stock" id="stock" value={editingProduct.stock} onChange={handleInputChange} className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button type="button" variant="ghost" onClick={closeModal}>Cancel</Button>
                    <Button type="submit">{editingProduct && editingProduct.id ? 'Save Changes' : 'Add Product'}</Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminPanel;