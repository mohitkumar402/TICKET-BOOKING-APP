import { useLocation, useNavigate } from 'react-router-dom';
import '../style/success.css'; // Update the path if needed

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state || {};

  // Remove password from display for security
  const displayData = { ...data };
  delete displayData.password;

  return (
    <div className="success-container">
      <div className="success-card">
        <h2>{data.formType === 'signup' ? 'Registration' : 'Login'} Successful!</h2>
        <table className="success-table">
          <tbody>
            {Object.entries(displayData).map(([key, value]) =>
              key !== 'formType' && value && (
                <tr key={key}>
                  <th>
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </th>
                  <td>{value}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className='button-group'>  
        <button className="success-back-btn" onClick={() => navigate('/')}>
          login
        </button>
        <button className="success-home-btn" onClick={() => navigate('/homepage')}>
         home
         </button>
         </div>
      </div>
    </div>
  );
}
