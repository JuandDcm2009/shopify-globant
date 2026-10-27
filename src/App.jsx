import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const products = [
    { id: 1, name: "Wireless Mouse", price: 25.00 },
    { id: 2, name: "Mechanical Keyboard", price: 89.99 },
    { id: 3, name: "USB-C Hub", price: 45.50 },
    { id: 4, name: "Laptop Stand", price: 30.00 }
  ];

  const [productsCart, setProductsCart] = useState(products);

  const handleUpdateSubtotal = (event) => {
    console.log(event);
    const element = event.target;
    element.value
  }

  return (
    <>
      {products.map(product => 
        <>
          <h1 key={product.id}>{product.name}: ${product.price} - Subtotal: {}</h1>
          <input type="numeric" placeholder='quantity' defaultValue={0} onChange={handleUpdateSubtotal}/>
        </>
        
      )}    
    </>
  )
}

export default App
