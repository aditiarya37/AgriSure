import React from "react";

const KissanStore = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="./assets/main.png"
            alt="Card"
            height={350}
            style={{ 
              height: '350px',
              filter: 'brightness(0.6)', // Darkens the image
              objectFit: 'cover', // Ensures the image covers the area
            }}
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center text-center">
            <div className="container">
              <h5 className="card-title display-4 fw-bold mb-3">KISSAN STORE</h5>
              <p className="card-text fs-5 d-none d-sm-block mx-auto" style={{ maxWidth: '600px' }}>
                AGRI SURE brings you Kissan Store. Your one-stop solution for all your farm needs, from fertilizers to organic farming products—we've got you covered.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KissanStore;