import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/auth.css';
//import ParticleButton from '../components/ParticleButton';
import ParticlesBG from '../components/ParticlesBG';


const countries = {
  'India': ['Mumbai', 'Delhi', 'Bangalore'],
  'USA': ['New York', 'Los Angeles', 'Chicago'],
  'Canada': ['Toronto', 'Vancouver', 'Montreal']
};

export default function AuthForm() {
  const navigate = useNavigate();
  const [formType, setFormType] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    username: '',
    phoneCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const newErrors = {};
      if (!formData.email) newErrors.email = 'Email required';
      if (!formData.password) newErrors.password = 'Password required';
      if (formType === 'signup') {
        if (!formData.firstName) newErrors.firstName = 'First Name required';
        if (!formData.lastName) newErrors.lastName = 'Last Name required';
        if (!formData.username) newErrors.username = 'Username required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number required';
        if (!formData.country) newErrors.country = 'Country required';
        if (!formData.city) newErrors.city = 'City required';
        if (!formData.pan) newErrors.pan = 'PAN required';
        if (!formData.aadhar) newErrors.aadhar = 'Aadhar required';
        if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
          newErrors.pan = 'Invalid PAN format'; 
        }
        else if (formData.pan && formData.pan.length !== 10) {
          newErrors.pan = 'PAN must be 10 characters';}
          
        if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
          newErrors.aadhar = 'Invalid Aadhar number';
        }
      }
      if (formData.password && formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (formData.password && formType === 'signup' &&
        !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
        newErrors.password = 'Password must have 8+ chars, uppercase, lowercase, and number';
      }
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };
    validateForm();
  }, [formData, formType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'country') {
      setFormData(prev => ({ ...prev, city: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/successPage', { state: { ...formData, formType } });
    }
  };

  const toggleFormType = () => {
    setFormType(prev => prev === 'login' ? 'signup' : 'login');
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      username: '',
      phoneCode: '+91',
      phoneNumber: '',
      country: '',
      city: '',
      pan: '',
      aadhar: ''
    });
    setErrors({});
  };

  return (
    <div className="form-outer-wrap">
      <div className="auth-container">
        {formType === 'login' && (
  <h2 className="company-name">QUICKETT</h2>
)}
        <div className="form-toggle">
        
          <button
            className={formType === 'login' ? 'active' : ''}
            type="button"
            onClick={() => setFormType('login')}
          >
            Login
            <span className="orange-line" />
          </button>
          <button
            className={formType === 'signup' ? 'active' : ''}
            type="button"
            onClick={() => setFormType('signup')}
          >
            Sign Up
            <span className="orange-line" />
          </button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          {formType === 'signup' && (
            <>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="error">{errors.username}</span>}
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="show-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
          {formType === 'signup' && (
            <>
              <div className="phone-field">
                <select
                  name="phoneCode"
                  value={formData.phoneCode}
                  onChange={handleChange}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                {Object.keys(countries).map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <span className="error">{errors.country}</span>}
              {formData.country && (
                <>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  >
                    <option value="">Select City</option>
                    {countries[formData.country].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <span className="error">{errors.city}</span>}
                </>
              )}
              <input
                type="text"
                name="pan"
                placeholder="PAN Number"
                value={formData.pan}
                onChange={handleChange}
              />
              {errors.pan && <span className="error">{errors.pan}</span>}
              <input
                type="text"
                name="aadhar"
                placeholder="Aadhar Number"
                value={formData.aadhar}
                onChange={handleChange}
              />
              {errors.aadhar && <span className="error">{errors.aadhar}</span>}
            </>
          )}
          <button className="red-btn" type="submit" disabled={!isFormValid}>
            
            {formType === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="toggle-prompt">
          {formType === 'login'
            ? "Don't have an account? "
            : "Already have an account? "}
          <button type="button" onClick={toggleFormType}>
            {formType === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
