const Cart = ({ cartItems, handleRemove, cartOpen }) => {

  if (!cartOpen) return null;
  return (
    <section className='cart'>
      <h4>Cart</h4>
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <p role="status">Your cart is empty.</p>
        ): (
          cartItems.map((item, index) => (
            <div key={index} className='flex items-center justify-center flex-col space-y-5'>
              <div className="cart-details">
                <img src={item.images} alt="Product 1" className="product-image" />
                <div>
                  <h3>{item.name}</h3>
                  <h3>${item.newPrice} x {item.quantity} <strong>${item.total}</strong></h3>
                </div>
                <button type="button" 
                  onClick={() => handleRemove(item.id)} 
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <img src="./images/icon-delete.svg" alt="Delete Icon" aria-hidden="true" />
                </button>
              </div>
              <button type="button" className="checkout-button" aria-label="Proceed to checkout">
                Checkout
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default Cart