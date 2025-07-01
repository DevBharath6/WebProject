import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import api from "../services/api";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "", severity: "success" });
  const [editId, setEditId] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const showNotification = useCallback((message, severity = "success") => {
    setNotification({ open: true, message, severity });
  }, []);

  const fetchAnnouncements = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get("/announcements");
      setAnnouncements(res.data);
    } catch (err) {
      console.error("Failed to fetch announcements", err);
      showNotification("Failed to fetch announcements", "error");
    } finally {
      setLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const handleAdd = async () => {
    if (!message.trim()) {
      showNotification("Message cannot be empty", "error");
      return;
    }

    try {
      const res = await api.post("/announcements", { message });
      setAnnouncements([res.data, ...announcements]);
      setMessage("");
      showNotification("Announcement added");
    } catch (err) {
      console.error("Add failed", err);
      showNotification("Failed to add announcement", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/announcements/${id}`);
      setAnnouncements(announcements.filter((a) => a._id !== id));
      showNotification("Deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      showNotification("Failed to delete", "error");
    }
  };

  const startEditing = (item) => {
    setEditId(item._id);
    setEditMessage(item.message);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditMessage("");
  };

  const saveEdit = async (id) => {
    if (!editMessage.trim()) {
      showNotification("Edited message cannot be empty", "error");
      return;
    }

    try {
      const res = await api.patch(`/announcements/${id}`, { message: editMessage });
      setAnnouncements(
        announcements.map((a) => (a._id === id ? res.data : a))
      );
      showNotification("Updated successfully");
      cancelEditing();
    } catch (err) {
      console.error("Edit failed", err);
      showNotification("Failed to update announcement", "error");
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" mb={3}>Manage Announcements</Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          label="New Announcement"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {announcements.map((item) => (
            <Paper key={item._id} sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {editId === item._id ? (
                <>
                  <TextField
                    fullWidth
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    size="small"
                    variant="outlined"
                  />
                  <Stack direction="row" spacing={1} ml={2}>
                    <IconButton color="success" onClick={() => saveEdit(item._id)}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton color="warning" onClick={cancelEditing}>
                      <CloseIcon />
                    </IconButton>
                  </Stack>
                </>
              ) : (
                <>
                  <Typography>{item.message}</Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton color="primary" onClick={() => startEditing(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </>
              )}
            </Paper>
          ))}
          {announcements.length === 0 && <Typography>No announcements found.</Typography>}
        </Stack>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Announcements;
