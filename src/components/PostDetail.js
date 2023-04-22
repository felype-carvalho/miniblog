import styles from './PostDetail.module.css';

import { Link } from 'react-router-dom';

const PostDetail = ({ post }) => {
    return (
        <div className={styles.post_detail}>
            <img src={post.image} alt={post.title} className={styles.title}/>
            <h2>{post.title}</h2>
            <p className={styles.createby}>{post.createBy}</p>
            <div>
                {post.tagsArray.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))}
            </div>
            <Link className="btn btn-outline" to={`/posts/${post.id}`}>Read</Link>
        </div>
    )
}

export default PostDetail