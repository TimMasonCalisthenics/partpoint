import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
// import หน้าอื่นๆ เข้ามาตรงนี้...

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* กำหนดเส้นทาง URL */}
        <Route path="/" element={<HomePage />} />
        
        {/* ตัวอย่างหน้าอื่นๆ (เมื่อคุณสร้างไฟล์เสร็จแล้ว) */}
        {/* <Route path="/search" element={<SearchResultPage />} /> */}
        {/* <Route path="/product/:id" element={<ProductDetailPage />} /> */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;