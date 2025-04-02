
import React from "react";
import { Certificate } from "./types";

interface CertificateStatusBadgeProps {
  status: Certificate["status"];
}

export const CertificateStatusBadge: React.FC<CertificateStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case "active":
      return <span className="badge-success">Actueel</span>;
    case "expiring":
      return <span className="badge-warning">Verloopt binnenkort</span>;
    case "expired":
      return <span className="badge-danger">Verlopen</span>;
    default:
      return null;
  }
};
