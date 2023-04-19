//CSS
import styles from "./Home.module.css";

//hooks
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

// components

const Home = () => {
    const [query, setQuery] = useState("second");
    const [posts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.home}>
            <h1>Most recent post</h1>
            <form onSubmit={handleSubmit} className={styles.search_form}>
                <input
                    type="text"
                    placeholder="Or search by tags..."
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className="btn btn-dark">Search</button>
            </form>
            <div>
                <h1>Post...</h1>
                {posts && posts.length === 0 && (
                    <div className={styles.noposts}>
                        <p>No posts found</p>
                        <Link to="/post/create" className="btn">Create first post</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home