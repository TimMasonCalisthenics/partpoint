import React from 'react';

// You can create a reusable Logo component here if you want to use it in multiple places.
export const Logo = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* 1. เฟืองสีขาว (หมุน) */}
    <img 
      src="/gear.png" 
      alt="Gear" 
      className="absolute w-[115%] h-[115%] object-contain animate-[spin_10s_linear_infinite]" 
    />
    
    {/* 2. โลกสีแดง (วงใน) */}
    <img 
      src="/globe.png" 
      alt="Globe" 
      className="absolute w-[80%] h-[80%] object-contain drop-shadow-md" 
    />

    {/* 3. ลูกสูบไขว้สีขาว (อยู่นิ่งตรงกลางสุด) */}
    <img 
      src="/pistons.png" 
      alt="Pistons" 
      className="absolute w-[65%] h-[65%] object-contain drop-shadow-lg" 
    />
  </div>
);
