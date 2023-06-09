import styles from './EditPost.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tagsArray.join(", ");
            setTags(textTags);

        }
    }, [post])


    const { updateDocument, response } = useUpdateDocument("posts");

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

        const data = {
            title,
            image,
            body,
            tagsArray,
            uid: user.uid,
            createBy: user.displayName,
        };

        updateDocument(id, data);

        // redirect to dashboard page
        navigate("/dashboard");
    };


    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Edit Post: {post.title}</h2>
                    <p>Edit the post data as you wish.</p>
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
                        <p className={styles.preview_title}>Image Preview:</p>
                        <img className={styles.image_preview} src={post.image} alt={post.title}/>
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
                        {!response.loading && <button className="btn">Update Post</button>}
                        {response.loading && <button className="btn" disabled>Loading...</button>}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost