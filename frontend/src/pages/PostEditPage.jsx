import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const PostEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImage(data.image);
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ title, content, image }),
      });
      if (res.ok) {
        navigate('/admin/dashboard/posts');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link to="/admin/dashboard/posts" className="btn btn-light my-3">
        Go Back
      </Link>
      <h1 className="text-4xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Content</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            placeholder="Enter image URL"
            className="input input-bordered"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default PostEditPage;