import PersonalSection from "./components/personalSection/PersonalSection";
import TechnicalSection from "./components/TechnicalSection/TechnicalSection";
import "./App.css";
import Footer from "./components/Footer";
import { useState } from 'react';

function App() {
  const [personalData, setPersonalData] = useState({
    'first-name': '',
    'last-name': '',
    email: '',
    phone: '',
    address: ''
  });

  const [technicalData, setTechnicalData] = useState({
    skills: '',
    experience: '',
    company: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('=== FORM SUBMISSION ===');
    console.log('Personal Information:', personalData);
    console.log('Technical Information:', technicalData);
    console.log('Complete Form Data:', {
      personal: personalData,
      technical: technicalData
    });
    console.log('=======================');
    setPersonalData({
      'first-name': '',
      'last-name': '',
      email: '',
      phone: '',
      address: ''
    });
    setTechnicalData({
      skills: '',
      experience: '',
      company: ''
    });
  };

  return (
    <div className="page-wrapper">
      <main className="main-content">
        <div className="app">
          <h1>React Form</h1>
          <form onSubmit={handleSubmit}>
            <PersonalSection formData={personalData} setFormData={setPersonalData} />
            <TechnicalSection formData={technicalData} setFormData={setTechnicalData} />
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit Form</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App;