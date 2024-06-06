import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import {contentfulClient} from "../utils/index.js";
import Paginator from "../components/Paginator/index.jsx";

function PostList() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tempPosts, setTempPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 3

    const getCategories = async () => {
        try {
            const response = await contentfulClient.getEntries({
                content_type: 'blogCategory5j',
            });

            setCategories(response.items);

        } catch (error) {
            console.log('Erro ao obter categorias', error);
            setCategories([]);
        }
    };

    const getPosts = async () => {
        try {
            // se a promise for resolvida, o resultado é capturado aqui
            const response = await contentfulClient.getEntries({
                content_type: 'blogPost5j',
                order: '-sys.createdAt',
            });

            setPosts(response.items);
            setTempPosts(response.items.slice(0, perPage));
            setCurrentPage(1)
        } catch (error) {
            // se a promise for rejeitada, o erro é capturado aqui
            console.error('Erro ao obter posts', error);
            setPosts([]);
            setTempPosts([]);
        }
    };

    const paginate = () => {
        let start = currentPage === 1 ? 0 : (currentPage * perPage) - perPage;
        let end = currentPage === 1 ? perPage : (start + perPage);
        setTempPosts(posts.slice(start, end))
    }

    const setPage = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        getCategories();
        getPosts();
    }, []); // useEffect -> onLoad do componente PostList

    useEffect(() => {
        paginate();
    }, [currentPage]); // useEffect -> onLoad do componente PostList

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="mb-3">
                            Todos os Posts
                        </h2>
                        {tempPosts?.map((item) => (
                            <Card
                                key={item.sys.id}
                                title={item.fields.blogPostTitle}
                                text={item.fields.blogPostDescription}
                                link={'/post/' + item.fields.blogPostSlug}
                            />
                        ))}

                        <Paginator total={posts.length} perPage={perPage} page={setPage}/>
                        <Link to="/" className="btn btn-primary mt-4">
                            Voltar para Home
                        </Link>
                    </main>

                    <aside className="col-md-4">
                        <h2>Categorias</h2>

                        <ul>
                            {categories.map((item) => <li key={item.sys.id}>{item.fields.blogCategoryTitle}</li>)}
                        </ul>
                    </aside>
                </div>
            </div>
        </Layout>
    );
}

export default PostList;