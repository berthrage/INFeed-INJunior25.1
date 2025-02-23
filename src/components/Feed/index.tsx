import PostCard from "../PostCard"
import styles from "./styles.module.css"
import berthPhoto from "../../assets/images/berth.jpg"
import { useEffect, useState } from "react"
import { CommentProperties } from "../../types/CommentProperties"
import { PostProperties } from "../../types/PostProperties"
import { defaultPosts } from "../../stores/DefaultPosts"

export default function Feed() {
    const localStorageKey = "feedPosts";

    // Load posts from localStorage (from already saved key) or use default posts (creating the key)
    const [posts, setPosts] = useState<PostProperties[]>(() => {
        const savedPosts = localStorage.getItem(localStorageKey);
        return savedPosts ? JSON.parse(savedPosts) : defaultPosts;
    });

    // Store posts in localStorage whenever posts update
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(posts));
    }, [posts]);

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