import React, { useState, useEffect, useRef } from 'react';

// --- TẠO ẢNH VECTOR SVG NỘI BỘ CHẤT LƯỢNG CAO (ĐẢM BẢO 100% KHÔNG BAO GIỜ LỖI ẢNH) ---
const createArtworkSvgDataUri = (title, subtitle, bgHex, accentHex, shapeType = 1) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
    <rect width="600" height="750" fill="${bgHex}"/>
    <rect x="36" y="36" width="528" height="678" fill="none" stroke="#181615" stroke-width="2" opacity="0.22"/>
    ${
      shapeType === 1
        ? `<circle cx="300" cy="310" r="135" fill="${accentHex}" opacity="0.88"/>
           <path d="M160 470 Q300 350 440 470" fill="none" stroke="#181615" stroke-width="8" stroke-linecap="round"/>`
        : shapeType === 2
        ? `<rect x="175" y="160" width="250" height="290" rx="125" fill="${accentHex}" opacity="0.85"/>
           <circle cx="300" cy="305" r="55" fill="${bgHex}"/>`
        : shapeType === 3
        ? `<polygon points="300,150 445,430 155,430" fill="${accentHex}" opacity="0.85"/>
           <circle cx="300" cy="340" r="42" fill="#181615"/>`
        : `<circle cx="245" cy="280" r="95" fill="${accentHex}" opacity="0.85"/>
           <circle cx="355" cy="340" r="85" fill="#5E6F52" opacity="0.75"/>`
    }
    <text x="300" y="555" text-anchor="middle" font-family="Georgia, serif" font-size="25" font-weight="bold" fill="#181615" letter-spacing="2">${title}</text>
    <text x="300" y="592" text-anchor="middle" font-family="sans-serif" font-size="13" fill="#4A453E" letter-spacing="3">${subtitle}</text>
    <text x="300" y="665" text-anchor="middle" font-family="monospace" font-size="11" fill="#869D7A" letter-spacing="4">AVENOA WARM MINIMALIST 30x40CM</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const LOGO_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 260" width="280" height="260">
  <rect width="280" height="260" rx="8" fill="#E8DDD1"/>
  <path d="M68 96 L140 42 L212 96 V186 H192 V106 L140 67 L88 106 V186 H68 V96 Z" fill="#3B2316"/>
  <path d="M92 108 L140 72 L188 108 V164 H176 V114 L140 87 L104 114 V164 H92 V108 Z" fill="#8B5E3C"/>
  <path d="M84 186 L140 60 L196 186 H172 L140 112 L108 186 H84 Z" fill="#C69363" stroke="#3B2316" stroke-width="5"/>
  <path d="M106 150 Q140 156 168 134" fill="none" stroke="#3B2316" stroke-width="6.5" stroke-linecap="round"/>
  <text x="140" y="232" text-anchor="middle" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#3B2316" letter-spacing="5">AVENOA</text>
</svg>`)}`;

// --- BỘ ẢNH THẬT & DỰ PHÒNG CHẤT LƯỢNG CAO (100% HIỂN THỊ TỨC THÌ) ---
const IMAGES = {
  logo: LOGO_SVG_DATA_URI,
  heroMain: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
  room: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=85',
  art2: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80',
  art3: 'https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=900&q=80',
  art4: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80',
  art5: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&q=80',
  art6: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=80',
  art7: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80',
  art8: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=900&q=80',
  artFallback2: createArtworkSvgDataUri('ĐỪNG CHỈ ƯỚC MƠ', 'HÃY BẮT TAY VÀO LÀM', '#F6F3EC', '#B35D43', 1),
  artFallback3: createArtworkSvgDataUri('CỨ ĐI RỒI SẼ ĐẾN', 'WARM MINIMALIST CANVAS', '#EFEAE1', '#869D7A', 2),
  artFallback4: createArtworkSvgDataUri('ĐƯỜNG DÀI MỚI BIẾT', 'KIÊN TRÌ BỀN BỈ MỖI NGÀY', '#F6F3EC', '#9E472A', 3),
  artFallback5: createArtworkSvgDataUri('ĐIỀU BẠN YÊU THÍCH', 'CẢM HỨNG GÓC LÀM VIỆC', '#EDE8DF', '#5E6F52', 4),
  artFallback6: createArtworkSvgDataUri('SỐNG TRỌN KHOẢNH KHẮC', 'THỜI GIAN LÀ HỮU HẠN', '#F6F3EC', '#B35D43', 1),
  artFallback7: createArtworkSvgDataUri('BẮT ĐẦU TỪ SỐ KHÔNG', 'MẦM XANH HY VỌNG', '#EFEAE1', '#869D7A', 2),
  artFallback8: createArtworkSvgDataUri('KHÁM PHÁ ĐẠI DƯƠNG', 'VƯỢT QUA VÙNG AN TOÀN', '#F6F3EC', '#3B2316', 3),
  calendar: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80',
  plant: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=80',
  clock: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=80',
  lamp: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
  qrMbBank: 'https://img.vietqr.io/image/MB-0396648110-compact2.png?accountName=NGUYEN%20PHI%20LONG&addInfo=AVENOA%201111',
  qrMomo: `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 420" width="360" height="420">
    <rect width="360" height="420" rx="16" fill="#FDF2F7"/>
    <rect x="150" y="18" width="60" height="36" rx="8" fill="#A50064"/>
    <text x="180" y="41" text-anchor="middle" font-family="sans-serif" font-size="15" font-weight="bold" fill="#FFFFFF">momo</text>
    <rect x="55" y="70" width="250" height="250" rx="14" fill="#FFFFFF" stroke="#F3B6D4" stroke-width="3"/>
    <rect x="80" y="95" width="52" height="52" fill="none" stroke="#181615" stroke-width="8"/>
    <rect x="94" y="109" width="24" height="24" fill="#181615"/>
    <rect x="228" y="95" width="52" height="52" fill="none" stroke="#181615" stroke-width="8"/>
    <rect x="242" y="109" width="24" height="24" fill="#181615"/>
    <rect x="80" y="213" width="52" height="52" fill="none" stroke="#181615" stroke-width="8"/>
    <rect x="94" y="227" width="24" height="24" fill="#181615"/>
    <path d="M148 98h14v14h-14zM176 98h28v14h-28zM148 126h28v14h-28zM190 126h14v28h-14zM84 162h42v14H84zM140 162h28v28h-28zM212 162h28v14h-28zM254 162h24v28h-24zM148 212h28v14h-28zM190 212h28v28h-28zM232 226h44v14h-44zM148 248h42v18h-42zM218 248h58v18h-58z" fill="#181615"/>
    <circle cx="180" cy="180" r="20" fill="#A50064"/>
    <text x="180" y="185" text-anchor="middle" font-family="sans-serif" font-size="10" font-weight="bold" fill="#FFFFFF">MoMo</text>
    <text x="142" y="302" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#D82D8B">VIETQR</text>
    <text x="218" y="302" text-anchor="middle" font-family="sans-serif" font-size="11" font-weight="bold" fill="#005BAA">napas 247</text>
    <text x="180" y="356" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="#181615">NGUYEN PHI LONG</text>
    <text x="180" y="384" text-anchor="middle" font-family="monospace" font-size="15" fill="#4A453E">0396648110 (*******079)</text>
  </svg>`)}`
};

// --- HỆ SINH THÁI 11 KÊNH TRIỂN KHAI CHÍNH THỨC CỦA AVENOA (THEO HỒ SƠ NHÓM 3) ---
const SOCIAL_LINKS = {
  shopee: 'https://shopee.vn/avenoa123',
  tiktokShop: 'https://vt.tiktok.com/ZSgsAPFrX/?page=TikTokShop',
  facebook: 'https://www.facebook.com/profile.php?id=61594993390257&locale=vi_VN',
  tiktok: 'https://www.tiktok.com/@avenoa5',
  youtube: 'https://www.youtube.com/@Avenoa-q8c',
  threads: 'https://www.threads.com/@avenoa_decor',
  instagram: 'https://www.instagram.com/avenoa_decor',
  googleMaps: 'https://share.google/Gt3woRzkSEXcVy1Si',
  zalo: 'https://zalo.me/0396648110',
  hotline: '0396648110'
};

const OMNICHANNEL_PLATFORMS = [
  {
    id: 'shopee',
    name: '1. Shopee Chính Hãng',
    handle: 'shopee.vn/avenoa123',
    badge: 'Kênh Chốt Đơn Chủ Lực (54% Traffic)',
    desc: 'Mục tiêu 6.480 Traffic • 130 đơn hoàn tất (36.045.000₫). Áp chồng Voucher Shop + Voucher Xtra + Freeship Xtra.',
    url: SOCIAL_LINKS.shopee,
    color: '#EE4D2D',
    bgLight: '#FFF5F2',
    cta: 'Mua trên Shopee →'
  },
  {
    id: 'tiktokshop',
    name: '2. TikTok Shop',
    handle: 'vt.tiktok.com/ZSgsAPFrX',
    badge: 'Chốt Đơn Tức Thì (33% Traffic)',
    desc: 'Mục tiêu 3.960 Traffic • 80 đơn hoàn tất (22.027.500₫). Xem video biến hình bàn làm việc & bấm Giỏ hàng màu vàng chốt trong 30s.',
    url: SOCIAL_LINKS.tiktokShop,
    color: '#141413',
    bgLight: '#F4F3F1',
    cta: 'Mở TikTok Shop →'
  },
  {
    id: 'tiktok',
    name: '3. Kênh TikTok',
    handle: '@avenoa5',
    badge: 'Discovery & Top-of-Funnel',
    desc: 'Chuỗi video ngắn 15–30s biến hình góc làm việc (Before/After) và test thả rơi hộp chống sốc 3 lớp khung giờ 11h30 & 20h00.',
    url: SOCIAL_LINKS.tiktok,
    color: '#000000',
    bgLight: '#F4F3F1',
    cta: 'Xem kênh TikTok →'
  },
  {
    id: 'youtube',
    name: '4. YouTube Shorts',
    handle: '@Avenoa-q8c',
    badge: 'Search & Reach Đa Thiết Bị',
    desc: 'Tận dụng 100% nguồn video ngắn và TVC chủ đạo "Nơi căn phòng ôm trọn mọi cảm xúc" tiếp cận dân văn phòng dùng PC & Mobile.',
    url: SOCIAL_LINKS.youtube,
    color: '#FF0000',
    bgLight: '#FFF0F0',
    cta: 'Xem YouTube Shorts →'
  },
  {
    id: 'facebook',
    name: '5. Facebook Fanpage',
    handle: 'AVENOA Decor',
    badge: 'Tư Vấn 1:1 Qua Messenger',
    desc: 'Cổng thông tin tổng hợp & tư vấn ghép ảnh 5 món vào góc bàn thật 1:1 (SLA < 5 phút), hỗ trợ chốt Combo 5 món 899K.',
    url: SOCIAL_LINKS.facebook,
    color: '#1877F2',
    bgLight: '#F0F6FF',
    cta: 'Nhắn Fanpage →'
  },
  {
    id: 'instagram',
    name: '6. Instagram Lookbook',
    handle: '@avenoa_decor',
    badge: 'Visual Branding & Catalog',
    desc: 'Cuốn Catalog trực tuyến đồng bộ 3 tông màu Warm Minimalist: Trắng kem – Xanh rêu – Nâu gỗ.',
    url: SOCIAL_LINKS.instagram,
    color: '#C13584',
    bgLight: '#FDF2F8',
    cta: 'Follow Instagram →'
  },
  {
    id: 'threads',
    name: '7. Threads Community',
    handle: '@avenoa_decor',
    badge: 'Tương Tác Cộng Đồng Công Sở',
    desc: 'Chia sẻ tâm sự dân văn phòng, góc làm việc chân thật sau giờ hành chính, xây dựng Brand Love tự nhiên.',
    url: SOCIAL_LINKS.threads,
    color: '#181615',
    bgLight: '#F5F5F4',
    cta: 'Kết nối Threads →'
  },
  {
    id: 'googlemaps',
    name: '8. Google Business Profile',
    handle: 'Kho Avenoa TP.HCM',
    badge: 'Xác Thực Tín Nhiệm & Địa Điểm',
    desc: 'Hiển thị minh bạch địa chỉ kho hàng TP.HCM, hotline và đánh giá trên Google Maps để xóa bỏ nghi ngại về shop mới.',
    url: SOCIAL_LINKS.googleMaps,
    color: '#2E7D32',
    bgLight: '#F1F8E9',
    cta: 'Xem Google Maps →'
  }
];

function formatCurrency(val) {
  return Number(val || 0).toLocaleString('vi-VN') + ' ₫';
}

const Icons = {
  ArrowRight: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  ),
  Bag: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  User: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Heart: ({ filled }) => (
    <svg className="w-4 h-4" fill={filled ? '#B35D43' : 'none'} stroke={filled ? '#B35D43' : 'currentColor'} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  Menu: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
};

// Component hiển thị ảnh thông minh: Tự động dùng ảnh dự phòng hoặc SVG Kunst nếu ảnh lỗi
function SmartImage({ src, fallback, alt, className }) {
  const defaultSvg = createArtworkSvgDataUri('AVENOA DECOR', 'NƠI CĂN PHÒNG ÔM TRỌN MỌI CẢM XÚC', '#EFEAE1', '#B35D43', 1);
  const [imgSrc, setImgSrc] = useState(src || fallback || defaultSvg);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setImgSrc(src || fallback || defaultSvg);
    setTriedFallback(false);
  }, [src, fallback]);

  return (
    <img
      src={imgSrc}
      alt={alt || 'Avenoa Decor'}
      loading="lazy"
      className={className}
      onError={() => {
        if (!triedFallback && fallback && imgSrc !== fallback) {
          setTriedFallback(true);
          setImgSrc(fallback);
        } else if (imgSrc !== defaultSvg) {
          setImgSrc(defaultSvg);
        }
      }}
    />
  );
}

// Component Logo thương hiệu chuẩn Avenoa (hiển thị sắc nét 100% không bao giờ lỗi)
function BrandLogo({ className = "h-12" }) {
  return (
    <div className="flex items-center gap-3 select-none">
      <img
        src={LOGO_SVG_DATA_URI}
        alt="AVENOA Official Logo"
        className={`${className} w-auto object-contain rounded-sm border border-[#D5C5B5] shadow-sm`}
      />
      <div className="flex flex-col text-left">
        <span className="font-heading text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#3B2316] leading-none uppercase">
          AVENOA
        </span>
        <span className="text-[9px] tracking-[0.05em] text-[#869D7A] font-semibold mt-1">
          Nơi căn phòng ôm trọn mọi cảm xúc
        </span>
      </div>
    </div>
  );
}

// Component Hiệu ứng Cuộn 3D hai chiều
function ScrollReveal3D({ children, mode = 'tilt-up', className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transition: 'all 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
        opacity: visible ? 1 : 0.15,
        transform: visible
          ? 'perspective(1200px) rotateX(0deg) translateY(0px) scale(1)'
          : mode === 'tilt-up'
          ? 'perspective(1200px) rotateX(6deg) translateY(28px) scale(0.98)'
          : 'translateY(20px)'
      }}
      className={className}
    >
      {children}
    </div>
  );
}

// Component Khung Tranh 3D nghiêng theo góc chuột kèm ánh sáng kính Acrylic
function Tilt3DCard({ children, intensity = 14, className = '', onClick }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovering: false });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * intensity;
    const rx = (0.5 - py) * intensity;
    setTilt({ rx, ry, gx: px * 100, gy: py * 100, hovering: true });
  };

  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, hovering: false });
  };

  return (
    <div
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.hovering ? 1.02 : 1})`,
        transition: tilt.hovering ? 'transform 0.1s ease-out' : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
      }}
      className={`relative ${className}`}
    >
      {children}
      <div
        style={{
          background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.38), transparent 60%)`,
          opacity: tilt.hovering ? 1 : 0
        }}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
      />
    </div>
  );
}

