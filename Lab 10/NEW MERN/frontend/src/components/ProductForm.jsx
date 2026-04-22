import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api/products';

export default function ProductForm({ onSave, editProduct, setEditProduct }) {
  const [form, setForm] = useState(
    { name: '', price: '', category: '', stock: '' }
  );

  useEffect(() => {
    if (editProduct) setForm(editProduct);
  }, [editProduct]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await axios.put(`${API}/${editProduct._id}`, form);
      setEditProduct(null);
    } else {
      await axios.post(API, form);
    }
    setForm({ name: '', price: '', category: '', stock: '' });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
      <input
        name='name'
        placeholder='Name'
        value={form.name}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name='price'
        placeholder='Price'
        value={form.price}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name='category'
        placeholder='Category'
        value={form.category}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        name='stock'
        placeholder='Stock'
        value={form.stock}
        onChange={handleChange}
        style={styles.input}
      />
      <div style={styles.buttonGroup}>
        <button type='submit' style={styles.submitButton}>
          {editProduct ? 'Update' : 'Add'}
        </button>
        {editProduct && (
          <button type='button' onClick={() => setEditProduct(null)} style={styles.cancelButton}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

const styles = {
  form: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#f9f9f9'
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    boxSizing: 'border-box'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};