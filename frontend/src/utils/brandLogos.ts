// Brand Logo Mapping - จับคู่ชื่อแบรนด์กับไฟล์โลโก้ใน /Brandpart/
// ใช้ชื่อแบรนด์เป็น key (lowercase) และ path เป็น value

const brandLogoMap: Record<string, string> = {
  // === ยางรถยนต์ (TireBand) ===
  'michelin': '/Brandpart/TireBand/Michelin_Logo_0.svg',
  'pirelli': '/Brandpart/TireBand/Pirelli_id89Ihp_Aw_1.svg',
  'bridgestone': '/Brandpart/TireBand/bridgestone-26989.svg',
  'continental': '/Brandpart/TireBand/continental-54.svg',
  'deestone': '/Brandpart/TireBand/deestone-logo-png_seeklogo-518858 (1).svg',
  'dunlop': '/Brandpart/TireBand/dunlop-tires-logo-svgrepo-com.svg',
  'goodyear': '/Brandpart/TireBand/goodyear-tire-1.svg',
  'hankook': '/Brandpart/TireBand/hankook-tire-black.svg',
  'toyo tires': '/Brandpart/TireBand/toyotires.svg',
  'toyo': '/Brandpart/TireBand/toyotires.svg',
  'yokohama': '/Brandpart/TireBand/yokohama-logo.svg',

  // === น้ำมันเครื่อง (EngineOilBrand) ===
  'amsoil': '/Brandpart/EngineOilBrand/amsoil-2.svg',
  'castrol': '/Brandpart/EngineOilBrand/castrol-5.svg',
  'hks': '/Brandpart/EngineOilBrand/hks-1.svg',
  'liqui moly': '/Brandpart/EngineOilBrand/liqui-moly-1.svg',
  'mobil': '/Brandpart/EngineOilBrand/mobil-1.svg',
  'mobil 1': '/Brandpart/EngineOilBrand/mobil-1.svg',
  'motul': '/Brandpart/EngineOilBrand/motul-logo-1.svg',
  'ptt': '/Brandpart/EngineOilBrand/ptt-1.svg',
  'shell': '/Brandpart/EngineOilBrand/shell-helix-1.svg',
  'shell helix': '/Brandpart/EngineOilBrand/shell-helix-1.svg',
  'valvoline': '/Brandpart/EngineOilBrand/valvoline-7.svg',

  // === เบรก (BreakBrand) ===
  'compact': '/Brandpart/BreakBrand/Compact.jpg',
  'project mu': '/Brandpart/BreakBrand/Project Mu.png',
  'akebono': '/Brandpart/BreakBrand/akebono-brake-company.svg',
  'ap racing': '/Brandpart/BreakBrand/ap-racing-ltd-logo-vector.svg',
  'bendix': '/Brandpart/BreakBrand/bendix-2.svg',
  'brembo': '/Brandpart/BreakBrand/brembo-logo-2.svg',
  'ebc': '/Brandpart/BreakBrand/ebc-brakes.svg',
  'endless': '/Brandpart/BreakBrand/endless-3.svg',
  'trw': '/Brandpart/BreakBrand/trw.svg',

  // === โช้คอัพ (shock_absorbers_Brand) ===
  'koni': '/Brandpart/shock_absorbers_Brand/Koni.png',
  'ohlins': '/Brandpart/shock_absorbers_Brand/Oehlins_logo.svg',
  'öhlins': '/Brandpart/shock_absorbers_Brand/Oehlins_logo.svg',
  'profender': '/Brandpart/shock_absorbers_Brand/Profender-White-min.png',
  'bilstein': '/Brandpart/shock_absorbers_Brand/bilstein-46618.svg',
  'fox': '/Brandpart/shock_absorbers_Brand/fox-racing-shox-1.svg',
  'kyb': '/Brandpart/shock_absorbers_Brand/kyb-gas-shocks-1.svg',
  'monroe': '/Brandpart/shock_absorbers_Brand/monroe-premiumquality.svg',
  'tein': '/Brandpart/shock_absorbers_Brand/tein.svg',
  'yss': '/Brandpart/shock_absorbers_Brand/yss-suspension-logo-png_seeklogo-328519.svg',

  // === แบตเตอรี่ (BatteryBrand) ===
  '3k': '/Brandpart/BatteryBrand/3K_Battery_Logo.svg.png',
  'amaron': '/Brandpart/BatteryBrand/Amaron_idKYXMc4Es_0.png',
  'gs': '/Brandpart/BatteryBrand/GS_Battery_id_DRPP114_1.svg',
  'puma': '/Brandpart/BatteryBrand/Puma_Energy_idvenUqrTx_1.svg',
  'bosch': '/Brandpart/BatteryBrand/bosch.svg',
  'furukawa': '/Brandpart/BatteryBrand/furukawa-1.svg',
  'panasonic': '/Brandpart/BatteryBrand/panasonic-1.svg',
  'varta': '/Brandpart/BatteryBrand/varta.svg',
  'yuasa': '/Brandpart/BatteryBrand/yuasa-1.svg',

  // === แม็กล้อ (MagwheelBrand) ===
  'cosmis': '/Brandpart/MagwheelBrand/Cosmis4.svg',
  'hre': '/Brandpart/MagwheelBrand/HRE1.svg',
  'lenso': '/Brandpart/MagwheelBrand/Lenso_Wheel_idN0DsoznJ_0.svg',
  'rotiform': '/Brandpart/MagwheelBrand/Rotiform_idY5oOnaHG_1.svg',
  'volk racing': '/Brandpart/MagwheelBrand/Volk racing.svg',
  'volk': '/Brandpart/MagwheelBrand/Volk racing.svg',
  'rays': '/Brandpart/MagwheelBrand/Volk racing.svg',
  'wedsport': '/Brandpart/MagwheelBrand/Wedsport.png',
  'bbs': '/Brandpart/MagwheelBrand/bbs.svg',
  'enkei': '/Brandpart/MagwheelBrand/enkei.svg',
  'oz racing': '/Brandpart/MagwheelBrand/oz-racing.svg',
  'oz': '/Brandpart/MagwheelBrand/oz-racing.svg',
  'ssr': '/Brandpart/MagwheelBrand/ssr_logos.svg',

  // === อื่นๆ ===
  'akrapovic': '/Brandpart/Akrapovic-logo.png',
};

/**
 * หาโลโก้แบรนด์จากชื่อแบรนด์
 * ลอง match แบบ exact ก่อน ถ้าไม่เจอ ลอง partial match
 */
export function getBrandLogo(brandName: string): string | null {
  if (!brandName) return null;
  const lower = brandName.toLowerCase().trim();

  // Exact match
  if (brandLogoMap[lower]) return brandLogoMap[lower];

  // Partial match: ถ้าชื่อแบรนด์มีคำที่ตรงกับ key
  for (const [key, path] of Object.entries(brandLogoMap)) {
    if (lower.includes(key) || key.includes(lower)) {
      return path;
    }
  }
  return null;
}

export default brandLogoMap;
