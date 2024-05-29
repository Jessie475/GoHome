// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
// import Navigation from './components/Navigation';
// import AppRoutes from './components/AppRoutes';
// import './css/App.css';
// 
// 
// 
// function App() {
//   
//   return (
//     <Router>
//       <div className="app-container">
//         <Navigation />
//         <div className="main-container">
//           <AppRoutes />
//         </div>
//       </div>
//     </Router>
//   );
// }
// 
// export default App;
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import AppRoutes from './components/AppRoutes';
import { UserProvider } from './contexts/UserContext'; // 确保路径正确
import './css/App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app-container">
          <Navigation />
          <div className="main-container">
            <AppRoutes />
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
