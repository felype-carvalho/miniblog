import styles from './CreatePost.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    const {insertDocument, response} = useInsertDocument("posts");

    const {user} = useAuthValue();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        //validade img URL

        //create tag array

        //check all values

        insertDocument({
            title,
            image,
            body,
            tags,
            uid: user.uid,
            createBy: user.displayName,
        });

        // redirect to home page
    };


    return (
        <div className={styles.create_post}>
            <h2>Create Post</h2>
            <p>Write about whatever you like and share your knowledge!</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Title:</span>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Think a good title..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Image URL:</span>
                    <input
                        type="text"
                        name="image"
                        required
                        placeholder="Insert an image that represents your post..."
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <label>
                    <span>Content:</span>
                    <textarea
                        name="body"
                        required
                        placeholder="Insert post content..."
                        onChange={(e) => setBody(e.target.value)}
                        value={body}
                    ></textarea>
                </label>
                <label>
                    <span>Tags:</span>
                    <input
                        type="text"
                        name="tags"
                        required
                        placeholder="Enter tags separated by a comma"
                        onChange={(e) => setTags(e.target.value)}
                        value={tags}
                    />
                </label>
                {!response.loading && <button className="btn">Create Post</button>}
                {response.loading && <button className="btn" disabled>Loading...</button>}
                {response.error && <p className="error">{response.error}</p>}
            </form>
        </div>
    )
}

export default CreatePost