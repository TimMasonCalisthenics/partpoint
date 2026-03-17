import { Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white relative overflow-hidden py-10 px-6 md:px-16 border-t border-red-900 border-opacity-30">
      
      {/* Background Graphic Element (Gears/Pistons on the right) */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none hidden md:block">
        <div className="relative w-80 h-80">
          <img src="/CarPart/partpoint_logo.png" alt="PartPoint Background Logo" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none'; // ซ่อนถ้ารูปไม่โหลด
               }} 
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between relative z-10 gap-10">
        
        {/* Left Section (Contact Info & Disclaimer) */}
        <div className="flex flex-col max-w-3xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-100">ติดต่อเรา</h3>
          
          <div className="flex items-center gap-3 mb-10 text-2xl font-bold">
            <Phone className="w-7 h-7 text-white" fill="white"/>
            <span>Tel = 090-XXXXXXX</span>
          </div>

          <div className="space-y-3">
            <h4 className="text-2xl font-bold text-gray-100">
              ข้อความประกาศความเป็นส่วนตัวและสิทธิ (Disclaimer)
            </h4>
            <div className="text-base md:text-lg text-gray-300 space-y-1 font-medium leading-relaxed">
              <p>เว็บไซต์นี้เป็นส่วนหนึ่งของวิชา Software Engineering คณะ วิทยาศาสตร์ประยุกต์</p>
              <p>สาขาวิทยาการคอมพิวเตอร์ มหาวิทยาลัย พระจอมเกล้าพระนครเหนือ (KMUTNB)</p>
              <p>จัดทำขึ้นเพื่อวัตถุประสงค์ทางการศึกษาเท่านั้น</p>
              <p>ข้อมูลสินค้าและรูปภาพที่ปรากฏในเว็บไซต์นี้เป็นกรรมสิทธิ์ของเจ้าของลิขสิทธิ์</p>
              <p>ทางคณะผู้จัดทำไม่มีวัตถุประสงค์เพื่อการค้าหรือละเมิดลิขสิทธิ์แต่อย่างใด</p>
            </div>
          </div>
        </div>

        {/* Right Section (Logo graphic for mobile/smaller screens if needed, otherwise handled by absolute bg) */}
        <div className="md:hidden flex justify-center opacity-40 py-4">
           {/* Fallback graphic icon that resembles the gear/piston in the image */}
           <div className="w-40 h-40 border-[12px] border-dashed border-red-800 rounded-full flex items-center justify-center relative overflow-hidden">
               <div className="absolute w-80 h-4 bg-red-800 rotate-45"></div>
               <div className="absolute w-80 h-4 bg-red-800 -rotate-45"></div>
               <div className="w-24 h-24 bg-black rounded-full z-10 border-4 border-red-800"></div>
           </div>
        </div>

      </div>
    </footer>
  );
}
