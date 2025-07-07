import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchPost();
  }, [id]);

  if (loading) {
    return <span className="loading loading-spinner loading-lg"></span>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  const { title, content, author, timestamp, image } = post;

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
            <div className="badge badge-outline">{author.name}</div>
            <div className="badge badge-outline">
              {new Date(timestamp).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;