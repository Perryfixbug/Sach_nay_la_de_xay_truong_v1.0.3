import React, {useState, useEffect, useContext} from 'react'
import BackTo from '../../components/BackTo'
import { getCartItems, addToCart, updateCartItem, removeFromCart, clearCart } from '../../components/CartAPI';
import { motion } from 'framer-motion';
import ProductItem from '../../components/ProductItem';
import styles from './Cart.module.css'
import { DataContext } from '../../context/DataProvider';
import Title from '../../components/Title';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [selected, setSelected] = useState([])
  
  useEffect(()=>{
    const fetchCartItems = async()=>{
      const cartItems = await getCartItems()
      setCart(cartItems)
    }

    fetchCartItems()
  }, [])
  
  useEffect(()=>{

  })

  // const handleSelected = ()=>{
  //   setSelected()
  // }

  return (
    <motion.div 
      className={styles.cart_page}
      initial={{y: 100, opacity: 0}}
      animate={{y:0, opacity: 1}}
      transition={{
        duration: 0.3,
      }}
      exit={{y: -100, opacity: 0}}
    >
      <Title title='Cart'/>
      <div className={styles.cart_list} >
        {cart.map((cur, index)=>(
            // <label>
            //   <input  
            //     type='checkbox' 
            //     name='buy' 
            //   />
                <ProductItem.Cart 
                  key={index} 
                  product={cur}
                />
            // </label>
        )
        )}
      </div>
    </motion.div>
  )
}

export default Cart