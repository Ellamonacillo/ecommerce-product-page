const ProductDetails = ({ product, quantity, setQuantity, addToCart }) => {

  const handleAdd = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      const cartItem = {
        name: product.name,
        newPrice: product.newPrice,
        quantity: quantity,
        images: product.images.thumbnails[0],
        total: (parseFloat(product.newPrice) * quantity).toFixed(2)
      }
      addToCart(cartItem);
      setQuantity(0);
    }
  }

  return (
    <section className='product-details' aria-labelledby="product-name">
      <div className='space-y-4'>
        <h2>Sneaker Company</h2>
        <h1>{product.name}</h1>
      </div>

      <h3>{product.description}</h3>

      <div className='product-price'>
        <div className='price-discount'>
          <h1 className='md:text-3xl'>${product.newPrice}</h1>
          <h3 className='discount'>{product.discount}%</h3>
        </div>
        <h3 className='orig-price'>${product.origPrice}</h3>
      </div>

      <div className='quantity-buttons'>
        <div className='quantity' role="group" aria-label="Quantity selector">
          <button type="button" onClick={handleMinus} aria-label="Quantity selector" disabled={quantity === 0}>
            <img src="./images/icon-minus.svg" alt="Minus Icon" aria-hidden="true" />
          </button>
          <input 
            type="number" 
            name="quantity" 
            value={quantity} 
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              if (value >= 0 && value <= 10) {
                setQuantity(value);
              }
            }}
            aria-label="Quantity"
          />
          <button type="button" onClick={handleAdd} aria-label="Increase quantity" disabled={quantity === 10}>
            <img src="./images/icon-plus.svg" alt="Plus Icon" aria-hidden="true" />
          </button>
        </div>
      
        <button type="button" onClick={handleAddToCart} disabled={quantity === 0} className='add'>
          <img src="./images/icon-cart.svg" alt="Cart Icon" aria-hidden="true" />
          <h4>Add to cart</h4>
        </button>
      </div>
    </section>
  )
}

export default ProductDetails