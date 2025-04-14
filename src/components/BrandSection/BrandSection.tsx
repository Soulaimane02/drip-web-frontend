import React from "react";
import "./BrandSection.css";

const BrandSection: React.FC = () => {
  const brands = [
    { name: "Nike", logo: process.env.PUBLIC_URL + "/assets/logos/nike.svg" },
    { name: "Adidas", logo: process.env.PUBLIC_URL + "/assets/logos/adidas.svg" },
    { name: "Zara", logo: process.env.PUBLIC_URL + "/assets/logos/zara.svg" },
    { name: "HM", logo: process.env.PUBLIC_URL + "/assets/logos/handm.svg" },
    { name: "Puma", logo: process.env.PUBLIC_URL + "/assets/logos/puma.svg" },
    { name: "TNF", logo: process.env.PUBLIC_URL + "/assets/logos/thenorthface.svg" },
    { name: "UA", logo: process.env.PUBLIC_URL + "/assets/logos/underarmour.svg" },
    { name: "Hermès", logo: process.env.PUBLIC_URL + "/assets/logos/hermes.svg" },
  ];

  return (
    <section className="brand-section">
    <h2 className="brand-title">Les grandes marques à prix mini</h2>
      <div className="brand-marquee">
        <div className="brand-track">
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="brand-item">
              <img src={brand.logo} alt={brand.name} className="brand-logo" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
