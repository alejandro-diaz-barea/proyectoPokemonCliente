import React, { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, setUser, pikachuPhotos, logout } = useContext(UserContext);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.nombre);
  const navigate = useNavigate();

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleSaveName = () => {
    setUser({ ...user, nombre: newName });
    setEditingName(false);

    const existingClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const updatedClientes = existingClientes.map((cliente) =>
      cliente.email === user.email ? { ...cliente, nombre: newName } : cliente
    );
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  const handleCancelEdit = () => {
    setNewName(user.nombre);
    setEditingName(false);
  };

  const handleSelectPhoto = (newPhoto) => {
    setUser({ ...user, pikachuPhoto: newPhoto });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Perfil de Usuario</h1>
      <div>
        <label>Nombre: </label>
        {editingName ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleSaveName}>Guardar</button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </>
        ) : (
          <>
            <span>{user.nombre}</span>
            <button onClick={handleEditName}>Editar</button>
          </>
        )}
      </div>
      <div>
        <label>Foto de Perfil:</label>
        <div>
          <img src={user.pikachuPhoto} alt="Pikachu" style={{ width: '100px', height: '100px' }} />
        </div>
        <div>
          {pikachuPhotos.map((photo, index) => (
            <label key={index}>
              <input
                type="radio"
                name="pikachuPhoto"
                value={photo}
                checked={user.pikachuPhoto === photo}
                onChange={() => handleSelectPhoto(photo)}
              />
              Opción {index + 1}
            </label>
          ))}
        </div>
      </div>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
