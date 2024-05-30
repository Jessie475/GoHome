// // GenericList.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../css/GenericList.css';
// 
// function GenericList({ title, items }) {
//   return (
//     <div className="list-container">
//       <header className="list-header">
//         <h1>{title}</h1>
//       </header>
//       <div className="list-items">
//         {items.map((item, index) => (
//           <Link to={item.link} key={index} className="list-item-link">
//             <div className="list-item">
//               <div className="item-info">
//                 {item.content}
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
// 
// export default GenericList;

import React from 'react';
import { Link } from 'react-router-dom';
import '../css/GenericList.css';

function GenericList({ title, items }) {
  return (
    <div className="list-container">
      <header className="list-header">
        <h1>{title}</h1>
      </header>
      <div className="list-items">
        {items.map((item, index) => (
          <Link to={item.link} key={index} className="list-item-link">
            <div className="list-item">
              <div className="item-info">
                {item.content}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GenericList;

