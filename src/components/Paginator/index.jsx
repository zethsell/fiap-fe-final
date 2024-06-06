import {Link} from "react-router-dom";
import {useQuery} from "../../utils";
import {useEffect} from "react";

function Paginator({total = 0, perPage = 2, page}) {
    let query = useQuery();
    let content
    let currentPage = 1

    if (total > 0) {

        const previousUrl = () => `/posts?page=${Number.parseInt(query.get('page')) - 1}`
        const nextUrl = () => `/posts?page=${Number.parseInt(query.get('page')) + 1}`

        const length = total % perPage === 0
            ? Math.round(total / perPage)
            : Math.round(total / perPage) + 1

        const pages = Array.from({length}, (_, i) => i + 1)
        currentPage = parseInt(query.get('page') < 1 ? 1 : query.get('page') > pages.at(-1) ? pages.at(-1) : query.get('page'))
        const previousClasses = () => pages.at(0) === currentPage ? "page-link disabled" : "page-link"
        const nextClasses = () => pages.at(-1) === currentPage ? "page-link disabled" : "page-link"
        const itemClasses = (item) => item === currentPage ? "page-link active" : "page-link"

        content = <nav aria-label="Page navigation example"
                       className="flex-row d-flex justify-content-center gap-5">
            <ul className="pagination justify-content-center">
                <li className="page-item">
                    <Link className={previousClasses()} to={previousUrl()}>Anterior</Link>
                </li>
                {
                    pages.map((pageItem, index) => (
                        <li className="page-item" key={index}>
                            <Link to={`/posts?page=${pageItem}`}
                                  className={itemClasses(pageItem)}>
                                {pageItem}
                            </Link>
                        </li>
                    ))
                }
                <li className="page-item">
                    <Link className={nextClasses()} to={nextUrl()}>Próximo</Link>
                </li>
            </ul>
        </nav>
        
    }

    useEffect(() => {
        page(currentPage)
    }, [currentPage]);


    return (<>{content}</>)
}

export default Paginator;