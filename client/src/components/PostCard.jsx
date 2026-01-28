import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={styles.card}>
      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          style={styles.image}
        />
      )}
      
      <div style={styles.content}>
        <div style={styles.category}>{post.category?.name}</div>
        
        <Link to={`/posts/${post._id}`} style={styles.titleLink}>
          <h2 style={styles.title}>{post.title}</h2>
        </Link>
        
        <p style={styles.excerpt}>
          {post.content.substring(0, 150)}...
        </p>
        
        <div style={styles.meta}>
          <span>By {post.author?.name}</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '20px',
  },
  category: {
    display: 'inline-block',
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    marginBottom: '12px',
  },
  titleLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 12px 0',
    color: '#333',
  },
  excerpt: {
    color: '#666',
    lineHeight: '1.6',
    margin: '0 0 16px 0',
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    color: '#999',
  },
};

export default PostCard;