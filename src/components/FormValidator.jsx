
import  { useState, useEffect } from 'react';

const FormValidator = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateField = (name, value) => {
    if (name === 'username' && value.trim() === '') {
      return 'El nombre de usuario es requerido';
    }

    if (name === 'password' && value.trim() === '') {
      return 'La contraseña es requerida';
    }

    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) {
        newErrors[name] = error;
      }
    });
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      onSubmit(formData);
    }
  };

  useEffect(() => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));
    setErrors(fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}));
  }, [fields]);

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field}>
          <label htmlFor={field}>{field}</label>
          <input
            type="text"
            id={field}
            name={field}
            value={formData[field] || ''}
            onChange={handleChange}
          />
          {errors[field] && <span style={{ color: 'red' }}>{errors[field]}</span>}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormValidator;
