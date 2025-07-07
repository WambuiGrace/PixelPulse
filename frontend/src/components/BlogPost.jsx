import { Link } from 'react-router-dom';

const BlogPost = ({ post }) => {
  const {
    image,
    title,
    summary,
    user,
    createdAt,
    categories,
    _id,
  } = post;

  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{summary}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-outline">{user?.name}</div>
          <div className="badge badge-outline">
            {new Date(createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="card-actions justify-end">
          {categories?.map((category) => (
            <div key={category} className="badge badge-primary">
              {category}
            </div>
          ))}
        </div>
        <div className="card-actions justify-end">
          <Link to={`/blog/${_id}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;