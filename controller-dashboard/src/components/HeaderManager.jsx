import React, { useState, useEffect } from "react";
import api from "../services/api";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Grid,
  IconButton,
  Snackbar,
  Alert
} from "@mui/material";
import { Delete, Edit, Save, Cancel } from "@mui/icons-material";

const HeaderBrandManager = () => {
  const [brand, setBrand] = useState(null);

  // Brand titles
  const [titles, setTitles] = useState({ titlePrimary: "", titleSecondary: "" });

  // Add new icon
  const [iconForm, setIconForm] = useState({ link: "", order: 0, file: null });

  // Edit icon mode
  const [editIconId, setEditIconId] = useState(null);
  const [editIconForm, setEditIconForm] = useState({ link: "", order: 0, file: null, preview: null });

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showMsg = (msg, severity = "success") =>
    setSnackbar({ open: true, message: msg, severity });

  // Fetch brand details (titles + icons)
  const fetchBrand = async () => {
    try {
      const res = await api.get("/header-brand");
      setBrand(res.data);
      setTitles({
        titlePrimary: res.data.titlePrimary,
        titleSecondary: res.data.titleSecondary
      });
    } catch (err) {
      console.error(err);
      showMsg("Failed to fetch header brand", "error");
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  // Save updated titles
  const updateTitles = async () => {
    try {
      const res = await api.put("/header-brand/titles", titles);
      setBrand(res.data);
      showMsg("Titles updated");
    } catch {
      showMsg("Failed to update titles", "error");
    }
  };

  // Upload new icon
  const uploadIcon = async () => {
    if (!iconForm.file || !iconForm.link) {
      return showMsg("Icon & link required", "error");
    }

    const formData = new FormData();
    formData.append("icon", iconForm.file);
    formData.append("link", iconForm.link);
    formData.append("order", iconForm.order);

    try {
      const res = await api.post("/header-brand/icons", formData);
      setBrand(res.data);
      setIconForm({ link: "", order: 0, file: null });
      showMsg("Icon added");
    } catch {
      showMsg("Upload failed", "error");
    }
  };

  // Start edit icon mode
  const startEditIcon = (icon) => {
    setEditIconId(icon._id);
    setEditIconForm({
      link: icon.link,
      order: icon.order || 0,
      file: null,
      preview: null
    });
  };

  const cancelEdit = () => {
    setEditIconId(null);
    setEditIconForm({ link: "", order: 0, file: null, preview: null });
  };

  // Save updated icon (including optional image replacement)
  const saveIconEdit = async (iconId) => {
    try {
      let formData;

      if (editIconForm.file) {
        // Replace image + update details
        formData = new FormData();
        formData.append("link", editIconForm.link);
        formData.append("order", editIconForm.order);
        formData.append("icon", editIconForm.file);

        const res = await api.put(`/header-brand/icons/${iconId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        setBrand(res.data);
      } else {
        // Only update link/order
        const res = await api.put(`/header-brand/icons/${iconId}`, {
          link: editIconForm.link,
          order: editIconForm.order
        });
        setBrand(res.data);
      }

      setEditIconId(null);
      showMsg("Icon updated");
    } catch (err) {
      console.error(err);
      showMsg("Update failed", "error");
    }
  };

  // Delete icon
  const deleteIcon = async (iconId) => {
    try {
      await api.delete(`/header-brand/icons/${iconId}`);
      fetchBrand();
      showMsg("Icon deleted");
    } catch {
      showMsg("Delete failed", "error");
    }
  };

  if (!brand) return <Typography>Loading...</Typography>;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Manage Header Branding
      </Typography>

      {/* Brand Titles */}
      <Box mb={3}>
        <Typography variant="h6">Brand Titles</Typography>
        <TextField
          label="Primary Title"
          fullWidth
          sx={{ mb: 2 }}
          value={titles.titlePrimary}
          onChange={(e) => setTitles({ ...titles, titlePrimary: e.target.value })}
        />
        <TextField
          label="Secondary Title"
          fullWidth
          sx={{ mb: 2 }}
          value={titles.titleSecondary}
          onChange={(e) => setTitles({ ...titles, titleSecondary: e.target.value })}
        />
        <Button variant="contained" onClick={updateTitles}>
          Save Titles
        </Button>
      </Box>

      {/* Add New Icon */}
      <Box mb={3}>
        <Typography variant="h6">Add New Icon</Typography>
        <TextField
          label="Icon Link (URL)"
          fullWidth
          sx={{ mb: 2 }}
          value={iconForm.link}
          onChange={(e) => setIconForm({ ...iconForm, link: e.target.value })}
        />
        <TextField
          label="Order (optional)"
          fullWidth
          type="number"
          sx={{ mb: 2 }}
          value={iconForm.order}
          onChange={(e) => setIconForm({ ...iconForm, order: e.target.value })}
        />
        <input
          type="file"
          onChange={(e) => setIconForm({ ...iconForm, file: e.target.files[0] })}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={uploadIcon}>
          Upload Icon
        </Button>
      </Box>

      {/* Existing Icons */}
      <Typography variant="h6" mb={2}>
        Existing Icons
      </Typography>
      <Grid container spacing={2}>
        {brand.icons
          .sort((a, b) => a.order - b.order)
          .map((icon) => {
            const isEditing = editIconId === icon._id;
            return (
              <Grid item xs={12} key={icon._id}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2 }}>
                  {/* Left: Icon image */}
                  <CardMedia
                    component="img"
                    sx={{ width: 80, height: 80, borderRadius: 1, mr: 2 }}
                    image={
                      isEditing && editIconForm.preview
                        ? editIconForm.preview
                        : icon.imageUrl
                    }
                  />

                  {/* Right: Content */}
                  <Box flex={1}>
                    {isEditing ? (
                      <>
                        <TextField
                          fullWidth
                          label="Icon Link"
                          sx={{ mb: 1 }}
                          value={editIconForm.link}
                          onChange={(e) =>
                            setEditIconForm({ ...editIconForm, link: e.target.value })
                          }
                        />
                        <TextField
                          fullWidth
                          label="Order"
                          type="number"
                          sx={{ mb: 1 }}
                          value={editIconForm.order}
                          onChange={(e) =>
                            setEditIconForm({ ...editIconForm, order: e.target.value })
                          }
                        />
                        {/* Replace Image */}
                        <input
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const previewURL = URL.createObjectURL(file);
                              setEditIconForm({
                                ...editIconForm,
                                file,
                                preview: previewURL
                              });
                            }
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="body2" noWrap>
                          <a href={icon.link} target="_blank" rel="noopener noreferrer">
                            {icon.link}
                          </a>
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Order: {icon.order}
                        </Typography>
                      </>
                    )}
                  </Box>

                  {/* Actions */}
                  <CardActions>
                    {isEditing ? (
                      <>
                        <IconButton onClick={() => saveIconEdit(icon._id)}>
                          <Save />
                        </IconButton>
                        <IconButton onClick={cancelEdit}>
                          <Cancel />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton onClick={() => startEditIcon(icon)}>
                        <Edit />
                      </IconButton>
                    )}
                    <IconButton color="error" onClick={() => deleteIcon(icon._id)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      {/* Snackbar */}
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

export default HeaderBrandManager;
