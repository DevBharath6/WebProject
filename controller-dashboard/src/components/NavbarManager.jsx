import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Switch,
  Paper,
  Grid,
  Stack,
  Divider,
  Chip,
  IconButton,
  Collapse,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import api from "../services/api";

const NavbarManager = () => {
  const [navItems, setNavItems] = useState([]);
  const [newItem, setNewItem] = useState({
    title: "",
    url: "",
    order: 0,
    visible: true
  });
  const [childInputs, setChildInputs] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [editDialog, setEditDialog] = useState({ open: false, item: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, item: null });

  const showNotification = useCallback((message, severity = "success") => {
    setNotification({ open: true, message, severity });
  }, []);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/navbar");
      setNavItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load navbar items", err);
      showNotification("Failed to load navbar items", "error");
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const toggleVisibility = async (item) => {
    try {
      setLoading(true);
      await api.patch(`/navbar/${item._id}`, {
        visible: !item.visible
      });
      fetchItems();
      showNotification(`Item "${item.title}" visibility updated`);
    } catch (err) {
      console.error("Visibility toggle failed", err);
      showNotification("Visibility toggle failed", "error");
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newItem.title.trim() || !newItem.url.trim()) {
      showNotification("Title & URL are required", "error");
      return;
    }

    try {
      setLoading(true);
      await api.post("/navbar", newItem);
      fetchItems();
      setNewItem({ title: "", url: "", order: 0, visible: true });
      showNotification("New navigation item added successfully");
    } catch (err) {
      console.error("Add failed", err);
      showNotification("Failed to add new item", "error");
      setLoading(false);
    }
  };

  // Edit main navbar item
  const openEditDialog = (item) => {
    setEditDialog({
      open: true,
      item: { ...item }
    });
  };

  const handleEditDialogChange = (field, value) => {
    setEditDialog(prev => ({
      ...prev,
      item: {
        ...prev.item,
        [field]: field === 'order' ? parseInt(value) || 0 : value
      }
    }));
  };

  const saveEditedItem = async () => {
    try {
      setLoading(true);
      await api.patch(`/navbar/${editDialog.item._id}`, {
        title: editDialog.item.title,
        url: editDialog.item.url,
        order: editDialog.item.order,
        visible: editDialog.item.visible
      });
      fetchItems();
      setEditDialog({ open: false, item: null });
      showNotification("Navigation item updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      showNotification("Failed to update item", "error");
      setLoading(false);
    }
  };

  // Delete main navbar item
  const openDeleteDialog = (item) => {
    setDeleteDialog({
      open: true,
      item
    });
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/navbar/${deleteDialog.item._id}`);
      fetchItems();
      setDeleteDialog({ open: false, item: null });
      showNotification("Navigation item deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      showNotification("Failed to delete item", "error");
      setLoading(false);
    }
  };

  const handleChildInputChange = (parentId, field, value) => {
    setChildInputs(prev => ({
      ...prev,
      [parentId]: {
        ...prev[parentId],
        [field]: value
      }
    }));
  };

  const addChild = async (parentId) => {
    const input = childInputs[parentId];
    if (!input || !input.title?.trim() || !input.url?.trim()) {
      showNotification("Child title & URL required", "error");
      return;
    }

    try {
      setLoading(true);
      await api.post(`/navbar/${parentId}/children`, {
        title: input.title.trim(),
        url: input.url.trim(),
        order: input.order ? parseInt(input.order) : 0,
        visible: input.visible !== undefined ? input.visible : true
      });
      setChildInputs(prev => ({ ...prev, [parentId]: {} }));
      fetchItems();
      showNotification("Child item added successfully");
    } catch (err) {
      console.error("Add child failed", err);
      showNotification("Failed to add child item", "error");
      setLoading(false);
    }
  };

  const editChild = async (parentId, child) => {
    const newTitle = prompt("New child title:", child.title);
    if (!newTitle || !newTitle.trim()) return;
    const newUrl = prompt("New child URL:", child.url);
    if (!newUrl || !newUrl.trim()) return;

    try {
      setLoading(true);
      await api.patch(`/navbar/${parentId}/children/${child._id}`, {
        title: newTitle.trim(),
        url: newUrl.trim()
      });
      fetchItems();
      showNotification("Child item updated successfully");
    } catch (err) {
      console.error("Edit child failed", err);
      showNotification("Failed to update child item", "error");
      setLoading(false);
    }
  };

  const deleteChild = async (parentId, childId) => {
    if (!window.confirm("Delete this child item?")) return;

    try {
      setLoading(true);
      await api.delete(`/navbar/${parentId}/children/${childId}`);
      fetchItems();
      showNotification("Child item deleted successfully");
    } catch (err) {
      console.error("Delete child failed", err);
      showNotification("Failed to delete child item", "error");
      setLoading(false);
    }
  };

  const toggleChildVisibility = async (parentId, childId, currentVisibility) => {
    try {
      setLoading(true);
      await api.patch(`/navbar/${parentId}/children/${childId}`, {
        visible: !currentVisibility
      });
      fetchItems();
      showNotification("Child item visibility updated");
    } catch (err) {
      console.error("Toggle child visibility failed", err);
      showNotification("Failed to update child visibility", "error");
      setLoading(false);
    }
  };

  const toggleExpand = (itemId) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <Box p={3}>
      <Box mb={3}>
        <Typography variant="h4">
          Navbar Manager
        </Typography>
      </Box>

      {/* Add new parent nav item */}
      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add New Navigation Item
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Title"
              value={newItem.title}
              onChange={e => setNewItem({ ...newItem, title: e.target.value })}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="URL"
              value={newItem.url}
              onChange={e => setNewItem({ ...newItem, url: e.target.value })}
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField
              fullWidth
              label="Order"
              type="number"
              value={newItem.order}
              onChange={e => setNewItem({ ...newItem, order: parseInt(e.target.value) || 0 })}
              size="small"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <Button 
              fullWidth
              variant="contained" 
              onClick={handleAdd}
              disabled={loading}
              startIcon={<AddIcon />}
            >
              Add Item
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Existing nav items */}
      <Typography variant="h6" gutterBottom>
        Navigation Items
      </Typography>
      <Grid container spacing={2}>
        {navItems.sort((a, b) => a.order - b.order).map(item => (
          <Grid item xs={12} md={6} key={item._id}>
            <Card 
              elevation={2} 
              sx={{ 
                borderRadius: 2,
                transition: 'all 0.2s',
                border: item.visible ? 'none' : '1px dashed #ccc',
                opacity: item.visible ? 1 : 0.7
              }}
            >
              <CardHeader
                title={
                  <Box display="flex" alignItems="center" flexWrap="wrap">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Stack direction="row" spacing={1} ml={1}>
                      <Chip 
                        label={`Order: ${item.order}`} 
                        size="small"
                        variant="outlined"
                      />
                      {item.children && item.children.length > 0 && (
                        <Chip 
                          label={`Drop: ${item.children.length}`} 
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Box>
                }
                subheader={item.url}
                action={
                  <Box>
                    <Tooltip title={item.visible ? "Hide Item" : "Show Item"}>
                      <IconButton onClick={() => toggleVisibility(item)} size="small">
                        {item.visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Item">
                      <IconButton onClick={() => openEditDialog(item)} size="small">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Item">
                      <IconButton onClick={() => openDeleteDialog(item)} color="error" size="small">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={expandedItems[item._id] ? "Collapse" : "Expand"}>
                      <IconButton onClick={() => toggleExpand(item._id)} size="small">
                        {expandedItems[item._id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
              />

              <Collapse in={expandedItems[item._id]} timeout="auto">
                <CardContent sx={{ pt: 0 }}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Dropdown Items
                  </Typography>
                  
                  {item.children && item.children.length > 0 ? (
                    <Box mb={2}>
                      {item.children
                        .sort((a, b) => a.order - b.order)
                        .map(child => (
                          <Paper 
                            key={child._id} 
                            variant="outlined" 
                            sx={{ 
                              p: 1, 
                              mb: 1, 
                              display: 'flex', 
                              alignItems: 'center',
                              opacity: child.visible ? 1 : 0.6,
                              textDecoration: child.visible ? 'none' : 'line-through'
                            }}
                          >
                            <Box flexGrow={1}>
                              <Typography variant="body2" fontWeight="medium">
                                {child.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {child.url} (Order: {child.order})
                              </Typography>
                            </Box>
                            <Tooltip title={child.visible ? "Hide" : "Show"}>
                              <IconButton 
                                size="small" 
                                onClick={() => toggleChildVisibility(item._id, child._id, child.visible)}
                              >
                                {child.visible ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton 
                                size="small" 
                                onClick={() => editChild(item._id, child)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton 
                                size="small" 
                                color="error" 
                                onClick={() => deleteChild(item._id, child._id)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Paper>
                        ))}
                    </Box>
                  ) : (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      No dropdown items added yet
                    </Alert>
                  )}

                  {/* Add new child */}
                  <Typography variant="subtitle2" gutterBottom>
                    Add Dropdown Item
                  </Typography>
                  <Grid container spacing={1} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Title"
                        size="small"
                        value={childInputs[item._id]?.title || ""}
                        onChange={e => handleChildInputChange(item._id, "title", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="URL"
                        size="small"
                        value={childInputs[item._id]?.url || ""}
                        onChange={e => handleChildInputChange(item._id, "url", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <TextField
                        fullWidth
                        label="Order"
                        type="number"
                        size="small"
                        value={childInputs[item._id]?.order || ""}
                        onChange={e => handleChildInputChange(item._id, "order", e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => addChild(item._id)}
                        disabled={loading}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>

      {navItems.length === 0 && !loading && (
        <Alert severity="info" sx={{ mt: 2 }}>
          No navigation items found. Add your first item above.
        </Alert>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, item: null })}>
        <DialogTitle>Edit Navigation Item</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Update the details for this navigation item.
          </DialogContentText>
          {editDialog.item && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={editDialog.item.title}
                  onChange={(e) => handleEditDialogChange('title', e.target.value)}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL"
                  value={editDialog.item.url}
                  onChange={(e) => handleEditDialogChange('url', e.target.value)}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Order"
                  type="number"
                  value={editDialog.item.order}
                  onChange={(e) => handleEditDialogChange('order', e.target.value)}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" height="100%">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={editDialog.item.visible}
                        onChange={(e) => handleEditDialogChange('visible', e.target.checked)}
                      />
                    }
                    label="Visible"
                  />
                </Box>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, item: null })}>Cancel</Button>
          <Button onClick={saveEditedItem} variant="contained" disabled={loading}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, item: null })}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{deleteDialog.item?.title}"? This will also remove all dropdown items under it.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, item: null })}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained" disabled={loading}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={4000}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(prev => ({ ...prev, open: false }))} 
          severity={notification.severity}
          variant="filled"
          elevation={6}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default NavbarManager;