import PersonalForm from "./PersonalForm";

function PersonalSection({ formData, setFormData }) {
    return(
        <div className="sec-personal" aria-labelledby="sec-personal">
            <header className="sec-header">
                <h2 className="sec-title">Personal Information</h2>
                <p className="sec-desc">Please fill out your personal information below.</p>
            </header>
            <PersonalForm formData={formData} setFormData={setFormData} />
        </div>
    )
}

export default PersonalSection;
