import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:8080/api/products';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    price: '', 
    stockQuantity: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity, 10)
      };

      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/${editingProduct.id}`, productData);
        setSuccess('Product updated successfully');
      } else {
        await axios.post(API_BASE_URL, productData);
        setSuccess('Product created successfully');
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', stockQuantity: '' });
      fetchProducts();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ 
      name: product.name, 
      description: product.description || '', 
      price: product.price, 
      stockQuantity: product.stockQuantity 
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        setSuccess('Product deleted successfully');
        fetchProducts();
        setTimeout(() => setSuccess(''), 3000);
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product');
        setTimeout(() => setError(''), 3000);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', stockQuantity: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <h2>Product Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add New Product
      </Button>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No products found</td>
            </tr>
          ) : (
            products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    onClick={() => handleEdit(product)} 
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? 'Edit Product' : 'Add New Product'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                placeholder="Enter product description"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                placeholder="Enter product price"
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity *</Form.Label>
              <Form.Control
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleInputChange}
                required
                min="0"
                step="1"
                placeholder="Enter stock quantity"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductManagement;