import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from './api';
import { Link } from 'react-router-dom';
import { Container, Typography, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Error deleting user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>Lista de Usuarios</Typography>
      <TextField
        label="Buscar por nombre o email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        margin="normal"
      />
      <List>
        {filteredUsers.map(user => (
          <ListItem key={user._id}>
            <ListItemText
              primary={user.nombre}
              secondary={`Email: ${user.email} - Rol: ${user.rol}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" component={Link} to={`/edit-user/${user._id}`}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDelete(user._id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default UsersList;

