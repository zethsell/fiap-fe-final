function Header({title = "My Blog"}) {
    return (
        <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">
                    {title}
                </span>
            </div>
        </nav>
    );
}

export default Header;