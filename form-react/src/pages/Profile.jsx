export default function Profile() {
  return (
    <div className="page-content">
      <h1>Profile</h1>
      <p>Manage your profile information and settings here.</p>
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> john@example.com</p>
        <p><strong>Location:</strong> New York, USA</p>
        <p><strong>Member Since:</strong> January 2023</p>
      </div>
    </div>
  );
}
