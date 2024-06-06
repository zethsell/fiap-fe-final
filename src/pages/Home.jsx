import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import Card from "../components/Card";
import Layout from "../components/Layout";

import {contentfulClient} from "../utils/createContentfulClient";

function Home() {
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);

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
                limit: 5,
                order: '-sys.createdAt',
            });

            console.log(response.items);
            setPosts(response.items);
        } catch (error) {
            // se a promise for rejeitada, o erro é capturado aqui
            console.log('Erro ao obter posts', error);
            setPosts([]);
        }
    };

    useEffect(() => {
        getCategories();
        getPosts();
    }, []); // useEffect -> onLoad do componente Home

    return (
        <Layout>
            <div className="container my-4">
                <div className="row">
                    <main className="col-md-8">
                        <h2 className="mb-3">
                            Posts recentes
                        </h2>

                        {posts.map((item) => (
                            <Card
                                key={item.sys.id}
                                title={item.fields.blogPostTitle}
                                text={item.fields.blogPostDescription}
                                link={'/post/' + item.fields.blogPostSlug}
                            />
                        ))}

                        <Link to="/posts?page=1" className="btn btn-dark mt-4">
                            Ver todos os posts
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

export default Home;