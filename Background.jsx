import React from 'react';

const BackgroundDesign = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Top-right gradient circle */}
      <div className="absolute -top-40 -right-40 h-[800px] w-[800px] rounded-full bg-gradient-to-br from-blue-200 via-blue-300 to-transparent opacity-30" />
      
      {/* Top-left gradient circle */}
      <div className="absolute -top-20 -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-100 via-blue-200 to-transparent opacity-20" />
      
      {/* Bottom-right decorative dots */}
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] opacity-20">
        <div className="absolute bottom-12 right-12 h-3 w-3 rounded-full bg-blue-500" />
        <div className="absolute bottom-16 right-24 h-3 w-3 rounded-full bg-blue-500" />
        <div className="absolute bottom-24 right-16 h-3 w-3 rounded-full bg-blue-500" />
        <div className="absolute bottom-20 right-32 h-3 w-3 rounded-full bg-blue-500" />
      </div>
      
      {/* Bottom-left gradient */}
      <div className="absolute -bottom-32 -left-32 h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-blue-200 via-blue-100 to-transparent opacity-30" />
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.075]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #2563eb 1px, transparent 1px),
            linear-gradient(to bottom, #2563eb 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />

      {/* Additional ambient light effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/10 to-transparent" />
    </div>
  );
};

export default BackgroundDesign;