// --- DANH MỤC 5 SẢN PHẨM LẺ & 2 GÓI COMBO CHUẨN BẢNG ĐỊNH GIÁ THỰC TẾ (FILE NHÓM 3) ---
const MOCK_PRODUCTS = [
  {
    id: 'sku-art-001',
    name: 'Tranh Treo Tường Canvas 30x40',
    subtitle: 'Khung gỗ thông tự nhiên • Vải Canvas dày sắc nét (4. Giá bán thực tế: 239.000₫)',
    category: 'Tranh treo tường',
    image: IMAGES.art3,
    fallback: IMAGES.artFallback3,
    lifestyle_image: IMAGES.room,
    gallery: [IMAGES.art3, IMAGES.art2, IMAGES.art4, IMAGES.art5, IMAGES.art6, IMAGES.art7, IMAGES.art8],
    galleryFallbacks: [IMAGES.artFallback3, IMAGES.artFallback2, IMAGES.artFallback4, IMAGES.artFallback5, IMAGES.artFallback6, IMAGES.artFallback7, IMAGES.artFallback8],
    price_b2c: 239000,
    original_price: 299000,
    cogs_breakdown: {
      importPrice: '63.200₫ (16 tệ × 3.950₫)',
      freight: '29.800₫ (Quy đổi thể tích 42×32×5cm / 6000 = 1.1kg)',
      packaging: '15.000₫ (Bọc màng co + Ốp 4 góc nhựa cứng + Hộp carton dẹt 3 lớp)',
      totalCogs: 108000,
      platformFee: '50.800₫ (20% + 3.000₫ phí hạ tầng)',
      mktFee: '28.700₫ (12%)',
      netProfit: '51.500₫ (21.5%)'
    },
    price_b2b_tiers: [{ min: 10, max: 20, price: 185000 }, { min: 21, max: 50, price: 165000 }, { min: 51, max: 9999, price: 145000 }],
    stock: 300,
    specs: { boxSize: '30 × 40 × 4 cm (Đóng hộp 42×32×5 cm)', weight: '0.5 kg (Quy đổi thể tích 1.1 kg)', material: 'Vải Canvas dày cao cấp, Khung gỗ tự nhiên, Ốp 4 góc nhựa bảo vệ' },
    description: `<p class="mb-4"><strong>Tranh Treo Tường Canvas 30×40cm</strong> thuộc bộ sưu tập Warm Minimalist của <strong>AVENOA – Nơi căn phòng ôm trọn mọi cảm xúc</strong>. Sản phẩm được chụp bộ ảnh thật 4 góc dưới ánh sáng tự nhiên (cam kết No 3D), giúp sưởi ấm góc bàn làm việc và truyền cảm hứng mỗi ngày sau giờ hành chính.</p>
    <h4 class="font-bold text-[#1A1817] uppercase tracking-wider text-xs mb-3">Minh bạch Cấu thành Giá bán & Quy cách Đóng gói Chống sốc 3 lớp:</h4>
    <ul class="list-disc pl-5 space-y-2 mb-6 text-[#4A453E]">
      <li><strong>Kích thước chuẩn:</strong> 30 × 40 × 4 cm (Sau đóng gói: 42 × 32 × 5 cm, trọng lượng quy đổi thể tích 1.1 kg).</li>
      <li><strong>Quy cách chống sốc (Định mức 15.000₫):</strong> Bọc màng co chống ẩm, ốp 4 góc nhựa cứng chống gãy khung và đóng trong hộp carton dẹt 3 lớp chuyên dụng (kiểm soát tỷ lệ bể vỡ &lt; 1,5%).</li>
      <li><strong>Cam kết Vàng từ Avenoa:</strong> Cho phép Đồng kiểm 100% tại điểm giao nhận + <strong>Dùng thử tại bàn 7 ngày – Không hợp gu hoàn tiền 100%</strong>.</li>
      <li><strong>Quà tặng kèm trong mỗi kiện hàng:</strong> Hộp phẳng phiu ướp hương thơm nhẹ, Thiệp cảm ơn viết tay tên riêng khách hàng kèm mã QR nhận lì xì 15.000₫ khi đánh giá 5 sao.</li>
    </ul>`,
    reviews: [{ user: 'Hạnh Nguyễn (NV Văn phòng, Q.3)', rating: 5, text: 'Tranh Canvas 30x40 đóng gói hộp dẹt 3 lớp có ốp 4 góc nhựa cực kỳ chắc chắn, mở hộp ra còn thơm phức và có thiệp viết tay tên mình!' }]
  },
  {
    id: 'sku-cal-001',
    name: 'Lịch Để Bàn Gỗ Tự Nhiên',
    subtitle: 'Sản phẩm Mồi Phá Băng • Flash Sale mở hàng 50 suất 55.000₫ (Giá thực tế: 69.000₫)',
    category: 'Lịch để bàn',
    image: IMAGES.calendar,
    lifestyle_image: IMAGES.room,
    price_b2c: 69000,
    flash_sale_price: 55000,
    cogs_breakdown: {
      importPrice: '23.700₫ (6 tệ × 3.950₫)',
      freight: '8.500₫ (0.25kg + ship nội địa TQ)',
      packaging: '4.800₫ (Xốp chống sốc đa lớp + Giấy tổ ong + Hộp carton cứng)',
      totalCogs: 37000,
      platformFee: '16.800₫ (20% + 3.000₫ phí hạ tầng)',
      mktFee: '8.300₫ (12%)',
      netProfit: '6.900₫ (10% - SP Mồi)'
    },
    price_b2b_tiers: [{ min: 10, max: 20, price: 55000 }, { min: 21, max: 50, price: 49000 }, { min: 51, max: 9999, price: 45000 }],
    stock: 500,
    specs: { boxSize: '20 × 12 × 5 cm (Đặt gọn cạnh Laptop 14 inch)', weight: '0.25 kg', material: 'Đế gỗ thông tự nhiên nguyên khối, giấy mỹ thuật dày' },
    description: `<p class="mb-4"><strong>Lịch Để Bàn Gỗ Tự Nhiên (69.000₫)</strong> là sản phẩm phễu mở hàng chiến lược trong chiến dịch <em>Siêu Hội 11.11: "Decor giá hời – Thả ga đổi mới"</em>. Đặc biệt từ 01/11 – 08/11, Avenoa tung <strong>50 suất trợ giá mở hàng chỉ 55.000₫</strong> (sát giá vốn hòa vốn) dành cho những khách hàng tiên phong đầu tiên.</p>
    <p>Đóng gói bọc xốp chống sốc đa lớp và chèn giấy tổ ong cố định trong hộp carton cứng, kèm thiệp viết tay và mã QR lì xì 15.000₫.</p>`,
    reviews: [{ user: 'Linh Nga (Freelancer, Hà Nội)', rating: 5, text: 'Săn được suất mở hàng 55k quá hời cho một chiếc lịch đế gỗ thông mịn đẹp như vậy.' }]
  },
  {
    id: 'sku-plant-001',
    name: 'Chậu Cây Mini Gốm',
    subtitle: 'Chậu gốm men mộc Warm Minimalist • Thanh lọc góc làm việc (Giá thực tế: 109.000₫)',
    category: 'Chậu cây mini',
    image: IMAGES.plant,
    lifestyle_image: IMAGES.room,
    price_b2c: 109000,
    cogs_breakdown: {
      importPrice: '35.500₫ (9 tệ × 3.950₫)',
      freight: '12.500₫ (0.4kg + ship nội địa TQ)',
      packaging: '7.000₫ (Xốp chống sốc đa lớp + Giấy tổ ong + Hộp carton cứng)',
      totalCogs: 55000,
      platformFee: '24.800₫ (20% + 3.000₫)',
      mktFee: '13.000₫ (12%)',
      netProfit: '16.200₫ (15%)'
    },
    price_b2b_tiers: [{ min: 10, max: 20, price: 89000 }, { min: 21, max: 50, price: 79000 }, { min: 51, max: 9999, price: 69000 }],
    stock: 400,
    specs: { boxSize: '12 × 12 × 18 cm', weight: '0.4 kg', material: 'Chậu gốm sứ men mộc tông Trắng kem / Xanh rêu' },
    description: `<p><strong>Chậu Cây Mini Gốm (109.000₫)</strong> mang sắc xanh rêu dịu mắt vào bàn làm việc, kết hợp hài hòa với tông trắng kem và nâu gỗ để giảm căng thẳng thị giác sau ngày dài chạy deadline.</p>`,
    reviews: [{ user: 'Tuấn Trần (Chuyên viên IT, TP.HCM)', rating: 5, text: 'Chậu gốm men mộc cầm nặng tay, đóng gói giấy tổ ong rất kỹ không sợ vỡ.' }]
  },
  {
    id: 'sku-clock-001',
    name: 'Đồng Hồ Để Bàn Tối Giản',
    subtitle: 'Kim trôi tĩnh lặng tuyệt đối • Phong cách Bắc Âu ấm áp (Giá thực tế: 219.000₫)',
    category: 'Đồng hồ để bàn',
    image: IMAGES.clock,
    lifestyle_image: IMAGES.room,
    price_b2c: 219000,
    cogs_breakdown: {
      importPrice: '79.000₫ (20 tệ × 3.950₫)',
      freight: '15.000₫ (0.5kg + ship nội địa TQ)',
      packaging: '10.000₫ (Mút xốp dày định hình + Quấn xốp nổ 3 lớp)',
      totalCogs: 104000,
      platformFee: '46.800₫ (20% + 3.000₫)',
      mktFee: '26.300₫ (12%)',
      netProfit: '41.900₫ (19%)'
    },
    price_b2b_tiers: [{ min: 10, max: 20, price: 175000 }, { min: 21, max: 50, price: 159000 }, { min: 51, max: 9999, price: 142000 }],
    stock: 200,
    specs: { boxSize: '16 × 16 × 7 cm', weight: '0.5 kg', material: 'Viền gỗ ấm áp, mặt kính trong chống lóa, máy kim trôi êm ái' },
    description: `<p><strong>Đồng Hồ Để Bàn (219.000₫)</strong> vận hành với bộ máy kim trôi tĩnh lặng tuyệt đối, cố định trong hộp bằng mút xốp dày định hình và quấn bubble wrap 3 lớp an toàn.</p>`,
    reviews: [{ user: 'Quốc Đạt (Designer, Đà Nẵng)', rating: 5, text: 'Đồng hồ để bàn kim trôi êm ru, đặt cạnh màn hình nhìn cực kỳ hợp tông gỗ.' }]
  },
  {
    id: 'sku-lamp-001',
    name: 'Đèn Bàn Ấm Áp Warm Minimalist',
    subtitle: 'Ánh sáng vàng ấm dịu mắt • Điểm tựa bình yên mỗi tối (Giá thực tế: 379.000₫)',
    category: 'Đèn bàn',
    image: IMAGES.lamp,
    lifestyle_image: IMAGES.room,
    price_b2c: 379000,
    cogs_breakdown: {
      importPrice: '126.400₫ (32 tệ × 3.950₫)',
      freight: '38.600₫ (Hàng nặng & cồng kềnh quy đổi 1.5kg)',
      packaging: '15.000₫ (Mút xốp dày định hình + Xốp nổ 3 lớp bảo vệ bóng đèn)',
      totalCogs: 180000,
      platformFee: '78.800₫ (20% + 3.000₫)',
      mktFee: '45.500₫ (12%)',
      netProfit: '74.700₫ (19.7%)'
    },
    price_b2b_tiers: [{ min: 10, max: 20, price: 299000 }, { min: 21, max: 50, price: 279000 }, { min: 51, max: 9999, price: 255000 }],
    stock: 180,
    specs: { boxSize: '38 × 20 × 20 cm (Quy đổi 1.5 kg)', weight: '1.5 kg', material: 'Thân gỗ & hợp kim sơn tĩnh điện màu kem ấm, ánh sáng 3000K' },
    description: `<p><strong>Đèn Bàn Avenoa (379.000₫)</strong> mang ánh sáng vàng ấm áp bảo vệ thị lực, xóa tan sự mệt mỏi sau giờ hành chính. Khách hàng được cắm thử nguồn điện kiểm tra trực tiếp khi đồng kiểm và dùng thử tại bàn 7 ngày.</p>`,
    reviews: [{ user: 'Minh Hoàng (Quản lý dự án, Q.7)', rating: 5, text: 'Ánh sáng vàng ấm rất dịu mắt, shop cho đồng kiểm cắm điện thử ngay lúc nhận hàng nên cực kỳ yên tâm.' }]
  },
  {
    id: 'sku-combo-003',
    name: 'Combo 3 Món "Góc Nhỏ Tinh Tế"',
    subtitle: 'Gồm: Lịch gỗ (69K) + Chậu cây gốm (109K) + Tranh Canvas 30x40 (239K) • Tiết kiệm 48.000₫',
    category: 'Gói Combo 11.11',
    image: IMAGES.room,
    lifestyle_image: IMAGES.room,
    price_b2c: 369000,
    original_price: 417000,
    price_b2b_tiers: [{ min: 5, max: 15, price: 325000 }, { min: 16, max: 50, price: 299000 }, { min: 51, max: 9999, price: 279000 }],
    stock: 150,
    specs: { boxSize: 'Gom chung 1 kiện chống sốc 3 lớp', weight: '1.75 kg', material: 'Bộ 3 món phối sẵn chuẩn 3 tông màu: Trắng kem – Xanh rêu – Nâu gỗ' },
    description: `<p><strong>Combo 3 Món "Góc Nhỏ Tinh Tế" (369.000₫ – Giá lẻ 417.000₫)</strong> giúp bạn tiết kiệm ngay <strong>48.000₫</strong> mà không phải đau đầu suy nghĩ cách phối màu giữa Lịch để bàn gỗ, Chậu cây mini gốm và Tranh treo tường Canvas 30×40cm.</p>`,
    reviews: [{ user: 'Thảo Vy (Account Executive)', rating: 5, text: 'Mua Combo 3 món vừa rẻ hơn mua lẻ 48k lại còn áp thêm được Voucher Tiên Phong 50k!' }]
  },
  {
    id: 'sku-combo-005',
    name: 'Combo Full 5 Món "Trọn Vẹn Cảm Xúc"',
    subtitle: 'Trọn bộ: Lịch gỗ + Chậu cây + Đồng hồ + Tranh Canvas + Đèn bàn • Tiết kiệm 116.000₫',
    category: 'Gói Combo 11.11',
    image: IMAGES.heroMain,
    lifestyle_image: IMAGES.room,
    price_b2c: 899000,
    original_price: 1015000,
    price_b2b_tiers: [{ min: 5, max: 15, price: 780000 }, { min: 16, max: 50, price: 730000 }, { min: 51, max: 9999, price: 680000 }],
    stock: 100,
    specs: { boxSize: 'Thùng quà lớn ướp hương thơm + Thiệp viết tay', weight: '3.75 kg', material: 'Full 5 món đồng bộ Warm Minimalist (Lịch + Cây + Đồng hồ + Tranh + Đèn)' },
    description: `<p><strong>Combo Full 5 Món "Trọn Vẹn Cảm Xúc" (899.000₫ – Giá mua lẻ 1.015.000₫)</strong> là giải pháp lột xác toàn diện góc làm việc của Avenoa trong dịp Siêu Hội 11.11. Khách hàng <strong>tiết kiệm ngay 116.000₫</strong>, được áp thêm Voucher Tiên Phong 50.000₫ và hưởng trọn đặc quyền Dùng thử tại bàn 7 ngày hoàn tiền 100%.</p>`,
    reviews: [{ user: 'Hoàng Nam (Senior Developer)', rating: 5, text: 'Combo 5 món 899k bày lên bàn nhìn đồng bộ từ màu gỗ đến ánh đèn, tiết kiệm được hơn trăm ngàn so với mua lẻ.' }]
  }
];

