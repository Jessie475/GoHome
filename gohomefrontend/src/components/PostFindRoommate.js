import React, { useState } from 'react';
import '../css/PostPageStyles.css';
import Banner from './Banner';

function PostFindRoommate() {
    const [address, setAddress] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, content, address, image });
        // 提交到服務器

        // Clear all fields
        setTitle('');
        setAddress('');
        setContent('');
        setImage(null);
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
