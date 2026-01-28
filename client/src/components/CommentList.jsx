import useAuth from '../hooks/useAuth';

const CommentList = ({ comments, onDelete }) => {
  const { user } = useAuth();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (comments.length === 0) {
    return <p style={styles.noComments}>No comments yet. Be the first to comment!</p>;
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Comments ({comments.length})</h3>
      
      {comments.map((comment) => (
        <div key={comment._id} style={styles.comment}>
          <div style={styles.header}>
            <div>
              <strong>{comment.author?.name}</strong>
              <span style={styles.date}> · {formatDate(comment.createdAt)}</span>
            </div>
            
            {user && user._id === comment.author?._id && (
              <button
                onClick={() => onDelete(comment._id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            )}
          </div>
          
          <p style={styles.content}>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    marginTop: '40px',
  },
  heading: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#333',
  },
  noComments: {
    color: '#999',
    fontStyle: 'italic',
  },
  comment: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    padding: '16px',
    marginBottom: '12px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  date: {
    color: '#999',
    fontSize: '14px',
  },
  content: {
    color: '#333',
    lineHeight: '1.6',
    margin: 0,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#c00',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '4px 8px',
  },
};

export default CommentList;