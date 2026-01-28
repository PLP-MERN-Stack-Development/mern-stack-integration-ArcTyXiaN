import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const CreateEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [categories, setCategories] = useState([]);
  
  const { get, post, put, loading, error } = useApi();
  const [formError, setFormError] = useState('');

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    fetchCategories();
    
    if (isEditMode) {
      fetchPost();
    }
  }, [id, user]);

  const fetchCategories = async () => {
    try {
      const data = await get('/categories');
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchPost = async () => {
    try {
      const data = await get(`/posts/${id}`);
      
      if (data.author._id !== user._id) {
        setFormError('You are not authorized to edit this post');
        return;
      }
      
      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category._id);
      setFeaturedImage(data.featuredImage || '');
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!category) {
      setFormError('Please select a category');
      return;
    }

    try {
      const postData = {
        title,
        content,
        category,
        featuredImage,
      };

      if (isEditMode) {
        await put(`/posts/${id}`, postData);
      } else {
        await post('/posts', postData);
      }

      navigate('/');
    } catch (err) {
      setFormError(err.message);
    }
  };

  if (loading && isEditMode && !title) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        {isEditMode ? 'Edit Post' : 'Create New Post'}
      </h1>

      {(error || formError) && <ErrorMessage message={error || formError} />}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="title" style={styles.label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="featuredImage" style={styles.label}>
            Featured Image URL (optional)
          </label>
          <input
            type="url"
            id="featuredImage"
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            style={styles.input}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="content" style={styles.label}>
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={styles.textarea}
            rows="15"
            required
          />
        </div>

        <div style={styles.actions}>
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '32px',
    color: '#333',
  },
  form: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '32px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#333',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
  },
  textarea: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  actions: {
    display: 'flex',
    gap: '12px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#fff',
    color: '#333',
    border: '1px solid #e0e0e0',
    padding: '12px 24px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default CreateEditPost;