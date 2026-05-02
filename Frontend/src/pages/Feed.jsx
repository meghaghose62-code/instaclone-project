import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./Feed.css"

const Feed = () => {

    const navigate = useNavigate()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        //axios.get("http://localhost:3000/posts")
        axios.get(`${import.meta.env.VITE_API_URL}/posts`)
        .then((res) => {
            setPosts(res.data.posts)
        })
    }, [])

    return (
        <section className="feed-section">

            <div className="feed-navbar">
                <button className="create-btn" onClick={() => navigate("/create-post")}>
                 + Create Post
                </button>
            </div>

            <div className="feed-content">
                {
                    posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post._id} className="post-card">
                                <img src={post.image} alt={post.caption} className="post-image" />
                                <div className="post-footer">
                                    <p className="post-caption">{post.caption}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-posts">
                            <p>🏔️</p>
                            <h3>No posts yet</h3>
                            <p>Share your first moment!</p>
                            <button onClick={() => navigate("/create-post")} className="first-post-btn">
                                Create First Post
                            </button>
                        </div>
                    )
                }
            </div>

        </section>
    )
}

export default Feed