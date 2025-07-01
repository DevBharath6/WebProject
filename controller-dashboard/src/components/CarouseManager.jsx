import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
  Box, Typography, TextField, Button, Card, CardMedia,
  CardContent, CardActions, Grid, IconButton, Snackbar, Alert
} from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';

const CarouselManager = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', link: '', image: null });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', link: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchItems = async () => {
    const res = await api.get('/carousel');
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUpload = async () => {
    if (!form.image || !form.title) {
      return showMsg("Image & Title required", "error");
    }

    const formData = new FormData();
    formData.append('image', form.image);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('link', form.link);

    try {
      const res = await api.post('/carousel', formData);
      setItems([res.data, ...items]);
      setForm({ title: '', description: '', link: '', image: null });
      showMsg("Item added");
    } catch (err) {
      showMsg("Upload failed", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/carousel/${id}`);
      setItems(items.filter(item => item._id !== id));
      showMsg("Deleted successfully");
    } catch {
      showMsg("Delete failed", "error");
    }
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditForm({ title: item.title, description: item.description, link: item.link });
  };

  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/carousel/${id}`, editForm);
      setItems(items.map(item => item._id === id ? res.data : item));
      setEditId(null);
      showMsg("Updated successfully");
    } catch {
      showMsg("Update failed", "error");
    }
  };

  const showMsg = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Manage Carousel Items</Typography>

      <Box mb={3}>
        <TextField
          fullWidth label="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth label="Link (optional)"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpload}>Upload</Button>
      </Box>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} md={4} key={item._id}>
            <Card>
              <CardMedia component="img" height="160" image={item.imageUrl} />
              <CardContent>
                {editId === item._id ? (
                  <>
                    <TextField
                      fullWidth label="Title"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth label="Description"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      sx={{ mb: 1 }}
                    />
                    <TextField
                      fullWidth label="Link (optional)"
                      value={editForm.link}
                      onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                    />
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    {item.link && (
                      <Typography variant="body2" color="primary" sx={{ wordBreak: 'break-all' }}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
                      </Typography>
                    )}
                  </>
                )}
              </CardContent>
              <CardActions>
                {editId === item._id ? (
                  <IconButton onClick={() => saveEdit(item._id)}><Save /></IconButton>
                ) : (
                  <IconButton onClick={() => startEdit(item)}><Edit /></IconButton>
                )}
                <IconButton color="error" onClick={() => handleDelete(item._id)}><Delete /></IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default CarouselManager;