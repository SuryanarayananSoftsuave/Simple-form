import TechnicalForm from "./TechnicalForm";

function TechnicalSection({ formData, setFormData }) {
    return(
        <div className="sec-technical" aria-labelledby="sec-technical">
            <header className="sec-header">
                <h2 className="sec-title">Technical Information</h2>
                <p className="sec-desc">Please share your technical expertise and experience.</p>
            </header>
            <TechnicalForm formData={formData} setFormData={setFormData} />
        </div>
    )
}

export default TechnicalSection;