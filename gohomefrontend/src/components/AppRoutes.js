// components/AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Account from './Account';
import ArticleDetail from './ArticleDetail';
import ArticleList from './ArticleList';
import FindRoommate from './FindRoommate';
import FindRoommateDetail from './FindRoommateDetail';
import Home from './Home';
import HouseMap from './HouseMap';
import Login from './Login';
import ModifyRent from './ModifyRent';
import PostArticle from './PostArticle';
import PostFindRoommate from './PostFindRoommate';
import RentalDetail from './RentalDetail';
import RentalList from './RentalList';
import SignUp from './SignUp';
import MyComment from './accountpart/MyComment';
import MyPost from './accountpart/MyPost';
import PostRent from './accountpart/PostRent';
import PostedRent from './accountpart/PostedRent';
import SavedArticle from './accountpart/SavedArticle';
import SavedHouse from './accountpart/SavedHouse';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/rentals" element={<RentalList />} />
      <Route path="/rental/:id" element={<RentalDetail />} />
      <Route path="/articles" element={<ArticleList />} />
      <Route path="/articles/:id" element={<ArticleDetail />} /> 
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
      <Route path="/mypost/:id" element={<ArticleDetail/>} />
      <Route path="/postedrent/:id" element={<RentalDetail />} /> 
      <Route path="/savedarticle/:id" element={<ArticleDetail />} /> 
      <Route path="/savedhouse/:id" element={<RentalDetail />} />
      {/* <Route path="/mycomment/:id" element={<ArticleDetail />} /> */}
      <Route path="/article/:id" element={<ArticleDetail />} />

    </Routes>
  );
}

export default AppRoutes;