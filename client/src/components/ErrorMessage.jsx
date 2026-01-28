const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div style={styles.container}>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    borderRadius: '4px',
    padding: '12px 16px',
    margin: '16px 0',
  },
  message: {
    color: '#c00',
    margin: 0,
  },
};

export default ErrorMessage;