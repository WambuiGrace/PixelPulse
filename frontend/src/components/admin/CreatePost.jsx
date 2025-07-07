import { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const createPostHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ title, content, image }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        setImage('');
        // Optionally, redirect or show a success message
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Create Post</h2>
      <form onSubmit={createPostHandler}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
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
            placeholder="Content"
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
            placeholder="Image URL"
            className="input input-bordered"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="form-control mt-2">
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;