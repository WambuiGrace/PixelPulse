import { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const createPostHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    
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
        setMessage({ type: 'success', text: 'Post created successfully! 🎉' });
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await res.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to create post' });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {message.text && (
        <div className={`alert mb-6 ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {message.type === 'success' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
          <span>{message.text}</span>
          <button 
            className="btn btn-sm btn-ghost"
            onClick={() => setMessage({ type: '', text: '' })}
          >
            ✕
          </button>
        </div>
      )}
      
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Create New Post
            </h2>
            <p className="text-base-content/70 text-lg">Share your thoughts with the world</p>
          </div>
          
          <form onSubmit={createPostHandler} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold flex items-center gap-2">
                  📝 Title
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter an engaging title for your post..."
                className="input input-bordered input-lg w-full focus:input-primary transition-all duration-300"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold flex items-center gap-2">
                  ✍️ Content
                </span>
              </label>
              <textarea
                className="textarea textarea-bordered textarea-lg h-40 w-full focus:textarea-primary transition-all duration-300 resize-none"
                placeholder="Write your content here... Share your insights, experiences, or stories."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <label className="label">
                <span className="label-text-alt">Tip: Use clear paragraphs to make your content more readable</span>
              </label>
            </div>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold flex items-center gap-2">
                  🖼️ Featured Image
                </span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                className="input input-bordered input-lg w-full focus:input-primary transition-all duration-300"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled={isSubmitting}
              />
              <label className="label">
                <span className="label-text-alt">Add a compelling image to make your post stand out</span>
              </label>
              {image && (
                <div className="mt-4">
                  <div className="text-sm font-medium mb-2">Preview:</div>
                  <div className="aspect-video w-full max-w-md mx-auto rounded-lg overflow-hidden border-2 border-base-300">
                    <img 
                      src={image} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="divider"></div>
            
            <div className="form-control">
              <button 
                type="submit"
                className={`btn btn-primary btn-lg w-full gap-2 hover:scale-[1.02] transition-all duration-300 ${isSubmitting ? 'loading' : ''}`}
                disabled={!title.trim() || !content.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Post...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Post
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;