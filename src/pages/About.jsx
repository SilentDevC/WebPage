import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Truck, Shield, Headphones } from 'lucide-react';

const About = () => {
  const teamMembers = [
    { name: 'John Doe', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&h=400&fit=crop' },
    { name: 'Jane Smith', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
    { name: 'Sam Wilson', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on all merch orders over $75'
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment processing for your peace of mind'
    },
    {
      icon: Headphones,
      title: 'Dedicated Support',
      description: 'Round-the-clock customer support for all your questions'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="py-24 bg-gray-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl font-light text-gray-900 mb-6"
          >
            About Minimal Merch
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            We believe in the power of simplicity and fandom. Our mission is to create high-quality, timeless merch that lets you represent what you love.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Founded by fans, for fans. Minimal Merch started with a simple idea: create apparel and accessories that were stylish, subtle, and made to last. We were tired of loud, low-quality merchandise and wanted to create items we'd be proud to wear every day.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we've expanded our collection, but our core philosophy remains the same. Every item is thoughtfully designed and meticulously crafted, staying true to our minimalist roots.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="aspect-square rounded-2xl overflow-hidden shadow-lg"
          >
            <img  class="w-full h-full object-cover" alt="Design studio with sketches and fabric samples" src="https://images.unsplash.com/photo-1702846196331-1f45d756a050" />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Award className="mx-auto h-12 w-12 text-gray-900 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">We use high-quality materials and printing techniques to ensure your merch looks great and lasts long.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Target className="mx-auto h-12 w-12 text-gray-900 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">Authentic Design</h3>
              <p className="text-gray-600">Our designs are original and inspired, created to be stylish and meaningful for true fans.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Users className="mx-auto h-12 w-12 text-gray-900 mb-6" />
              <h3 className="text-xl font-medium text-gray-900 mb-3">Community First</h3>
              <p className="text-gray-600">You are at the heart of what we do. We're building a community of people who share a passion for great design.</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">The passionate individuals behind Minimal Merch.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <img  src={member.image} alt={member.name} className="rounded-full w-full h-full object-cover shadow-lg" src="https://images.unsplash.com/photo-1691437155211-6986ef08cf27" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;