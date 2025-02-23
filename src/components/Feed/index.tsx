import PostCard from "../PostCard"
import styles from "./styles.module.css"
import thaisPhoto from "../../assets/images/thais.jpg"
import ricardoPhoto from "../../assets/images/ricardo.jpg"

export default function Feed() {
    return (
        <>
            <div className={styles.feed}>
                <PostCard 
                    id='0' 
                    author='Thaís Gomes' 
                    authorRole='Designer'
                    authorPhoto={thaisPhoto}
                    content={`Lorem ipsum

dolor sit amet. Ex laboriosam dolorem non tempore earum et voluptatem suscipit ut cupiditate nisi est odit voluptates. Nam magni amet ut ipsam molestiae aut facilis minus et quia reiciendis sed excepturi rerum ex consequatur minima! Ex rerum sunt et incidunt officia et veritatis deserunt. Sit soluta laboriosam et incidunt sequi et eius fugiat est temporibus similique rem illum natus sit unde eveniet. 

Non quos omnis ut autem labore nam vero consequatur est porro similique ad adipisci quisquam!`}
                    timestamp="2024-02-22T12:00:00Z"
                         ></PostCard>
                <PostCard 
                    id='0' 
                    author='Ricardo Siqueira' 
                    authorRole='Dev Back-End'
                    authorPhoto={ricardoPhoto}
                    content={`Lorem ipsum

dolor sit amet. Ex laboriosam dolorem non tempore earum et voluptatem suscipit ut cupiditate nisi est odit voluptates. Nam magni amet ut ipsam molestiae aut facilis minus et quia reiciendis sed excepturi rerum ex consequatur minima! Ex rerum sunt et incidunt officia et veritatis deserunt. Sit soluta laboriosam et incidunt sequi et eius fugiat est temporibus similique rem illum natus sit unde eveniet. 

Non quos omnis ut autem labore nam vero consequatur est porro similique ad adipisci quisquam!`}
                    timestamp="2025-02-22T12:00:00Z"
                         ></PostCard>
            </div>
        </>
    )
}