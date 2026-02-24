import React from "react";
import { Offer } from "./MainSection";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => (
  <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
    <h3 style={{ fontSize: 18, marginBottom: 8 }}>{offer.title}</h3>
    <p style={{ color: '#666' }}>{offer.description}</p>
  </div>
);

export default OfferCard;
