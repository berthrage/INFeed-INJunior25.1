import { createContext } from "react";
import { PostProperties } from "../types/PostProperties"

export const PostCardContext = createContext<PostProperties | null>(null);