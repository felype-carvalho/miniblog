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

    const { insertDocument, response } = useInsertDocument("posts");

    const navigate = useNavigate();

    const { user } = useAuthValue();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("")

        //validade img URL
        try {
            new URL(image)
        } catch (error) {
            setFormError("The image needs to be a URL.");
        }

        //create tag array
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        //check all values
        if (!title || !image || !tags || !body) {
            setFormError("Please fill in all fields!")
        }

        if (formError) return;

        insertDocument({
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createBy: user.displayName,
        });

        // redirect to home page
        navigate("/")
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
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}

export default CreatePost