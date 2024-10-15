import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import BackTo from '../../components/BackTo';
import styles from './Account.module.css';
import clsx from 'clsx';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate để chuyển hướng
import axios from 'axios';

const Account = () => {
  const [account, setAccount] = useState({});
  const navigate = useNavigate(); // Sử dụng navigate để chuyển hướng

  useEffect(() => {
    const fetchAccountData = async () => {
      const storedUser = localStorage.getItem('mess');
      if (storedUser) {
        const res = await axios.get('http://127.0.0.1:5000/account');
        console.log(res.data);
        setAccount(res.data); // Đảm bảo rằng bạn đang lấy dữ liệu từ res.data
      }
    };
    fetchAccountData();
  }, []);

  const handleLogout = async () => {
    try {
      // Gọi API để xóa session ở phía backend
      await axios.post('http://127.0.0.1:5000/account/logout');

      // Xóa dữ liệu lưu trữ ở localStorage
      localStorage.removeItem('mess');
      localStorage.removeItem('access_token');

      // Chuyển hướng người dùng về trang đăng nhập
      navigate('/validation');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        duration: 0.2,
      }}
      exit={{ x: 100, opacity: 0 }}
    >
      <BackTo />
      <div className={clsx(styles.avatar_site)}>
        <img src={account.img} alt={account.name} className={styles.avatar} />
        <h1>{account.name}</h1>
      </div>
      <div className={styles.info_site}>
        <ul className='d-flex-column'>
          <li>
            <p>Email</p>
            <p>{account.email}</p>
          </li>
          <li>
            <p>Số điện thoại</p>
            <p>{account.phone}</p>
          </li>
          <li>
            <p>Ngày sinh</p>
            <p></p>
          </li>
          <li>
            <p>Giới tính</p>
            <p>{account.gender}</p>
          </li>
        </ul>

        <ul className='d-flex-column'>
          <li>
            <p>Số sách đã mua</p>
            <p>{account.books_purchased}</p>
          </li>
          <li>
            <p>Số tiền đã quyên góp</p>
            <p>{account.donation_amount}</p>
          </li>
        </ul>
      </div>
      <div className='d-flex-column'>
        <button className={styles.logout} onClick={handleLogout}>Đăng xuất</button> {/* Thêm sự kiện onClick */}
      </div>
      <Footer />
    </motion.div>
  );
};

export default Account;
