import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/new" className="btn">
        Criar um novo Post
      </Link>
    </div>
  );
}

export default Home;
