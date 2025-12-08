import "./NewPost.css";
import createBlog from "../axios/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const createPost = async (e) => {
    e.preventDefault();

    const post = { title, body, userId: 1 };

    await createBlog.post("/posts", {
      body: post,
    });

    navigate("/home");
  };

  return (
    <div className="new-post">
      <h2>Novo post:</h2>
      <form onSubmit={(e) => createPost(e)}>
        <div className="form-control">
          <label htmlFor="title">Titulo:</label>
          <input
            type="text"
            name="title"
            id="title"
            width="100"
            placeholder="Digite o titulo que deseja"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="body">Conteudo:</label>
          <textarea
            name="body"
            id="body"
            placeholder="Digite o conteúdo"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Criar Post" className="btn"></input>
      </form>
    </div>
  );
};

export default NewPost;
