import { useRef, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function QuantityInput({ onQuantityChange }) {
    const [quantity, setQuantity] = useState(0);

    const handleChange = (e) => {
        const val = isNaN(e.target.value) ? 0 : Number(e.target.value);
        setQuantity(val);
        onQuantityChange(val);
    } 

    return(
        <input 
            type="numeric"
            placeholder='quantity'
            value={quantity}
            onChange={handleChange}
        />
    );
}

function App() {
  const products = [
    { id: 1, name: "Wireless Mouse", price: 25.00 },
    { id: 2, name: "Mechanical Keyboard", price: 89.99 },
    { id: 3, name: "USB-C Hub", price: 45.50 },
    { id: 4, name: "Laptop Stand", price: 30.00 }
  ];

  const [productsCart, setProductsCart] = useState(products);
  const [productSubtotal, setProductsSubtotal] = useState(0);
  const [cupon, setCupon] = useState(0);

  const cuponRef = useRef(null)

  const handleAplicarCupon = () => {
    const cuponValue = cuponRef.current.value.trim()
    console.log(cuponValue)
    if (cuponValue !== "SAVE10")
      return
    setProductsSubtotal(productSubtotal*0.9)
  }

  const handleUpdateSubtotal = (id, quantity) => {
    const updatedCart = [...productsCart];
    const productIndex = productsCart.findIndex(product => product.id === id);
    const product = updatedCart[productIndex]

    const updatedProduct = {...product, subtotal: product.price * quantity}
    updatedCart[productIndex] = updatedProduct;

    setProductsSubtotal(updatedCart.reduce((subtotal, product) => subtotal += product.subtotal || 0,0))
    setProductsCart(updatedCart)
  }

/*   const handleSubtotalCart = () => {
    let total = 0;
    productsCart.forEach(product => {
      total += product.subtotal
    })
    return total;
  } */

  return (
    <>
      {productsCart.map(product => 
        <>
          <h1 key={product.id}>{product.name}: ${product.price} - Subtotal: {product.subtotal}</h1>
          <QuantityInput onQuantityChange={(quantity) => handleUpdateSubtotal(product.id, quantity)}/>
        </>
      )}
      <h1>total: {productSubtotal}</h1>
      <input type="text" placeholder='cupon' ref={cuponRef}/>
      <button onClick={handleAplicarCupon}>aplicar cupon</button>
    </>
  )
}

export default App
