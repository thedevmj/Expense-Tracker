export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg glass-navbar">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Expense</a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="/Track_expense">
                Track Expense
              </a>
            </li>
             <li>
              <a className="nav-link active" href="/budget">Budget</a>
             </li>
            <li className="nav-item">
              <a className="nav-link active" href="/expense">
                Expense
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
