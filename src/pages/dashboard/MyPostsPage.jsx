import React, { useState, useEffect } from "react";
import Adds from "../../common/Add";
import SideNav from "../../common/SideNav";
import { apiPlain } from "../../services/models/plainModel";
import parse from "html-react-parser";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getMyPost = () => {
      const id = localStorage.getItem("SocialGramUserId");
      apiPlain.getSingle(`myposts/${id}`).then((response) => {
        setPosts(response.message);
      });
    };

    getMyPost();
  }, []);
  return (
    <React.Fragment>
      <div className="row">
        <SideNav />
        <div className="col-sm-6">
          <h1>My Post</h1>
          <hr />
          {posts?.length === 0 && <p>No Post yet !!</p>}
          <div style={{ flexDirection: "column-reverse" }} className="d-flex">
            {posts.map((post) => (
              <Post post={post} key={post.id} />
            ))}
          </div>
        </div>
        <Adds />
      </div>
    </React.Fragment>
  );
};

export default MyPosts;

const Post = ({ post }) => {
  return (
    <div key={post.id} className="container bg-dark mt-3 mb-3 p-3 post rounded">
      <h3 className="mb-3">{parse(post.title)}</h3>
      <div className="icon-container d-flex">
        <div className="icons">
          <i className="fas fa-thumbs-up pe-4"></i>
          <span>{post.likes}</span>
        </div>
        <div className="icons">
          <i className="fas fa-thumbs-down pe-4"></i>
          <span>{post.dislikes}</span>
        </div>
        <div className="icons hearts">
          <i className="fas fa-heart pe-4"></i>
          <span>{post.hearts}</span>
        </div>
      </div>

      {post.comments.map((comment) => (
        <div
          key={comment.id}
          className="container p-3 mb-2 shadow-lg rounded-lg"
        >
          {parse(comment.comments)}
        </div>
      ))}
    </div>
  );
};
