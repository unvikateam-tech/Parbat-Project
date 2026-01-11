import React from 'react';
import Counter from './Counter';

const DemoSection: React.FC = () => {
  return (
    <section className="demo-section">
      <h2>Interactive Demo</h2>
      <Counter initialValue={0} />
    </section>
  );
};

export default DemoSection;