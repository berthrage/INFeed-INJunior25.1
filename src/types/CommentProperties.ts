export interface CommentProperties {
    id: string;
    author: string;
    authorPhoto: string;
    content: string;
    timestamp: string; // ISO string (e.g., "2024-02-22T12:00:00Z")
    likes: number;
}