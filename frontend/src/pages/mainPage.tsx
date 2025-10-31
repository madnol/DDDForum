import { useCallback, useEffect, useState } from 'react';

import { api } from '../api';

import { Layout } from "../components/layout";
import { PostsList, type Post } from "../components/postsList";
import { PostsViewSwitcher } from '../components/postsViewSwitcher';
import { OverlaySpinner } from '../components/overlaySpinner';

export const MainPage = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false);

    const loadPost = useCallback(async () => {
        try {
            setLoading(true);

            const { data } = await api.posts.getPosts()
            setPosts(data.data.postWithVotes)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        loadPost()
    }, [])

    return (
        <Layout>
            <PostsViewSwitcher />
            {loading ? (
                <OverlaySpinner isActive={loading} />
            ) : (<PostsList
                posts={posts as Post[]}
            />)}
        </Layout>
    );
};