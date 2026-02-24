import React from "react";

export interface Offer {
  id: number;
  title: string;
  description: string;
}

interface MainSectionProps {
  user: { name: string; photo: string };
  offers: Offer[];
  loading?: boolean;
  error?: string | null;
}

const MainSection: React.FC<MainSectionProps> = ({ user, offers, loading, error }) => (
  <main style={{ flex: 1, background: '#fff', borderRadius: 16, boxShadow: '0 2px 8px #eee', padding: '32px 40px', marginBottom: 24 }}>
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32 }}>
      <img src={user.photo} alt="User" style={{ width: 64, height: 64, borderRadius: '50%', marginRight: 24 }} />
      <span style={{ fontSize: 24, fontWeight: 'bold' }}>{user.name}</span>
    </div>
    {/* Offers Container */}
    <div>
      <h2 style={{ marginBottom: 24 }}>الطلبات</h2>
      {loading && <div style={{ padding: 24 }}>جاري التحميل...</div>}
      {error && <div style={{ color: 'red', padding: 24 }}>خطأ: {error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        {offers.map((offer) => (
          <div key={offer.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
            <h3 style={{ fontSize: 18, marginBottom: 8 }}>{offer.title}</h3>
            <p style={{ color: '#666' }}>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  </main>
);

export default MainSection;
