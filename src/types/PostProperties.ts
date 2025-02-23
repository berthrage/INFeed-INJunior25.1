import { CommentProperties } from "./CommentProperties";

export interface PostProperties {
    id: string;
    author: string;
    authorRole: string;
    authorPhoto: string;
    content: string;
    timestamp: string; // ISO string (e.g., "2024-02-22T12:00:00Z")
    comments: CommentProperties[];
}