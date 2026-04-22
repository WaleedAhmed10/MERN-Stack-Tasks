import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const API = 'http://localhost:5000/api/products';

export default function App() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📦 Product Manager (MERN)</h1>
      <ProductForm
        onSave={fetchProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductList
          products={products}
          onDelete={fetchProducts}
          onEdit={setEditProduct}
        />
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  }
};