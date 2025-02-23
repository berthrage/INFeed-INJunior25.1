import PostCard from "../PostCard"
import styles from "./styles.module.css"
import thaisPhoto from "../../assets/images/thais.jpg"
import ricardoPhoto from "../../assets/images/ricardo.jpg"
import felyppePhoto from "../../assets/images/felyppe.jpg"
import mellanyPhoto from "../../assets/images/mellany.jpg"
import { useState } from "react"

export default function Feed() {
    const [posts, setPosts] = useState([
        {
            id: '0',
            author: 'Thaís Gomes',
            authorRole: 'Designer',
            authorPhoto: thaisPhoto,
            content: `Lorem ipsum dolor sit amet...`,
            timestamp: "2024-02-22T12:00:00Z",
            comments: [
                {
                    id: '0',
                    author: 'Felyppe Nunes',
                    authorPhoto: felyppePhoto,
                    content: 'Est aspernatur quis eos natus dicta et internos',
                    timestamp: '2025-01-22T12:00:00Z',
                    likes: 7
                },
                {
                    id: '1',
                    author: 'Mellany Carter',
                    authorPhoto: mellanyPhoto,
                    content: 'Est aspernatur quis eos natus dicta et internos',
                    timestamp: '2025-01-22T12:00:00Z',
                    likes: 6
                }
            ]
        },
        {
            id: '1',
            author: 'Ricardo Siqueira',
            authorRole: 'Dev Back-End',
            authorPhoto: ricardoPhoto,
            content: `Lorem ipsum dolor sit amet...`,
            timestamp: "2025-02-22T12:00:00Z",
            comments: []
        }
    ]);

    const handleDeleteComment = (postId: string, commentId: string) => {
        setPosts((prevPosts) => {
            let updatedPosts = [];
    
            for (const post of prevPosts) {
                if (post.id === postId) {
                    let updatedComments = post.comments.filter(comment => comment.id !== commentId);
                    updatedPosts.push({ ...post, comments: updatedComments });
                } else {
                    updatedPosts.push(post);
                }
            }
    
            return updatedPosts;
        });
    };

    return (
        <>
            <div className={styles.feed}>
                {posts.map(post => (
                    <PostCard 
                        key={post.id}
                        id={post.id}
                        author={post.author}
                        authorRole={post.authorRole}
                        authorPhoto={post.authorPhoto}
                        content={post.content}
                        timestamp={post.timestamp}
                        comments={post.comments}
                        onDeleteComment={handleDeleteComment} 
                    />
                ))}
            </div>
        </>
    )
}