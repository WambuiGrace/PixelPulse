import BlogPost from '../components/BlogPost';

const dummyPosts = [
  {
    id: 1,
    title: 'The Future of Gaming: Cloud Streaming',
    summary: 'A look into how cloud gaming is changing the industry.',
    author: 'Jane Doe',
    timestamp: '2024-07-07T10:00:00Z',
    image: 'https://via.placeholder.com/400x200',
    categories: ['Gaming', 'Technology'],
  },
  {
    id: 2,
    title: 'Top 5 Indie Games of 2024',
    summary: 'Discover the hidden gems of the indie gaming scene.',
    author: 'John Smith',
    timestamp: '2024-07-06T14:30:00Z',
    image: 'https://via.placeholder.com/400x200',
    categories: ['Indie Games', 'Reviews'],
  },
];

const HomePage = () => {
  return (
    <div>
      <h2>Latest Posts</h2>
      <div className="blog-posts-container">
        {dummyPosts.map((post) => (
          <BlogPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;