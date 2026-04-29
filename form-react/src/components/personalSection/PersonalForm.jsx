import React from 'react';

function PersonalForm({ formData, setFormData }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    return(
        <div className="form-grid form-grid-2" aria-labelledby="form-personal">
            <div className="field">
                <label htmlFor="first-name" className="field-label">First Name</label>
                <input 
                    type="text" 
                    id="first-name" 
                    className="field-input" 
                    placeholder="Enter your first name" 
                    value={formData['first-name']} 
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="field">
                <label htmlFor="last-name" className="field-label">Last Name</label>
                <input 
                    type="text" 
                    id="last-name" 
                    className="field-input" 
                    placeholder="Enter your last name" 
                    value={formData['last-name']} 
                    onChange={handleChange}
                    required
                />
            </div>
            
            <div className="field">
                <label htmlFor="email" className="field-label">Email Address</label>
                <input 
                    type="email" 
                    id="email" 
                    className="field-input" 
                    placeholder="you@example.com" 
                    value={formData.email} 
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="field">
                <label htmlFor="phone" className="field-label">Phone Number</label>
                <input 
                    type="tel" 
                    id="phone" 
                    className="field-input" 
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone} 
                    onChange={handleChange}
                />
            </div>

            <div className="field field-full">
                <label htmlFor="address" className="field-label">Address</label>
                <input 
                    type="text" 
                    id="address" 
                    className="field-input" 
                    placeholder="Enter your full address" 
                    value={formData.address} 
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default PersonalForm;