import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  
  const { get, post: postRequest, del, loading, error } = useApi();
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const fetchPost = async () => {
    try {
      const data = await get(`/posts/${id}`);
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const fetchComments = async () => {
    try {
      const data = await get(`/posts/${id}/comments`);
      setComments(data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await del(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  const handleAddComment = async (content) => {
    setCommentLoading(true);
    
    const optimisticComment = {
      _id: `temp-${Date.now()}`,
      content,
      author: { _id: user._id, name: user.name },
      createdAt: new Date().toISOString(),
    };
    
    setComments([optimisticComment, ...comments]);
    
    try {
      const data = await postRequest(`/posts/${id}/comments`, { content });
      setComments([data, ...comments]);
    } catch (err) {
      setComments(comments);
      console.error('Error adding comment:', err);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const previousComments = [...comments];
      setComments(comments.filter((c) => c._id !== commentId));
      
      try {
        await del(`/comments/${commentId}`);
      } catch (err) {
        setComments(previousComments);
        console.error('Error deleting comment:', err);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading && !post) {
    return <Loader />;
  }

  if (error && !post) {
    return (
      <div style={styles.container}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div style={styles.container}>
      <article style={styles.article}>
        <div style={styles.category}>{post.category?.name}</div>
        
        <h1 style={styles.title}>{post.title}</h1>
        
        <div style={styles.meta}>
          <span>By {post.author?.name}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>

        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            style={styles.image}
          />
        )}

        <div style={styles.content}>{post.content}</div>

        {user && user._id === post.author?._id && (
          <div style={styles.actions}>
            <Link to={`/posts/edit/${post._id}`} style={styles.editButton}>
              Edit Post
            </Link>
            <button onClick={handleDeletePost} style={styles.deleteButton}>
              Delete Post
            </button>
          </div>
        )}
      </article>

      <div style={styles.commentsSection}>
        {user ? (
          <CommentForm onSubmit={handleAddComment} loading={commentLoading} />
        ) : (
          <p style={styles.loginPrompt}>
            <Link to="/login" style={styles.link}>Login</Link> to add a comment
          </p>
        )}

        <CommentList comments={comments} onDelete={handleDeleteComment} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px 20px',
  },
  article: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '40px',
  },
  category: {
    display: 'inline-block',
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '36px',
    margin: '0 0 16px 0',
    color: '#333',
  },
  meta: {
    display: 'flex',
    gap: '16px',
    fontSize: '14px',
    color: '#999',
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: '1px solid #e0e0e0',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '24px',
  },
  content: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  actions: {
    display: 'flex',
    gap: '12px',
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '1px solid #e0e0e0',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
  },
  deleteButton: {
    backgroundColor: '#c00',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  commentsSection: {
    marginTop: '40px',
  },
  loginPrompt: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  link: {
    color: '#28a745',
    textDecoration: 'none',
  },
};

export default PostDetails;
