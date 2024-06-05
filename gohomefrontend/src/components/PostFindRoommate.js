import axios from 'axios';
import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../contexts/UserContext';
import '../css/PostPageStyles.css';
import Banner from './Banner';

function PostFindRoommate() {
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const { user } = useContext(UserContext);

    if (!user) {
        return <div>请先登录</div>;
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const uniqueFileName = uuidv4() + '.' + file.name.split('.').pop();
          const uniqueFile = new File([file], uniqueFileName, { type: file.type });
          setImage(uniqueFile);
        }
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('address', address);
        formData.append('description', content);
        formData.append('type', 'ROOMMATE_SEARCH'); // 默认类型为 ROOMMATE_SEARCH
        formData.append('userId', user.userId);
        if (image) {
            formData.append('image', image);
        }

        console.log('Form Data:', Array.from(formData.entries()));

        try {
            const response = await axios.post('http://localhost:8081/article/addArticle', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            alert('已成功上傳');  // 顯示成功訊息
        } catch (error) {
            console.error('Error submitting article:', error);
            alert('失敗，請重試');  // 顯示失敗訊息
        }

        // Clear all fields
        setTitle('');
        setAddress('');
        setContent('');
    };

    return (
        <div>
            <div><Banner title="尋找室友" /></div>
            <div className="post-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">標題</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">地址</label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">內容</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            className="form-textarea"
                        />
                    </div>
                    <label htmlFor="image-upload" className="addimg-label">新增圖片</label>
                    <div className="button-container">
                        <input
                            id="image-upload"
                            type="file"
                            onChange={e => setImage(e.target.files[0])}
                            className="form-control"
                        />
                        <button type="submit" className="submit-button">發佈</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PostFindRoommate;
