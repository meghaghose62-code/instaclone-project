import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./CreatePost.css"

const CreatePost = () => {

    const navigate = useNavigate()
    const [imageName, setImageName] = useState("Choose an image")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        //axios.post("http://localhost:3000/create-post", formData)
        axios.post(`${import.meta.env.VITE_API_URL}/create-post`, formData)
            .then((res) => { navigate("/feed") })
            .catch((err) => {
                console.log(err)
                alert("Error creating post")
            })
    }

    return (
        <section className="create-post-section">
            <div className="create-post-card">

                <div className="create-post-header">
                    <div className="instagram-logo">📷</div>
                    <h1>New Post</h1>
                    <p>Share your moment with the world</p>
                </div>

                <form onSubmit={handleSubmit} className="create-post-form">

                    <label className="file-input-label">
                        <span className="file-icon">🖼️</span>
                        <span>{imageName}</span>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setImageName(e.target.files[0]?.name || "Choose an image")}
                        />
                    </label>

                    <input
                        type="text"
                        name="caption"
                        placeholder="Write a caption..."
                        required
                        className="caption-input"
                    />

                    <button type="submit" className="submit-btn">
                        Share Post
                    </button>

                    <button type="button" className="feed-btn" onClick={() => navigate("/feed")}>
                        Back to Feed
                    </button>

                </form>
            </div>
        </section>
    )
}

export default CreatePost