import React from 'react';

function TechnicalForm({ formData, setFormData }) {
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    return(
        <div className="form-grid form-grid-3" aria-labelledby="form-technical">
            <div className="field">
                <label htmlFor="skills" className="field-label">Skills</label>
                <input 
                    type="text" 
                    id="skills" 
                    className="field-input" 
                    placeholder="e.g., React, JavaScript, Node.js" 
                    value={formData.skills}
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="experience" className="field-label">Years of Experience</label>
                <input 
                    type="number" 
                    id="experience" 
                    className="field-input" 
                    placeholder="0" 
                    min="0"
                    value={formData.experience}
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="company" className="field-label">Company</label>
                <input 
                    type="text" 
                    id="company" 
                    className="field-input" 
                    placeholder="Enter your company name" 
                    value={formData.company}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}

export default TechnicalForm;