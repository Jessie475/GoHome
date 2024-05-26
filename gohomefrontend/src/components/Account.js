import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Account.css';


function Account() {
  return (
    <div className="account-container">
      <header className="account-header">
        <h1>我的帳號</h1>
      </header>
      <div className="account-info">
        <div>姓名: XXX</div>
        <div>性別: 男/女</div>
        <div>帳號: XXXXXXXXXXXXXXXX</div>
      </div>
      <div className="account-links">
        <Link to="/savedhouse" className="account-link">收藏的房屋</Link>
        <Link to="/mypost" className="account-link">我的文章</Link>
        <Link to="/postrent" className="account-link">新增出租</Link>
        <Link to="/savedarticle" className="account-link">收藏的文章</Link>
        <Link to="/mycomment" className="account-link">我的留言</Link>
        <Link to="/postedrent" className="account-link">已發布房屋</Link>
      </div>
    </div>
  );
}

export default Account;
