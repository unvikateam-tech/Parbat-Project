import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="services">
      <h2>How I Help You Grow</h2>
      <div className="service-grid">
        <ServiceCard
          title="Funnel Audit"
          description="A deep-dive diagnosis of your current sales process. I identify exactly where leads are dropping off and provide a roadmap to fix it."
          icon="🔍"
        />
        <ServiceCard
          title="Funnel Optimization"
          description="Improving what you already have. I refine your messaging, structure, and follow-up systems to squeeze more ROI from your existing traffic."
          icon="📈"
        />
        <ServiceCard
          title="Funnel Build"
          description="Custom end-to-end sales systems designed for conversion. I build the infrastructure you need to turn strangers into loyal customers."
          icon="🏗️"
        />
      </div>
    </section>
  );
};

export default ServicesSection;