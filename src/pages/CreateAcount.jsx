import { useState, useContext } from 'react';
import './CreateAccount.css';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export let logeado = false;

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Limpiar errores al cambiar el valor
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validar = (e) => {
    if (e.target.value.trim() === '') {
      mostrarAlerta(`El campo ${e.target.name} es obligatorio`, e.target.parentElement);
      return;
    }

    if (e.target.name === 'email') {
      verificarEmailDuplicado(e.target.value);
    } else {
      limpiarAlerta(e.target.parentElement);
    }
  };

  const limpiarAlerta = (referencia) => {
    const alerta = referencia.querySelector(".bg-red-600");
    if (alerta) {
      alerta.remove();
    }
  };

  const mostrarAlerta = (mensaje, referencia) => {
    limpiarAlerta(referencia);

    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("bg-red-600", "text-center", "text-white", "p-2");
    referencia.appendChild(error);
  };

  const verificarEmailDuplicado = (email) => {
    const existingClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const existingCliente = existingClientes.find(cliente => cliente.email === email);

    if (existingCliente) {
      setErrors({ email: 'El correo electrónico ya está registrado para otro cliente. Usa otro correo electrónico.' });
    } else {
      limpiarAlerta(document.querySelector("#email").parentElement);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validación de campos
    const newErrors = {};
    if (formData.nombre.trim() === '') {
      newErrors.nombre = 'El nombre es obligatorio';
    }
  
    if (formData.email.trim() === '') {
      newErrors.email = 'El correo electrónico es obligatorio';
    }
  
    if (formData.password.trim() === '') {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
  
    if (formData.confirmPassword.trim() === '') {
      newErrors.confirmPassword = 'Debe repetir la contraseña';
    }
  
    if (formData.password !== formData.confirmPassword) {
      newErrors.password = 'Las contraseñas no coinciden';
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    // Establecer la foto predeterminada aquí
    const pikachuPhoto = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/10080.png';
  
    const cliente = {
      nombre: formData.nombre,
      email: formData.email,
      password: formData.password,
      favoritos: [], // Inicializa la lista de favoritos como un array vacío
      pikachuPhoto, // Agrega la foto predeterminada al objeto cliente
    };
  
    // Guardar en localStorage
    const existingClientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const updatedClientes = [...existingClientes, cliente];
    localStorage.setItem('clientes', JSON.stringify(updatedClientes));
  
    console.log('Cliente añadido a localStorage');
    alert('Cuenta creada');
    navigate("/iniciar-sesion");
  
    setFormData({
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };
  

  return (
    <div className="create-account-container">
      <h2>Crear Cuenta</h2>
      <form id="formulario" onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={validar}
            required
          />
          {errors.nombre && <p className="bg-red-600 text-center text-white p-2">{errors.nombre}</p>}
        </label>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={validar}
            required
          />
          {errors.email && <p className="bg-red-600 text-center text-white p-2">{errors.email}</p>}
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="bg-red-600 text-center text-white p-2">{errors.password}</p>}
        </label>
        <label>
          Repetir Contraseña:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="bg-red-600 text-center text-white p-2">{errors.confirmPassword}</p>}
        </label>
        <button type="submit" className="formButton">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
