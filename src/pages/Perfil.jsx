import { useContext, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/pages/Perfil.css';

const Profile = () => {
  const { user, setUser, logout } = useContext(UserContext);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user.nombre);
  const [selectedPhoto, setSelectedPhoto] = useState(user.pikachuPhoto);

  const pikachuPhotos = [
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10080.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10081.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10083.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10085.png',
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10084.png',
  ];

  const navigate = useNavigate();

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleSaveName = () => {
    setUser((prevUser) => ({
      ...prevUser,
      nombre: newName,
    }));
    setEditingName(false);

    const storedClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const updatedClientes = storedClientes.map((cliente) =>
      cliente.email === user.email ? { ...cliente, nombre: newName } : cliente
    );
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  const handleCancelEdit = () => {
    setNewName(user.nombre);
    setEditingName(false);
  };

  const handleSelectPhoto = (newPhoto) => {
    setSelectedPhoto(newPhoto);
    setUser((prevUser) => ({
      ...prevUser,
      pikachuPhoto: newPhoto,
    }));

    const storedClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const updatedClientes = storedClientes.map((cliente) =>
      cliente.email === user.email ? { ...cliente, pikachuPhoto: newPhoto } : cliente
    );
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="profile-container">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Perfil de Usuario</h1>
          <div className="profile-section">
            <label className="label">Nombre: </label>
            {editingName ? (
              <div className="edit-name-container">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
                <div className="edit-buttons">
                  <button onClick={handleSaveName}>Guardar</button>
                  <button onClick={handleCancelEdit}>Cancelar</button>
                </div>
              </div>
            ) : (
              <div>
                <span>{user.nombre}</span>
                <button onClick={handleEditName}>Editar</button>
              </div>
            )}
          </div>
          <div className="profile-section">
            <label className="label">Correo Electrónico: </label>
            <div>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="profile-section">
            <label className="label">Foto de Perfil:</label>
            <div>
              <img
                src={selectedPhoto}
                alt="Pikachu"
                className="profile-image"
                onClick={handleSelectPhoto}
                title="Haz clic para seleccionar"
              />
            </div>
            <p>Elige la foto de perfil:</p>
            <div className="profile-photo-options">
              {pikachuPhotos.map((photo, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name="pikachuPhoto"
                    value={photo}
                    checked={selectedPhoto === photo}
                    onChange={() => handleSelectPhoto(photo)}
                  />
                  <img
                    src={photo}
                    alt={`Pikachu ${index + 1}`}
                    title="Haz clic para seleccionar"
                  />
                </label>
              ))}
            </div>
          </div>
          <button className="button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
