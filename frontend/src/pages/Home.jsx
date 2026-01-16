import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h1>Welcome to NextGen Internet Banking</h1>
        <p>Manage your money securely and easily online.</p>

        <div className="flex-between" style={{ justifyContent: "center", marginTop: "20px" }}>
          <Link to="/login">
            <button className="btn-primary">Login</button>
          </Link>
          <Link to="/register">
            <button className="btn-secondary">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
