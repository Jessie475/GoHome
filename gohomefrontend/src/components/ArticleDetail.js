
// //ver2

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import '../css/DetailPage.css';
// import Banner from './Banner';
// 
// function ArticleDetail() {
//   const { articleId } = useParams();
//   const [article, setArticle] = useState(null);
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([
//     //{ id: article.articleId, text: article.title, time: '2024-05-25 12:00', likes: 2 },
//     { id: 2, text: '非常喜歡這個地點！', time: '2024-05-24 15:30', likes: 5 }
//   ]);
// 
//   useEffect(() => {
//     fetch(`http://localhost:8081/articles/getArticle/${articleId}`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setArticle(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, [articleId]);
// 
//   const handleCommentSubmit = () => {
//     const newComment = {
//       id: comments.length + 1,
//       text: comment,
//       time: new Date().toISOString(),
//       likes: 0
//     };
//     setComments([...comments, newComment]);
//     setComment('');
//   };
// 
//   const likeComment = (id) => {
//     setComments(comments.map(comment =>
//       comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
//     ));
//   };
// 
//   if (!article) {
//     return <div>Loading...</div>;
//   }
// 
//   return (
//     <div>
//       <div><Banner title="文章詳情" /></div>
//       <div className="detail-page">
//         <div className="content">
//           <h1>{article.title}</h1>
//           <p>{article.description}</p>
//           <div className='action-buttons'>
//             <button className="like-button">按讚</button>
//             <button className="favorite-button">收藏</button>
//             <button className="contact-button">聯絡發文者</button>
//           </div>
//         </div>
//         <div className="comment-section">
//           <input
//             className='comment-input-text'
//             type="text"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="新增留言..."
//           />
//           <div className="comment-actions">
//             <button className="comment-submit-button" onClick={handleCommentSubmit}>發布</button>
//           </div>
//         </div>
//         <div className="comments-list">
//           {comments.map(({ id, text, time, likes }) => (
//             <div key={id} className="comment">
//               <div className="comment-header">
//                 <span className="commenter-id">ID: {id}</span>
//                 <span className="comment-time">{time}</span>
//               </div>
//               <p>{text}</p>
//               <div className="comment-actions">
//                 <button className="comment-like-button" onClick={() => likeComment(id)}>讚 {likes}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default ArticleDetail;



// import React, { useState, useEffect } from 'react';
// import { useNavigate,useParams } from 'react-router-dom';
// import '../css/DetailPage.css';
// import Banner from './Banner';
// 
// 
// function ArticleDetail() {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');
//   const { articleId } = useParams();
//   const [article, setArticle] = useState(null);
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([
//     { id: 1, text: '這是一個很好的房子！', time: '2024-05-25 12:00', likes: 2 },
//     { id: 2, text: '非常喜歡這個地點！', time: '2024-05-24 15:30', likes: 5 }
//   ]);
// 
//   const handleBack = () => navigate(-1);
//   const handleCommentSubmit = () => {
//     const newComment = {
//       id: comments.length + 1,
//       text: comment,
//       time: new Date().toISOString(),
//       likes: 0
//     };
//     setComments([...comments, newComment]);
//     setComment('');
//   };
// 
//   const likeComment = (id) => {
//     setComments(comments.map(comment =>
//       comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
//     ));
//   };
// 
//   return (
//     <div>
//       <div><Banner title="我的文章" /></div>
//       <div className="detail-page">
//         <div className="content">
//           <h1>{article.title}</h1>
//           <p>這是關於房屋的詳細介紹...</p>
//           <div className='action-buttons'>
//             <button className="like-button">按讚</button>
//             <button className="favorite-button">收藏</button>
//             <button className="contact-button">聯絡發文者</button>
//           </div>
//         </div>
//         <div className="comment-section">
//           <input
//             className='comment-input-text'
//             type="text"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="新增留言..."
//           />
//           <div className="comment-actions">
//             <button className="comment-submit-button" onClick={handleCommentSubmit}>發布</button>
//           </div>
//         </div>
//         <div className="comments-list">
//           {comments.map(({ id, text, time, likes }) => (
//             <div key={id} className="comment">
//               <div className="comment-header">
//                 <span className="commenter-id">ID: {id}</span>
//                 <span className="comment-time">{time}</span>
//               </div>
//               <p>{text}</p>
//               <div className="comment-actions">
//                 <button className="comment-like-button" onClick={() => likeComment(id)}>讚 {likes}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default ArticleDetail;

// 
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import '../css/DetailPage.css';
// import Banner from './Banner';
// 
// function ArticleDetail() {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([
//     { id: 1, text: '這是一個很好的房子！', time: '2024-05-25 12:00', likes: 2 },
//     { id: 2, text: '非常喜歡這個地點！', time: '2024-05-24 15:30', likes: 5 }
//   ]);
// 
//   useEffect(() => {
//     console.log(`Fetching article with ID: ${id}`); // 调试输出
//     fetch(`http://localhost:8081/articles/getArticle/${id}`)
//       .then(response => {
//         console.log('Response:', response); // 调试输出
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Data:', data); // 调试输出
//         setArticle(data);
//       })
//       .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//       });
//   }, [id]);
// 
//   const handleCommentSubmit = () => {
//     const newComment = {
//       id: comments.length + 1,
//       text: comment,
//       time: new Date().toISOString(),
//       likes: 0
//     };
//     setComments([...comments, newComment]);
//     setComment('');
//   };
// 
//   const likeComment = (id) => {
//     setComments(comments.map(comment =>
//       comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
//     ));
//   };
// 
//   if (!article) {
//     return <div>Loading...</div>;
//   }
// 
//   return (
//     <div>
//       <div><Banner title="文章詳情" /></div>
//       <div className="detail-page">
//         <div className="content">
//           <h1>{article.title}</h1>
//           <p>{article.description}</p>
//           <div className='action-buttons'>
//             <button className="like-button">按讚</button>
//             <button className="favorite-button">收藏</button>
//             <button className="contact-button">聯絡發文者</button>
//           </div>
//         </div>
//         <div className="comment-section">
//           <input
//             className='comment-input-text'
//             type="text"
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             placeholder="新增留言..."
//           />
//           <div className="comment-actions">
//             <button className="comment-submit-button" onClick={handleCommentSubmit}>發布</button>
//           </div>
//         </div>
//         <div className="comments-list">
//           {comments.map(({ id, text, time, likes }) => (
//             <div key={id} className="comment">
//               <div className="comment-header">
//                 <span className="commenter-id">ID: {id}</span>
//                 <span className="comment-time">{time}</span>
//               </div>
//               <p>{text}</p>
//               <div className="comment-actions">
//                 <button className="comment-like-button" onClick={() => likeComment(id)}>讚 {likes}</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
// 
// export default ArticleDetail;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/DetailPage.css';
import Banner from './Banner';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    console.log(`Fetching article with ID: ${id}`); // 调试输出
    fetch(`http://localhost:8081/articles/getArticle/${id}`)
      .then(response => {
        console.log('Response:', response); // 调试输出
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data:', data); // 调试输出
        setArticle(data);
        setComments(data.comments); // 假设后端返回的文章数据包含评论
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [id]);

  const handleCommentSubmit = () => {
    const newComment = {
      id: comments.length + 1,
      text: comment,
      time: new Date().toISOString(),
      likes: 0
    };
    setComments([...comments, newComment]);
    setComment('');
  };

  const likeComment = (commentId) => {
    setComments(comments.map(comment =>
      comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div><Banner title="文章詳情" /></div>
      <div className="detail-page">
        <div className="content">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className='action-buttons'>
            <button className="like-button">按讚</button>
            <button className="favorite-button">收藏</button>
            <button className="contact-button">聯絡發文者</button>
          </div>
        </div>
        <div className="comment-section">
          <input
            className='comment-input-text'
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="新增留言..."
          />
          <div className="comment-actions">
            <button className="comment-submit-button" onClick={handleCommentSubmit}>發布</button>
          </div>
        </div>
        <div className="comments-list">
          {comments.map(({ id, text, time, likes }) => (
            <div key={id} className="comment">
              <div className="comment-header">
                <span className="commenter-id">ID: {id}</span>
                <span className="comment-time">{time}</span>
              </div>
              <p>{text}</p>
              <div className="comment-actions">
                <button className="comment-like-button" onClick={() => likeComment(id)}>讚 {likes}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetail;
