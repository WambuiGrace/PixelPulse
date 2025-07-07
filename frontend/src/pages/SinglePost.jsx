import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (err) {
      setError('Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const likeHandler = async () => {
    try {
      const res = await fetch(`/api/posts/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (res.ok) {
        fetchPost();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveHandler = async () => {
    try {
      const res = await fetch(`/api/posts/${id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (res.ok) {
        fetchPost();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const commentHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/posts/${id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ text: comment }),
      });
      if (res.ok) {
        setComment('');
        fetchPost();
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

  if (!post) {
    return <div>Post not found</div>;
  }

  const { title, content, user, createdAt, image, likes, comments } = post;

  return (
    <div className="container mx-auto p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={image} alt={title} />
        </figure>
        <div className="card-body">
          <h1 className="card-title text-4xl">{title}</h1>
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{user?.name}</div>
            <div className="badge badge-outline">
              {new Date(createdAt).toLocaleDateString()}
            </div>
          </div>
          {userInfo && (
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={likeHandler}>
                Like ({likes.length})
              </button>
              <button className="btn btn-secondary" onClick={saveHandler}>
                Save
              </button>
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-2xl font-bold">Comments</h2>
            {comments.map((comment) => (
              <div key={comment._id} className="chat chat-start">
                <div className="chat-header">{comment.user.name}</div>
                <div className="chat-bubble">{comment.text}</div>
              </div>
            ))}
            {userInfo && (
              <form onSubmit={commentHandler} className="mt-4">
                <div className="form-control">
                  <textarea
                    className="textarea textarea-bordered"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-control mt-2">
                  <button className="btn btn-primary">Submit</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;