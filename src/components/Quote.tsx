import React from 'react';

const QuoteSection = () => {
  return (
    <section
      className="py-5 text-center shadow-sm"
      style={{ backgroundColor: '#FEEC81' }}
    >
      <div className="container">
        <blockquote className="blockquote fs-4 fw-light text-dark">
          „Der wahre Sieg bei Catan ist nicht der Bau der meisten Städte, sondern der Ausbau von Freundschaften.“
        </blockquote>
        <figcaption className="blockquote-footer mt-3 text-muted fs-6">
          Klaus Teuber <cite title="Catan-Schöpfer">(1952–2023)</cite>
        </figcaption>
      </div>
    </section>
  );
};

export default QuoteSection;
