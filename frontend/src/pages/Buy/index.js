import React, { useContext } from 'react'
import Title from '../../components/Title'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets'
import styles from './Buy.module.css'
import { DataContext } from '../../context/DataProvider'
import { useLocation } from 'react-router-dom'

const Buy = () => {

  const [a, userData, c] = useContext(DataContext)
  const location = useLocation()
  const product = location.state
  console.log(product);
  

  return (
    <motion.div
      initial={{x: -100, opacity: 0}}
      animate={{x:0, opacity: 1}}
      transition={{
        duration: 0.2,
      }}
      exit={{x: 100, opacity: 0}}
      className={styles.buy_container}
    >
        <Title title="Thanh toán"/>
        <div className={styles.info}>
          <div className={styles.user_info_title}>
            <img src={assets.location_accent} className='icon'/>
            <p>Địa chỉ nhận hàng</p>
          </div>
          <div className={styles.user_info_content}>
            <div>
              <div>{userData.username}</div>
              <div>{userData.phone}</div>
            </div>
            <div>{userData.location}</div>
            <button>Thay đổi</button>
          </div>
          <div className={styles.product_info_title}>
            <img src={assets.shopping_cart_accent_2} className='icon'/>
            <p>Sản phẩm</p>
          </div>
          <div className={styles.product_info_content}>
            <img src={`http://localhost:5000/product_image/${product.id}`} />
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.quantity ? product.quantity : 1}</div>
          </div>
        </div>
        <div className={styles.bill}>
          <div className={styles.payment_choices}>
            <div>Phương thức thanh toán</div>
            <div>Thanh toán khi nhận hàng</div>
          </div>
          <div className={styles.bill_info}>
            <p>Tổng tiền hàng: {product.price}</p>
            <p>Phí ship </p>
            <p>Tổng thanh toán: {product.price}</p>
          </div>
        </div>
    </motion.div>
  )
}

export default Buy