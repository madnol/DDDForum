import postsData from '../public/posts.json'
import { PostsList, type Post } from "../components/postsList";
import { Layout } from "../components/layout";
import { PostsViewSwitcher } from '../components/postsViewSwitcher';

export const MainPage = () => {
    // We'll load posts and all of that here later.
    const { posts } = postsData;
    return (
        <Layout>
            <PostsViewSwitcher />
            <PostsList
                posts={posts as Post[]}
            />
        </Layout>
    );
};