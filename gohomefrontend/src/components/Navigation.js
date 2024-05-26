import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/';
    const isSignUpPage = location.pathname === '/signup';
    
    
    if (isLoginPage) {
      return null; // 在登入頁不顯示導航列
    }

    if (isSignUpPage) {
      return null; // 在註冊頁不顯示導航列
    }
  
    return (
      <div className="sidebar">
        <div className='logo_gohome'> 
          <Link to="/home" className="link-style logo-link">GO <br/>HoMe</Link>  
        </div>
        <ul className="home-links">
          <li className="home-link">
            <Link className="link-style" to="/account">我的帳號</Link>
          </li>
          <li className="home-link">
            <Link className="link-style" to="/rentals">尋找房屋</Link>
          </li>
          <li className="home-link">
            <Link className="link-style" to="/findroommate">尋找室友</Link>
          </li>
          <li className="home-link">
            <Link className="link-style" to="/articles">分享文章</Link>
          </li>
        </ul>
      </div>
    );
  }

  export default Navigation;
