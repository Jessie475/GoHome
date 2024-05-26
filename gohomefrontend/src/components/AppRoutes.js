// components/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';
import RentalList from './RentalList';
import RentalDetail from './RentalDetail';
import ArticleList from './ArticleList';
import ArticleDetail from './ArticleDetail';
import Account from './Account';
import SavedHouse from './accountpart/SavedHouse';
import MyPost from './accountpart/MyPost';
import PostRent from './accountpart/PostRent';
import SavedArticle from './accountpart/SavedArticle';
import MyComment from './accountpart/MyComment';
import PostedRent from './accountpart/PostedRent';
import FindRoommate from './FindRoommate';
import FindRoommateDetail from './FindRoommateDetail';
import PostFindRoommate from './PostFindRoommate';
import PostArticle from './PostArticle';
import HouseMap from './HouseMap';





function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/rentals" element={<RentalList />} />
      <Route path="/rental/:id" element={<RentalDetail />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/article/:id" element={<ArticleDetail />} />
      <Route path="/account" element={<Account />} />
      <Route path="/savedhouse" element={<SavedHouse />} />
      <Route path="/mypost" element={<MyPost />} />
      <Route path="/postrent" element={<PostRent />} />
      <Route path="/savedarticle" element={<SavedArticle />} />
      <Route path="/mycomment" element={<MyComment />} />
      <Route path="/postedrent" element={<PostedRent />} />
      <Route path="/findroommate" element={<FindRoommate />} />
      <Route path="/roommate/:id" element={<FindRoommateDetail />} />
      <Route path="/postarticle" element={<PostArticle />} />
      <Route path="/postfindroommate" element={<PostFindRoommate />} />
      <Route path="/housemap/:id" element={<HouseMap />} />  // 添加HouseMap的路由


    </Routes>
  );
}

export default AppRoutes;
