// // PostedRent.js
// import React, { useState } from 'react';
// import GenericList from '../GenericList';
// import Banner from '../../components/Banner';
// 
// function PostedRent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const posted = [];
//   for (let i = 1; i <= 18; i++) {
//     posted.push({
//       id: i,
//       name: `${i}間房屋`,
//       description: '描述',
//       link: `/post/${i}`
//     });
//   }
// 
//   return (
//     <div>
//       <Banner title="我的房屋" showSearch={true} onSearch={(value) => setSearchTerm(value)} />
//       <GenericList
//         title="我的房屋"
//         items={posted.filter(posted => posted.name.includes(searchTerm)).map(posted => ({
//           content: `${posted.name}: ${posted.description}`,
//           link: posted.link  // 連接至原文
//         }))}
//       />
//     </div>
//   );
// }
// 
// export default PostedRent;