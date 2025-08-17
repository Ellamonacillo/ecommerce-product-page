import React, { useState } from 'react'
import Header from './components/Header'
import Cart from './components/Cart'
import ProductImage from './components/ProductImage'
import Footer from './components/Footer'
import ProductDetails from './components/ProductDetails'

const App = () => {

  const product = {
    id: 1,
    name: 'Fall Limited Edition Sneakers',
    description: `These low-profile sneakers are your perfect casual wear companion. Featuring a 
        durable rubber outer sole, they’ll withstand everything the weather can offer.`,
    origPrice: '250.00',
    discount: '50',
    newPrice: '125.00',
    images: {
      main: [
        'images/image-product-1.jpg',
        'images/image-product-2.jpg',
        'images/image-product-3.jpg',
        'images/image-product-4.jpg',
      ],
      thumbnails: [
        'images/image-product-1-thumbnail.jpg',
        'images/image-product-2-thumbnail.jpg',
        'images/image-product-3-thumbnail.jpg',
        'images/image-product-4-thumbnail.jpg',
      ]
    }
  }
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  }

  const addToCart = (newItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if(existingItemIndex !== -1) {
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        const newQuantity = existingItem.quantity + newItem.quantity;

        const finalQuantity = Math.min(newQuantity, 10);

        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: finalQuantity,
          total: (parseFloat(existingItem.newPrice) * finalQuantity).toFixed(2)
        }

        return updatedItems;
      }

      return [...prevItems, newItem];
    })
  }

  const handleRemove = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }

  return (
    <div>
      <Header cartItems={cartItems} toggleCart={toggleCart} />
      <main>
        <Cart 
          cartItems={cartItems} 
          handleRemove={handleRemove} 
          cartOpen={cartOpen} 
          aria-label="Product details and purchase options"
        />
        <div className='product-wrapper'>
          <ProductImage product={product} aria-label="Product images and gallery"/>
          <ProductDetails 
            product={product} 
            quantity={quantity} 
            setQuantity={setQuantity} 
            addToCart={addToCart} 
            aria-label="Product details and purchase options" 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App