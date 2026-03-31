import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0a0a0a] overflow-hidden font-sans">
            <Navbar />
            
            {/* 1. ส่วนเนื้อหาเกี่ยวกับเรา (About Us Content) */}
            <div className="container mx-auto max-w-7xl px-4 md:px-0 py-24 flex-grow flex flex-col justify-center">
                <div className="text-center mb-12">
                     <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                        เกี่ยวกับเรา <span className="text-red-600">PARTPOINT</span>
                     </h1>
                     <div className="w-24 h-1.5 bg-red-600 mx-auto mb-8 rounded-full"></div>
                     <p className="text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
                        เว็บไซต์นี้เป็นส่วนหนึ่งของวิชา Software Engineering 
                        คณะวิทยาศาสตร์ประยุกต์ สาขาวิทยาการคอมพิวเตอร์ <br/>
                        <span className="text-red-400 font-semibold">มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (KMUTNB)</span>
                        <br/><br/>
                        จัดทำขึ้นเพื่อวัตถุประสงค์ทางการศึกษา ในการพัฒนาระบบค้นหาและเปรียบเทียบราคาอะไหล่รถยนต์
                        เพื่อให้ผู้ใช้งานได้อะไหล่ที่ตรงรุ่นและคุ้มค่าที่สุด พร้อมข้อมูลประกอบการตัดสินใจ
                     </p>
                </div>
            </div>



            <Footer />
        </div>
    );
}
