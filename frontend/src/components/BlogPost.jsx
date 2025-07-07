const BlogPost = ({ post }) => {
  const {
    image,
    title,
    summary,
    author,
    timestamp,
    categories,
  } = post;

  return (
    <div className="blog-post">
      <img src={image} alt={title} className="blog-post-image" />
      <div className="blog-post-content">
        <h2 className="blog-post-title">{title}</h2>
        <p className="blog-post-summary">{summary}</p>
        <div className="blog-post-meta">
          <span>By {author}</span>
          <span>{new Date(timestamp).toLocaleDateString()}</span>
        </div>
        <div className="blog-post-actions">
          <button>👍 Like</button>
          <button>💬 Comment</button>
          <button>🔖 Save</button>
        </div>
        <div className="blog-post-categories">
          {categories.map((category) => (
            <span key={category} className="category-tag">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPost;