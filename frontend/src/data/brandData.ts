export interface Brand {
  name: string;
  bgImage: string;
  link?: boolean;
}

export const carBrands: Brand[] = [
  { name: 'Mazda', bgImage: '/Brandpart/CarBand/mazda-2.svg' },
  { name: 'BMW', bgImage: '/Brandpart/CarBand/bmw-svgrepo-com.svg' },
  { name: 'Mercedes-Benz', bgImage: '/Brandpart/CarBand/Mercedes-Benz-Logo.wine.svg' },
  { name: 'Nissan', bgImage: '/Brandpart/CarBand/nissan-6.svg' },
  { name: 'Mitsubishi', bgImage: '/Brandpart/CarBand/mitsubishi.svg' },
  { name: 'Isuzu', bgImage: '/Brandpart/CarBand/isuzu-2.svg' },
  { name: 'Toyota', bgImage: '/Brandpart/CarBand/toyota-1.svg' },
  { name: 'Honda', bgImage: '/Brandpart/CarBand/honda-11.svg' },
  { name: 'Ford', bgImage: '/Brandpart/CarBand/ford-8.svg' },
];

export const tireBrands: Brand[] = [
  { name: 'Michelin', bgImage: '/Brandpart/TireBand/Michelin_Logo_0.svg', link: true },
  { name: 'Bridgestone', bgImage: '/Brandpart/TireBand/bridgestone-26989.svg', link: true },
  { name: 'Goodyear', bgImage: '/Brandpart/TireBand/goodyear-tire-1.svg', link: true },
  { name: 'Yokohama', bgImage: '/Brandpart/TireBand/yokohama-logo.svg', link: true },
  { name: 'Dunlop', bgImage: '/Brandpart/TireBand/dunlop-tires-logo-svgrepo-com.svg', link: true },
  { name: 'Continental', bgImage: '/Brandpart/TireBand/continental-54.svg', link: true },
  { name: 'Pirelli', bgImage: '/Brandpart/TireBand/Pirelli_id89Ihp_Aw_1.svg', link: true },
  { name: 'Toyo Tires', bgImage: '/Brandpart/TireBand/toyotires.svg', link: true },
  { name: 'Hankook', bgImage: '/Brandpart/TireBand/hankook-tire-black.svg', link: true },
  { name: 'Deestone', bgImage: '/Brandpart/TireBand/deestone-logo-png_seeklogo-518858 (1).svg', link: true },
];

export const wheelBrands: Brand[] = [
  { name: 'Enkei', bgImage: '/Brandpart/MagwheelBrand/enkei.svg', link: true },
  { name: 'BBS', bgImage: '/Brandpart/MagwheelBrand/bbs.svg', link: true },
  { name: 'Volk Racing', bgImage: '/Brandpart/MagwheelBrand/Volk%20racing.svg', link: true },
  { name: 'Rotiform', bgImage: '/Brandpart/MagwheelBrand/Rotiform_idY5oOnaHG_1.svg', link: true },
  { name: 'Lenso', bgImage: '/Brandpart/MagwheelBrand/Lenso_Wheel_idN0DsoznJ_0.svg', link: true },
  { name: 'WedsSport', bgImage: '/Brandpart/MagwheelBrand/Wedsport.png', link: true },
  { name: 'SSR', bgImage: '/Brandpart/MagwheelBrand/ssr_logos.svg', link: true },
  { name: 'OZ Racing', bgImage: '/Brandpart/MagwheelBrand/oz-racing.svg', link: true },
  { name: 'HRE', bgImage: '/Brandpart/MagwheelBrand/HRE1.svg', link: true },
  { name: 'Cosmis', bgImage: '/Brandpart/MagwheelBrand/Cosmis4.svg', link: true },
];

export const shockBrands: Brand[] = [
  { name: 'YSS', bgImage: '/Brandpart/shock_absorbers_Brand/yss-suspension-logo-png_seeklogo-328519.svg', link: true },
  { name: 'Tein', bgImage: '/Brandpart/shock_absorbers_Brand/tein.svg', link: true },
  { name: 'Ohlins', bgImage: '/Brandpart/shock_absorbers_Brand/Oehlins_logo.svg', link: true },
  { name: 'Bilstein', bgImage: '/Brandpart/shock_absorbers_Brand/bilstein-46618.svg', link: true },
  { name: 'Monroe', bgImage: '/Brandpart/shock_absorbers_Brand/monroe-premiumquality.svg', link: true },
  { name: 'Profender', bgImage: '/Brandpart/shock_absorbers_Brand/Profender-White-min.png', link: true },
  { name: 'Fox', bgImage: '/Brandpart/shock_absorbers_Brand/fox-racing-shox-1.svg', link: true },
  { name: 'Koni', bgImage: '/Brandpart/shock_absorbers_Brand/Koni.png', link: true },
  { name: 'KYB', bgImage: '/Brandpart/shock_absorbers_Brand/kyb-gas-shocks-1.svg', link: true },
  { name: 'KW', bgImage: '/Brandpart/shock_absorbers_Brand/kw.png', link: true }
];

export const batteryBrands: Brand[] = [
  { name: 'GS Battery', bgImage: '/Brandpart/BatteryBrand/GS_Battery_id_DRPP114_1.svg', link: true },
  { name: 'FB Battery', bgImage: '/Brandpart/BatteryBrand/furukawa-1.svg', link: true },
  { name: 'Amaron', bgImage: '/Brandpart/BatteryBrand/Amaron_idKYXMc4Es_0.png', link: true },
  { name: 'Panasonic', bgImage: '/Brandpart/BatteryBrand/panasonic-1.svg', link: true },
  { name: 'Puma', bgImage: '/Brandpart/BatteryBrand/Puma_Energy_idvenUqrTx_1.svg', link: true },
  { name: '3K Battery', bgImage: '/Brandpart/BatteryBrand/3K_Battery_Logo.svg.png', link: true },
  { name: 'Yuasa', bgImage: '/Brandpart/BatteryBrand/yuasa-1.svg', link: true },
  { name: 'Varta', bgImage: '/Brandpart/BatteryBrand/varta.svg', link: true },
  { name: 'Bosch', bgImage: '/Brandpart/BatteryBrand/bosch.svg', link: true },
];

export const brakeBrands: Brand[] = [
  { name: 'Brembo', bgImage: '/Brandpart/BreakBrand/brembo-logo-2.svg', link: true },
  { name: 'Bendix', bgImage: '/Brandpart/BreakBrand/bendix-2.svg', link: true },
  { name: 'Compact Brakes', bgImage: '/Brandpart/BreakBrand/Compact.jpg', link: true },
  { name: 'Akebono', bgImage: '/Brandpart/BreakBrand/akebono-brake-company.svg', link: true },
  { name: 'Project Mu', bgImage: '/Brandpart/BreakBrand/Project%20Mu.png', link: true },
  { name: 'Endless', bgImage: '/Brandpart/BreakBrand/endless-3.svg', link: true },
  { name: 'AP Racing', bgImage: '/Brandpart/BreakBrand/ap-racing-ltd-logo-vector.svg', link: true },
  { name: 'EBC', bgImage: '/Brandpart/BreakBrand/ebc-brakes.svg', link: true },
  { name: 'TRW', bgImage: '/Brandpart/BreakBrand/trw.svg', link: true },
];

export const oilBrands: Brand[] = [
  { name: 'Motul', bgImage: '/Brandpart/EngineOilBrand/motul-logo-1.svg', link: true },
  { name: 'Mobil 1', bgImage: '/Brandpart/EngineOilBrand/mobil-1.svg', link: true },
  { name: 'Castrol', bgImage: '/Brandpart/EngineOilBrand/castrol-5.svg', link: true },
  { name: 'Liqui Moly', bgImage: '/Brandpart/EngineOilBrand/liqui-moly-1.svg', link: true },
  { name: 'Amsoil', bgImage: '/Brandpart/EngineOilBrand/amsoil-2.svg', link: true },
  { name: 'PTT Lubricants', bgImage: '/Brandpart/EngineOilBrand/ptt-1.svg', link: true },
  { name: 'Valvoline', bgImage: '/Brandpart/EngineOilBrand/valvoline-7.svg', link: true },
  { name: 'Shell Helix', bgImage: '/Brandpart/EngineOilBrand/shell-helix-1.svg', link: true },
  { name: 'HKS', bgImage: '/Brandpart/EngineOilBrand/hks-1.svg', link: true },
];
