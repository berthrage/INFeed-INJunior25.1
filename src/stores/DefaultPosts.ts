import thaisPhoto from "../assets/images/thais.jpg";
import ricardoPhoto from "../assets/images/ricardo.jpg";
import felyppePhoto from "../assets/images/felyppe.jpg";
import mellanyPhoto from "../assets/images/mellany.jpg";
import jessyPhoto from "../assets/images/jessy.jpg";
import { PostProperties } from "../types/PostProperties";

export const defaultPosts: PostProperties[] = [
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
            likes: 7,
            liked: false,
        }]
    }
];