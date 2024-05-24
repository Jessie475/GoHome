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

    </Routes>
  );
}

export default AppRoutes;
