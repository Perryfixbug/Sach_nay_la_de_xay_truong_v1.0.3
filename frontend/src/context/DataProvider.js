import React from 'react'
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { getCartItems } from '../components/CartAPI'

export const DataContext = createContext()

const DataProvider = ({children}) => {
  
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [accounts, setAccounts] = useState([])

  useEffect(()=>{
    fetch("http://127.0.0.1:5000/product")
      .then(res=>res.json())
      .then(data=>{
        setProducts(data);
      })
  },[])

  useEffect(()=>{
    
  const fetchAccount = async () => {
    try {
      // Gọi API để xóa session ở phía backend
      await axios.post('http://127.0.0.1:5000/account/logout');

      // Xóa dữ liệu lưu trữ ở localStorage
      localStorage.removeItem('mess');
      localStorage.removeItem('access_token');

      // Chuyển hướng người dùng về trang đăng nhập
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

    fetchAccount()
  }, [])


  useEffect(()=>{
    const fetchCart = async()=>{
      const response = await getCartItems()
      setCartItems(response.data)
    }
    
    fetchCart()
  }, [])
  
  
  return (
    <DataContext.Provider value={[products, accounts, cartItems]}>
      {children}
    </DataContext.Provider>
  )
}


export default DataProvider