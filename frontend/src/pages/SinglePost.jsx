import { useParams } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Blog Post Title</h2>
      <p>Post ID: {id}</p>
      {/* Single blog post content will be displayed here */}
    </div>
  );
};

export default SinglePost;