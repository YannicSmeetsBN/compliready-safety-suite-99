
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CertificateList } from "@/components/certificates/CertificateList";

const Certificates = () => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="main-content">
          <h1 className="page-title">Certificaatbeheer</h1>
          <CertificateList />
        </main>
      </div>
    </div>
  );
};

export default Certificates;
