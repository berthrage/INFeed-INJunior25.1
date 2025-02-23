import PostCard from "../PostCard"
import styles from "./styles.module.css"
import berthPhoto from "../../assets/images/berth.jpg"
import thaisPhoto from "../../assets/images/thais.jpg"
import ricardoPhoto from "../../assets/images/ricardo.jpg"
import felyppePhoto from "../../assets/images/felyppe.jpg"
import mellanyPhoto from "../../assets/images/mellany.jpg"
import jessyPhoto from "../../assets/images/jessy.jpg"
import { useState } from "react"
import { CommentProperties } from "../../types/CommentProperties"
import { PostProperties } from "../../types/PostProperties"

export default function Feed() {
    const [posts, setPosts] = useState([
        {
            id: '0',
            author: 'Thaís Gomes',
            authorRole: 'Designer',
            authorPhoto: thaisPhoto,
            content: `Lorem ipsum

dolor sit amet. Ex laboriosam dolorem non tempore earum et voluptatem suscipit ut cupiditate nisi est odit voluptates. Nam magni amet ut ipsam molestiae aut facilis minus et quia reiciendis sed excepturi rerum ex consequatur minima! Ex rerum sunt et incidunt officia et veritatis deserunt. Sit soluta laboriosam et incidunt sequi et eius fugiat est temporibus similique rem illum natus sit unde eveniet. 

Non quos omnis ut autem labore nam vero consequatur est porro similique ad adipisci quisquam!`,
            timestamp: "2024-02-22T12:00:00Z",
            comments: [
                {
                    id: '0',
                    author: 'Felyppe Nunes',
                    authorPhoto: felyppePhoto,
                    content: 'Est aspernatur quis eos natus dicta et internos',
                    timestamp: '2025-01-22T12:00:00Z',
                    likes: 7,
                    liked: false,
                },
                {
                    id: '1',
                    author: 'Mellany Carter',
                    authorPhoto: mellanyPhoto,
                    content: 'Est aspernatur quis eos natus dicta et internos',
                    timestamp: '2025-01-22T12:00:00Z',
                    likes: 6,
                    liked: true,
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
            comments: [{
                id: '0',
                author: 'Jessy Logan',
                authorPhoto: jessyPhoto,
                content: 'Est aspernatur quis eos natus dicta et internos',
                timestamp: '2024-11-22T12:00:00Z',
                likes: 6,
                liked: true,
            }]
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

    const handleGiveCommentLike = (postId: string, commentId: string) => {
        setPosts((prevPosts) => {
            let updatedPosts: PostProperties[] = [];

            for (const post of prevPosts) {
                if (post.id === postId) {
                    let updatedComments = [];

                    for (const comment of post.comments) {
                        if (comment.id === commentId) {
                            comment.likes += 1;
                            comment.liked = true;
                        } 
                        
                        updatedComments.push(comment);
                    }
                    post.comments = updatedComments;
                } 
                
                updatedPosts.push(post);
            }

            return updatedPosts;
        })
    }

    function handleUndoCommentLike(postId: string, commentId: string): void {
        setPosts((prevPosts) => {
            let updatedPosts: PostProperties[] = [];

            for (const post of prevPosts) {
                if (post.id === postId) {
                    let updatedComments: CommentProperties[] = [];

                    for (const comment of post.comments) {
                        if (comment.id === commentId) {
                            comment.likes -= 1;
                            comment.liked = false;
                        } 
                        
                        updatedComments.push(comment);
                    }
                    post.comments = updatedComments;
                } 
                
                updatedPosts.push(post);
            }

            return updatedPosts;
        })
    }
    

    function handleNewComment(postId: string, newContent: string, newTimestamp: string): void {
        setPosts((prevPosts) => {
            let updatedPosts: PostProperties[] = [];

            for (const post of prevPosts) {
                if (post.id === postId) {
                    const newComment: CommentProperties = {
                        id: `${post.comments.length + 1}`, 
                        author: 'Leandro Berth',
                        authorPhoto: berthPhoto,
                        content: newContent,
                        timestamp: newTimestamp,
                        likes: 0, 
                        liked: false,
                    };
                    
                    post.comments.unshift(newComment);
                }
                
                updatedPosts.push(post);
            }

            return updatedPosts;
        })
    }

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
                        onGiveCommentLike={handleGiveCommentLike}
                        onUndoCommentLike={handleUndoCommentLike}
                        onNewComment={handleNewComment}
                    />
                ))}
            </div>
        </>
    )
}