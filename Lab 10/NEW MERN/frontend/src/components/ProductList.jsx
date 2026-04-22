import axios from 'axios';

const API = 'http://localhost:5000/api/products';

export default function ProductList({ products, onDelete, onEdit }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await axios.delete(`${API}/${id}`);
      onDelete();
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      {products.length === 0 && <p>No products found.</p>}
      {products.map((p) => (
        <div key={p._id} style={styles.productCard}>
          <div style={styles.productInfo}>
            <strong style={styles.productName}>{p.name}</strong>
            <span style={styles.productPrice}>Rs. {p.price}</span>
          </div>
          <div style={styles.productDetails}>
            Category: {p.category} | Stock: {p.stock}
          </div>
          <div style={styles.buttonGroup}>
            <button onClick={() => onEdit(p)} style={styles.editButton}>
              Edit
            </button>
            <button onClick={() => handleDelete(p._id)} style={styles.deleteButton}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  productCard: {
    border: '1px solid #ddd',
    margin: '12px 0',
    padding: '12px',
    borderRadius: '6px',
    backgroundColor: 'white'
  },
  productInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  productName: {
    fontSize: '16px'
  },
  productPrice: {
    color: '#28a745',
    fontWeight: 'bold'
  },
  productDetails: {
    color: '#666',
    fontSize: '14px',
    marginBottom: '10px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: '#333',
    padding: '5px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '5px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};