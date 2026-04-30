export default function Settings() {
  return (
    <div className="page-content">
      <h1>Settings</h1>
      <p>Manage your application settings and preferences here.</p>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'var(--card-bg)', border: '1px solid var(--section-border)', borderRadius: '8px', color: 'var(--text-primary)' }}>
        <h2>Settings Options</h2>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input type="checkbox" defaultChecked /> Email Notifications
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input type="checkbox" defaultChecked /> Dark Mode
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input type="checkbox" /> Marketing Emails
          </label>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>
            <input type="checkbox" defaultChecked /> Two-Factor Authentication
          </label>
        </div>
      </div>
    </div>
  );
}
