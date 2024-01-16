import { useContext, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import '../assets/css/pages/Perfil.css'

const Profile = () => {
  const { user, setUser, pikachuPhotos, logout } = useContext(UserContext)

  // Estados para el modo de edición del nombre y el nuevo nombre
  const [editingName, setEditingName] = useState(false)
  const [newName, setNewName] = useState(user.nombre)

  const navigate = useNavigate()

  // Habilitar la edición del nombre
  const handleEditName = () => {
    setEditingName(true)
  }

  // Guardar el nuevo nombre
  const handleSaveName = () => {
    setUser({ ...user, nombre: newName })
    setEditingName(false)

    // Actualizar el nombre en el localStorage
    const existingClientes = JSON.parse(localStorage.getItem('clientes')) || []
    const updatedClientes = existingClientes.map((cliente) =>
      cliente.email === user.email ? { ...cliente, nombre: newName } : cliente
    )
    localStorage.setItem('clientes', JSON.stringify(updatedClientes))
  }

  // Cancelar la edición del nombre
  const handleCancelEdit = () => {
    setNewName(user.nombre)
    setEditingName(false)
  };

  // Seleccionar nueva foto de perfil
  const handleSelectPhoto = (newPhoto) => {
    setUser({ ...user, pikachuPhoto: newPhoto })
  }

  // Cerrar sesión
  const handleLogout = () => {
    logout()
    navigate('/')
  };

  return (
    <div className="profile-container">
      <h1>Perfil de Usuario</h1>
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
            src={user.pikachuPhoto}
            alt="Pikachu"
            className="profile-image"
          />
        </div>
        <div className="profile-photo-options">
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
  )
}

export default Profile