// --- MOCK BLOGS (BÁM SÁT 5 CHỦ ĐỀ NỘI DUNG TRONG FILE NHÓM 3) ---
const MOCK_BLOGS = [
  { 
    id: 1, 
    title: 'Chủ đề 1 (25%): Biến Hình Góc Bàn Làm Việc & Công Thức Phối 3 Tông Màu Trắng Kem – Xanh Rêu – Nâu Gỗ', 
    category: 'Cách Trang Trí Phòng', 
    image: IMAGES.lamp, 
    date: '25 Tháng 10, 2026',
    readTime: '5 phút đọc',
    excerpt: 'Khám phá quy trình biến hình góc làm việc từ bừa bộn thành gọn gàng (Before/After) với bộ 5 món Warm Minimalist của Avenoa cho căn phòng diện tích nhỏ.',
    content: `<p class="mb-4">Sau một ngày dài kiệt sức vì giải quyết hàng tá công việc, một góc bàn bừa bộn và thiếu ánh sáng sẽ khiến bạn càng thêm căng thẳng. Trong Giai đoạn 1 (21/10 – 31/10), Avenoa giới thiệu công thức phối màu <strong>Warm Minimalist</strong> bất bại: <strong>Trắng kem – Xanh rêu – Nâu gỗ</strong>.</p>
    <h4 class="font-bold text-lg mt-6 mb-2 text-[#1A1817]">1. Sự đồng bộ của bộ 5 món Avenoa</h4>
    <p class="mb-4">Không cần lướt hàng chục shop khác nhau và sợ mua lẻ về bị lệch tông, gói <strong>Combo Full 5 món "Trọn Vẹn Cảm Xúc" (899.000₫)</strong> đã được cân chỉnh tỷ lệ hoàn hảo giữa Đèn bàn (379K), Tranh Canvas 30×40 (239K), Đồng hồ để bàn (219K), Chậu cây mini gốm (109K) và Lịch gỗ (69K).</p>`
  },
  { 
    id: 2, 
    title: 'Chủ đề 3 (15%): Đối Chiếu Bộ Ảnh Thật Tự Chụp 4 Góc (No 3D) & Kiểm Chứng Thả Rơi Hộp Chống Sốc 3 Lớp', 
    category: 'So Sánh Chất Lượng', 
    image: IMAGES.artFallback3, 
    date: '02 Tháng 11, 2026',
    readTime: '4 phút đọc',
    excerpt: 'Xóa bỏ hoàn toàn nỗi sợ "hàng trên mạng khác xa thực tế": Xem cận cảnh vân gỗ tự nhiên, men gốm, vải Canvas dày và quy trình đóng gói 4 góc nhựa tại kho TP.HCM.',
    content: `<p class="mb-4">Tệp khách hàng văn phòng 23–40 tuổi rất ghét mua phải hàng gia công rẻ tiền khác xa ảnh dựng 3D. Tại Avenoa, 100% sản phẩm đều có <strong>bộ ảnh thật tự chụp 4 góc đặt cạnh Laptop 14 inch và cốc nước</strong> để bạn ước lượng chính xác tỷ lệ trong 30 giây.</p>
    <p class="mb-4">Đặc biệt, mỗi bức Tranh Canvas 30×40cm đều được bọc màng co, ốp 4 góc nhựa cứng và đóng hộp carton dẹt 3 lớp (định mức 15.000₫) giúp kiểm soát tỷ lệ bể vỡ dưới 1,5%.</p>`
  },
  { 
    id: 3, 
    title: 'Chủ đề 4 & 5: Chính Sách "Dùng Thử Tại Bàn 7 Ngày – Hoàn Tiền 100%" & Siêu Hội 11.11 Decor Giá Hời', 
    category: 'Chiến Dịch 11.11', 
    image: IMAGES.plant, 
    date: '09 Tháng 11, 2026',
    readTime: '6 phút đọc',
    excerpt: 'Vì sao một thương hiệu mới như Avenoa dám cho khách hàng đồng kiểm cắm thử điện và đặt lên bàn dùng thử suốt 7 ngày không hợp gu vẫn hoàn tiền 100%?',
    content: `<p class="mb-4">Để xóa bỏ hoàn toàn tâm lý sợ làm "chuột bạch" khi mua ở shop mới, <strong>AVENOA – Nơi căn phòng ôm trọn mọi cảm xúc</strong> chuyển 100% rủi ro về phía mình: Bạn được đồng kiểm thoải mái và đặt lên bàn dùng thử 7 ngày. Ngay cả khi hàng không lỗi nhưng bạn thấy màu tranh hay ánh sáng đèn chưa hợp phòng, Avenoa vẫn đổi mẫu hoặc hoàn tiền 100% trong 24h!</p>`
  }
];

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('sku-art-001');
  const [selectedBlogId, setSelectedBlogId] = useState(1);
  const [userRole, setUserRole] = useState('guest');
  const [currentUser, setCurrentUser] = useState(null);
  const [cart, setCart] = useState([{ ...MOCK_PRODUCTS[6], qty: 1 }]);
  const [wishlist, setWishlist] = useState(['sku-art-001']);
  const [toastMessage, setToastMessage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3600);
  };

  const navigateTo = (view, id = null) => {
    if (view === 'detail' && id) setSelectedProductId(id);
    if (view === 'blog-detail' && id) setSelectedBlogId(id);
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProductPrice = (product, qty = 1) => {
    if (!product) return 0;
    if (userRole.startsWith('B2B')) {
      const tiers = product.price_b2b_tiers || [];
      const matched = tiers.find(t => qty >= t.min && qty <= t.max) || tiers[0];
      const baseB2B = matched ? matched.price : Math.round(product.price_b2c * 0.8);
      if (userRole === 'B2B_Gold') return Math.round(baseB2B * 0.92);
      if (userRole === 'B2B_Platinum') return Math.round(baseB2B * 0.85);
      if (userRole === 'B2B_Dropship') return Math.round(product.price_b2c * 0.82);
      return baseB2B;
    }
    if (userRole === 'B2C_Active') return Math.round(product.price_b2c * 0.95);
    return product.price_b2c;
  };

  const addToCart = (item) => {
    setCart(prev => {
      const idx = prev.findIndex(x => x.id === item.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx].qty += item.qty || 1;
        return updated;
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
    showToast(`Đã thêm "${item.name}" vào giỏ hàng!`);
  };

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const totalCartItems = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181615] font-sans selection:bg-[#B35D43] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
        .font-heading { font-family: 'Newsreader', Georgia, serif; }
        .font-sans { font-family: 'Plus Jakarta Sans', -apple-system, sans-serif; }
        .font-mono-tech { font-family: 'JetBrains Mono', monospace; }
        .frame-3d-mdf {
          box-shadow: 0 22px 44px -12px rgba(24,22,21,0.32), 0 0 0 8px #1E1C1A, 0 0 0 10px #D5CFC4;
        }
        @keyframes marqueeMove {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marqueeMove 32s linear infinite;
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-page-enter {
          animation: pageEnter 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Thông báo nổi Toast */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#181615] text-white px-5 py-3.5 shadow-2xl border-l-4 border-[#B35D43] text-xs font-medium flex items-center gap-3 max-w-sm">
          <span className="w-2 h-2 rounded-full bg-[#869D7A] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER KIẾN TRÚC TỐI GIẢN */}
      <header className="bg-[#F6F3EC]/95 backdrop-blur-xl border-b border-[#DED9CE] sticky top-0 z-40 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[11px] uppercase tracking-[0.12em] font-semibold text-[#4A453E]">
            {[
              { id: 'home', label: 'Trang chủ' },
              { id: 'campaign-1111', label: '🔥 Siêu Hội 11.11' },
              { id: 'catalog', label: '5 Sản phẩm & Combo' },
              { id: 'lookbook', label: 'Phối phòng 3D' },
              { id: 'gifting', label: 'Avenoa Business' },
              { id: 'blog', label: '5 Chủ đề Nội dung' },
              { id: 'about', label: 'Hồ sơ & Pháp lý' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`py-1.5 transition-colors whitespace-nowrap ${
                  currentView === item.id
                    ? 'text-[#181615] font-bold border-b-2 border-[#B35D43]'
                    : item.id === 'campaign-1111'
                    ? 'text-[#B35D43] font-bold hover:text-[#181615]'
                    : 'hover:text-[#B35D43]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={() => navigateTo('home')} className="focus:outline-none">
            <BrandLogo className="h-11" />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo(currentUser ? 'dashboard' : 'auth')}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 border border-[#DED9CE] bg-white text-xs font-semibold hover:border-[#B35D43] transition-colors"
            >
              <Icons.User />
              <span>{currentUser ? currentUser.name : 'Đăng nhập / B2B'}</span>
            </button>

            <button
              onClick={() => navigateTo('cart')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#181615] text-white text-xs font-semibold hover:bg-[#B35D43] transition-colors"
            >
              <Icons.Bag />
              <span>Giỏ ({totalCartItems})</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 border border-[#DED9CE] bg-white"
            >
              <Icons.Menu />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F6F3EC] border-t border-[#DED9CE] px-6 py-6 space-y-3 shadow-xl">
            {[
              { id: 'home', label: '01 / Trang chủ: Nơi căn phòng ôm trọn mọi cảm xúc' },
              { id: 'campaign-1111', label: '02 / 🔥 Landing Page Siêu Hội 11.11 (Nhận Voucher 50K)' },
              { id: 'catalog', label: '03 / 5 Sản phẩm & Gói Combo (69K – 899K)' },
              { id: 'lookbook', label: '04 / Phối phòng 3D & Bóc tách Combo' },
              { id: 'gifting', label: '05 / Avenoa Business & Quà tặng cá nhân hóa' },
              { id: 'auth', label: '06 / Cổng Đăng nhập B2C & 4 Đối tác B2B' },
              { id: 'cart', label: '07 / Giỏ hàng & Thanh toán (COD / MB Bank / MoMo)' },
              { id: 'blog', label: '08 / Góc cảm hứng (5 Chủ đề Nội dung)' },
              { id: 'about', label: '09 / Câu chuyện thương hiệu, Ngân sách & Pháp lý' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className="block w-full text-left py-2.5 text-xs uppercase tracking-[0.16em] font-semibold text-[#181615] hover:text-[#B35D43] border-b border-[#E6E1D8]/60"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main key={currentView} className="animate-page-enter">
        {currentView === 'home' && (
          <HomePage
            role={userRole}
            scrollY={scrollY}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            getProductPrice={getProductPrice}
            onToast={showToast}
          />
        )}
        {currentView === 'campaign-1111' && (
          <Campaign1111LandingPage
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            onToast={showToast}
          />
        )}
        {currentView === 'lookbook' && (
          <LookbookBuilderPage
            role={userRole}
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            onToast={showToast}
            getProductPrice={getProductPrice}
          />
        )}
        {currentView === 'gifting' && (
          <BespokeGiftingPage
            onNavigate={navigateTo}
            onAddToCart={addToCart}
            onToast={showToast}
          />
        )}
        {currentView === 'catalog' && (
          <CatalogPage
            role={userRole}
            onSelect={(id) => navigateTo('detail', id)}
            onAddToCart={addToCart}
            onBuyNow={(item) => {
              addToCart(item);
              navigateTo('checkout');
            }}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            getProductPrice={getProductPrice}
          />
        )}
        {currentView === 'detail' && (
          <ProductDetailPage
            product={MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0]}
            role={userRole}
            getProductPrice={getProductPrice}
            onAddToCart={addToCart}
            onBuyNow={(item) => {
              addToCart(item);
              navigateTo('checkout');
            }}
            onNavigate={navigateTo}
          />
        )}
        {currentView === 'cart' && (
          <CartPage
            cart={cart}
            setCart={setCart}
            getProductPrice={getProductPrice}
            onNavigate={navigateTo}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutPage
            cart={cart}
            setCart={setCart}
            getProductPrice={getProductPrice}
            onNavigate={navigateTo}
            onToast={showToast}
          />
        )}
        {currentView === 'auth' && (
          <AuthPage
            onSuccess={(userObj, roleCode) => {
              setCurrentUser(userObj);
              setUserRole(roleCode);
              showToast(`Chào mừng ${userObj.name} đã đăng nhập!`);
              navigateTo('dashboard');
            }}
            onToast={showToast}
          />
        )}
        {currentView === 'dashboard' && (
          <DashboardPage
            user={currentUser}
            role={userRole}
            setRole={setUserRole}
            onAddToCart={addToCart}
            onNavigate={navigateTo}
            onToast={showToast}
            onLogout={() => {
              setCurrentUser(null);
              setUserRole('guest');
              navigateTo('home');
            }}
          />
        )}
        {currentView === 'blog' && (
          <BlogListPage
            onSelectBlog={(id) => navigateTo('blog-detail', id)}
            onNavigate={navigateTo}
          />
        )}
        {currentView === 'blog-detail' && (
          <BlogDetailPage
            blog={MOCK_BLOGS.find(b => b.id === selectedBlogId) || MOCK_BLOGS[0]}
            onNavigate={navigateTo}
          />
        )}
        {currentView === 'about' && <AboutPage onNavigate={navigateTo} />}
        {currentView === 'showroom' && <ShowroomPage />}
      </main>

      {/* Cụm Nút Liên hệ Đa Kênh & Robot AI tự động góc phải */}
      <OmnichannelWidget onToast={showToast} onNavigate={navigateTo} />

      {/* Footer */}
      <Footer onNavigate={navigateTo} onToast={showToast} />
    </div>
  );
}

// =========================================================================
// TRANG LANDING PAGE CHIẾN DỊCH SIÊU HỘI 11.11: "DECOR GIÁ HỜI – THẢ GA ĐỔI MỚI" (THEO FILE NHÓM 3)
// =========================================================================
function Campaign1111LandingPage({ onNavigate, onAddToCart, onToast }) {
  const [leadForm, setLeadForm] = useState({ name: '', contact: '', roomNote: '' });
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  const calendarItem = MOCK_PRODUCTS.find(p => p.id === 'sku-cal-001') || MOCK_PRODUCTS[1];
  const combo3Item = MOCK_PRODUCTS.find(p => p.id === 'sku-combo-003') || MOCK_PRODUCTS[5];
  const combo5Item = MOCK_PRODUCTS.find(p => p.id === 'sku-combo-005') || MOCK_PRODUCTS[6];

  const handleClaimVoucher = (e) => {
    e.preventDefault();
    if (!leadForm.contact.trim()) return;
    setVoucherClaimed(true);
    onToast('Chúc mừng! Bạn đã nhận mã Voucher Tiên Phong 50.000₫ (Mã: TIENPHONG50K)');
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-16">
      <ScrollReveal3D mode="tilt-up">
        <div className="bg-[#181615] text-[#F6F3EC] p-8 sm:p-14 border border-[#2E2A27] grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#B35D43] text-white px-3.5 py-1.5 text-[11px] font-mono-tech font-bold uppercase tracking-widest">
              <span>CHIẾN DỊCH MEGA SALE • 21/10 – 15/11 (26 NGÀY)</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl text-white font-semibold leading-tight">
              Siêu Hội 11.11: <br />
              <span className="italic font-normal text-[#E5A992]">“Decor giá hời – Thả ga đổi mới”</span>
            </h1>
            <p className="text-sm sm:text-base text-[#D6D1C7] leading-relaxed max-w-2xl">
              <strong>AVENOA – Nơi căn phòng ôm trọn mọi cảm xúc.</strong> Dành riêng cho 200 khách hàng tiên phong đầu tiên: Sở hữu trọn bộ 5 vật phẩm Warm Minimalist (Trắng kem – Xanh rêu – Nâu gỗ) với mức giá sát vốn, áp chồng Voucher Tiên Phong 50.000₫ và đặc quyền <strong>Dùng thử tại bàn 7 ngày – Không hợp gu hoàn tiền 100%</strong>.
            </p>
            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <div className="bg-white/5 border border-white/15 p-3.5">
                <span className="text-[#869D7A] font-mono-tech font-bold block">3 KHUNG GIỜ VÀNG 11.11</span>
                <strong className="text-white text-base font-mono-tech">00:00 • 12:00 • 20:00</strong>
              </div>
              <div className="bg-white/5 border border-white/15 p-3.5">
                <span className="text-[#869D7A] font-mono-tech font-bold block">DEAL MỒI MỞ HÀNG</span>
                <strong className="text-[#E5A992] text-base font-mono-tech">Lịch Gỗ 55.000₫ (50 suất)</strong>
              </div>
              <div className="bg-white/5 border border-white/15 p-3.5">
                <span className="text-[#869D7A] font-mono-tech font-bold block">COMBO 5 MÓN CHỦ LỰC</span>
                <strong className="text-white text-base font-mono-tech">899.000₫ (Tiết kiệm 116K)</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF8F5] text-[#181615] p-6 sm:p-8 border-2 border-[#B35D43] shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#DED9CE] pb-3">
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#B35D43]">
                Độc quyền Landing Page 11.11 (300 Suất)
              </span>
              <span className="bg-[#5E6F52] text-white text-[10px] font-bold px-2 py-0.5">Còn 42 suất</span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#181615]">
              Nhận Ngay Voucher Tiên Phong 50.000₫
            </h3>
            <p className="text-xs text-[#5A544C] leading-relaxed">
              Để lại Email hoặc Số điện thoại Zalo để hệ thống tự động gửi mã giảm <strong>50.000₫</strong> (áp dụng cho gói Combo) kèm bản phối 5 món vào góc bàn thật và nhắc lịch săn sale đúng 3 khung giờ vàng 11.11!
            </p>

            {voucherClaimed ? (
              <div className="p-5 bg-[#5E6F52]/15 border-2 border-[#5E6F52] text-center space-y-2">
                <div className="text-xs font-bold uppercase text-[#5E6F52]">✓ Đã kích hoạt mã ưu đãi của bạn</div>
                <div className="font-mono-tech text-2xl font-bold text-[#181615] tracking-widest bg-white py-2 border border-[#5E6F52]">
                  TIENPHONG50K
                </div>
                <p className="text-[11px] text-[#4A453E]">
                  Nhập mã <strong>TIENPHONG50K</strong> ở trang Thanh toán hoặc bấm mua ngay gói Combo bên dưới!
                </p>
              </div>
            ) : (
              <form onSubmit={handleClaimVoucher} className="space-y-3 text-xs">
                <input
                  type="text"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  placeholder="Họ và tên của bạn *"
                  className="w-full border border-[#D5CFC4] bg-white p-3 outline-none focus:border-[#B35D43]"
                />
                <input
                  type="text"
                  required
                  value={leadForm.contact}
                  onChange={(e) => setLeadForm({ ...leadForm, contact: e.target.value })}
                  placeholder="Số điện thoại Zalo hoặc Email làm việc *"
                  className="w-full border border-[#D5CFC4] bg-white p-3 outline-none focus:border-[#B35D43]"
                />
                <input
                  type="text"
                  value={leadForm.roomNote}
                  onChange={(e) => setLeadForm({ ...leadForm, roomNote: e.target.value })}
                  placeholder="Màu bàn/tường hiện tại của bạn (để nhận tư vấn 1:1)"
                  className="w-full border border-[#D5CFC4] bg-white p-3 outline-none focus:border-[#B35D43]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#B35D43] text-white py-3.5 font-bold uppercase tracking-widest hover:bg-[#181615] transition-colors shadow-md"
                >
                  Nhận Voucher Tiên Phong 50.000₫ Ngay →
                </button>
              </form>
            )}
          </div>
        </div>
      </ScrollReveal3D>

      <div className="space-y-6">
        <div className="border-b border-[#DED9CE] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
              CHIẾN LƯỢC SẢN PHẨM MỒI & KIẾN TRÚC GÓI COMBO (TĂNG AOV)
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#181615] mt-1">
              3 Offer Chủ Lực Trong Chiến Dịch Siêu Hội 11.11
            </h2>
          </div>
          <span className="text-xs text-[#5A544C]">
            Áp chồng: Giá giảm Combo + Voucher Tiên Phong 50K + Voucher Xtra (5,5%) & Freeship Xtra (5%)
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border-2 border-[#DED9CE] p-6 flex flex-col justify-between space-y-5 hover:border-[#B35D43] transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-[#181615] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 uppercase">
                  DEAL MỒI MỞ HÀNG (01/11 – 08/11)
                </span>
                <span className="text-xs font-bold text-[#B35D43]">Giới hạn 50 suất</span>
              </div>
              <div className="aspect-[16/10] bg-[#EAE5DC] overflow-hidden">
                <SmartImage src={calendarItem.image} alt={calendarItem.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-[#181615]">{calendarItem.name}</h3>
              <p className="text-xs text-[#5A544C] leading-relaxed">
                Giá bán thực tế 69.000₫ (Giá vốn nhập về TP.HCM + Hộp chống sốc 37.000₫ + Phí sàn 16.800₫). Trợ giá mở hàng <strong>55.000₫ hòa vốn</strong> để thu thập 40 đơn đánh giá 5 sao đầu tiên!
              </p>
            </div>
            <div className="pt-4 border-t border-[#E6E1D8] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#6E675F] line-through">Giá niêm yết: 69.000₫</span>
                <span className="font-mono-tech text-2xl font-bold text-[#B35D43]">55.000 ₫</span>
              </div>
              <button
                onClick={() => {
                  onAddToCart({ ...calendarItem, price_b2c: 55000, name: 'Lịch Để Bàn Gỗ (Suất Mở Hàng 55K)', qty: 1 });
                  onNavigate('checkout');
                }}
                className="w-full py-3.5 bg-[#181615] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B35D43] transition-colors"
              >
                Săn Suất Mở Hàng 55.000₫ →
              </button>
            </div>
          </div>

          <div className="bg-white border-2 border-[#5E6F52] p-6 flex flex-col justify-between space-y-5 shadow-md">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-[#5E6F52] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 uppercase">
                  COMBO 3 MÓN BÁN CHẠY
                </span>
                <span className="text-xs font-bold text-[#5E6F52]">Tiết kiệm 48.000₫</span>
              </div>
              <div className="aspect-[16/10] bg-[#EAE5DC] overflow-hidden">
                <SmartImage src={combo3Item.image} alt={combo3Item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-[#181615]">{combo3Item.name}</h3>
              <p className="text-xs text-[#5A544C] leading-relaxed">
                Bao gồm: <strong>01 Lịch để bàn gỗ (69K) + 01 Chậu cây mini gốm (109K) + 01 Tranh Canvas 30×40 (239K)</strong>. Phối sẵn chuẩn tông ấm áp, gom chung 1 kiện tiết kiệm phí ship.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E6E1D8] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#6E675F] line-through">Giá mua lẻ: 417.000₫</span>
                <span className="font-mono-tech text-2xl font-bold text-[#5E6F52]">369.000 ₫</span>
              </div>
              <button
                onClick={() => {
                  onAddToCart({ ...combo3Item, qty: 1 });
                  onNavigate('checkout');
                }}
                className="w-full py-3.5 bg-[#5E6F52] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#181615] transition-colors"
              >
                Chốt Combo 3 Món (369.000₫) →
              </button>
            </div>
          </div>

          <div className="bg-[#FAF6F2] border-2 border-[#B35D43] p-6 flex flex-col justify-between space-y-5 shadow-xl">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-[#B35D43] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 uppercase">
                  BEST VALUE • FULL 5 MÓN AVENOA
                </span>
                <span className="text-xs font-bold text-[#B35D43]">Tiết kiệm 116.000₫</span>
              </div>
              <div className="aspect-[16/10] bg-[#EAE5DC] overflow-hidden">
                <SmartImage src={combo5Item.image} alt={combo5Item.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-[#181615]">{combo5Item.name}</h3>
              <p className="text-xs text-[#5A544C] leading-relaxed">
                Trọn bộ 5 món: <strong>Lịch gỗ (69K) + Chậu cây gốm (109K) + Đồng hồ (219K) + Tranh Canvas 30×40 (239K) + Đèn bàn (379K)</strong>. Lột xác hoàn toàn góc làm việc chỉ trong 1 lần đặt!
              </p>
            </div>
            <div className="pt-4 border-t border-[#DED9CE] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#6E675F] line-through">Giá mua lẻ: 1.015.000₫</span>
                <span className="font-mono-tech text-2xl font-bold text-[#B35D43]">899.000 ₫</span>
              </div>
              <button
                onClick={() => {
                  onAddToCart({ ...combo5Item, qty: 1 });
                  onNavigate('checkout');
                }}
                className="w-full py-3.5 bg-[#B35D43] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#181615] transition-colors shadow-md"
              >
                Chốt Full Combo 5 Món (899.000₫) →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng Định Giá Thực Tế */}
      <div className="bg-white border border-[#DED9CE] p-8 sm:p-10 space-y-6">
        <div className="border-b border-[#E6E1D8] pb-4">
          <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
            BẢNG ĐỊNH GIÁ THỰC TẾ 5 SẢN PHẨM (TỶ GIÁ 1 CNY = 3.950Đ • CƯỚC TQ-HCM 22K/KG • PHÍ SÀN SHOPEE 20% + 3K)
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#181615] mt-1">
            Minh Bạch Cơ Cấu Giá Vốn (COGS), Đóng Gói Chống Sốc & Giá Bán Thực Tế
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#181615] text-white font-mono-tech text-[10px] uppercase">
                <th className="p-3">Sản phẩm & Quy cách</th>
                <th className="p-3">1. Giá sỉ (1 tệ = 3.950₫)</th>
                <th className="p-3">2. Cước TQ-HCM (22k/kg)</th>
                <th className="p-3">3. Hộp carton & Xốp</th>
                <th className="p-3">TỔNG GIÁ VỐN (COGS)</th>
                <th className="p-3">4. Phí sàn (20% + 3k)</th>
                <th className="p-3">5. MKT & Voucher (12%)</th>
                <th className="p-3">Lợi nhuận ròng</th>
                <th className="p-3 text-right">GIÁ BÁN THỰC TẾ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6E1D8]">
              {[
                { name: '1. Lịch để bàn gỗ (0.25kg)', p1: '23.700₫ (6 tệ)', p2: '8.500₫', p3: '4.800₫', cogs: '37.000₫', fee: '16.800₫', mkt: '8.300₫', net: '6.900₫ (10% - SP Mồi)', price: '69.000₫' },
                { name: '2. Chậu cây mini gốm (0.4kg)', p1: '35.500₫ (9 tệ)', p2: '12.500₫', p3: '7.000₫', cogs: '55.000₫', fee: '24.800₫', mkt: '13.000₫', net: '16.200₫ (15%)', price: '109.000₫' },
                { name: '3. Đồng hồ để bàn (0.5kg)', p1: '79.000₫ (20 tệ)', p2: '15.000₫', p3: '10.000₫', cogs: '104.000₫', fee: '46.800₫', mkt: '26.300₫', net: '41.900₫ (19%)', price: '219.000₫' },
                { name: '4. Tranh Canvas 30x40 (Quy đổi 1.1kg)', p1: '63.200₫ (16 tệ)', p2: '29.800₫ (Thể tích)', p3: '15.000₫ (Ốp góc + hộp dẹt)', cogs: '108.000₫', fee: '50.800₫', mkt: '28.700₫', net: '51.500₫ (21.5%)', price: '239.000₫' },
                { name: '5. Đèn bàn (Quy đổi 1.5kg)', p1: '126.400₫ (32 tệ)', p2: '38.600₫ (Cồng kềnh)', p3: '15.000₫ (Mút xốp dày)', cogs: '180.000₫', fee: '78.800₫', mkt: '45.500₫', net: '74.700₫ (19.7%)', price: '379.000₫' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#FAF8F5]">
                  <td className="p-3 font-semibold text-[#181615]">{row.name}</td>
                  <td className="p-3 font-mono-tech">{row.p1}</td>
                  <td className="p-3 font-mono-tech">{row.p2}</td>
                  <td className="p-3 font-mono-tech">{row.p3}</td>
                  <td className="p-3 font-mono-tech font-bold text-[#181615]">{row.cogs}</td>
                  <td className="p-3 font-mono-tech">{row.fee}</td>
                  <td className="p-3 font-mono-tech">{row.mkt}</td>
                  <td className="p-3 font-mono-tech text-[#5E6F52] font-semibold">{row.net}</td>
                  <td className="p-3 font-mono-tech font-bold text-[#B35D43] text-right text-sm">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TRANG PHỐI PHÒNG TƯƠNG TÁC & TỰ TẠO COMBO TIẾT KIỆM
// =========================================================================
function LookbookBuilderPage({ onNavigate, onAddToCart, getProductPrice }) {
  const [selectedArtworkVariant, setSelectedArtworkVariant] = useState(0);
  const [selectedLighting, setSelectedLighting] = useState(MOCK_PRODUCTS[4]);
  const [selectedGreenery, setSelectedGreenery] = useState(MOCK_PRODUCTS[2]);
  const [selectedAccessory, setSelectedAccessory] = useState(MOCK_PRODUCTS[1]);

  const wallArt = MOCK_PRODUCTS[0];
  const rawTotal =
    getProductPrice(wallArt, 1) +
    getProductPrice(selectedLighting, 1) +
    getProductPrice(selectedGreenery, 1) +
    getProductPrice(selectedAccessory, 1);
  const comboPrice = Math.round(rawTotal * 0.88);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-10">
      <div className="border-b border-[#DED9CE] pb-5">
        <span className="text-xs font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
          INTERACTIVE 3D DESK BUILDER • TRẮNG KEM – XANH RÊU – NÂU GỖ
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-[#181615] mt-1">
          Phối Sẵn Góc Bàn Làm Việc Warm Minimalist
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-[#EFEAE1] border border-[#DED9CE] p-8 sm:p-12 min-h-[480px] flex flex-col justify-between relative">
          <div className="flex justify-between text-xs text-[#5A544C]">
            <span>Bối cảnh: Ánh sáng vàng ấm 3000K</span>
            <span className="font-mono-tech font-bold text-[#B35D43]">Tiết kiệm 12% khi ghép bộ</span>
          </div>

          <div className="my-8 grid sm:grid-cols-2 gap-6 items-center">
            <Tilt3DCard className="aspect-[4/5] bg-white p-3 frame-3d-mdf max-w-[230px] mx-auto">
              <SmartImage
                src={wallArt.gallery[selectedArtworkVariant]}
                fallback={wallArt.galleryFallbacks[selectedArtworkVariant]}
                alt="Tranh Canvas"
                className="w-full h-full object-cover"
              />
            </Tilt3DCard>
            <div className="grid grid-cols-2 gap-3">
              {[selectedLighting, selectedGreenery, selectedAccessory].map((item, i) => (
                <div key={i} className="bg-white p-2.5 border border-[#DED9CE] shadow-sm">
                  <div className="aspect-square overflow-hidden mb-2">
                    <SmartImage src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[11px] font-semibold line-clamp-1">{item.name}</div>
                  <div className="font-mono-tech text-xs text-[#B35D43] font-bold">{formatCurrency(item.price_b2c)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-[#DED9CE]">
            {wallArt.gallery.map((g, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedArtworkVariant(idx)}
                className={`w-10 h-12 border-2 overflow-hidden ${selectedArtworkVariant === idx ? 'border-[#B35D43]' : 'border-transparent opacity-60'}`}
              >
                <SmartImage src={g} fallback={wallArt.galleryFallbacks[idx]} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-5">
          <h3 className="font-heading text-2xl font-semibold">Tùy chỉnh các món trên bàn</h3>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider block">01. Chọn Đèn Bàn (379K) / Đồng Hồ (219K)</label>
            <div className="grid grid-cols-2 gap-2">
              {[MOCK_PRODUCTS[4], MOCK_PRODUCTS[3]].map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedLighting(p)}
                  className={`p-2.5 border text-left text-xs ${selectedLighting.id === p.id ? 'border-[#B35D43] bg-[#FAF6F2] font-bold' : 'border-[#DED9CE]'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider block">02. Chọn Lịch Gỗ (69K) / Đồng Hồ (219K)</label>
            <div className="grid grid-cols-2 gap-2">
              {[MOCK_PRODUCTS[1], MOCK_PRODUCTS[3]].map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedAccessory(p)}
                  className={`p-2.5 border text-left text-xs ${selectedAccessory.id === p.id ? 'border-[#B35D43] bg-[#FAF6F2] font-bold' : 'border-[#DED9CE]'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E6E1D8] space-y-2 text-xs">
            <div className="flex justify-between text-[#6E675F]">
              <span>Tổng giá lẻ 4 món:</span>
              <span className="line-through">{formatCurrency(rawTotal)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#181615]">
              <span>Giá ưu đãi ghép bộ (-12%):</span>
              <span className="font-mono-tech text-[#B35D43]">{formatCurrency(comboPrice)}</span>
            </div>
          </div>

          <button
            onClick={() => {
              onAddToCart({ ...wallArt, qty: 1 });
              onAddToCart({ ...selectedLighting, qty: 1 });
              onAddToCart({ ...selectedGreenery, qty: 1 });
              onAddToCart({ ...selectedAccessory, qty: 1 });
              onNavigate('checkout');
            }}
            className="w-full py-4 bg-[#181615] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B35D43] transition-colors"
          >
            Thêm Trọn Bộ Vào Giỏ & Thanh Toán →
          </button>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TRANG AVENOA BUSINESS & QUÀ TẶNG CÁ NHÂN HÓA MIỄN PHÍ
// =========================================================================
function BespokeGiftingPage({ onNavigate, onAddToCart, onToast }) {
  const [recipientName, setRecipientName] = useState('Nguyễn Minh Anh');
  const [cardMessage, setCardMessage] = useState('Chúc bạn luôn giữ được sự bình yên và nguồn cảm hứng ấm áp tại góc nhỏ của riêng mình.');
  const [companyLogo, setCompanyLogo] = useState('AVENOA PARTNER');

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-12">
      <div className="border-b border-[#DED9CE] pb-5">
        <span className="text-xs font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
          AVENOA BUSINESS (B2B) & KIỆN HÀNG CHUẨN QUÀ TẶNG CÁ NHÂN HÓA MIỄN PHÍ
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-[#181615] mt-1">
          Thiệp Cảm Ơn Viết Tay Tên Riêng & Đặt Sỉ Doanh Nghiệp (VAT)
        </h1>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-[#FAF6F2] border border-[#DED9CE] p-8 space-y-6">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
            XEM TRƯỚC THIỆP VIẾT TAY TRONG MỖI KIỆN HÀNG AVENOA
          </span>
          <div className="bg-white border-2 border-[#D5CFC4] p-8 shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-[#E6E1D8] pb-3">
              <span className="font-heading text-lg font-bold text-[#3D2B1F]">AVENOA — Nơi căn phòng ôm trọn mọi cảm xúc</span>
              <span className="text-[10px] font-mono-tech bg-[#5E6F52] text-white px-2 py-0.5">Ướp hương thơm nhẹ</span>
            </div>
            <p className="text-xs text-[#6E675F]">Thân gửi <strong className="text-[#181615] text-sm">{recipientName || 'Bạn'}</strong>,</p>
            <p className="font-heading italic text-lg text-[#181615] leading-relaxed">
              “{cardMessage}”
            </p>
            <div className="pt-4 border-t border-[#E6E1D8] flex items-center justify-between text-[11px]">
              <div>
                <strong className="text-[#B35D43] block">MÃ QR LÌ XÌ 15.000₫ ĐÁNH GIÁ 5 SAO</strong>
                <span className="text-[#5A544C]">Quét mã trên thiệp sau khi nhận hàng để nhận hoàn tiền 15.000₫</span>
              </div>
              <div className="px-3 py-1.5 bg-[#181615] text-[#E5A992] font-mono-tech text-xs font-bold">
                {companyLogo}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-[#DED9CE] p-8 space-y-5">
          <h3 className="font-heading text-2xl font-semibold">Cá nhân hóa miễn phí 100% đơn hàng</h3>
          <p className="text-xs text-[#5A544C] leading-relaxed">
            Khác với các shop trên thị trường thu thêm 15.000₫ – 30.000₫ tiền gói quà, 100% kiện hàng của Avenoa đều được chăm chút thủ công miễn phí: Hộp vuông vắn không móp góc, ướp hương thơm nhẹ, đính kèm Thiệp viết tay tên riêng và mã QR lì xì 15.000₫.
          </p>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold block mb-1">Tên người nhận ghi trên Thiệp cảm ơn:</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Lời nhắn gửi riêng:</label>
              <textarea
                rows={3}
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
              />
            </div>
            <div>
              <label className="font-bold block mb-1">Tên Doanh nghiệp / Khắc bảng đồng B2B (Nếu đặt sỉ):</label>
              <input
                type="text"
                value={companyLogo}
                onChange={(e) => setCompanyLogo(e.target.value)}
                className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => {
                onAddToCart({ ...MOCK_PRODUCTS[6], qty: 1 });
                onToast('Đã lưu nội dung Thiệp viết tay vào Combo Full 5 Món!');
                onNavigate('checkout');
              }}
              className="flex-1 bg-[#B35D43] text-white py-3.5 text-xs font-bold uppercase tracking-wider hover:bg-[#181615]"
            >
              Đặt Combo 5 Món Kèm Thiệp Này (899K) →
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="px-5 py-3.5 border border-[#181615] text-xs font-bold uppercase tracking-wider hover:bg-[#181615] hover:text-white"
            >
              Mở Cổng Sỉ B2B (Xuất VAT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TRANG CHỦ: BỐ CỤC TẠP CHÍ KIẾN TRÚC & KHÔNG GIAN 3D CHUẨN HỒ SƠ NHÓM 3
// =========================================================================
function HomePage({ scrollY = 0, onNavigate, onAddToCart, wishlist, toggleWishlist, getProductPrice }) {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [selectedArtworkIdx, setSelectedArtworkIdx] = useState(0);

  const hustleProduct = MOCK_PRODUCTS[0];
  const filteredProducts = MOCK_PRODUCTS.filter(p => activeCategory === 'Tất cả' || p.category === activeCategory);

  const artworkTitles = [
    '01. Cứ Đi Rồi Sẽ Đến — Tranh Canvas 30×40cm Khung Gỗ',
    '02. Đừng Chỉ Ước Mơ — Hãy bắt tay vào làm',
    '03. Đường Dài Mới Biết Ngựa Hay — Kiên trì bền bỉ',
    '04. Hãy Tìm Điều Bạn Yêu Thích — Cảm hứng mỗi ngày',
    '05. Thời Gian Của Bạn Là Hữu Hạn — Sống trọn từng khoảnh khắc',
    '06. Đừng Sợ Bắt Đầu Từ Con Số Không — Mầm xanh hy vọng',
    '07. Khám Phá Đại Dương — Bước ra khỏi vùng an toàn'
  ];

  return (
    <div className="pb-24 overflow-hidden">
      {/* 1. EDITORIAL HERO: CHUẨN SLOGAN "AVENOA - NƠI CĂN PHÒNG ÔM TRỌN MỌI CẢM XÚC" & SIÊU HỘI 11.11 */}
      <section className="border-b border-[#DED9CE] relative overflow-hidden">
        <div
          style={{
            transform: `translate3d(${-scrollY * 0.22}px, ${scrollY * 0.06}px, 0)`
          }}
          className="pointer-events-none select-none absolute bottom-4 left-0 whitespace-nowrap font-heading text-[100px] sm:text-[165px] font-semibold italic text-[#181615]/[0.035] leading-none"
        >
          AVENOA — Nơi căn phòng ôm trọn mọi cảm xúc
        </div>

        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-12 border-x border-[#DED9CE] relative z-10">
          <div className="lg:col-span-7 p-6 sm:p-12 lg:p-16 xl:p-20 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#DED9CE]">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] uppercase tracking-[0.16em] text-[#7A746B] pb-6 border-b border-[#E6E1D8]">
              <span className="flex items-center gap-2.5 text-[#B35D43] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#B35D43] animate-ping" />
                <span>Siêu Hội 11.11: “Decor giá hời – Thả ga đổi mới”</span>
              </span>
              <span className="font-mono-tech font-semibold text-[#5E6F52]">Warm Minimalist • B2C + B2B</span>
            </div>

            <div className="py-10 sm:py-12 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#EAE5DC] text-[#4A3525] text-[11px] font-mono-tech uppercase tracking-widest font-semibold">
                AVENOA • TRẮNG KEM – XANH RÊU – NÂU GỖ
              </div>
              <h1 className="font-heading text-4xl sm:text-6xl xl:text-[68px] text-[#181615] font-semibold leading-[1.06] tracking-tight">
                Nơi căn phòng <br />
                <span className="italic font-normal text-[#B35D43]">ôm trọn mọi cảm xúc.</span>
              </h1>

              <p className="text-[#4E4942] text-sm sm:text-[16px] leading-[1.8] max-w-xl font-normal">
                Chúng tôi tin rằng căn phòng không chỉ là bốn bức tường, mà là nơi chứng kiến mọi phiên bản của bạn. Bộ 5 vật phẩm trang trí <strong>Warm Minimalist</strong> của <strong className="font-semibold text-[#181615]">AVENOA</strong> (Lịch gỗ 69K, Chậu cây gốm 109K, Đồng hồ 219K, Tranh Canvas 239K, Đèn bàn 379K) luôn lặng lẽ hiện diện, đồng hành và sưởi ấm góc nhỏ bình yên nhất sau mỗi ngày dài.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('campaign-1111')}
                  className="bg-[#B35D43] text-white px-7 py-4 text-xs uppercase tracking-[0.16em] font-bold hover:bg-[#181615] transition-all duration-500 flex items-center gap-3 shadow-lg"
                >
                  <span>🔥 Vào Siêu Hội 11.11 (Nhận Voucher 50K)</span>
                  <Icons.ArrowRight />
                </button>
                <button
                  onClick={() => {
                    const combo5 = MOCK_PRODUCTS.find(p => p.id === 'sku-combo-005') || MOCK_PRODUCTS[0];
                    onAddToCart({ ...combo5, qty: 1 });
                    onNavigate('checkout');
                  }}
                  className="bg-[#181615] text-[#F6F3EC] px-6 py-4 text-xs uppercase tracking-[0.16em] font-semibold hover:bg-[#5E6F52] transition-all duration-300 shadow-md"
                >
                  Mua Combo Full 5 Món • 899.000₫ (-116K)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-8 border-t border-[#E6E1D8] text-xs">
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#869D7A] font-bold block mb-1">1. Xóa sổ rủi ro chuột bạch</span>
                <span className="font-heading text-base sm:text-lg font-semibold text-[#181615]">Dùng thử tại bàn 7 ngày – Hoàn tiền 100%</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#869D7A] font-bold block mb-1">2. Giá trải nghiệm mở hàng</span>
                <span className="font-heading text-base sm:text-lg font-semibold text-[#181615]">200 Khách tiên phong • Lịch gỗ 55K</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-[#869D7A] font-bold block mb-1">3. Kiện hàng chuẩn quà tặng</span>
                <span className="font-heading text-base sm:text-lg font-semibold text-[#B35D43]">Hộp ướp hương + Thiệp viết tay & QR 15K</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#EDE8DF] p-8 sm:p-12 flex flex-col justify-between items-center relative">
            <div className="w-full flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#6E675F] mb-4">
              <span className="font-semibold">100% Ảnh Thật 4 Góc (No 3D)</span>
              <span className="text-[#B35D43] font-bold">Tranh Canvas 30×40cm • 239.000₫</span>
            </div>

            <div className="my-auto py-4 w-full max-w-[290px] sm:max-w-[330px]">
              <Tilt3DCard
                intensity={16}
                onClick={() => onNavigate('detail', 'sku-art-001')}
                className="aspect-[4/5] bg-[#FAF8F5] p-4 cursor-pointer frame-3d-mdf mx-auto"
              >
                <div key={selectedArtworkIdx} className="w-full h-full overflow-hidden relative">
                  <SmartImage
                    src={hustleProduct.gallery[selectedArtworkIdx]}
                    fallback={hustleProduct.galleryFallbacks[selectedArtworkIdx]}
                    alt="Tranh Treo Tường Canvas 30x40 Avenoa"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Tilt3DCard>
              <p className="text-center font-heading italic text-base text-[#4A453E] mt-5">
                {artworkTitles[selectedArtworkIdx]}
              </p>
            </div>

            <div className="w-full pt-5 mt-2 border-t border-[#DAD3C6]">
              <div className="flex items-center justify-between text-[11px] mb-2.5">
                <span className="uppercase tracking-[0.14em] text-[#4A453E] font-semibold">
                  Chọn mẫu Tranh Canvas ({selectedArtworkIdx + 1}/7)
                </span>
                <button
                  onClick={() => onNavigate('detail', 'sku-art-001')}
                  className="text-[#B35D43] hover:underline font-semibold"
                >
                  Xem thông số & COGS →
                </button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {hustleProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedArtworkIdx(i)}
                    className={`aspect-[3/4] overflow-hidden border-2 transition-all duration-300 ${
                      selectedArtworkIdx === i
                        ? 'border-[#B35D43] scale-105 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <SmartImage src={img} fallback={hustleProduct.galleryFallbacks[i]} alt={`Mẫu ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DẢI CHỮ CHẠY VÔ TẬN */}
      <div className="border-b border-[#DED9CE] bg-[#181615] text-[#F6F3EC] py-3.5 overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-12 text-[11px] uppercase tracking-[0.22em] font-medium">
          {[1, 2].map(loop => (
            <React.Fragment key={loop}>
              <span>AVENOA — NƠI CĂN PHÒNG ÔM TRỌN MỌI CẢM XÚC</span>
              <span className="text-[#B35D43]">✦</span>
              <span>SIÊU HỘI 11.11: DECOR GIÁ HỜI – THẢ GA ĐỔI MỚI</span>
              <span className="text-[#869D7A]">✦</span>
              <span>LỊCH GỖ 69K (MỞ HÀNG 55K) • CHẬU CÂY 109K • ĐỒNG HỒ 219K • TRANH CANVAS 239K • ĐÈN BÀN 379K</span>
              <span className="text-[#B35D43]">✦</span>
              <span>COMBO 3 MÓN 369K • COMBO FULL 5 MÓN 899K (TIẾT KIỆM 116K)</span>
              <span className="text-[#869D7A]">✦</span>
              <span>DÙNG THỬ TẠI BÀN 7 NGÀY – KHÔNG HỢP GU HOÀN TIỀN 100%</span>
              <span className="text-[#B35D43]">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3. KỆ TRƯNG BÀY 5 SẢN PHẨM & 2 GÓI COMBO */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-20 space-y-10">
        <ScrollReveal3D mode="tilt-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#DED9CE] pb-6 gap-4">
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.22em] text-[#9E472A] font-bold block mb-2">
                01 / Curated Warm Minimalist Objects (100% Ảnh thật 4 góc)
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl text-[#181615] font-semibold">
                5 Sản Phẩm Chủ Lực & 2 Gói Combo 11.11
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Tất cả', 'Gói Combo 11.11', 'Tranh treo tường', 'Chậu cây mini', 'Đèn bàn', 'Lịch để bàn', 'Đồng hồ để bàn'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2.5 text-xs uppercase tracking-[0.14em] font-semibold transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#181615] text-[#F6F3EC] shadow-sm'
                      : 'bg-white text-[#5A544C] border border-[#DED9CE] hover:border-[#B35D43] hover:text-[#B35D43]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal3D>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => {
            const finalPrice = getProductPrice(product, 1);
            return (
              <div
                key={product.id}
                className="group bg-white border border-[#DED9CE] flex flex-col justify-between hover:border-[#B35D43] transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="relative aspect-[4/5] bg-[#EAE5DC] overflow-hidden">
                    <SmartImage
                      src={product.image}
                      fallback={product.fallback}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                    />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center shadow"
                    >
                      <Icons.Heart filled={wishlist.includes(product.id)} />
                    </button>
                    {product.flash_sale_price && (
                      <span className="absolute top-3 left-3 bg-[#B35D43] text-white text-[10px] font-mono-tech font-bold px-2.5 py-1 uppercase">
                        Mở hàng 50 suất: 55.000₫
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[10px] font-mono-tech uppercase tracking-wider text-[#869D7A] font-bold">
                      {product.category}
                    </div>
                    <h3
                      onClick={() => onNavigate('detail', product.id)}
                      className="font-heading text-xl font-semibold text-[#181615] group-hover:text-[#B35D43] cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#6E675F] line-clamp-2">{product.subtitle}</p>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-[#E6E1D8] flex items-center justify-between">
                  <div>
                    {product.original_price && (
                      <span className="text-[11px] text-[#7A746B] line-through block">
                        {formatCurrency(product.original_price)}
                      </span>
                    )}
                    <span className="font-mono-tech text-lg font-bold text-[#B35D43]">
                      {formatCurrency(finalPrice)}
                    </span>
                  </div>
                  <button
                    onClick={() => onAddToCart({ ...product, qty: 1 })}
                    className="px-3.5 py-2 bg-[#181615] text-white text-[11px] font-semibold uppercase tracking-wider hover:bg-[#B35D43] transition-colors"
                  >
                    + Thêm giỏ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HỆ SINH THÁI 11 KÊNH TRIỂN KHAI CHÍNH THỨC */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-24">
        <ScrollReveal3D mode="tilt-up">
          <div className="bg-white border border-[#DED9CE] p-8 sm:p-12 shadow-sm space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-[#E6E1D8] pb-6 gap-4">
              <div>
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.22em] text-[#9E472A] font-bold block mb-2">
                  02 / Chiến Lược 11 Kênh Triển Khai (Mục tiêu 12.000 Traffic • 240 Đơn • 66.750.000₫ Doanh Thu Thuần)
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl text-[#181615] font-semibold">
                  Hệ Sinh Thái Đa Kênh Chính Thức Của <span className="italic font-normal text-[#B35D43]">Avenoa</span>
                </h2>
                <p className="text-xs sm:text-sm text-[#5A544C] mt-2 max-w-3xl">
                  Điều hướng dòng khách chốt đơn tập trung về 2 sàn chủ lực là <strong>Shopee (54% Traffic – 130 đơn)</strong> và <strong>TikTok Shop (33% Traffic – 80 đơn)</strong>, kết hợp Website/Landing Page (13% – 30 đơn) cùng hệ thống kênh dẫn phễu TikTok, YouTube Shorts, Threads, Facebook, Instagram và Google Business Profile.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <a
                  href={SOCIAL_LINKS.shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#EE4D2D] text-white px-5 py-3 text-xs uppercase tracking-[0.14em] font-bold hover:opacity-95 transition-all shadow-md"
                >
                  <span>🛍 Shopee (54%)</span>
                  <span>↗</span>
                </a>
                <a
                  href={SOCIAL_LINKS.tiktokShop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#141413] text-white px-5 py-3 text-xs uppercase tracking-[0.14em] font-bold hover:bg-[#9E472A] transition-all shadow-md"
                >
                  <span>🛒 TikTok Shop (33%)</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {OMNICHANNEL_PLATFORMS.map((plat) => (
                <a
                  key={plat.id}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border border-[#DED9CE] p-5 flex flex-col justify-between bg-[#FAF8F5] hover:bg-white hover:border-[#9E472A] transition-all duration-300"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        style={{ backgroundColor: plat.color }}
                        className="text-white text-[9px] font-mono-tech uppercase tracking-wider px-2.5 py-1 font-bold"
                      >
                        {plat.badge}
                      </span>
                      <span className="text-xs text-[#7A746B] group-hover:text-[#9E472A]">↗</span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-[#181615] group-hover:text-[#9E472A] transition-colors">
                        {plat.name}
                      </h3>
                      <p className="font-mono-tech text-[11px] font-semibold text-[#9E472A] mt-0.5">
                        {plat.handle}
                      </p>
                    </div>
                    <p className="text-xs text-[#5A544C] leading-relaxed">
                      {plat.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E6E1D8] flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#181615] group-hover:text-[#9E472A]">
                    <span>{plat.cta}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal3D>
      </section>
    </div>
  );
}

// =========================================================================
// TRANG BỘ SƯU TẬP SẢN PHẨM (CATALOG PAGE)
// =========================================================================
function CatalogPage({ onSelect, onAddToCart, onBuyNow, wishlist, toggleWishlist, getProductPrice }) {
  const [selectedCat, setSelectedCat] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Tất cả', 'Gói Combo 11.11', 'Tranh treo tường', 'Chậu cây mini', 'Đèn bàn', 'Lịch để bàn', 'Đồng hồ để bàn'];

  const filtered = MOCK_PRODUCTS.filter(
    p =>
      (selectedCat === 'Tất cả' || p.category === selectedCat) &&
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-10">
      <div className="bg-[#181615] text-white p-8 sm:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#869D7A] font-bold block">
            AVENOA — Nơi căn phòng ôm trọn mọi cảm xúc
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl text-white font-semibold">
            5 Sản Phẩm Chủ Lực & 2 Gói Combo
          </h1>
          <p className="text-xs sm:text-sm text-[#A8A298] max-w-2xl leading-relaxed">
            100% sản phẩm niêm yết bộ ảnh thật tự chụp 4 góc (No 3D): Lịch để bàn gỗ (69.000₫ – Mở hàng 55.000₫), Chậu cây mini gốm (109.000₫), Đồng hồ để bàn (219.000₫), Tranh Canvas 30×40 (239.000₫), Đèn bàn (379.000₫) cùng Combo 3 món (369.000₫) & Combo Full 5 món (899.000₫).
          </p>
        </div>
        <div className="w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm sản phẩm decor..."
            className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 text-xs outline-none focus:border-[#B35D43]"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2.5 text-xs uppercase tracking-wider font-semibold ${
              selectedCat === cat ? 'bg-[#181615] text-white' : 'bg-white border border-[#DED9CE] text-[#4A453E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(product => {
          const price = getProductPrice(product, 1);
          return (
            <div key={product.id} className="bg-white border border-[#DED9CE] flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/5] bg-[#EAE5DC] overflow-hidden">
                  <SmartImage
                    src={product.image}
                    fallback={product.fallback}
                    alt={product.name}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 flex items-center justify-center"
                  >
                    <Icons.Heart filled={wishlist.includes(product.id)} />
                  </button>
                </div>
                <div className="p-6 space-y-2">
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#869D7A] font-bold">
                    {product.category}
                  </span>
                  <h3
                    onClick={() => onSelect(product.id)}
                    className="font-heading text-2xl font-semibold text-[#181615] hover:text-[#B35D43] cursor-pointer"
                  >
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#5A544C]">{product.subtitle}</p>
                </div>
              </div>
              <div className="p-6 pt-4 border-t border-[#E6E1D8] flex items-center justify-between">
                <span className="font-mono-tech text-xl font-bold text-[#B35D43]">{formatCurrency(price)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onAddToCart({ ...product, qty: 1 })}
                    className="px-3 py-2 border border-[#181615] text-xs font-semibold hover:bg-[#181615] hover:text-white"
                  >
                    + Giỏ
                  </button>
                  <button
                    onClick={() => onBuyNow({ ...product, qty: 1 })}
                    className="px-3.5 py-2 bg-[#B35D43] text-white text-xs font-bold uppercase hover:bg-[#181615]"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================================
// TRANG CHI TIẾT SẢN PHẨM (PRODUCT DETAIL PAGE)
// =========================================================================
function ProductDetailPage({ product, getProductPrice, onAddToCart, onBuyNow, onNavigate }) {
  const [qty, setQty] = useState(1);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const gallery = product.gallery || [product.image];
  const fallbacks = product.galleryFallbacks || [product.fallback || IMAGES.heroMain];
  const unitPrice = getProductPrice(product, qty);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12">
      <button
        onClick={() => onNavigate('catalog')}
        className="text-xs font-bold uppercase tracking-widest text-[#6E675F] hover:text-[#181615] mb-6 inline-block"
      >
        ← Quay lại danh mục 5 sản phẩm & Combo
      </button>

      <div className="grid lg:grid-cols-12 gap-10 bg-white border border-[#DED9CE] p-6 sm:p-10">
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[4/5] bg-[#EAE5DC] overflow-hidden border border-[#DED9CE]">
            <SmartImage
              src={gallery[activeImgIdx]}
              fallback={fallbacks[activeImgIdx]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {gallery.length > 1 && (
            <div className="grid grid-cols-7 gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImgIdx(i)}
                  className={`aspect-square border-2 overflow-hidden ${activeImgIdx === i ? 'border-[#B35D43]' : 'border-transparent opacity-60'}`}
                >
                  <SmartImage src={g} fallback={fallbacks[i]} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-[#E6E1D8] pb-4">
            <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
              {product.category} • Đồng kiểm 100% & Dùng thử 7 ngày
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[#181615]">{product.name}</h1>
            <p className="text-xs text-[#5A544C]">{product.subtitle}</p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="font-mono-tech text-3xl font-bold text-[#B35D43]">{formatCurrency(unitPrice)}</span>
            {product.original_price && (
              <span className="text-sm text-[#7A746B] line-through">{formatCurrency(product.original_price)}</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[#D5CFC4]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3.5 py-2 text-sm font-bold">-</button>
              <span className="px-4 py-2 font-mono-tech text-sm font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3.5 py-2 text-sm font-bold">+</button>
            </div>
            <button
              onClick={() => onAddToCart({ ...product, qty })}
              className="flex-1 py-3.5 bg-[#181615] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#B35D43]"
            >
              Thêm Vào Giỏ Hàng
            </button>
            <button
              onClick={() => onBuyNow({ ...product, qty })}
              className="flex-1 py-3.5 bg-[#B35D43] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#181615]"
            >
              Mua Ngay →
            </button>
          </div>

          {/* Liên kết Mua nhanh trên Shopee hoặc TikTok Shop Chính Hãng */}
          <div className="p-4 bg-[#FFF5F2] border border-[#EE4D2D]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs">
              <span className="font-bold text-[#EE4D2D] uppercase tracking-wider block">
                🛍 Đặt mua trên Shopee (54%) & TikTok Shop (33%)
              </span>
              <span className="text-[#5A544C] text-[11px]">
                Áp chồng Voucher mở hàng của Avenoa + Gói Voucher Xtra (5,5%) & Freeship Xtra (5%) ngày 11.11.
              </span>
            </div>
            <div className="flex gap-2 shrink-0">
              <a
                href={SOCIAL_LINKS.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-[#EE4D2D] text-white text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity text-center shadow-sm"
              >
                Shopee ↗
              </a>
              <a
                href={SOCIAL_LINKS.tiktokShop}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2.5 bg-[#141413] text-white text-[11px] font-bold uppercase tracking-wider hover:bg-[#9E472A] transition-colors text-center shadow-sm"
              >
                TikTok Shop ↗
              </a>
            </div>
          </div>

          {/* Minh bạch cấu thành giá vốn (COGS) nếu có */}
          {product.cogs_breakdown && (
            <div className="p-4 bg-[#FAF8F5] border border-[#DED9CE] space-y-1.5 text-xs">
              <span className="text-[10px] font-mono-tech font-bold uppercase tracking-widest text-[#9E472A] block">
                Minh bạch Cấu thành Giá & Đóng gói Chống sốc (Theo Bảng Định Giá Thực Tế):
              </span>
              <div className="grid sm:grid-cols-2 gap-1.5 text-[11px] text-[#4A453E]">
                <div>• Giá sỉ nhập (1 tệ = 3.950₫): <strong>{product.cogs_breakdown.importPrice}</strong></div>
                <div>• Cước TQ–HCM (22k/kg): <strong>{product.cogs_breakdown.freight}</strong></div>
                <div className="sm:col-span-2">• Vật tư đóng gói chống sốc: <strong>{product.cogs_breakdown.packaging}</strong></div>
              </div>
            </div>
          )}

          <div
            className="pt-6 border-t border-[#E6E1D8] text-sm leading-relaxed text-[#3D3832]"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TRANG GIỎ HÀNG (CART PAGE)
// =========================================================================
function CartPage({ cart, setCart, getProductPrice, onNavigate }) {
  const updateQty = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => (item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item))
        .filter(item => item.qty > 0)
    );
  };

  const subtotal = cart.reduce((sum, item) => sum + getProductPrice(item, item.qty) * item.qty, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-8">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[#181615]">
        Giỏ Hàng Của Bạn ({cart.reduce((s, i) => s + i.qty, 0)} sản phẩm)
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white border border-[#DED9CE] p-12 text-center space-y-4">
          <p className="text-sm text-[#5A544C]">Giỏ hàng của bạn đang trống.</p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-6 py-3 bg-[#181615] text-white text-xs font-bold uppercase tracking-widest"
          >
            Khám phá 5 Sản phẩm & Gói Combo →
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-4">
            {cart.map(item => {
              const unit = getProductPrice(item, item.qty);
              return (
                <div key={item.id} className="bg-white border border-[#DED9CE] p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <SmartImage src={item.image} alt={item.name} className="w-20 h-20 object-cover border border-[#DED9CE]" />
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#181615]">{item.name}</h3>
                      <p className="font-mono-tech text-xs text-[#B35D43] font-bold">{formatCurrency(unit)} / sản phẩm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 border border-[#D5CFC4] font-bold">-</button>
                    <span className="font-mono-tech text-xs font-bold">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 border border-[#D5CFC4] font-bold">+</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 bg-white border border-[#DED9CE] p-6 space-y-4 h-fit">
            <h3 className="font-heading text-xl font-semibold border-b border-[#E6E1D8] pb-3">Tóm tắt đơn hàng</h3>
            <div className="flex justify-between text-xs">
              <span>Tạm tính:</span>
              <strong className="font-mono-tech text-base text-[#B35D43]">{formatCurrency(subtotal)}</strong>
            </div>
            <p className="text-[11px] text-[#5A544C]">
              ✓ Tặng kèm Thiệp cảm ơn viết tay tên riêng + Hộp ướp hương thơm + Mã QR lì xì 15.000₫ khi đánh giá 5 sao.
            </p>
            <button
              onClick={() => onNavigate('checkout')}
              className="w-full py-3.5 bg-[#B35D43] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#181615]"
            >
              Tiến Hành Điền Thông Tin & Thanh Toán →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TRANG THANH TOÁN (CHECKOUT PAGE - TÍCH HỢP QR MB BANK & MOMO CHÍNH CHỦ NGUYEN PHI LONG + KHÓA NÚT KHI CHƯA CHUYỂN KHOẢN)
// =========================================================================
function CheckoutPage({ cart, setCart, getProductPrice, onNavigate, onToast }) {
  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'TP. Hồ Chí Minh',
    address: '',
    note: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'vietqr' | 'momo'
  const [transferConfirmed, setTransferConfirmed] = useState(false);
  const [transferRef, setTransferRef] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + getProductPrice(item, item.qty) * item.qty, 0);
  const shippingFee = subtotal >= 369000 || subtotal === 0 ? 0 : 25000;
  const finalTotal = Math.max(0, subtotal + shippingFee - discountAmount);

  const requiresTransferConfirmation = paymentMethod === 'vietqr' || paymentMethod === 'momo';
  const canPlaceOrder = !requiresTransferConfirmation || transferConfirmed;

  const handleApplyCoupon = () => {
    const code = coupon.trim().toUpperCase();
    if (code === 'TIENPHONG50K') {
      setDiscountAmount(50000);
      onToast('Đã áp dụng Voucher Tiên Phong giảm ngay 50.000₫!');
    } else if (code === 'KHUNGGIOVANG20K') {
      setDiscountAmount(20000);
      onToast('Đã áp dụng Voucher Khung Giờ Vàng 11.11 giảm 20.000₫!');
    } else if (code === 'LIXIQR15K') {
      setDiscountAmount(15000);
      onToast('Đã áp dụng Voucher Lì xì QR 5 sao giảm 15.000₫!');
    } else if (code === 'AVENOA10') {
      const d = Math.round(subtotal * 0.1);
      setDiscountAmount(d);
      onToast(`Đã áp dụng mã AVENOA10 giảm ${formatCurrency(d)}!`);
    } else if (code === 'FREESHIP') {
      setDiscountAmount(25000);
      onToast('Đã áp dụng mã miễn phí vận chuyển!');
    } else {
      onToast('Gợi ý mã chiến dịch 11.11: TIENPHONG50K (-50K), KHUNGGIOVANG20K (-20K), LIXIQR15K (-15K)');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!canPlaceOrder) {
      onToast('Vui lòng xác nhận đã chuyển khoản trước khi bấm Đặt hàng!');
      return;
    }
    const code = 'AVN-' + Math.floor(100000 + Math.random() * 900000);
    setOrderSuccess({
      orderCode: code,
      total: finalTotal,
      paymentMethod,
      customer
    });
    setCart([]);
    onToast(`Đặt hàng thành công! Mã đơn: ${code}`);
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white border-2 border-[#5E6F52] p-8 space-y-5 text-center shadow-xl">
          <div className="text-xs font-mono-tech font-bold uppercase text-[#5E6F52]">
            ✓ ĐẶT HÀNG THÀNH CÔNG • CAM KẾT XUẤT KHO TRONG 24H
          </div>
          <h2 className="font-heading text-3xl font-semibold text-[#181615]">
            Cảm ơn {orderSuccess.customer.fullName || 'Quý khách'}!
          </h2>
          <p className="text-xs text-[#5A544C]">
            Mã vận đơn của bạn: <strong className="font-mono-tech text-base text-[#B35D43]">{orderSuccess.orderCode}</strong>
          </p>
          <p className="text-xs text-[#4A453E] leading-relaxed">
            Kiện hàng chống sốc 3 lớp của bạn đang được đóng gói tại Kho TP.HCM kèm Thiệp cảm ơn viết tay và Mã QR lì xì 15.000₫. Bạn được <strong>Đồng kiểm 100%</strong> khi nhận hàng và <strong>Dùng thử tại bàn 7 ngày hoàn tiền 100%</strong>.
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 bg-[#181615] text-white text-xs font-bold uppercase tracking-widest"
          >
            Về Trang Chủ AVENOA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-8 py-12">
      <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-[#181615] mb-8">
        Thông Tin Giao Hàng & Thanh Toán Chính Chủ
      </h1>

      <form onSubmit={handlePlaceOrder} className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-[#DED9CE] p-6 space-y-4">
            <h3 className="font-heading text-xl font-semibold">1. Thông tin người nhận (Đồng kiểm & Dùng thử 7 ngày)</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              <input
                type="text"
                required
                placeholder="Họ và tên người nhận *"
                value={customer.fullName}
                onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                className="border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
              />
              <input
                type="tel"
                required
                placeholder="Số điện thoại Zalo nhận hàng *"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
              />
            </div>
            <input
              type="text"
              required
              placeholder="Địa chỉ chi tiết (Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/TP) *"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className="w-full border border-[#D5CFC4] p-3 text-xs outline-none focus:border-[#B35D43]"
            />
            <input
              type="text"
              placeholder="Tên muốn ghi trên Thiệp cảm ơn viết tay (Miễn phí)"
              value={customer.note}
              onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
              className="w-full border border-[#D5CFC4] p-3 text-xs outline-none focus:border-[#B35D43]"
            />
          </div>

          <div className="bg-white border border-[#DED9CE] p-6 space-y-4">
            <h3 className="font-heading text-xl font-semibold">2. Chọn phương thức thanh toán</h3>
            <div className="grid sm:grid-cols-3 gap-3 text-xs">
              {[
                { id: 'cod', label: 'Tiền mặt (COD)', sub: 'Đồng kiểm trước khi trả' },
                { id: 'vietqr', label: 'Chuyển khoản MB Bank', sub: 'VietQR 24/7 chính chủ' },
                { id: 'momo', label: 'Ví điện tử MoMo', sub: 'Quét mã QR MoMo' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setPaymentMethod(m.id);
                    setTransferConfirmed(false);
                  }}
                  className={`p-3.5 border text-left transition-all ${
                    paymentMethod === m.id ? 'border-2 border-[#B35D43] bg-[#FAF6F2] font-bold' : 'border-[#DED9CE]'
                  }`}
                >
                  <div className="text-[#181615]">{m.label}</div>
                  <div className="text-[10px] text-[#6E675F] mt-0.5">{m.sub}</div>
                </button>
              ))}
            </div>

            {paymentMethod === 'vietqr' && (
              <div className="p-5 bg-[#FAF8F5] border-2 border-[#181615] space-y-4">
                <div className="grid sm:grid-cols-2 gap-5 items-center">
                  <div className="bg-white p-3 border border-[#DED9CE] max-w-[220px] mx-auto">
                    <SmartImage
                      src={`https://img.vietqr.io/image/MB-0396648110-compact2.png?amount=${finalTotal}&addInfo=AVENOA&accountName=NGUYEN%20PHI%20LONG`}
                      fallback={IMAGES.qrMbBank}
                      alt="VietQR MB Bank NGUYEN PHI LONG"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="space-y-2 text-xs">
                    <span className="bg-[#181615] text-white px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase">
                      MB BANK (NGÂN HÀNG QUÂN ĐỘI)
                    </span>
                    <div>Chủ tài khoản: <strong className="font-mono-tech text-sm">NGUYEN PHI LONG</strong></div>
                    <div>Số tài khoản: <strong className="font-mono-tech text-base text-[#B35D43]">0396648110</strong></div>
                    <div>Số tiền cần chuyển: <strong className="font-mono-tech text-base">{formatCurrency(finalTotal)}</strong></div>
                    <input
                      type="text"
                      value={transferRef}
                      onChange={(e) => setTransferRef(e.target.value)}
                      placeholder="Nhập 4 số cuối SĐT hoặc mã giao dịch (tùy chọn)"
                      className="w-full border border-[#D5CFC4] bg-white p-2 text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setTransferConfirmed(true);
                        onToast('Đã xác nhận chuyển khoản MB Bank! Nút Đặt hàng đã được mở khóa.');
                      }}
                      className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider ${
                        transferConfirmed ? 'bg-[#5E6F52] text-white' : 'bg-[#B35D43] text-white hover:bg-[#181615]'
                      }`}
                    >
                      {transferConfirmed ? '✓ Đã xác nhận chuyển khoản thành công' : 'Tôi Đã Chuyển Khoản Xong — Mở Khóa Đặt Hàng'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'momo' && (
              <div className="p-5 bg-[#FFF5F8] border-2 border-[#A50064] space-y-4">
                <div className="grid sm:grid-cols-2 gap-5 items-center">
                  <div className="bg-white p-3 border border-[#A50064]/30 max-w-[220px] mx-auto">
                    <SmartImage
                      src={IMAGES.qrMomo}
                      fallback={`https://img.vietqr.io/image/MB-0396648110-compact2.png?amount=${finalTotal}&addInfo=MOMO%20AVENOA&accountName=NGUYEN%20PHI%20LONG`}
                      alt="QR MoMo NGUYEN PHI LONG"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <div className="space-y-2 text-xs">
                    <span className="bg-[#A50064] text-white px-2.5 py-1 text-[10px] font-mono-tech font-bold uppercase">
                      VÍ ĐIỆN TỬ MOMO CHÍNH CHỦ
                    </span>
                    <div>Chủ ví MoMo: <strong className="font-mono-tech text-sm">NGUYEN PHI LONG</strong></div>
                    <div>SĐT / Tài khoản nhận: <strong className="font-mono-tech text-base text-[#A50064]">0396648110 (*******079)</strong></div>
                    <div>Số tiền thanh toán: <strong className="font-mono-tech text-base">{formatCurrency(finalTotal)}</strong></div>
                    <button
                      type="button"
                      onClick={() => {
                        setTransferConfirmed(true);
                        onToast('Đã xác nhận thanh toán MoMo! Nút Đặt hàng đã được mở khóa.');
                      }}
                      className={`w-full py-2.5 text-xs font-bold uppercase tracking-wider ${
                        transferConfirmed ? 'bg-[#5E6F52] text-white' : 'bg-[#A50064] text-white hover:bg-[#181615]'
                      }`}
                    >
                      {transferConfirmed ? '✓ Đã xác nhận chuyển khoản MoMo' : 'Tôi Đã Chuyển MoMo Xong — Mở Khóa Đặt Hàng'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-[#DED9CE] p-6 space-y-5 h-fit">
          <h3 className="font-heading text-xl font-semibold border-b border-[#E6E1D8] pb-3">Đơn hàng & Mã giảm giá 11.11</h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Mã ưu đãi (VD: TIENPHONG50K, KHUNGGIOVANG20K)"
              className="flex-1 border border-[#D5CFC4] bg-[#FAF8F5] px-3 py-2.5 text-xs outline-none"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="px-4 py-2.5 bg-[#181615] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B35D43]"
            >
              Áp dụng
            </button>
          </div>

          <div className="space-y-2 text-xs border-t border-[#E6E1D8] pt-4">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span className="font-mono-tech">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển (Miễn phí cho đơn từ 369K):</span>
              <span className="font-mono-tech">{shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-[#5E6F52] font-bold">
                <span>Voucher giảm giá:</span>
                <span className="font-mono-tech">- {formatCurrency(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold text-[#181615] pt-2 border-t border-[#E6E1D8]">
              <span>Tổng thanh toán:</span>
              <span className="font-mono-tech text-xl text-[#B35D43]">{formatCurrency(finalTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={!canPlaceOrder}
            className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all ${
              canPlaceOrder
                ? 'bg-[#B35D43] text-white hover:bg-[#181615] shadow-lg'
                : 'bg-[#D5CFC4] text-[#6E675F] cursor-not-allowed'
            }`}
          >
            {canPlaceOrder ? 'Xác Nhận Đặt Hàng Ngay →' : '🔒 Vui Lòng Hoàn Tất Chuyển Khoản Trước'}
          </button>
        </div>
      </form>
    </div>
  );
}

// =========================================================================
// TRANG ĐĂNG NHẬP & ĐĂNG KÝ TÁCH LÀM 2 BƯỚC:
// BƯỚC 1: CHỌN 1 LÀ KHÁCH LẺ (B2C) HOẶC 2 LÀ ĐỐI TÁC DOANH NGHIỆP (B2B)
// BƯỚC 2: HIỆN ĐIỀU KIỆN ĐĂNG NHẬP / TẠO TÀI KHOẢN RIÊNG CỦA BÊN ĐÓ
// =========================================================================
function AuthPage({ onSuccess, onToast }) {
  // accountGroup === null nghĩa là đang ở Màn hình Bước 1 (Chọn 1 là B2C, 2 là B2B)
  const [accountGroup, setAccountGroup] = useState(null); // null | 'b2c' | 'b2b'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginMethod, setLoginMethod] = useState('password'); // 'password' | 'otp'
  const [b2bSegment, setB2bSegment] = useState('retailer'); // 'retailer' | 'architect' | 'corporate' | 'dropship'
  const [showPass, setShowPass] = useState(false);

  // State đăng nhập
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('Avenoa@2026');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  // Trường xác thực chuyên biệt theo từng mô hình B2B
  const [dealerWarehouse, setDealerWarehouse] = useState('Kho TP.HCM (Quận 7 / Thủ Đức)');
  const [dealerTaxCode, setDealerTaxCode] = useState('0316889922');
  const [archProjectCode, setArchProjectCode] = useState('PRJ-VINHOMES-2026');
  const [archToolRedirect, setArchToolRedirect] = useState('Mở thẳng Thư viện File 3D (.MAX / .SKP) & Map 4K');
  const [corpTaxCode, setCorpTaxCode] = useState('0109887766');
  const [corpDepartment, setCorpDepartment] = useState('Phòng Thu Mua (Procurement) / Hành chính Nhân sự (HR)');
  const [ctvChannelInfo, setCtvChannelInfo] = useState('Bán tự do qua Zalo / FB cá nhân / Người quen (Chưa có kênh)');

  // State đăng ký mới (B2C + 4 loại B2B)
  const [regForm, setRegForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    companyName: '',
    taxCode: '',
    storeAddress: '',
    storeArea: '50m² - 120m²',
    creditTerm: 'Công nợ Net 15 ngày (Hạn mức 50 triệu)',
    portfolioUrl: '',
    architectCert: '',
    designSoftware: '3dsMax / Corona / SketchUp',
    corpDepartment: 'Phòng Thu Mua / Nhân Sự (HR)',
    giftScale: '100 - 300 phần quà khắc Logo riêng',
    salesChannelNote: 'Chưa có kênh (Bán qua Zalo/Bạn bè)',
    bankAccount: ''
  });

  const b2bPortalConfigs = {
    retailer: {
      code: 'B2B_Gold',
      badge: '01 / DEALER PORTAL • CHIẾT KHẤU SỈ GOLD (-8% THÊM)',
      title: 'Đại Lý Phân Phối & Chuỗi Cửa Hàng Decor',
      desc: 'Dành cho cửa hàng nội thất, nhà sách, giftshop nhập sỉ theo lô (MOQ từ 10 sản phẩm). Hỗ trợ công nợ Net 15–30 ngày và kệ trưng bày tại điểm bán.',
      sampleId: 'DL-8868',
      sampleName: 'Chuỗi Decor Nhà Xinh Sài Gòn (Đại lý Gold)',
      accent: '#9E472A'
    },
    architect: {
      code: 'B2B_Silver',
      badge: '02 / ARCHITECT TRADE & BIM • HOA HỒNG CHỈ ĐỊNH 12%',
      title: 'Kiến Trúc Sư, Interior Designer & Studio',
      desc: 'Cấp quyền tải miễn phí toàn bộ thư viện 3D Models (.MAX, .SKP, .RVT), PBR Textures 4K của 5 sản phẩm Avenoa và bảo lưu hoa hồng dự án 12%.',
      sampleId: 'KTS-2026',
      sampleName: 'KTS. Trần Minh Quân — Atelier Studio',
      accent: '#5E6F52'
    },
    corporate: {
      code: 'B2B_Platinum',
      badge: '03 / CORPORATE PROCUREMENT • PLATINUM (-15% + VAT 100%)',
      title: 'Tập Đoàn, Quà Tặng Doanh Nghiệp & Dự Án BĐS',
      desc: 'Giải pháp quà tặng tri ân nhân sự, đối tác kèm khắc Laser Logo lên Đế lịch gỗ / Khung tranh Canvas, xuất hóa đơn đỏ VAT điện tử 100% và công nợ 30 ngày.',
      sampleId: 'procurement@tapdoan.vn',
      sampleName: 'Tập Đoàn Vạn Phát Hưng (Khách hàng Platinum)',
      accent: '#181615'
    },
    dropship: {
      code: 'B2B_Dropship',
      badge: '04 / AFFILIATE & DROPSHIP HUB • KHÔNG CẦN VỐN / KHÔNG BẮT BUỘC CÓ KÊNH',
      title: 'Cộng Tác Viên (CTV), Dropshipping & KOC',
      desc: 'Không cần nhập hàng, không bắt buộc có kênh TikTok/Shopee riêng (có thể bán tự do qua Zalo, Facebook cá nhân, hội nhóm). Kho Avenoa đóng gói chống sốc 3 lớp giao thẳng khách lẻ.',
      sampleId: '0909123456',
      sampleName: 'CTV Nguyễn Thu Hà (Dropship & Affiliate)',
      accent: '#B35D43'
    }
  };

  const activeB2BCfg = b2bPortalConfigs[b2bSegment];

  const handleSelectPortal = (group, defaultMode = 'login', seg = 'retailer') => {
    setAccountGroup(group);
    setAuthMode(defaultMode);
    setLoginMethod('password');
    if (group === 'b2c') {
      setIdentifier('khachhang.vip@gmail.com');
      setPassword('Avenoa@2026');
    } else {
      setB2bSegment(seg);
      setIdentifier(b2bPortalConfigs[seg].sampleId);
      setPassword('Avenoa@2026');
    }
  };

  const handleQuickFill = (group, seg = 'retailer') => {
    setAccountGroup(group);
    setAuthMode('login');
    setLoginMethod('password');
    if (group === 'b2c') {
      setIdentifier('khachhang.vip@gmail.com');
      setPassword('Avenoa@2026');
      onToast('Đã điền nhanh tài khoản Khách hàng Cá nhân B2C (Giảm 5% thành viên)!');
    } else {
      setB2bSegment(seg);
      setIdentifier(b2bPortalConfigs[seg].sampleId);
      setPassword('Avenoa@2026');
      onToast(`Đã điền mẫu thông tin cổng: ${b2bPortalConfigs[seg].title}`);
    }
  };

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      onToast('Vui lòng nhập Số điện thoại Zalo hoặc Email để nhận mã OTP!');
      return;
    }
    setOtpSent(true);
    setOtpCode('686868');
    onToast('Mã xác thực OTP của bạn là: 686868 (Đã tự động điền sẵn)');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!identifier.trim()) {
      onToast('Vui lòng nhập tài khoản / mã định danh!');
      return;
    }
    if (loginMethod === 'password' && !password.trim()) {
      onToast('Vui lòng nhập mật khẩu xác thực!');
      return;
    }
    if (loginMethod === 'otp' && otpCode.trim() !== '686868') {
      onToast('Mã OTP chưa chính xác (Nhập: 686868)!');
      return;
    }

    if (accountGroup === 'b2c') {
      onSuccess(
        {
          name: identifier.includes('@') ? 'Nguyễn Minh Khuê (B2C VIP)' : identifier,
          email: identifier,
          type: 'Thành viên Avenoa Club (B2C - Giảm 5% & Nhận Voucher 50K)'
        },
        'B2C_Active'
      );
    } else {
      onSuccess(
        {
          name: activeB2BCfg.sampleName,
          idCode: identifier,
          segment: b2bSegment,
          type: activeB2BCfg.title,
          warehouse: dealerWarehouse,
          taxCode: b2bSegment === 'retailer' ? dealerTaxCode : corpTaxCode,
          projectCode: archProjectCode,
          department: corpDepartment,
          channelInfo: ctvChannelInfo
        },
        activeB2BCfg.code
      );
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.fullName.trim() || !regForm.phone.trim()) {
      onToast('Vui lòng điền Họ tên và Số điện thoại liên hệ!');
      return;
    }
    if (accountGroup === 'b2c') {
      onSuccess(
        {
          name: regForm.fullName,
          phone: regForm.phone,
          email: regForm.email || 'member@avenoa.vn',
          type: 'Thành viên mới Avenoa Club (Tặng ngay Voucher Tiên Phong 50.000₫)'
        },
        'B2C_Active'
      );
    } else {
      onSuccess(
        {
          name: regForm.companyName || `${regForm.fullName} (${activeB2BCfg.title})`,
          idCode: regForm.taxCode || regForm.phone,
          segment: b2bSegment,
          type: activeB2BCfg.title,
          warehouse: dealerWarehouse,
          channelInfo: regForm.salesChannelNote
        },
        activeB2BCfg.code
      );
    }
  };

  // =====================================================================
  // BƯỚC 1: KHI ẤN VÀO ĐĂNG NHẬP / ĐĂNG KÝ -> HIỆN 2 LỰA CHỌN TÁCH BIỆT:
  // 1 LÀ B2C (KHÁCH HÀNG CÁ NHÂN) | 2 LÀ B2B (ĐỐI TÁC DOANH NGHIỆP)
  // =====================================================================
  if (!accountGroup) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-14 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-block px-3.5 py-1 bg-[#181615] text-[#E5A992] text-[11px] font-mono-tech uppercase tracking-widest font-bold">
            BƯỚC 1 / 2 • CHỌN PHÂN KHU TÀI KHOẢN CỦA BẠN
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-[#181615]">
            Bạn Muốn Đăng Nhập / Đăng Ký Theo Hình Thức Nào?
          </h1>
          <p className="text-xs sm:text-sm text-[#5A544C] leading-relaxed">
            Hệ thống <strong>AVENOA – Nơi căn phòng ôm trọn mọi cảm xúc</strong> tách biệt hoàn toàn điều kiện đăng nhập, tạo tài khoản và chính sách giá giữa <strong>1. Khách hàng Cá nhân (B2C)</strong> và <strong>2. Đối tác Doanh nghiệp / Đại lý (B2B)</strong>. Vui lòng chọn 1 trong 2 cổng bên dưới:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* LỰA CHỌN 1: KHÁCH HÀNG CÁ NHÂN (B2C) */}
          <div className="bg-white border-2 border-[#DED9CE] hover:border-[#B35D43] p-8 sm:p-10 flex flex-col justify-between transition-all shadow-sm hover:shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-4">
                <span className="bg-[#B35D43] text-white text-xs font-mono-tech font-bold px-3 py-1 uppercase">
                  LỰA CHỌN 01 • DÀNH CHO KHÁCH LẺ (B2C)
                </span>
                <span className="font-mono-tech text-xs font-bold text-[#B35D43]">Giảm 5% + Voucher 50K</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#181615]">
                1. Khách Hàng Cá Nhân (B2C)
              </h2>

              <p className="text-xs sm:text-sm text-[#4A453E] leading-relaxed">
                Dành cho khách hàng cá nhân, dân văn phòng (23–40 tuổi), Freelancer mua lẻ hoặc mua gói Combo 3 món (369K) – Combo 5 món (899K) để trang trí góc làm việc và phòng ngủ.
              </p>

              <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D8] space-y-2 text-xs text-[#3D3832]">
                <div className="font-bold uppercase text-[#181615] text-[11px]">Điều kiện & Quyền lợi tài khoản B2C:</div>
                <div>✓ Chỉ cần Số điện thoại Zalo, Email hoặc Google/Facebook để tạo tài khoản trong 10 giây.</div>
                <div>✓ Tặng ngay <strong>Voucher Tiên Phong 50.000₫</strong> dịp Siêu Hội 11.11 & giảm 5% thành viên.</div>
                <div>✓ Kích hoạt bảo hành <strong>Dùng thử tại bàn 7 ngày – Không hợp gu hoàn tiền 100%</strong>.</div>
                <div>✓ Miễn phí hộp quà ướp hương thơm + Thiệp cảm ơn viết tay & Mã QR lì xì 15.000₫.</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#E6E1D8] grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelectPortal('b2c', 'login')}
                className="py-4 px-5 bg-[#181615] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B35D43] transition-colors"
              >
                Đăng Nhập B2C →
              </button>
              <button
                type="button"
                onClick={() => handleSelectPortal('b2c', 'register')}
                className="py-4 px-5 border-2 border-[#B35D43] text-[#B35D43] bg-[#FAF6F2] text-xs font-bold uppercase tracking-wider hover:bg-[#B35D43] hover:text-white transition-colors"
              >
                + Tạo Tài Khoản B2C Mới
              </button>
            </div>
          </div>

          {/* LỰA CHỌN 2: ĐỐI TÁC DOANH NGHIỆP & ĐẠI LÝ (B2B) */}
          <div className="bg-[#181615] text-white border-2 border-[#181615] hover:border-[#5E6F52] p-8 sm:p-10 flex flex-col justify-between transition-all shadow-xl">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="bg-[#5E6F52] text-white text-xs font-mono-tech font-bold px-3 py-1 uppercase">
                  LỰA CHỌN 02 • AVENOA BUSINESS (B2B)
                </span>
                <span className="font-mono-tech text-xs font-bold text-[#E5A992]">4 Cổng Đối Tác Chuyên Biệt</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-white">
                2. Đối Tác Doanh Nghiệp & Đại Lý (B2B)
              </h2>

              <p className="text-xs sm:text-sm text-[#D6D1C7] leading-relaxed">
                Dành cho Đại lý phân phối sỉ, Kiến trúc sư & Interior Designer, Doanh nghiệp đặt quà tặng in/khắc Logo riêng (xuất hóa đơn VAT 100%) và Cộng tác viên Dropshipping.
              </p>

              <div className="p-4 bg-white/5 border border-white/15 space-y-2 text-xs text-[#E6E1D8]">
                <div className="font-bold uppercase text-[#E5A992] text-[11px]">4 Mô hình B2B với điều kiện riêng biệt:</div>
                <div>• <strong>01. Đại lý Sỉ (B2B Gold -8%):</strong> Mã đại lý / MST, chọn kho xuất (TP.HCM / HN / ĐN), công nợ Net 15–30.</div>
                <div>• <strong>02. Kiến trúc sư (B2B Silver):</strong> Tải miễn phí File 3D (.MAX, .SKP, .RVT) & bảo lưu hoa hồng 12%.</div>
                <div>• <strong>03. Tập đoàn & Dự án (B2B Platinum -15%):</strong> Khắc Laser Logo miễn phí, Hợp đồng & E-VAT 100%.</div>
                <div>• <strong>04. CTV & Dropship:</strong> Không cần vốn, kênh bán hàng <em>(Nếu có - Không bắt buộc)</em>, giao thẳng khách lẻ.</div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/15 grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSelectPortal('b2b', 'login', 'retailer')}
                className="py-4 px-5 bg-[#5E6F52] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B35D43] transition-colors"
              >
                Đăng Nhập Cổng B2B →
              </button>
              <button
                type="button"
                onClick={() => handleSelectPortal('b2b', 'register', 'retailer')}
                className="py-4 px-5 border-2 border-[#E5A992] text-[#E5A992] text-xs font-bold uppercase tracking-wider hover:bg-[#E5A992] hover:text-[#181615] transition-colors"
              >
                + Đăng Ký Đối Tác B2B
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // BƯỚC 2: SAU KHI ĐÃ CHỌN B2C HOẶC B2B -> HIỆN ĐIỀU KIỆN RIÊNG CỦA BÊN ĐÓ
  // =====================================================================
  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-8">
      {/* Thanh điều hướng quay lại Bước 1 hoặc chuyển nhanh B2C / B2B */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DED9CE] pb-4">
        <button
          type="button"
          onClick={() => setAccountGroup(null)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#181615] text-xs font-bold uppercase tracking-wider hover:bg-[#181615] hover:text-white transition-colors"
        >
          ← Quay lại Bước 1 (Chọn lại 1. B2C hoặc 2. B2B)
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#6E675F] font-semibold">Bạn đang ở:</span>
          <span className="px-3 py-1.5 bg-[#181615] text-white font-mono-tech font-bold uppercase">
            {accountGroup === 'b2c' ? 'CỔNG 01: KHÁCH HÀNG CÁ NHÂN (B2C)' : 'CỔNG 02: ĐỐI TÁC DOANH NGHIỆP (B2B)'}
          </span>
          <button
            type="button"
            onClick={() => handleSelectPortal(accountGroup === 'b2c' ? 'b2b' : 'b2c', authMode)}
            className="underline text-[#B35D43] font-bold ml-2"
          >
            Chuyển sang {accountGroup === 'b2c' ? 'Cổng B2B' : 'Cổng B2C'} →
          </button>
        </div>
      </div>

      {/* Header riêng cho cổng đã chọn */}
      <div className="bg-[#181615] text-white p-8 sm:p-10 border border-[#2E2A27] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono-tech uppercase tracking-widest text-[#E5A992]">
            <span>
              {accountGroup === 'b2c'
                ? 'BƯỚC 2 / 2 • CỔNG KHÁCH HÀNG CÁ NHÂN (B2C WARM MINIMALIST CLUB)'
                : 'BƯỚC 2 / 2 • CỔNG ĐỐI TÁC DOANH NGHIỆP & ĐẠI LÝ (AVENOA BUSINESS B2B)'}
            </span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-white">
            {accountGroup === 'b2c'
              ? 'Đăng Nhập & Tạo Tài Khoản Khách Lẻ (B2C)'
              : 'Hệ Thống Xác Thực 4 Mô Hình Đối Tác B2B'}
          </h1>
          <p className="text-xs sm:text-sm text-[#C8C2B8] max-w-2xl">
            {accountGroup === 'b2c'
              ? 'Nhận ngay Voucher Tiên Phong 50.000₫ dịp Siêu Hội 11.11, giảm trực tiếp 5% thành viên và theo dõi bảo hành Dùng thử tại bàn 7 ngày hoàn tiền 100%.'
              : 'Mỗi mô hình B2B (Đại lý Sỉ, Kiến trúc sư, Tập đoàn/Quà tặng, CTV/Dropship) có điều kiện xác thực hồ sơ, kho điều phối và bảng chiết khấu riêng biệt.'}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* CỘT TRÁI (5 CỘT): BẢNG ĐIỀN NHANH DEMO & ĐIỀU KIỆN RIÊNG CỦA CỔNG ĐÃ CHỌN */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-[#B35D43] p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-[#E6E1D8] pb-3">
              <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#B35D43]">
                ⚡ ĐIỀN MẪU NHANH ({accountGroup.toUpperCase()}) ĐỂ TEST 1 CHẠM
              </span>
              <span className="text-[10px] bg-[#FAF6F2] px-2 py-0.5 font-semibold text-[#181615]">Tự điền tài khoản</span>
            </div>

            {accountGroup === 'b2c' ? (
              <div className="space-y-2.5 text-xs">
                <p className="text-[#5A544C]">
                  Bấm nút bên dưới để điền sẵn tài khoản Khách hàng Cá nhân VIP (B2C):
                </p>
                <button
                  type="button"
                  onClick={() => handleQuickFill('b2c')}
                  className="w-full p-3.5 border-2 border-[#181615] bg-[#FAF8F5] font-bold text-left flex items-center justify-between hover:border-[#B35D43]"
                >
                  <span>👤 Khách lẻ B2C VIP (khachhang.vip@gmail.com)</span>
                  <span className="font-mono-tech text-[10px] text-[#B35D43]">Điền ngay →</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <p className="text-[#5A544C]">
                  Chọn 1 trong 4 loại hình Đối tác B2B bên dưới để nạp điều kiện đăng nhập/đăng ký tương ứng:
                </p>
                {[
                  { key: 'retailer', label: '01. Đại lý Sỉ & Cửa hàng (B2B Gold -8%)', tag: 'DL-8868' },
                  { key: 'architect', label: '02. Kiến trúc sư & Designer (Trade + File 3D)', tag: 'KTS-2026' },
                  { key: 'corporate', label: '03. Tập đoàn & Dự án Quà tặng (Platinum -15%)', tag: 'MST 10 số' },
                  { key: 'dropship', label: '04. CTV & Dropship (Không bắt buộc có kênh)', tag: 'SĐT Zalo' }
                ].map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => handleQuickFill('b2b', item.key)}
                    className={`w-full p-3 border text-left flex items-center justify-between transition-all ${
                      b2bSegment === item.key
                        ? 'border-2 border-[#B35D43] bg-[#FAF6F2] font-bold'
                        : 'border-[#DED9CE] hover:border-[#B35D43]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono-tech text-[10px] bg-[#181615] text-white px-2 py-0.5">{item.tag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Thẻ giải thích điều kiện & quyền lợi theo đúng bên đang chọn */}
          <div className="bg-[#FAF6F2] border border-[#DED9CE] p-6 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
              {accountGroup === 'b2c' ? 'ĐIỀU KIỆN & ĐẶC QUYỀN KHÁCH LẺ (B2C)' : activeB2BCfg.badge}
            </span>
            <h3 className="font-heading text-2xl font-semibold text-[#181615]">
              {accountGroup === 'b2c' ? 'Thành Viên Avenoa Warm Minimalist Club' : activeB2BCfg.title}
            </h3>
            <p className="text-xs text-[#4A453E] leading-relaxed">
              {accountGroup === 'b2c'
                ? 'Tài khoản B2C giúp bạn lưu lịch sử đơn hàng, nhận ngay mã Voucher Tiên Phong 50.000₫ dịp 11.11, theo dõi tiến độ bảo hành Dùng thử tại bàn 7 ngày hoàn tiền 100% và tích điểm đổi quà.'
                : activeB2BCfg.desc}
            </p>
            <ul className="space-y-2 text-xs text-[#3D3832] border-t border-[#E6E1D8] pt-3">
              {accountGroup === 'b2c' ? (
                <>
                  <li>✓ Giảm trực tiếp 5% mọi đơn lẻ & áp chồng Voucher 50K</li>
                  <li>✓ Dùng thử tại bàn 7 ngày – Không hợp gu hoàn tiền 100%</li>
                  <li>✓ Miễn phí hộp quà ướp hương + Thiệp viết tay & QR lì xì 15K</li>
                </>
              ) : b2bSegment === 'retailer' ? (
                <>
                  <li>✓ Điều kiện: Có Cửa hàng / MST hoặc nhập sỉ MOQ từ 10 sản phẩm</li>
                  <li>✓ Chiết khấu sỉ theo bậc + Giảm thêm 8% hạng Gold</li>
                  <li>✓ Cấp hạn mức công nợ Net 15–30 ngày (50.000.000₫)</li>
                </>
              ) : b2bSegment === 'architect' ? (
                <>
                  <li>✓ Điều kiện: Kiến trúc sư / Interior Designer / Studio thiết kế</li>
                  <li>✓ Tải trọn bộ 3D Models (.MAX, .SKP, .RVT) & PBR 4K</li>
                  <li>✓ Bảo lưu hoa hồng chỉ định thầu 12% cho KTS/Studio</li>
                </>
              ) : b2bSegment === 'corporate' ? (
                <>
                  <li>✓ Điều kiện: Pháp nhân Công ty / Tập đoàn / Ban quản lý dự án</li>
                  <li>✓ Chiết khấu sâu nhất Platinum (-15% trên bảng giá sỉ)</li>
                  <li>✓ Miễn phí khắc Laser Logo + Xuất hóa đơn đỏ VAT 100%</li>
                </>
              ) : (
                <>
                  <li>✓ Điều kiện: Công dân có SĐT Zalo & TK Ngân hàng nhận hoa hồng</li>
                  <li>✓ Không cần vốn nhập hàng, không bắt buộc có kênh riêng</li>
                  <li>✓ Kho Avenoa đóng gói chống sốc 3 lớp giao thẳng khách lẻ</li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* CỘT PHẢI (7 CỘT): BIỂU MẪU ĐĂNG NHẬP & TẠO TÀI KHOẢN CỦA RIÊNG BÊN ĐÃ CHỌN */}
        <div className="lg:col-span-7 bg-white border border-[#DED9CE] p-6 sm:p-10 shadow-sm space-y-6">
          {/* Nếu đang ở chế độ B2B: Thanh chọn 4 cổng B2B trên đầu form */}
          {accountGroup === 'b2b' && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold block">
                CHỌN LOẠI HÌNH ĐỐI TÁC B2B CỦA BẠN (MỖI CỔNG CÓ ĐIỀU KIỆN RIÊNG):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'retailer', short: '01. Đại lý Sỉ' },
                  { key: 'architect', short: '02. Kiến trúc sư' },
                  { key: 'corporate', short: '03. Tập đoàn/DN' },
                  { key: 'dropship', short: '04. CTV/Dropship' }
                ].map(tab => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setB2bSegment(tab.key);
                      setIdentifier(b2bPortalConfigs[tab.key].sampleId);
                    }}
                    className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider border transition-all ${
                      b2bSegment === tab.key
                        ? 'bg-[#181615] text-white border-[#181615]'
                        : 'bg-[#FAF8F5] text-[#4A453E] border-[#DED9CE] hover:border-[#B35D43]'
                    }`}
                  >
                    {tab.short}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tab chuyển đổi: Đăng Nhập vs Tạo Tài Khoản Mới */}
          <div className="flex border-b-2 border-[#E6E1D8]">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 pb-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                authMode === 'login'
                  ? 'border-b-4 border-[#B35D43] text-[#181615]'
                  : 'text-[#7A746B] hover:text-[#181615]'
              }`}
            >
              1. Đăng Nhập ({accountGroup.toUpperCase()})
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`flex-1 pb-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest transition-all ${
                authMode === 'register'
                  ? 'border-b-4 border-[#B35D43] text-[#B35D43]'
                  : 'text-[#7A746B] hover:text-[#181615]'
              }`}
            >
              2. Tạo Tài Khoản {accountGroup.toUpperCase()} Mới
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              {/* Chọn phương thức xác thực: Mật khẩu hoặc Mã OTP 6 số */}
              <div className="flex items-center justify-between bg-[#FAF8F5] p-3 border border-[#E6E1D8] text-xs">
                <span className="font-semibold text-[#4A453E]">Phương thức xác thực:</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setLoginMethod('password')}
                    className={`px-3 py-1.5 font-bold uppercase ${
                      loginMethod === 'password' ? 'bg-[#181615] text-white' : 'bg-white border border-[#D5CFC4]'
                    }`}
                  >
                    Mật khẩu tiêu chuẩn
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod('otp')}
                    className={`px-3 py-1.5 font-bold uppercase ${
                      loginMethod === 'otp' ? 'bg-[#B35D43] text-white' : 'bg-white border border-[#D5CFC4]'
                    }`}
                  >
                    Mã OTP SMS / Zalo (6 số)
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[#181615] block mb-1.5">
                    {accountGroup === 'b2c'
                      ? 'Email hoặc Số điện thoại Zalo cá nhân *'
                      : b2bSegment === 'retailer'
                      ? 'Mã Đại Lý (DL-xxxx) hoặc Mã Số Thuế Cửa Hàng *'
                      : b2bSegment === 'architect'
                      ? 'Mã Trade ID (KTS-xxxx) hoặc Email Studio Kiến Trúc *'
                      : b2bSegment === 'corporate'
                      ? 'Email Doanh Nghiệp (@company.com) hoặc Mã Hợp Đồng Khung *'
                      : 'Số Điện Thoại Zalo CTV hoặc Mã Affiliate (CTV-xxxx) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Nhập thông tin định danh của bạn..."
                    className="w-full border border-[#D5CFC4] bg-[#FAF8F5] p-3.5 text-sm outline-none focus:border-[#B35D43] focus:bg-white"
                  />
                </div>

                {/* CÁC TRƯỜNG CHUYÊN BIỆT CHO TỪNG CỔNG B2B KHI ĐĂNG NHẬP */}
                {accountGroup === 'b2b' && b2bSegment === 'retailer' && (
                  <div className="grid sm:grid-cols-2 gap-3 p-4 bg-[#FAF6F2] border border-[#DED9CE]">
                    <div>
                      <label className="font-bold block mb-1">Mã số thuế ĐKKD (Đối soát hóa đơn):</label>
                      <input
                        type="text"
                        value={dealerTaxCode}
                        onChange={(e) => setDealerTaxCode(e.target.value)}
                        className="w-full border border-[#D5CFC4] bg-white p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Chọn Kho điều phối nguồn hàng sỉ:</label>
                      <select
                        value={dealerWarehouse}
                        onChange={(e) => setDealerWarehouse(e.target.value)}
                        className="w-full border border-[#D5CFC4] bg-white p-2.5"
                      >
                        <option>Kho TP.HCM (Quận 7 / Thủ Đức)</option>
                        <option>Kho Hà Nội (Cầu Giấy / Long Biên)</option>
                        <option>Kho Đà Nẵng (Hải Châu)</option>
                      </select>
                    </div>
                  </div>
                )}

                {accountGroup === 'b2b' && b2bSegment === 'architect' && (
                  <div className="grid sm:grid-cols-2 gap-3 p-4 bg-[#F4F7F2] border border-[#5E6F52]/40">
                    <div>
                      <label className="font-bold block mb-1">Mã Dự án / Công trình đang triển khai:</label>
                      <input
                        type="text"
                        value={archProjectCode}
                        onChange={(e) => setArchProjectCode(e.target.value)}
                        className="w-full border border-[#D5CFC4] bg-white p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Công cụ mở tự động sau đăng nhập:</label>
                      <select
                        value={archToolRedirect}
                        onChange={(e) => setArchToolRedirect(e.target.value)}
                        className="w-full border border-[#D5CFC4] bg-white p-2.5"
                      >
                        <option>Mở thẳng Thư viện File 3D (.MAX / .SKP) & Map 4K</option>
                        <option>Mở Trình tạo Bảng Vật Liệu & Báo giá Dự án (BOQ)</option>
                      </select>
                    </div>
                  </div>
                )}

                {accountGroup === 'b2b' && b2bSegment === 'corporate' && (
                  <div className="grid sm:grid-cols-2 gap-3 p-4 bg-[#F4F3F1] border border-[#181615]/30">
                    <div>
                      <label className="font-bold block mb-1">Mã số thuế Pháp nhân (Xuất E-VAT 100%):</label>
                      <input
                        type="text"
                        value={corpTaxCode}
                        onChange={(e) => setCorpTaxCode(e.target.value)}
                        className="w-full border border-[#D5CFC4] bg-white p-2.5"
                      />
                    </div>
                    <div>
                      <label className="font-bold block mb-1">Bộ phận phụ trách thu mua:</label>
                      <select
                        value={corpDepartment}
                        onChange={(e) => setCorpDepartment(e.target.value)}
                        className="w-full border border-[#D5CFC4] bg-white p-2.5"
                      >
                        <option>Phòng Thu Mua (Procurement) / Hành chính Nhân sự (HR)</option>
                        <option>Ban Quản Lý Dự Án Bất Động Sản / Khách Sạn</option>
                        <option>Ban Giám Đốc / Công Đoàn Tập Đoàn</option>
                      </select>
                    </div>
                  </div>
                )}

                {accountGroup === 'b2b' && b2bSegment === 'dropship' && (
                  <div className="p-4 bg-[#FAF6F2] border border-[#B35D43]/40 space-y-2">
                    <label className="font-bold block">
                      Hình thức bán hàng & Kênh của CTV <span className="text-[#B35D43]">(Nếu có - Không bắt buộc)</span>:
                    </label>
                    <select
                      value={ctvChannelInfo}
                      onChange={(e) => setCtvChannelInfo(e.target.value)}
                      className="w-full border border-[#D5CFC4] bg-white p-2.5"
                    >
                      <option>Bán tự do qua Zalo / FB cá nhân / Người quen (Chưa có kênh)</option>
                      <option>Có kênh TikTok / TikTok Shop Affiliate</option>
                      <option>Có gian hàng Shopee / Instagram / Threads</option>
                    </select>
                    <p className="text-[11px] text-[#5A544C]">
                      * Lưu ý: CTV chưa có kênh riêng vẫn được hưởng đầy đủ mức chiết khấu Dropship, tải bộ ảnh thật 4 góc không logo và mẫu bài đăng viết sẵn!
                    </p>
                  </div>
                )}

                {loginMethod === 'password' ? (
                  <div>
                    <div className="flex justify-between mb-1.5">
                      <label className="font-bold uppercase tracking-wider text-[#181615]">Mật khẩu bảo mật *</label>
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="text-[11px] text-[#B35D43] font-semibold hover:underline"
                      >
                        {showPass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      </button>
                    </div>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-[#D5CFC4] bg-[#FAF8F5] p-3.5 text-sm outline-none focus:border-[#B35D43] focus:bg-white"
                    />
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="font-bold uppercase tracking-wider text-[#181615] block">
                      Mã xác thực OTP 6 chữ số (Mặc định test: 686868) *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="Nhập 6 số OTP (VD: 686868)"
                        className="flex-1 border border-[#D5CFC4] bg-[#FAF8F5] p-3.5 font-mono-tech text-base tracking-widest outline-none focus:border-[#B35D43]"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-5 bg-[#5E6F52] text-white font-bold uppercase tracking-wider hover:bg-[#181615]"
                      >
                        {otpSent ? 'Gửi lại OTP' : 'Lấy Mã OTP'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#181615] text-white text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#B35D43] transition-colors shadow-lg"
              >
                {accountGroup === 'b2c'
                  ? 'Đăng Nhập Tài Khoản Cá Nhân (B2C) →'
                  : `Đăng Nhập Vào ${activeB2BCfg.title} →`}
              </button>

              {/* Đăng nhập nhanh bằng Mạng xã hội 1 chạm */}
              <div className="pt-4 border-t border-[#E6E1D8] space-y-3">
                <div className="text-center text-[11px] uppercase tracking-widest text-[#7A746B] font-semibold">
                  Hoặc đăng nhập / liên kết nhanh 1 chạm qua
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {[
                    { name: 'Google', color: 'border-[#D5CFC4] hover:border-[#181615]' },
                    { name: 'Zalo OA', color: 'border-[#0068FF]/40 text-[#0068FF] hover:bg-[#0068FF] hover:text-white' },
                    { name: 'Facebook', color: 'border-[#1877F2]/40 text-[#1877F2] hover:bg-[#1877F2] hover:text-white' },
                    { name: 'Apple ID', color: 'border-[#181615] hover:bg-[#181615] hover:text-white' }
                  ].map(soc => (
                    <button
                      key={soc.name}
                      type="button"
                      onClick={() =>
                        onSuccess(
                          {
                            name: `Tài khoản ${soc.name} (${accountGroup.toUpperCase()})`,
                            type: accountGroup === 'b2c' ? 'Khách hàng B2C (Social Login)' : activeB2BCfg.title,
                            segment: b2bSegment
                          },
                          accountGroup === 'b2c' ? 'B2C_Active' : activeB2BCfg.code
                        )
                      }
                      className={`py-2.5 px-3 border font-bold text-center transition-colors ${soc.color}`}
                    >
                      {soc.name}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* BIỂU MẪU ĐĂNG KÝ TÀI KHOẢN MỚI CHO B2C & 4 LOẠI B2B */
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
              <div className="p-3.5 bg-[#FAF6F2] border-l-4 border-[#B35D43] text-[#4A453E]">
                {accountGroup === 'b2c' ? (
                  <span>
                    🎁 <strong>Ưu đãi Mở Tài Khoản Mới B2C:</strong> Tặng ngay mã <strong>TIENPHONG50K</strong> (giảm 50.000₫ cho gói Combo) và giảm 5% thành viên!
                  </span>
                ) : (
                  <span>
                    🏢 <strong>Đăng ký Hồ sơ Đối tác: {activeB2BCfg.title}</strong> — Duyệt cấp mã định danh và bảng giá sỉ tự động.
                  </span>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold block mb-1">Họ và tên người liên hệ *</label>
                  <input
                    type="text"
                    required
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    placeholder="VD: Nguyễn Phi Long"
                    className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Số điện thoại Zalo nhận OTP *</label>
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    placeholder="VD: 0396648110"
                    className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold block mb-1">Email làm việc / Nhận hóa đơn điện tử</label>
                  <input
                    type="email"
                    value={regForm.email}
                    onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Tạo mật khẩu đăng nhập *</label>
                  <input
                    type="password"
                    required
                    value={regForm.password}
                    onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full border border-[#D5CFC4] p-3 outline-none focus:border-[#B35D43]"
                  />
                </div>
              </div>

              {/* Trường đăng ký riêng biệt cho từng loại B2B */}
              {accountGroup === 'b2b' && b2bSegment === 'retailer' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#DED9CE] space-y-3">
                  <div className="font-bold text-[#9E472A] uppercase">Hồ sơ Đại lý Phân phối & Cửa hàng (B2B Gold)</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tên Cửa hàng / Pháp nhân Đại lý *"
                      value={regForm.companyName}
                      onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                    <input
                      type="text"
                      placeholder="Mã số thuế / Số ĐKKD *"
                      value={regForm.taxCode}
                      onChange={(e) => setRegForm({ ...regForm, taxCode: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                    <input
                      type="text"
                      placeholder="Địa chỉ mặt bằng trưng bày thực tế"
                      value={regForm.storeAddress}
                      onChange={(e) => setRegForm({ ...regForm, storeAddress: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                    <select
                      value={regForm.creditTerm}
                      onChange={(e) => setRegForm({ ...regForm, creditTerm: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    >
                      <option>Công nợ Net 15 ngày (Hạn mức 50 triệu)</option>
                      <option>Công nợ Net 30 ngày (Hạn mức 100 triệu)</option>
                      <option>Thanh toán ngay chiết khấu thêm 2%</option>
                    </select>
                  </div>
                </div>
              )}

              {accountGroup === 'b2b' && b2bSegment === 'architect' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#DED9CE] space-y-3">
                  <div className="font-bold text-[#5E6F52] uppercase">Hồ sơ Kiến trúc sư & Interior Studio (Trade Silver)</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tên Studio Thiết kế / Công ty Kiến trúc *"
                      value={regForm.companyName}
                      onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                    <input
                      type="text"
                      placeholder="Link Portfolio (Behance / Website / Facebook)"
                      value={regForm.portfolioUrl}
                      onChange={(e) => setRegForm({ ...regForm, portfolioUrl: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                  </div>
                </div>
              )}

              {accountGroup === 'b2b' && b2bSegment === 'corporate' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#DED9CE] space-y-3">
                  <div className="font-bold text-[#181615] uppercase">Hồ sơ Tập đoàn & Quà tặng Doanh nghiệp (Platinum)</div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Tên Pháp nhân Công ty / Tập đoàn *"
                      value={regForm.companyName}
                      onChange={(e) => setRegForm({ ...regForm, companyName: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                    <input
                      type="text"
                      placeholder="Mã số thuế xuất hóa đơn VAT 100% *"
                      value={regForm.taxCode}
                      onChange={(e) => setRegForm({ ...regForm, taxCode: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                  </div>
                </div>
              )}

              {accountGroup === 'b2b' && b2bSegment === 'dropship' && (
                <div className="p-4 bg-[#FAF8F5] border border-[#DED9CE] space-y-3">
                  <div className="font-bold text-[#B35D43] uppercase">
                    Hồ sơ Cộng tác viên (CTV) & Dropship (Không bắt buộc có kênh)
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Link kênh bán hàng (Nếu có - Không bắt buộc)"
                      value={regForm.salesChannelNote}
                      onChange={(e) => setRegForm({ ...regForm, salesChannelNote: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                    <input
                      type="text"
                      placeholder="Ngân hàng & STK nhận đối soát hoa hồng"
                      value={regForm.bankAccount}
                      onChange={(e) => setRegForm({ ...regForm, bankAccount: e.target.value })}
                      className="border border-[#D5CFC4] bg-white p-2.5"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#B35D43] text-white text-xs font-bold uppercase tracking-[0.18em] hover:bg-[#181615] transition-colors shadow-lg"
              >
                Hoàn Tất Đăng Ký & Vào Hệ Thống Ngay →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// TRANG QUẢN TRỊ ĐỐI TÁC B2C & 4 BÀN LÀM VIỆC B2B CHUYÊN BIỆT (DASHBOARD PAGE KHÔI PHỤC ĐẦY ĐỦ)
// =========================================================================
function DashboardPage({ user, role, setRole, onAddToCart, onNavigate, onToast, onLogout }) {
  const [dropshipRetailPrice, setDropshipRetailPrice] = useState(899000);
  const [dropshipCustomer, setDropshipCustomer] = useState('');
  const [customLogoText, setCustomLogoText] = useState('AVENOA CORPORATE PARTNER');

  const isB2C = role === 'B2C_Active' || role === 'guest';

  return (
    <div className="max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 py-12 space-y-10">
      {/* Banner Định Danh Workspace */}
      <div className="bg-[#181615] text-white p-8 sm:p-10 border border-[#2E2A27] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-[#B35D43] text-white px-3 py-1 text-[10px] font-mono-tech font-bold uppercase tracking-widest">
            <span>WORKSPACE ĐANG HOẠT ĐỘNG: {role}</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-white">
            Xin chào, {user ? user.name : 'Thành viên & Đối tác Avenoa'}
          </h1>
          <p className="text-xs text-[#C8C2B8]">
            {user?.type || 'Chuyển đổi linh hoạt giữa B2C Club và 4 Bàn làm việc B2B chuyên biệt bên dưới để kiểm tra tính năng.'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { r: 'B2C_Active', label: '👤 B2C Club (-5%)' },
            { r: 'B2B_Gold', label: '01. Đại lý Sỉ (Gold)' },
            { r: 'B2B_Silver', label: '02. Kiến trúc sư (BIM)' },
            { r: 'B2B_Platinum', label: '03. Tập đoàn (Platinum)' },
            { r: 'B2B_Dropship', label: '04. CTV / Dropship' }
          ].map(tab => (
            <button
              key={tab.r}
              onClick={() => {
                setRole(tab.r);
                onToast(`Đã chuyển sang giao diện bàn làm việc: ${tab.label}`);
              }}
              className={`px-3.5 py-2 text-[11px] font-bold uppercase transition-all ${
                role === tab.r ? 'bg-[#E5A992] text-[#181615]' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={onLogout}
            className="px-4 py-2 border border-white/30 text-[11px] font-bold uppercase hover:bg-white hover:text-[#181615]"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      {/* 1. GIAO DIỆN KHÁCH HÀNG CÁ NHÂN B2C */}
      {isB2C && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#B35D43] font-bold">
              VÍ VOUCHER CHIẾN DỊCH SIÊU HỘI 11.11 CỦA BẠN
            </span>
            <h3 className="font-heading text-2xl font-semibold">3 Mã Ưu Đãi Độc Quyền Đã Lưu</h3>
            <div className="space-y-3 text-xs">
              {[
                { code: 'TIENPHONG50K', desc: 'Giảm 50.000₫ cho đơn hàng gói Combo 3 món (369K) hoặc Combo 5 món (899K)' },
                { code: 'KHUNGGIOVANG20K', desc: 'Giảm 20.000₫ áp dụng trong 3 khung giờ vàng 0h – 12h – 20h ngày 11.11' },
                { code: 'LIXIQR15K', desc: 'Hoàn tiền lì xì 15.000₫ khi quét mã QR trên Thiệp viết tay & đánh giá 5 sao kèm ảnh góc bàn thật' }
              ].map(v => (
                <div key={v.code} className="p-4 bg-[#FAF8F5] border border-[#DED9CE] flex items-center justify-between gap-4">
                  <div>
                    <strong className="font-mono-tech text-sm text-[#B35D43] block">{v.code}</strong>
                    <span className="text-[#5A544C]">{v.desc}</span>
                  </div>
                  <button
                    onClick={() => onNavigate('checkout')}
                    className="px-3.5 py-2 bg-[#181615] text-white font-bold uppercase shrink-0 hover:bg-[#B35D43]"
                  >
                    Dùng ngay
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF6F2] border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
              CHẾ ĐỘ BẢO HÀNH & HẬU MÃI B2C
            </span>
            <h3 className="font-heading text-2xl font-semibold">Dùng Thử Tại Bàn 7 Ngày – Hoàn Tiền 100%</h3>
            <p className="text-xs text-[#4A453E] leading-relaxed">
              Mọi đơn hàng của bạn đều được kích hoạt tự động chế độ Đồng kiểm 100% khi nhận hàng và 7 ngày trải nghiệm thực tế trên bàn làm việc. Nếu ánh sáng đèn hoặc màu tranh chưa hợp phòng, bấm yêu cầu đổi/hoàn tiền trong 24h.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="w-full py-3.5 bg-[#B35D43] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#181615]"
            >
              Khám Phá 5 Sản Phẩm & Gói Combo Ngay →
            </button>
          </div>
        </div>
      )}

      {/* 2. BÀN LÀM VIỆC CỔNG 01: ĐẠI LÝ SỈ DEALER (B2B_Gold) */}
      {role === 'B2B_Gold' && (
        <div className="space-y-8">
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white border border-[#DED9CE] p-5">
              <span className="text-[#7A746B] uppercase font-mono-tech block">HẠN MỨC CÔNG NỢ KHẢ DỤNG (NET 15)</span>
              <strong className="font-mono-tech text-2xl text-[#5E6F52] block mt-1">50.000.000 ₫</strong>
            </div>
            <div className="bg-white border border-[#DED9CE] p-5">
              <span className="text-[#7A746B] uppercase font-mono-tech block">MỨC CHIẾT KHẤU HẠNG GOLD</span>
              <strong className="font-mono-tech text-2xl text-[#B35D43] block mt-1">Giá Sỉ Bậc Thang - 8%</strong>
            </div>
            <div className="bg-white border border-[#DED9CE] p-5">
              <span className="text-[#7A746B] uppercase font-mono-tech block">KHO XUẤT HÀNG HIỆN TẠI</span>
              <strong className="font-heading text-xl text-[#181615] block mt-1">{user?.warehouse || 'Kho TP.HCM (Sẵn hàng)'}</strong>
            </div>
          </div>

          <div className="bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <h3 className="font-heading text-2xl font-semibold">Ma Trận Đặt Hàng Sỉ Nhanh Theo Lô (Wholesale Quick Matrix)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#181615] text-white font-mono-tech uppercase text-[10px]">
                    <th className="p-3">Sản phẩm Avenoa</th>
                    <th className="p-3">Giá bán lẻ B2C</th>
                    <th className="p-3">Giá sỉ Đại lý Gold (Lô 20c)</th>
                    <th className="p-3">Biên lợi nhuận Đại lý</th>
                    <th className="p-3 text-right">Thao tác nhập lô</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E1D8]">
                  {MOCK_PRODUCTS.map(p => {
                    const wholesaleGold = Math.round((p.price_b2b_tiers?.[0]?.price || p.price_b2c * 0.78) * 0.92);
                    const marginPct = Math.round(((p.price_b2c - wholesaleGold) / p.price_b2c) * 100);
                    return (
                      <tr key={p.id} className="hover:bg-[#FAF8F5]">
                        <td className="p-3 font-semibold text-[#181615]">{p.name}</td>
                        <td className="p-3 font-mono-tech">{formatCurrency(p.price_b2c)}</td>
                        <td className="p-3 font-mono-tech font-bold text-[#B35D43]">{formatCurrency(wholesaleGold)}</td>
                        <td className="p-3 font-mono-tech text-[#5E6F52] font-bold">+{marginPct}% / sp</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => {
                              onAddToCart({ ...p, qty: 20 });
                              onNavigate('cart');
                            }}
                            className="px-3.5 py-2 bg-[#181615] text-white font-bold uppercase text-[10px] hover:bg-[#B35D43]"
                          >
                            + Nhập Lô 20 SP
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. BÀN LÀM VIỆC CỔNG 02: KIẾN TRÚC SƯ & INTERIOR DESIGNER (B2B_Silver) */}
      {role === 'B2B_Silver' && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
              ARCHITECT BIM & 3D ASSET LIBRARY
            </span>
            <h3 className="font-heading text-2xl font-semibold">Thư Viện File 3D Models (.MAX, .SKP, .RVT) & PBR Textures 4K</h3>
            <div className="space-y-3 text-xs">
              {MOCK_PRODUCTS.slice(0, 5).map(p => (
                <div key={p.id} className="p-3.5 bg-[#FAF8F5] border border-[#E6E1D8] flex items-center justify-between gap-4">
                  <div>
                    <strong className="text-[#181615] block">{p.name}</strong>
                    <span className="text-[11px] text-[#5A544C]">Kích thước chuẩn: {p.specs?.boxSize} • Định dạng: 3dsMax Corona / SketchUp / Revit</span>
                  </div>
                  <button
                    onClick={() => onToast(`Đã tải xuống gói File 3D & Map PBR 4K của: ${p.name}`)}
                    className="px-3.5 py-2 bg-[#5E6F52] text-white font-bold uppercase shrink-0 hover:bg-[#181615]"
                  >
                    ⬇ Tải File 3D
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF6F2] border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
              CHƯƠNG TRÌNH BẢO LƯU DỰ ÁN KTS
            </span>
            <h3 className="font-heading text-2xl font-semibold">Hoa Hồng Chỉ Định Thầu 12%</h3>
            <p className="text-xs text-[#4A453E] leading-relaxed">
              Khi KTS đưa bộ 5 sản phẩm Warm Minimalist của Avenoa vào bản vẽ thiết kế căn hộ/văn phòng/quán cafe, bạn được hưởng chiết khấu Trade trực tiếp hoặc nhận 12% hoa hồng chỉ định thầu ngay khi chủ đầu tư nghiệm thu.
            </p>
            <button
              onClick={() => {
                onAddToCart({ ...MOCK_PRODUCTS[6], qty: 5 });
                onNavigate('cart');
              }}
              className="w-full py-3.5 bg-[#181615] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#B35D43]"
            >
              Tạo Báo Giá 5 Bộ Combo Cho Chủ Đầu Tư →
            </button>
          </div>
        </div>
      )}

      {/* 4. BÀN LÀM VIỆC CỔNG 03: TẬP ĐOÀN & QUÀ TẶNG DOANH NGHIỆP (B2B_Platinum) */}
      {role === 'B2B_Platinum' && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#B35D43] font-bold">
              CORPORATE OEM LASER ENGRAVING APPROVAL
            </span>
            <h3 className="font-heading text-2xl font-semibold">Trình Duyệt Mẫu Khắc Laser Logo Doanh Nghiệp (Miễn Phí)</h3>
            <input
              type="text"
              value={customLogoText}
              onChange={(e) => setCustomLogoText(e.target.value)}
              placeholder="Nhập tên Tập đoàn / Thông điệp khắc lên đế lịch gỗ & khung tranh"
              className="w-full border border-[#D5CFC4] p-3 text-xs"
            />
            <div className="p-6 bg-[#181615] text-[#E5A992] border-2 border-[#B35D43] text-center space-y-2">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-white/70 block">
                MÔ PHỎNG BẢNG ĐỒNG / ĐẾ GỖ KHẮC LASER
              </span>
              <div className="font-heading text-2xl font-bold tracking-widest uppercase">
                {customLogoText || 'AVENOA CORPORATE'}
              </div>
              <span className="text-[11px] text-[#869D7A] block">Kèm hộp quà ướp hương + Thiệp in logo riêng + Hóa đơn VAT 100%</span>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <h3 className="font-heading text-2xl font-semibold">Đặt Lô Quà Tặng Doanh Nghiệp Hạng Platinum (-15% Thêm)</h3>
            <p className="text-xs text-[#5A544C] leading-relaxed">
              Hỗ trợ công nợ 30 ngày theo hợp đồng khung, xuất hóa đơn GTGT điện tử đầy đủ và phân bổ giao hàng đến từng chi nhánh.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart({ ...MOCK_PRODUCTS[1], qty: 50 });
                  onNavigate('cart');
                }}
                className="p-4 border border-[#181615] text-left hover:bg-[#FAF6F2]"
              >
                <div className="font-bold text-xs">Lô 50 Lịch Để Bàn Gỗ Khắc Logo</div>
                <div className="font-mono-tech text-sm text-[#B35D43] font-bold mt-1">Giá Platinum: 38.250₫ / bộ</div>
              </button>
              <button
                onClick={() => {
                  onAddToCart({ ...MOCK_PRODUCTS[5], qty: 30 });
                  onNavigate('cart');
                }}
                className="p-4 border border-[#B35D43] bg-[#FAF6F2] text-left"
              >
                <div className="font-bold text-xs">Lô 30 Combo 3 Món Quà Tặng VIP</div>
                <div className="font-mono-tech text-sm text-[#B35D43] font-bold mt-1">Giá Platinum: 254.150₫ / bộ</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. BÀN LÀM VIỆC CỔNG 04: CTV & DROPSHIP TỰ DO (B2B_Dropship) */}
      {role === 'B2B_Dropship' && (
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#B35D43] font-bold">
              1-CLICK DROPSHIPPING ORDER CREATOR (KHÔNG CẦN VỐN - KHÔNG BẮT BUỘC CÓ KÊNH)
            </span>
            <h3 className="font-heading text-2xl font-semibold">Tạo Đơn Giao Thẳng Khách Lẻ & Tự Tính Tiền Lời Chênh Lệch</h3>
            <div className="space-y-3 text-xs">
              <input
                type="text"
                value={dropshipCustomer}
                onChange={(e) => setDropshipCustomer(e.target.value)}
                placeholder="Nhập Tên + SĐT + Địa chỉ khách lẻ của bạn (Kho Avenoa sẽ ẩn giá gốc khi giao)"
                className="w-full border border-[#D5CFC4] p-3"
              />
              <div className="grid sm:grid-cols-2 gap-3 items-center p-4 bg-[#FAF8F5] border border-[#DED9CE]">
                <div>
                  <span className="text-[#6E675F] block">Giá gốc CTV lấy tại kho (Combo 5 món):</span>
                  <strong className="font-mono-tech text-lg text-[#181615]">737.000 ₫</strong>
                </div>
                <div>
                  <label className="font-bold block mb-1">Giá bạn thu của khách lẻ (COD):</label>
                  <input
                    type="number"
                    value={dropshipRetailPrice}
                    onChange={(e) => setDropshipRetailPrice(Number(e.target.value))}
                    className="w-full border border-[#B35D43] bg-white p-2 font-mono-tech font-bold"
                  />
                </div>
              </div>
              <div className="p-3.5 bg-[#5E6F52]/15 border border-[#5E6F52] flex justify-between items-center">
                <span className="font-bold text-[#181615]">Tiền lời thực nhận về tài khoản CTV của bạn:</span>
                <strong className="font-mono-tech text-xl text-[#5E6F52]">
                  {formatCurrency(Math.max(0, dropshipRetailPrice - 737000))}
                </strong>
              </div>
              <button
                onClick={() => {
                  onAddToCart({ ...MOCK_PRODUCTS[6], qty: 1 });
                  onToast('Đã đẩy đơn Dropship! Kho TP.HCM sẽ đóng gói chống sốc 3 lớp giao thẳng khách của bạn.');
                  onNavigate('checkout');
                }}
                className="w-full py-3.5 bg-[#B35D43] text-white font-bold uppercase tracking-wider hover:bg-[#181615]"
              >
                Tạo Đơn Dropship Giao Thẳng Khách Ngay →
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#FAF6F2] border border-[#DED9CE] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
              KHO MEDIA KHÔNG DÍNH LOGO CHO CTV TỰ DO
            </span>
            <h3 className="font-heading text-2xl font-semibold">Tải Ảnh Thật 4 Góc & Bài Đăng Mẫu</h3>
            <p className="text-xs text-[#4A453E] leading-relaxed">
              Dành cho CTV chưa có kênh TikTok/Shopee: Chỉ cần tải bộ ảnh thật 4 góc (No 3D) và copy bài viết mẫu đăng lên Zalo cá nhân, Facebook hoặc gửi bạn bè là có thể chốt đơn ngay.
            </p>
            <button
              onClick={() => onToast('Đã tải xuống Bộ 40 Ảnh thật 4 góc + Video test thả rơi hộp chống sốc (Không dính Logo)!')}
              className="w-full py-3 bg-[#181615] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5E6F52]"
            >
              ⬇ Tải Trọn Bộ Ảnh & Video Gốc Không Logo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// TRANG BLOG DANH SÁCH & CHI TIẾT (5 CHỦ ĐỀ NỘI DUNG TRONG FILE NHÓM 3)
// =========================================================================
function BlogListPage({ onSelectBlog }) {
  return (
    <div className="max-w-[1300px] mx-auto px-4 sm:px-8 py-12 space-y-8">
      <div className="border-b border-[#DED9CE] pb-4">
        <span className="text-xs font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
          5 CHỦ ĐỀ NỘI DUNG CHIẾN DỊCH 11.11 (21/10 – 15/11)
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-[#181615] mt-1">
          Tạp Chí Không Gian Cảm Xúc Avenoa
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {MOCK_BLOGS.map(b => (
          <div key={b.id} className="bg-white border border-[#DED9CE] flex flex-col justify-between">
            <div>
              <div className="aspect-[16/10] overflow-hidden bg-[#EAE5DC]">
                <SmartImage src={b.image} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-[10px] font-mono-tech uppercase text-[#869D7A] font-bold">
                  {b.category} • {b.date}
                </span>
                <h3 className="font-heading text-xl font-semibold text-[#181615]">{b.title}</h3>
                <p className="text-xs text-[#5A544C] leading-relaxed">{b.excerpt}</p>
              </div>
            </div>
            <div className="p-6 pt-0">
              <button
                onClick={() => onSelectBlog(b.id)}
                className="text-xs font-bold uppercase tracking-wider text-[#B35D43] hover:underline"
              >
                Đọc bài viết chi tiết →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogDetailPage({ blog, onNavigate }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 space-y-6">
      <button onClick={() => onNavigate('blog')} className="text-xs font-bold uppercase text-[#6E675F]">
        ← Quay lại 5 Chủ đề Nội dung
      </button>
      <div className="bg-white border border-[#DED9CE] p-8 space-y-5">
        <span className="text-xs font-mono-tech text-[#869D7A] font-bold uppercase">{blog.category} • {blog.date}</span>
        <h1 className="font-heading text-3xl font-semibold text-[#181615]">{blog.title}</h1>
        <div className="aspect-[16/9] overflow-hidden">
          <SmartImage src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>
        <div className="text-sm leading-relaxed text-[#3D3832]" dangerouslySetInnerHTML={{ __html: blog.content }} />
      </div>
    </div>
  );
}

// =========================================================================
// CÁC TRANG THÔNG TIN: CÂU CHUYỆN, NGÂN SÁCH, KPI & ĐIỀU KIỆN PHÁP LÝ (CHUẨN FILE NHÓM 3)
// =========================================================================
function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-8 py-14 space-y-12">
      <div className="bg-white border border-[#DED9CE] p-8 sm:p-12 space-y-6">
        <span className="text-xs font-mono-tech font-bold uppercase tracking-[0.22em] text-[#9E472A]">
          PHẦN I & V TRONG HỒ SƠ DỰ ÁN • NHÓM 3
        </span>
        <h1 className="font-heading text-3xl sm:text-5xl font-semibold text-[#181615]">
          AVENOA — <span className="italic font-normal text-[#B35D43]">Nơi căn phòng ôm trọn mọi cảm xúc.</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#4A453E] leading-relaxed">
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-[#181615]">1. Ý nghĩa Tên thương hiệu & Slogan</h3>
            <p>
              <strong>Avenoa</strong> là tên gọi mang âm hưởng nhẹ nhàng, hiện đại và tinh tế, hướng đến việc biến những góc nhỏ quen thuộc trở nên đẹp mắt, tiện nghi và thể hiện cá tính riêng.
            </p>
            <p>
              Slogan <strong>“Nơi căn phòng ôm trọn mọi cảm xúc”</strong> khẳng định niềm tin của chúng tôi rằng căn phòng không chỉ là bốn bức tường, mà là nơi chứng kiến mọi phiên bản của bạn. Dù là lúc ngập tràn niềm vui hay những khi trĩu nặng nỗi buồn, những món đồ decor của AVENOA luôn lặng lẽ hiện diện, đồng hành và sưởi ấm không gian.
            </p>
          </div>
          <div className="space-y-3">
            <h3 className="font-heading text-xl font-semibold text-[#181615]">2. Chân dung Khách hàng & Insight (23–40 tuổi)</h3>
            <p>
              <strong>Nhân khẩu học:</strong> 23 – 40 tuổi (60% Nữ – 40% Nam) tại TP.HCM, Hà Nội, Đà Nẵng; Nhân viên văn phòng, Freelancer, WFH có thu nhập 10 – 25 triệu VNĐ/tháng, chuộng phong cách <strong>Warm Minimalist (Trắng kem – Xanh rêu – Nâu gỗ)</strong>.
            </p>
            <blockquote className="p-4 bg-[#FAF8F5] border-l-4 border-[#B35D43] italic text-xs">
              “Sau một ngày dài kiệt sức vì phải giải quyết hàng tá công việc, tôi khao khát có một góc làm việc thật ấm cúng để tìm lại cảm hứng; nhưng chính sự mệt mỏi đó lại khiến tôi ‘lười’ phải suy nghĩ xem nên chọn món gì, phối màu ra sao... Tôi chỉ thực sự xuống tiền khi có ai đó bày sẵn một tổng thể hoàn hảo đúng gu và cho tôi một ‘cái cớ’ đủ hời, đủ an toàn để bấm mua ngay.”
            </blockquote>
          </div>
        </div>
      </div>

      {/* Ngân sách 15.000.000 VNĐ & KPIs Doanh thu 66.750.000 VNĐ */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 bg-white border border-[#DED9CE] p-6 sm:p-8 space-y-4">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#5E6F52] font-bold">
            BẢNG PHÂN BỔ NGÂN SÁCH CHIẾN DỊCH 11.11 (26 NGÀY)
          </span>
          <h3 className="font-heading text-2xl font-semibold text-[#181615]">Tổng Ngân Sách: 15.000.000 VNĐ</h3>
          <div className="space-y-2.5 text-xs">
            {[
              { name: '1. Performance Marketing & Content (40,0%)', val: '6.000.000 ₫', sub: 'Shopee Search Ads (2,5M), TikTok Shop Ads (1,5M), Meta Ads (1M), Visual & KOC (1M)' },
              { name: '2. Xúc tiến bán hàng & Khuyến mãi (21,3%)', val: '3.200.000 ₫', sub: '20 mã Tiên Phong 50K (1M) + 50 mã giờ vàng 20K (1M) + 80 suất QR Lì xì 5 sao 15K (1,2M)' },
              { name: '3. Logistics & Trải nghiệm khách hàng (16,0%)', val: '2.400.000 ₫', sub: 'In thiệp viết tay & giấy thơm (600K) + Quỹ hỗ trợ ship Dùng thử 7 ngày & giao 24h (1,8M)' },
              { name: '4. Hạ tầng Công nghệ & Công cụ (9,3%)', val: '1.400.000 ₫', sub: 'Tên miền, Hosting Website/Landing Page, Chatbot & Email tự động' },
              { name: '5. Dự phòng & Quản trị rủi ro (13,4%)', val: '2.000.000 ₫', sub: 'Thực chi trực chat/đóng gói & đền bù vỡ hỏng 1.200.000₫ (Giữ 800.000₫ dự phòng an toàn)' }
            ].map((b, i) => (
              <div key={i} className="p-3 bg-[#FAF8F5] border border-[#E6E1D8]">
                <div className="flex justify-between font-bold text-[#181615]">
                  <span>{b.name}</span>
                  <span className="font-mono-tech text-[#B35D43]">{b.val}</span>
                </div>
                <p className="text-[11px] text-[#5A544C] mt-0.5">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-[#181615] text-white p-6 sm:p-8 space-y-4">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#869D7A] font-bold">
            HIỆU QUẢ TÀI CHÍNH DỰ KIẾN & ĐIỂM HÒA VỐN (240 ĐƠN HÀNG)
          </span>
          <h3 className="font-heading text-2xl font-semibold text-white">Doanh Thu Thuần: 66.750.000 VNĐ</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span>1. Doanh thu hàng bán (Trước Voucher):</span>
              <strong className="font-mono-tech">69.950.000 ₫ (104,8%)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-[#E5A992]">
              <span>2. (-) Khuyến mãi Voucher & Lì xì QR 5 sao:</span>
              <strong className="font-mono-tech">- 3.200.000 ₫ (4,8%)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-white font-bold">
              <span>3. DOANH THU THUẦN (NET REVENUE):</span>
              <strong className="font-mono-tech text-base text-[#869D7A]">66.750.000 ₫ (100%)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-[#A8A298]">
              <span>4. (-) Giá vốn hàng bán & Đóng gói chống sốc:</span>
              <strong className="font-mono-tech">- 31.310.000 ₫ (46,9%)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-[#A8A298]">
              <span>5. (-) Chi phí Sàn TMĐT & Thanh toán:</span>
              <strong className="font-mono-tech">- 12.238.950 ₫ (18,3%)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-[#A8A298]">
              <span>6. (-) Chi phí Vận hành Chiến dịch thực chi:</span>
              <strong className="font-mono-tech">- 11.000.000 ₫ (16,5%)</strong>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10 text-[#A8A298]">
              <span>7. (-) Thuế TMĐT Hộ kinh doanh (1,5%):</span>
              <strong className="font-mono-tech">- 1.001.250 ₫ (1,5%)</strong>
            </div>
            <div className="flex justify-between py-3 bg-white/10 px-3 mt-2">
              <span className="font-bold uppercase">8. (=) LỢI NHUẬN RÒNG THỰC THU:</span>
              <strong className="font-mono-tech text-lg text-[#E5A992]">11.199.800 ₫ (16,8%)</strong>
            </div>
            <p className="text-[11px] text-[#A8A298] pt-2 leading-relaxed">
              • <strong>Điểm hòa vốn (Break-Even Point):</strong> Chỉ cần đạt <strong>114 đơn hàng (31.706.250₫)</strong> là chính thức hòa vốn. Mục tiêu 240 đơn vượt ngưỡng hòa vốn 126 đơn (ROAS đạt 11,1 lần; CAC = 38.333₫/đơn).
            </p>
          </div>
        </div>
      </div>

      {/* Điều kiện Pháp lý & Tuân thủ kinh doanh */}
      <div className="bg-white border border-[#DED9CE] p-8 space-y-4">
        <span className="text-xs font-mono-tech uppercase tracking-widest text-[#9E472A] font-bold">
          MỤC 5.2 • LEGAL & COMPLIANCE
        </span>
        <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#181615]">
          4 Nhóm Điều Kiện Pháp Lý & Tuân Thủ Kinh Doanh
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#4A453E]">
          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D8] space-y-1.5">
            <strong className="text-[#181615] block">1. Pháp lý Chủ thể & Sàn TMĐT</strong>
            <p>Đăng ký Giấy phép Hộ kinh doanh cá thể tại TP.HCM; hoàn tất định danh KYC trên Shopee & TikTok Shop; Thông báo Website TMĐT bán hàng với Bộ Công Thương.</p>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D8] space-y-1.5">
            <strong className="text-[#181615] block">2. Kế toán & Nghĩa vụ Thuế (1,5%)</strong>
            <p>Tuân thủ kê khai và nộp thuế TMĐT đối với hộ kinh doanh: 1,5% doanh thu thuần (gồm 1% thuế GTGT + 0,5% thuế TNCN đã tính trong giá bán).</p>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D8] space-y-1.5">
            <strong className="text-[#181615] block">3. Hàng hóa & Sở hữu trí tuệ</strong>
            <p>Đầy đủ chứng từ vận chuyển, dán tem nhãn phụ tiếng Việt (Đèn bàn, Đồng hồ); đăng ký bảo hộ nhãn hiệu "Avenoa" và 100% ảnh/video tự sản xuất.</p>
          </div>
          <div className="p-4 bg-[#FAF8F5] border border-[#E6E1D8] space-y-1.5">
            <strong className="text-[#181615] block">4. Bảo vệ NTD & Nghị định 13/2023</strong>
            <p>Công khai minh bạch điều khoản Đồng kiểm – Dùng thử 7 ngày hoàn tiền 100%; bảo mật tuyệt đối dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowroomPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 space-y-8">
      <div className="border-b border-[#DED9CE] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#869D7A]">Google Business Profile & Warehouse</span>
          <h1 className="font-heading text-4xl font-semibold text-[#181615] mt-1">Kho Hàng TP.HCM & Điểm Xác Thực Địa Điểm</h1>
        </div>
        <a
          href={SOCIAL_LINKS.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#2E7D32] text-white px-5 py-3 text-xs font-bold uppercase tracking-wider hover:opacity-90"
        >
          📍 Mở Google Business Profile ↗
        </a>
      </div>
    </div>
  );
}

// =========================================================================
// TỔ HỢP NÚT LIÊN HỆ ĐA KÊNH & ROBOT AI MINI GỌN GÀNG BÊN PHẢI
// =========================================================================
function OmnichannelWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Xin chào! Tôi là Trợ lý AI của AVENOA – Nơi căn phòng ôm trọn mọi cảm xúc (SLA phản hồi < 5 phút). Bạn cần tư vấn về 5 sản phẩm (Lịch gỗ 69K – Mở hàng 55K, Chậu cây 109K, Đồng hồ 219K, Tranh Canvas 239K, Đèn bàn 379K), Combo 3 món (369K) – 5 món (899K) hay nhận Voucher Tiên Phong 50.000₫?'
    }
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    'Bảng giá 5 món & Combo?',
    'Chính sách Dùng thử 7 ngày?',
    'Xin link Shopee & TikTok Shop',
    'Cách nhận Voucher 50K & QR 15K?'
  ];

  const replyLogic = (questionText) => {
    const q = questionText.toLowerCase();
    if (q.includes('shopee') || q.includes('tiktok') || q.includes('link') || q.includes('kênh') || q.includes('map')) {
      return 'Hệ thống 11 kênh chính thức của AVENOA: Shopee (shopee.vn/avenoa123), TikTok Shop (vt.tiktok.com/ZSgsAPFrX/?page=TikTokShop), TikTok (@avenoa5), YouTube Shorts (@Avenoa-q8c), Instagram & Threads (@avenoa_decor), Fanpage Facebook và Google Maps Kho TP.HCM!';
    }
    if (q.includes('dùng thử') || q.includes('7 ngày') || q.includes('đổi trả') || q.includes('đồng kiểm')) {
      return 'Cam kết Vàng từ AVENOA: Cho phép Đồng kiểm 100% tại điểm giao nhận (cắm thử đèn, kiểm tra vân gỗ, men gốm, vải Canvas) + Đặt lên bàn dùng thử 7 ngày! Ngay cả khi hàng không lỗi nhưng bạn thấy chưa hợp phòng, Avenoa vẫn đổi mẫu hoặc hoàn tiền 100% trong 24h.';
    }
    if (q.includes('voucher') || q.includes('50k') || q.includes('15k') || q.includes('11.11')) {
      return 'Trong Siêu Hội 11.11 "Decor giá hời – Thả ga đổi mới", bạn hãy nhập mã TIENPHONG50K (giảm 50.000₫ cho đơn Combo), mã KHUNGGIOVANG20K (giảm 20.000₫ khung 0h-12h-20h). Đặc biệt trong mỗi kiện hàng đều có Thiệp viết tay gắn mã QR lì xì 15.000₫ khi đánh giá 5 sao!';
    }
    return 'Bảng giá thực tế 5 sản phẩm AVENOA: 1. Lịch để bàn gỗ: 69.000₫ (50 suất mở hàng 55.000₫) • 2. Chậu cây mini gốm: 109.000₫ • 3. Đồng hồ để bàn: 219.000₫ • 4. Tranh Canvas 30×40: 239.000₫ • 5. Đèn bàn: 379.000₫. Mua Gói Combo 3 món chỉ 369.000₫ (tiết kiệm 48K) hoặc Combo Full 5 món chỉ 899.000₫ (tiết kiệm 116K)!';
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }, { sender: 'bot', text: replyLogic(userMsg) }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
      {chatOpen && (
        <div className="w-[330px] sm:w-[370px] bg-white border-2 border-[#181615] shadow-2xl mb-2 overflow-hidden">
          <div className="bg-[#181615] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#869D7A] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider">AVENOA AI Tư Vấn 24/7</span>
            </div>
            <button onClick={() => setChatOpen(false)} className="text-xs text-[#A8A298] hover:text-white">✕</button>
          </div>
          <div className="p-3.5 h-64 overflow-y-auto space-y-2.5 bg-[#FAF8F5] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-2.5 max-w-[88%] leading-relaxed ${
                  m.sender === 'bot' ? 'bg-white border border-[#DED9CE] text-[#181615]' : 'bg-[#B35D43] text-white ml-auto'
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="px-3 py-2 bg-[#F2EDE4] flex flex-wrap gap-1.5 border-t border-[#DED9CE]">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setMessages(prev => [...prev, { sender: 'user', text: q }, { sender: 'bot', text: replyLogic(q) }])}
                className="text-[10px] bg-white border border-[#D5CFC4] px-2 py-1 hover:border-[#B35D43]"
              >
                {q}
              </button>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex border-t border-[#DED9CE]">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi cho Avenoa AI..."
              className="flex-1 px-3 py-2.5 text-xs outline-none"
            />
            <button type="submit" className="px-4 bg-[#181615] text-white text-xs font-bold">Gửi</button>
          </form>
        </div>
      )}

      {/* Cụm nút tròn chỉ chứa Icon gọn gàng + Robot AI mini */}
      <a
        href={SOCIAL_LINKS.shopee}
        target="_blank"
        rel="noopener noreferrer"
        title="Shopee Chính Hãng (54% Traffic)"
        className="w-11 h-11 rounded-full bg-[#EE4D2D] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold text-xs"
      >
        SP
      </a>
      <a
        href={SOCIAL_LINKS.zalo}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat Zalo 0396648110"
        className="w-11 h-11 rounded-full bg-[#0068FF] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold text-[11px]"
      >
        Zalo
      </a>
      <a
        href={SOCIAL_LINKS.facebook}
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook Fanpage Messenger"
        className="w-11 h-11 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform font-bold text-xs"
      >
        FB
      </a>
      <button
        onClick={() => setChatOpen(!chatOpen)}
        title="Trợ lý Robot AI tự động"
        className="relative w-12 h-12 rounded-full bg-[#181615] text-white border-2 border-[#B35D43] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <svg className="w-6 h-6 text-[#E5A992]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="7" width="16" height="12" rx="3" />
          <path d="M12 3v4M8 3h8M9 12h.01M15 12h.01M9 16h6" strokeLinecap="round" />
        </svg>
        <span className="absolute -top-1 -right-1 bg-[#B35D43] text-white text-[9px] font-mono-tech font-bold px-1 rounded">
          AI
        </span>
      </button>
    </div>
  );
}

// =========================================================================
// FOOTER CHÂN TRANG ĐA KÊNH CHÍNH THỨC
// =========================================================================
function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#141413] text-[#E6E1D8] pt-16 pb-12 mt-20 border-t border-[#9E472A]/40">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#FAF8F5] inline-block p-2.5">
            <BrandLogo className="h-11" />
          </div>
          <p className="text-xs text-[#A8A298] leading-relaxed max-w-sm">
            <strong>AVENOA – Nơi căn phòng ôm trọn mọi cảm xúc.</strong> Thương hiệu sản phẩm trang trí và tiện ích bàn làm việc phong cách Tối giản ấm áp (Warm Minimalist: Trắng kem – Xanh rêu – Nâu gỗ). Mô hình B2C + B2B.
          </p>
          <div className="pt-2 space-y-2">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#94A886] block font-bold">
              Hệ sinh thái 11 kênh triển khai chiến dịch 11.11:
            </span>
            <div className="flex flex-wrap gap-2">
              <a
                href={SOCIAL_LINKS.shopee}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#EE4D2D] text-white text-[11px] font-semibold hover:opacity-90 transition-opacity"
              >
                Shopee (54% Traffic) ↗
              </a>
              <a
                href={SOCIAL_LINKS.tiktokShop}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white text-[#141413] text-[11px] font-bold hover:bg-[#E5A992] transition-colors"
              >
                TikTok Shop (33% Traffic) ↗
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#FF0000] text-white text-[11px] font-semibold hover:opacity-90 transition-opacity"
              >
                YouTube Shorts (@Avenoa-q8c) ↗
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#1877F2] text-white text-[11px] font-semibold hover:opacity-90 transition-opacity"
              >
                Facebook Fanpage ↗
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-semibold hover:border-[#9E472A] transition-colors"
              >
                TikTok (@avenoa5) ↗
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-semibold hover:border-[#9E472A] transition-colors"
              >
                Instagram (@avenoa_decor) ↗
              </a>
              <a
                href={SOCIAL_LINKS.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/10 border border-white/20 text-white text-[11px] font-semibold hover:border-[#9E472A] transition-colors"
              >
                Threads (@avenoa_decor) ↗
              </a>
              <a
                href={SOCIAL_LINKS.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-[#2E7D32] text-white text-[11px] font-semibold hover:opacity-90 transition-opacity"
              >
                📍 Google Business Profile ↗
              </a>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase text-xs tracking-widest mb-4">5 Sản phẩm & 2 Combo</h4>
          <ul className="space-y-2.5 text-xs text-[#A8A298]">
            <li><button onClick={() => onNavigate('detail', 'sku-cal-001')} className="hover:text-white">1. Lịch để bàn gỗ — 69.000₫ (Mở hàng 55K)</button></li>
            <li><button onClick={() => onNavigate('detail', 'sku-plant-001')} className="hover:text-white">2. Chậu cây mini gốm — 109.000₫</button></li>
            <li><button onClick={() => onNavigate('detail', 'sku-clock-001')} className="hover:text-white">3. Đồng hồ để bàn — 219.000₫</button></li>
            <li><button onClick={() => onNavigate('detail', 'sku-art-001')} className="hover:text-white">4. Tranh Canvas 30×40 — 239.000₫</button></li>
            <li><button onClick={() => onNavigate('detail', 'sku-lamp-001')} className="hover:text-white">5. Đèn bàn ấm áp — 379.000₫</button></li>
            <li><button onClick={() => onNavigate('campaign-1111')} className="text-[#E5A992] font-bold hover:underline">★ Combo 3 món (369K) & Full 5 món (899K)</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase text-xs tracking-widest mb-4">Cam kết Dịch vụ</h4>
          <ul className="space-y-2.5 text-xs text-[#A8A298]">
            <li>• Dùng thử tại bàn 7 ngày – Hoàn tiền 100%</li>
            <li>• Đồng kiểm thực tế 100% khi nhận hàng</li>
            <li>• Xuất kho trong 24h tại TP.HCM</li>
            <li>• Đóng gói chống sốc 3 lớp (&lt;1,5% bể vỡ)</li>
            <li>• Thiệp viết tay tên riêng + Mã QR lì xì 15K</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white uppercase text-xs tracking-widest mb-4">Pháp lý & Liên hệ</h4>
          <ul className="space-y-2.5 text-xs text-[#A8A298]">
            <li>Hộ kinh doanh cá thể AVENOA (TP.HCM)</li>
            <li>Thuế TMĐT định mức: 1,5% (1% GTGT + 0,5% TNCN)</li>
            <li>Bảo mật dữ liệu: Nghị định 13/2023/NĐ-CP</li>
            <li>Hotline / Zalo: <strong className="text-white">0396 648 110</strong></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}