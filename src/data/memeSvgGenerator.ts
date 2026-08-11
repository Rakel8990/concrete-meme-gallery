// Comprehensive SVG renderer for all 26 Concrete.xyz memes crafted by Kian / 22KIAN

export function createConcreteMemeSvg(
  number: string,
  title: string,
  topText: string,
  bottomText: string,
  type: string,
  accentColor: string = '#f3d99b',
  watermark: string = '22KIAN'
): string {
  const isDarkMode = type === 'dark' || type === 'drake' || type === 'stone';
  const bgColor = isDarkMode ? '#0d1117' : '#f7f4ec';
  const textPrimary = isDarkMode ? '#f7f4ec' : '#080a0f';
  const textAccent = isDarkMode ? '#f3d99b' : '#5b1e95';
  const strokeColor = isDarkMode ? '#f7f4ec' : '#080a0f';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%" style="background-color: ${bgColor}; font-family: system-ui, -apple-system, sans-serif;">
    <defs>
      <pattern id="grid-${number}" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${isDarkMode ? '#1f293d' : '#e5dfd0'}" stroke-width="0.8"/>
      </pattern>
      <filter id="shadow-${number}" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="#000000" flood-opacity="0.25"/>
      </filter>
    </defs>
    
    <!-- Background Canvas -->
    <rect width="800" height="600" fill="${bgColor}"/>
    <rect width="800" height="600" fill="url(#grid-${number})" opacity="0.7"/>

    <!-- Top Text Header Banner -->
    ${topText ? `
    <g transform="translate(400, ${type === 'drake' ? 35 : 55})">
      <rect x="-370" y="-30" width="740" height="52" fill="${isDarkMode ? '#161b22' : '#080a0f'}" rx="6" />
      <text font-family="'Space Grotesk', 'Impact', sans-serif" font-weight="900" font-size="${topText.length > 50 ? '16' : topText.length > 35 ? '18' : '22'}" fill="${isDarkMode ? '#f3d99b' : '#ffffff'}" text-anchor="middle" y="5" letter-spacing="0.5">
        ${escapeXml(topText.toUpperCase())}
      </text>
    </g>
    ` : ''}

    <!-- Central Meme Illustration Area -->
    <g transform="translate(400, ${topText ? 300 : 270})">
      ${renderMemeGraphic(type, accentColor, strokeColor)}
    </g>

    <!-- Bottom Text Banner -->
    ${bottomText ? `
    <g transform="translate(400, 530)">
      <rect x="-370" y="-24" width="740" height="48" fill="${accentColor}" rx="8" stroke="${strokeColor}" stroke-width="2.5" />
      <text font-family="'Space Grotesk', 'Impact', sans-serif" font-weight="900" font-size="${bottomText.length > 45 ? '16' : '20'}" fill="#080a0f" text-anchor="middle" y="6">
        ${escapeXml(bottomText.toUpperCase())}
      </text>
    </g>
    ` : ''}

    <!-- Watermark Badge -->
    <g transform="translate(730, 565)">
      <rect x="-42" y="-16" width="74" height="24" fill="#5b1e95" rx="4" />
      <text font-family="monospace" font-weight="900" font-size="13" fill="#f3d99b" text-anchor="middle" y="1">${escapeXml(watermark)}</text>
    </g>

    <!-- Concrete Branding Badge -->
    <g transform="translate(55, 565)">
      <rect x="-20" y="-18" width="40" height="28" fill="#f3d99b" stroke="#080a0f" stroke-width="2" rx="3" />
      <line x1="-12" y1="-10" x2="12" y2="-10" stroke="#080a0f" stroke-width="2" />
      <text font-family="sans-serif" font-weight="900" font-size="18" fill="#080a0f" text-anchor="middle" y="7">C</text>
      <line x1="-12" y1="10" x2="12" y2="10" stroke="#080a0f" stroke-width="2" />
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderMemeGraphic(type: string, accent: string, stroke: string): string {
  switch (type) {
    case 'drake':
      return `
        <!-- Drake Meme 2 Panels -->
        <g transform="translate(-350, -190)">
          <!-- Top Panel: Rejecting 25% APY -->
          <rect x="0" y="0" width="700" height="180" fill="#2b2820" rx="6" stroke="#444" stroke-width="2"/>
          <!-- Drake Top -->
          <g transform="translate(20, 10)">
            <rect x="0" y="0" width="150" height="160" fill="#d49a6a" rx="10"/>
            <!-- Drake jacket red -->
            <path d="M 0 80 Q 75 40 150 80 L 150 160 L 0 160 Z" fill="#e63946"/>
            <circle cx="75" cy="50" r="30" fill="#b07246"/>
            <!-- Hand rejecting -->
            <path d="M 120 70 Q 150 30 110 20" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>
            <text x="75" y="140" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">DRAKE NO</text>
          </g>
          <!-- Panel 1 Text -->
          <text x="430" y="100" font-family="'Impact', sans-serif" font-size="28" fill="#ffffff" text-anchor="middle">
            Chasing 25% APY farms that disappear next week
          </text>

          <!-- Divider -->
          <line x1="0" y1="185" x2="700" y2="185" stroke="#f3d99b" stroke-width="4"/>

          <!-- Bottom Panel: Approving Concrete -->
          <g transform="translate(0, 195)">
            <rect x="0" y="0" width="700" height="180" fill="#1e2b20" rx="6" stroke="#444" stroke-width="2"/>
            <!-- Drake Bottom -->
            <g transform="translate(20, 10)">
              <rect x="0" y="0" width="150" height="160" fill="#d49a6a" rx="10"/>
              <!-- Drake jacket orange -->
              <path d="M 0 80 Q 75 40 150 80 L 150 160 L 0 160 Z" fill="#f77f00"/>
              <circle cx="75" cy="50" r="30" fill="#b07246"/>
              <!-- Hand pointing approving -->
              <path d="M 110 80 L 145 65" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round"/>
              <text x="75" y="140" font-size="11" fill="#fff" font-weight="bold" text-anchor="middle">DRAKE YES</text>
            </g>
            <!-- Panel 2 Text -->
            <text x="430" y="100" font-family="'Impact', sans-serif" font-size="28" fill="#f3d99b" text-anchor="middle">
              Risk-adjusted yield with Concrete vaults
            </text>
          </g>
        </g>
      `;

    case 'normal_vs_concrete':
      return `
        <!-- Split screen: Normal User vs Concrete User -->
        <g transform="translate(-350, -170)">
          <!-- Vertical Split Line -->
          <line x1="350" y1="-20" x2="350" y2="340" stroke="#080a0f" stroke-width="8"/>
          
          <!-- LEFT: Normal User -->
          <g transform="translate(170, 120)">
            <!-- Loading Flork -->
            <ellipse cx="0" cy="40" rx="60" ry="75" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-20" cy="20" r="5" fill="#080a0f"/>
            <circle cx="20" cy="20" r="5" fill="#080a0f"/>
            <!-- Loading spinner over head -->
            <g transform="translate(0, -60)">
              <circle cx="0" cy="0" r="25" fill="none" stroke="#ccc" stroke-width="6"/>
              <path d="M 0 -25 A 25 25 0 0 1 25 0" fill="none" stroke="#5b1e95" stroke-width="6" stroke-linecap="round"/>
            </g>
            <text x="0" y="-100" font-family="'Impact', sans-serif" font-size="28" fill="#d97706" text-anchor="middle">NORMAL USER</text>
          </g>

          <!-- RIGHT: Concrete User -->
          <g transform="translate(530, 120)">
            <!-- Chad Flork with Sunglasses and Grad Cap -->
            <ellipse cx="0" cy="40" rx="65" ry="75" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <!-- Sunglasses -->
            <polygon points="-40,15 0,15 -5,35 -35,35" fill="#080a0f"/>
            <polygon points="5,15 45,15 40,35 10,35" fill="#080a0f"/>
            <line x1="0" y1="20" x2="5" y2="20" stroke="#080a0f" stroke-width="4"/>
            <!-- Cool smile -->
            <path d="M -15 50 Q 0 65 15 50" fill="none" stroke="#080a0f" stroke-width="4"/>
            <!-- Graduation Cap -->
            <polygon points="0,-45 55,-25 0,-5 -55,-25" fill="#1e293b"/>
            <rect x="-25" y="-20" width="50" height="20" fill="#1e293b"/>
            <path d="M 45 -20 L 50 15" stroke="#f3d99b" stroke-width="4"/>
            <!-- Peace signs hands -->
            <path d="M -50 50 L -80 30 M -80 30 L -90 10 M -80 30 L -70 10" stroke="#080a0f" stroke-width="4" stroke-linecap="round"/>
            <path d="M 50 50 L 80 30 M 80 30 L 90 10 M 80 30 L 70 10" stroke="#080a0f" stroke-width="4" stroke-linecap="round"/>
            
            <text x="0" y="-100" font-family="'Impact', sans-serif" font-size="24" fill="#080a0f" text-anchor="middle">AVERAGE DAY AS A CONCRETE USER</text>
          </g>
        </g>
      `;

    case 'sumo':
      return `
        <!-- Sumo Wrestler vs Small Guy -->
        <g transform="translate(-300, -150)">
          <!-- LEFT: Sumo (Concrete) -->
          <g transform="translate(120, 140)">
            <ellipse cx="0" cy="0" rx="100" ry="90" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
            <!-- Head -->
            <circle cx="20" cy="-70" r="30" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <!-- Hair Topknot -->
            <circle cx="20" cy="-105" r="12" fill="#080a0f"/>
            <!-- Mawashi belt -->
            <path d="M -90 20 L 90 20 L 70 80 L -70 80 Z" fill="#080a0f"/>
            <!-- Sumo pose legs -->
            <path d="M -80 80 L -110 140 M 60 80 L 90 140" stroke="#080a0f" stroke-width="12" stroke-linecap="round"/>
            <!-- Label -->
            <rect x="-80" y="-150" width="160" height="36" fill="#080a0f" rx="4"/>
            <text x="0" y="-126" font-family="'Impact', sans-serif" font-size="22" fill="#ffffff" text-anchor="middle">CONCRETE</text>
          </g>

          <!-- RIGHT: Small Guy (Other DeFi's) -->
          <g transform="translate(480, 180)">
            <circle cx="0" cy="-40" r="18" fill="#ffffff" stroke="#080a0f" stroke-width="4"/>
            <!-- Glasses & Sad face -->
            <circle cx="-6" cy="-42" r="5" fill="none" stroke="#080a0f" stroke-width="2"/>
            <circle cx="6" cy="-42" r="5" fill="none" stroke="#080a0f" stroke-width="2"/>
            <path d="M -8 -30 Q 0 -38 8 -30" stroke="#080a0f" stroke-width="3" fill="none"/>
            <!-- Skinny body squatting -->
            <path d="M 0 -20 L 0 30 L -25 70 M 0 30 L 25 70" stroke="#080a0f" stroke-width="5" fill="none"/>
            <path d="M 0 -10 L -25 15 M 0 -10 L 25 15" stroke="#080a0f" stroke-width="4" fill="none"/>
            
            <rect x="-70" y="-100" width="140" height="32" fill="#080a0f" rx="4"/>
            <text x="0" y="-78" font-family="'Impact', sans-serif" font-size="16" fill="#ffffff" text-anchor="middle">OTHER DEFI'S</text>
          </g>
        </g>
      `;

    case 'chilling':
      return `
        <!-- Chilling Flork surrounded by crying people -->
        <g transform="translate(0, -20)">
          <!-- Crying chaos background florks -->
          <g opacity="0.35" transform="translate(-200, -80)">
            <ellipse cx="0" cy="0" rx="40" ry="50" fill="#fff" stroke="#000" stroke-width="3"/>
            <path d="M -15 10 Q 0 -10 15 10" stroke="#000" stroke-width="3" fill="none"/>
            <path d="M -10 0 L -10 30 M 10 0 L 10 30" stroke="#0284c7" stroke-width="3"/>
          </g>
          <g opacity="0.35" transform="translate(200, -90)">
            <ellipse cx="0" cy="0" rx="45" ry="55" fill="#fff" stroke="#000" stroke-width="3"/>
            <path d="M -20 -10 L 20 -10" stroke="#000" stroke-width="3"/>
            <path d="M -15 10 L -25 40 M 15 10 L 25 40" stroke="#0284c7" stroke-width="3"/>
          </g>

          <!-- Main Smiling Praying Flork -->
          <g transform="translate(0, 40)">
            <ellipse cx="0" cy="0" rx="90" ry="110" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
            <!-- Happy dot eyes -->
            <circle cx="-30" cy="-30" r="6" fill="#080a0f"/>
            <circle cx="30" cy="-30" r="6" fill="#080a0f"/>
            <!-- Big happy smile -->
            <path d="M -40 10 Q 0 50 40 10" fill="none" stroke="#080a0f" stroke-width="5" stroke-linecap="round"/>
            <!-- Praying hands in front -->
            <path d="M -25 30 L 0 -10 L 25 30 Z" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <line x1="0" y1="-10" x2="0" y2="30" stroke="#080a0f" stroke-width="3"/>
          </g>
        </g>
      `;

    case 'cinderblock_stick':
      return `
        <!-- Stickman holding cinder block -->
        <g transform="translate(0, 10)">
          <circle cx="0" cy="-100" r="45" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
          <!-- Happy smile -->
          <path d="M -20 -95 Q 0 -75 20 -95" fill="none" stroke="#080a0f" stroke-width="5"/>
          <circle cx="-15" cy="-110" r="5" fill="#080a0f"/>
          <circle cx="15" cy="-110" r="5" fill="#080a0f"/>
          <!-- Body -->
          <line x1="0" y1="-55" x2="0" y2="70" stroke="#080a0f" stroke-width="8"/>
          <!-- Legs -->
          <line x1="0" y1="70" x2="-50" y2="160" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
          <line x1="0" y1="70" x2="50" y2="160" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
          
          <!-- Raised arms holding block overhead -->
          <path d="M 0 -30 L 80 -130 L 110 -150" stroke="#080a0f" stroke-width="8" fill="none" stroke-linecap="round"/>
          <path d="M 0 -30 L -40 -100 L -60 -120" stroke="#080a0f" stroke-width="8" fill="none" stroke-linecap="round"/>

          <!-- Cinder block in hand -->
          <g transform="translate(130, -200) rotate(-15)">
            <rect x="0" y="0" width="130" height="90" fill="#94a3b8" stroke="#080a0f" stroke-width="6" rx="6"/>
            <!-- Hole 1 & 2 -->
            <rect x="20" y="20" width="38" height="50" fill="#334155" rx="4"/>
            <rect x="72" y="20" width="38" height="50" fill="#334155" rx="4"/>
          </g>
        </g>
      `;

    case 'brick_ear':
      return `
        <!-- Stickman with Brick to ear -->
        <g transform="translate(0, 10)">
          <circle cx="-20" cy="-70" r="50" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
          <circle cx="-35" cy="-80" r="5" fill="#080a0f"/>
          <circle cx="-10" cy="-80" r="5" fill="#080a0f"/>
          <path d="M -35 -60 Q -20 -45 -5 -60" fill="none" stroke="#080a0f" stroke-width="5"/>
          <!-- Body -->
          <line x1="-20" y1="-20" x2="-20" y2="100" stroke="#080a0f" stroke-width="8"/>
          <path d="M -20 100 L -120 170 M -20 100 L 60 170" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>

          <!-- Red Brick held to ear -->
          <g transform="translate(30, -120) rotate(15)">
            <rect x="0" y="0" width="110" height="80" fill="#ea580c" stroke="#080a0f" stroke-width="5" rx="4"/>
            <circle cx="25" cy="25" r="10" fill="#7c2d12"/>
            <circle cx="55" cy="25" r="10" fill="#7c2d12"/>
            <circle cx="85" cy="25" r="10" fill="#7c2d12"/>
            <circle cx="25" cy="55" r="10" fill="#7c2d12"/>
            <circle cx="55" cy="55" r="10" fill="#7c2d12"/>
            <circle cx="85" cy="55" r="10" fill="#7c2d12"/>
          </g>

          <!-- Arm holding brick to ear -->
          <path d="M -20 10 L 40 -20 L 50 -60" stroke="#080a0f" stroke-width="8" fill="none" stroke-linecap="round"/>
        </g>
      `;

    case 'microphones':
      return `
        <!-- Kid surrounded by press microphones -->
        <g transform="translate(0, 20)">
          <!-- Kid in green jacket -->
          <circle cx="0" cy="-80" r="35" fill="#fca5a5" stroke="#080a0f" stroke-width="4"/>
          <!-- Green tracksuit jacket -->
          <path d="M -50 -45 L 50 -45 L 60 80 L -60 80 Z" fill="#15803d" stroke="#080a0f" stroke-width="5"/>
          <path d="M -50 -10 L 50 -10" stroke="#ffffff" stroke-width="6"/>

          <!-- Surrounding Press Microphones -->
          <g transform="translate(-180, 20) rotate(35)">
            <rect x="0" y="0" width="25" height="70" fill="#1e293b" rx="4"/>
            <circle cx="12" cy="-12" r="18" fill="#eab308"/>
          </g>
          <g transform="translate(-110, 40) rotate(20)">
            <rect x="0" y="0" width="25" height="70" fill="#1e293b" rx="4"/>
            <circle cx="12" cy="-12" r="18" fill="#2563eb"/>
          </g>
          <g transform="translate(-30, 50) rotate(5)">
            <rect x="0" y="0" width="25" height="70" fill="#1e293b" rx="4"/>
            <circle cx="12" cy="-12" r="18" fill="#dc2626"/>
          </g>
          <g transform="translate(50, 40) rotate(-15)">
            <rect x="0" y="0" width="25" height="70" fill="#1e293b" rx="4"/>
            <circle cx="12" cy="-12" r="18" fill="#16a34a"/>
          </g>
          <g transform="translate(130, 20) rotate(-35)">
            <rect x="0" y="0" width="25" height="70" fill="#1e293b" rx="4"/>
            <circle cx="12" cy="-12" r="18" fill="#9333ea"/>
          </g>
        </g>
      `;

    case 'vitamin_c':
      return `
        <!-- Big Vitamin C Logo + Bowing Stickman -->
        <g transform="translate(0, -30)">
          <!-- I NEED VITAMIN -->
          <text x="-260" y="-30" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="48" fill="#080a0f">I NEED VITAMIN</text>
          
          <!-- Big 'C' block -->
          <g transform="translate(130, -80)">
            <rect x="0" y="0" width="110" height="120" fill="#080a0f" rx="12"/>
            <text x="55" y="95" font-family="'Impact', sans-serif" font-size="110" fill="#ffffff" text-anchor="middle">C</text>
          </g>
          <text x="250" y="-10" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="32" fill="#080a0f">ONCRETE</text>

          <!-- Bowed stickman on floor -->
          <g transform="translate(-60, 140)">
            <path d="M -100 20 C -60 -40 20 -50 80 -10 C 120 20 140 30 160 30" fill="none" stroke="#080a0f" stroke-width="6" stroke-linecap="round"/>
            <circle cx="-110" cy="10" r="18" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-115" cy="5" r="3" fill="#080a0f"/>
            <circle cx="-105" cy="5" r="3" fill="#080a0f"/>
          </g>
        </g>
      `;

    case 'stone_throw':
      return `
        <!-- Man throwing rock -->
        <g transform="translate(0, 0)">
          <rect x="-300" y="-180" width="600" height="320" fill="#7f1d1d" rx="8" opacity="0.1"/>
          <!-- Man figure -->
          <g transform="translate(50, 40)">
            <circle cx="0" cy="-90" r="35" fill="#fbcfe8" stroke="#080a0f" stroke-width="4"/>
            <!-- Glasses -->
            <rect x="-25" y="-95" width="22" height="12" fill="none" stroke="#080a0f" stroke-width="3"/>
            <rect x="3" y="-95" width="22" height="12" fill="none" stroke="#080a0f" stroke-width="3"/>
            <!-- Blue shirt -->
            <path d="M -45 -55 L 45 -55 L 55 50 L -55 50 Z" fill="#2563eb" stroke="#080a0f" stroke-width="5"/>
            
            <!-- Raised hand holding giant stone -->
            <path d="M -45 -30 L -120 -80" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
            <!-- Giant Rock -->
            <polygon points="-190,-120 -110,-150 -90,-90 -160,-70" fill="#64748b" stroke="#080a0f" stroke-width="5"/>
          </g>
        </g>
      `;

    case 'crawling_sign':
      return `
        <!-- Crawling person to Concrete signpost -->
        <g transform="translate(-250, 20)">
          <!-- Ground line -->
          <line x1="-50" y1="120" x2="550" y2="120" stroke="#080a0f" stroke-width="5"/>

          <!-- Crawling person -->
          <g transform="translate(50, 80)">
            <path d="M -80 0 Q -20 -40 60 0 Q 100 20 140 20" fill="none" stroke="#080a0f" stroke-width="6" stroke-linecap="round"/>
            <circle cx="-90" cy="-10" r="22" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <text x="-20" y="-50" font-family="'Impact', sans-serif" font-size="24" fill="#d97706">ME</text>
          </g>

          <!-- Signpost -->
          <g transform="translate(420, 0)">
            <line x1="0" y1="-80" x2="0" y2="120" stroke="#080a0f" stroke-width="8"/>
            <polygon points="-20,-80 120,-80 140,-50 120,-20 -20,-20" fill="#f3d99b" stroke="#080a0f" stroke-width="5"/>
            <text x="45" y="-42" font-family="'Impact', sans-serif" font-size="22" fill="#080a0f" text-anchor="middle">CONCRETE ></text>
          </g>
          <text x="180" y="160" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="22" fill="#080a0f" text-anchor="middle">ALMOST THERE</text>
        </g>
      `;

    case 'calendar_survived':
      return `
        <!-- Calendar check-in "Survived" -->
        <g transform="translate(-250, -120)">
          <!-- Wall Calendar -->
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="160" height="180" fill="#fef3c7" stroke="#080a0f" stroke-width="5" rx="6"/>
            <!-- Grid lines for days with X marks -->
            <path d="M 0 40 L 160 40 M 0 80 L 160 80 M 0 120 L 160 120 M 0 160 L 160 160" stroke="#080a0f" stroke-width="2"/>
            <path d="M 40 0 L 40 180 M 80 0 L 80 180 M 120 0 L 120 180" stroke="#080a0f" stroke-width="2"/>
            <!-- Red X marks -->
            <path d="M 5 45 L 35 75 M 35 45 L 5 75 M 45 45 L 75 75 M 75 45 L 45 75 M 85 45 L 115 75 M 115 45 L 85 75" stroke="#dc2626" stroke-width="4"/>
            <path d="M 5 85 L 35 115 M 35 85 L 5 115 M 45 85 L 75 115 M 75 85 L 45 115" stroke="#dc2626" stroke-width="4"/>
            <text x="80" y="210" font-family="cursive" font-size="20" fill="#080a0f" text-anchor="middle">"Survived"</text>
          </g>

          <!-- Slender figure reaching to mark day -->
          <g transform="translate(320, 160)">
            <path d="M -120 80 C -80 -40 -40 -120 -190 -120" stroke="#080a0f" stroke-width="6" fill="none" stroke-linecap="round"/>
            <ellipse cx="-120" cy="50" rx="35" ry="45" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-135" cy="40" r="4" fill="#080a0f"/>
            <circle cx="-110" cy="40" r="4" fill="#080a0f"/>
            <path d="M -130 65 Q -120 55 -110 65" stroke="#080a0f" stroke-width="3" fill="none"/>
          </g>
        </g>
      `;

    case 'trust_fall':
      return `
        <!-- Trust Fall Leaning (Kian) -->
        <g transform="translate(-100, -20)">
          <!-- Person 1 Standing straight -->
          <g transform="translate(-20, 0)">
            <circle cx="0" cy="-80" r="25" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <line x1="0" y1="-55" x2="0" y2="70" stroke="#080a0f" stroke-width="6"/>
            <line x1="0" y1="70" x2="-25" y2="150" stroke="#080a0f" stroke-width="6"/>
            <line x1="0" y1="70" x2="25" y2="150" stroke="#080a0f" stroke-width="6"/>
            <!-- Vest -->
            <rect x="-18" y="-45" width="36" height="60" fill="#e2e8f0" stroke="#080a0f" stroke-width="3" rx="4"/>
          </g>

          <!-- Person 2 Leaning back completely -->
          <g transform="translate(80, 0) rotate(-35)">
            <circle cx="0" cy="-80" r="22" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <line x1="0" y1="-58" x2="0" y2="60" stroke="#080a0f" stroke-width="6"/>
            <line x1="0" y1="60" x2="-20" y2="130" stroke="#080a0f" stroke-width="6"/>
            <line x1="0" y1="60" x2="20" y2="130" stroke="#080a0f" stroke-width="6"/>
          </g>
        </g>
      `;

    case 'kneel_projects':
      return `
        <!-- Foot on kneeling stickman -->
        <g transform="translate(0, 0)">
          <!-- Standing Stickman -->
          <g transform="translate(-80, -20)">
            <circle cx="0" cy="-80" r="30" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-10" cy="-85" r="3" fill="#080a0f"/>
            <circle cx="10" cy="-85" r="3" fill="#080a0f"/>
            <line x1="-15" y1="-70" x2="15" y2="-70" stroke="#080a0f" stroke-width="3"/>
            <line x1="0" y1="-50" x2="0" y2="80" stroke="#080a0f" stroke-width="7"/>
            <line x1="0" y1="80" x2="-35" y2="160" stroke="#080a0f" stroke-width="7"/>
            <!-- Leg stepping on other's head -->
            <path d="M 0 40 L 70 20 L 100 40" stroke="#080a0f" stroke-width="8" fill="none" stroke-linecap="round"/>
          </g>

          <!-- Kneeling Stickman -->
          <g transform="translate(60, 80)">
            <circle cx="20" cy="-35" r="25" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <path d="M 20 -10 C -20 10 -40 30 -20 60 L 30 60" stroke="#080a0f" stroke-width="6" fill="none"/>
          </g>
        </g>
      `;

    case 'checking_bro_scalp':
      return `
        <!-- Lifting bro's scalp on stool -->
        <g transform="translate(0, 0)">
          <!-- Tall Stickman standing on stool -->
          <g transform="translate(-100, -50)">
            <!-- Stool -->
            <rect x="-30" y="160" width="60" height="12" fill="#080a0f"/>
            <line x1="-20" y1="172" x2="-30" y2="230" stroke="#080a0f" stroke-width="5"/>
            <line x1="20" y1="172" x2="30" y2="230" stroke="#080a0f" stroke-width="5"/>
            
            <circle cx="0" cy="-60" r="25" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <line x1="0" y1="-35" x2="0" y2="90" stroke="#080a0f" stroke-width="6"/>
            <line x1="0" y1="90" x2="-15" y2="160" stroke="#080a0f" stroke-width="6"/>
            <line x1="0" y1="90" x2="15" y2="160" stroke="#080a0f" stroke-width="6"/>
            
            <!-- Arm reaching out lifting scalp -->
            <path d="M 0 -10 L 80 -10 L 100 30" stroke="#080a0f" stroke-width="6" fill="none"/>
          </g>

          <!-- Bro with open scalp -->
          <g transform="translate(20, 80)">
            <!-- Head bowl -->
            <path d="M -30 0 A 30 30 0 0 0 30 0 Z" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-10" cy="12" r="3" fill="#080a0f"/>
            <circle cx="10" cy="12" r="3" fill="#080a0f"/>
            <path d="M -10 22 Q 0 28 10 22" stroke="#080a0f" stroke-width="3" fill="none"/>
            <!-- Upper scalp cap being lifted -->
            <path d="M -30 -30 A 30 30 0 0 1 30 -30 Z" fill="#ffffff" stroke="#080a0f" stroke-width="5" transform="translate(0, -25)"/>
            <!-- Body -->
            <line x1="0" y1="30" x2="0" y2="120" stroke="#080a0f" stroke-width="6"/>
          </g>
        </g>
      `;

    case 'bat_chase':
      return `
        <!-- Flork with bat chasing small stickman -->
        <g transform="translate(-150, -20)">
          <!-- Chasing Flork with Baseball Bat -->
          <g transform="translate(0, 20)">
            <ellipse cx="0" cy="0" rx="60" ry="75" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-20" cy="-20" r="4" fill="#080a0f"/>
            <circle cx="15" cy="-20" r="4" fill="#080a0f"/>
            <line x1="-25" y1="-30" x2="-10" y2="-25" stroke="#080a0f" stroke-width="3"/>
            <line x1="20" y1="-30" x2="5" y2="-25" stroke="#080a0f" stroke-width="3"/>
            <!-- Baseball Bat raised -->
            <path d="M 30 -10 L 110 -80 L 125 -65 L 45 5 Z" fill="#78350f" stroke="#080a0f" stroke-width="4"/>
            <!-- Speech Bubble -->
            <g transform="translate(80, -110)">
              <rect x="-60" y="-20" width="120" height="36" fill="#fef3c7" stroke="#080a0f" stroke-width="3" rx="10"/>
              <text x="0" y="3" font-family="'Impact', sans-serif" font-size="16" fill="#080a0f" text-anchor="middle">COMEBACK HERE!!</text>
            </g>
          </g>

          <!-- Running Small Stickman -->
          <g transform="translate(300, 70)">
            <circle cx="0" cy="-40" r="18" fill="#ffffff" stroke="#080a0f" stroke-width="4"/>
            <path d="M 0 -22 L 0 30 M 0 30 L -30 70 M 0 30 L 30 70 M 0 0 L -30 -20 M 0 0 L 30 -20" stroke="#080a0f" stroke-width="5" stroke-linecap="round"/>
          </g>
        </g>
      `;

    case 'choking':
      return `
        <!-- Flork choking stickman -->
        <g transform="translate(-100, 10)">
          <!-- Angry Flork -->
          <g transform="translate(-40, -10)">
            <ellipse cx="0" cy="0" rx="70" ry="85" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-25" cy="-25" r="5" fill="#080a0f"/>
            <circle cx="15" cy="-25" r="5" fill="#080a0f"/>
            <path d="M -35 -40 L -10 -30 M 25 -40 L 0 -30" stroke="#080a0f" stroke-width="4"/>
            <!-- Both arms extended grabbing neck -->
            <path d="M 20 10 L 150 10" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
            <path d="M 20 25 L 150 25" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
          </g>

          <!-- Choked Stickman -->
          <g transform="translate(130, 20)">
            <circle cx="0" cy="-40" r="22" fill="#ffffff" stroke="#080a0f" stroke-width="4"/>
            <!-- Dead eyes X X -->
            <path d="M -10 -45 L 0 -35 M 0 -45 L -10 -35 M 5 -45 L 15 -35 M 15 -45 L 5 -35" stroke="#080a0f" stroke-width="3"/>
            <line x1="0" y1="-18" x2="0" y2="80" stroke="#080a0f" stroke-width="5"/>
            <path d="M 0 80 L -30 130 M 0 80 L 30 130" stroke="#080a0f" stroke-width="5"/>
          </g>
        </g>
      `;

    case 'cliff_kick':
      return `
        <!-- Stickman kicking bro off cliff -->
        <g transform="translate(-150, 0)">
          <!-- Cliff edge -->
          <path d="M -200 120 L 100 120 L 100 250" stroke="#080a0f" stroke-width="6" fill="none"/>

          <!-- Kicking Stickman -->
          <g transform="translate(-40, 20)">
            <ellipse cx="0" cy="-60" rx="35" ry="45" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-10" cy="-70" r="4" fill="#080a0f"/>
            <circle cx="10" cy="-70" r="4" fill="#080a0f"/>
            <line x1="0" y1="-15" x2="0" y2="80" stroke="#080a0f" stroke-width="7"/>
            <line x1="0" y1="80" x2="-40" y2="150" stroke="#080a0f" stroke-width="7"/>
            <!-- Kicking Leg extended high -->
            <path d="M 0 50 L 110 30" stroke="#080a0f" stroke-width="9" stroke-linecap="round"/>
          </g>

          <!-- Falling Bro off cliff -->
          <g transform="translate(180, 100) rotate(45)">
            <ellipse cx="0" cy="-30" rx="25" ry="35" fill="#ffffff" stroke="#080a0f" stroke-width="4"/>
            <line x1="0" y1="5" x2="0" y2="70" stroke="#080a0f" stroke-width="5"/>
            <path d="M 0 70 L -25 110 M 0 70 L 25 110" stroke="#080a0f" stroke-width="5"/>
          </g>
        </g>
      `;

    case 'knife_throat':
      return `
        <!-- Flork holding knife at neck -->
        <g transform="translate(-120, 0)">
          <!-- Angry Flork -->
          <g transform="translate(-30, 0)">
            <ellipse cx="0" cy="0" rx="75" ry="90" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
            <circle cx="-25" cy="-25" r="5" fill="#080a0f"/>
            <circle cx="15" cy="-25" r="5" fill="#080a0f"/>
            <path d="M -35 -40 L -10 -28 M 25 -40 L 0 -28" stroke="#080a0f" stroke-width="5"/>
            <!-- Hand holding silver knife at bro's throat -->
            <path d="M 20 20 L 140 0" stroke="#080a0f" stroke-width="7" stroke-linecap="round"/>
            <polygon points="140,-10 200,-5 140,10" fill="#94a3b8" stroke="#080a0f" stroke-width="3"/>
          </g>

          <!-- Scared Flork -->
          <g transform="translate(160, 20)">
            <ellipse cx="0" cy="0" rx="60" ry="75" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-20" cy="-20" r="4" fill="#080a0f"/>
            <circle cx="15" cy="-20" r="4" fill="#080a0f"/>
            <path d="M -15 15 Q 0 0 15 15" stroke="#080a0f" stroke-width="4" fill="none"/>
          </g>
        </g>
      `;

    case 'knife_overhead':
      return `
        <!-- Flork with knife overhead -->
        <g transform="translate(-100, -10)">
          <!-- Angry Flork with Knife overhead -->
          <g transform="translate(-40, 10)">
            <ellipse cx="0" cy="0" rx="70" ry="85" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-25" cy="-25" r="5" fill="#080a0f"/>
            <circle cx="15" cy="-25" r="5" fill="#080a0f"/>
            <path d="M -35 -40 L -10 -28 M 25 -40 L 0 -28" stroke="#080a0f" stroke-width="5"/>
            <!-- Raised arm holding knife high -->
            <path d="M 0 -30 L 60 -110" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
            <polygon points="60,-110 120,-130 80,-90" fill="#94a3b8" stroke="#080a0f" stroke-width="3"/>
          </g>

          <!-- Cowering Flork -->
          <g transform="translate(130, 40)">
            <ellipse cx="0" cy="0" rx="55" ry="65" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-15" cy="-15" r="4" fill="#080a0f"/>
            <circle cx="15" cy="-15" r="4" fill="#080a0f"/>
          </g>
        </g>
      `;

    case 'cinderblock_head':
      return `
        <!-- Flork holding cinderblock over head -->
        <g transform="translate(0, 20)">
          <ellipse cx="0" cy="20" rx="70" ry="90" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
          <!-- Angry eyes -->
          <circle cx="-25" cy="-10" r="5" fill="#080a0f"/>
          <circle cx="25" cy="-10" r="5" fill="#080a0f"/>
          <path d="M -35 -25 L -10 -15 M 35 -25 L 10 -15" stroke="#080a0f" stroke-width="5"/>
          <path d="M -20 15 Q 0 5 20 15" stroke="#080a0f" stroke-width="4" fill="none"/>

          <!-- Raised arms holding block -->
          <path d="M -50 -10 L -60 -90 L -20 -110" stroke="#080a0f" stroke-width="7" fill="none" stroke-linecap="round"/>
          <path d="M 50 -10 L 60 -90 L 20 -110" stroke="#080a0f" stroke-width="7" fill="none" stroke-linecap="round"/>

          <!-- Big Grey Cinder Block overhead -->
          <g transform="translate(-80, -190)">
            <rect x="0" y="0" width="160" height="90" fill="#64748b" stroke="#080a0f" stroke-width="6" rx="6"/>
            <rect x="20" y="20" width="50" height="50" fill="#1e293b" rx="4"/>
            <rect x="90" y="20" width="50" height="50" fill="#1e293b" rx="4"/>
          </g>
        </g>
      `;

    case 'burying_hole':
      return `
        <!-- Flork pushing bro into dirt hole -->
        <g transform="translate(-100, 20)">
          <!-- Tall Flork patting bro into ground -->
          <g transform="translate(-50, -40)">
            <ellipse cx="0" cy="0" rx="65" ry="100" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
            <circle cx="-20" cy="-40" r="5" fill="#080a0f"/>
            <circle cx="20" cy="-40" r="5" fill="#080a0f"/>
            <!-- Arm pushing head -->
            <path d="M 30 -20 Q 90 -10 130 50" stroke="#080a0f" stroke-width="8" fill="none" stroke-linecap="round"/>
          </g>

          <!-- Dirt Hole + Bro's head sticking out -->
          <g transform="translate(110, 80)">
            <!-- Dirt mound -->
            <ellipse cx="0" cy="40" rx="90" ry="30" fill="#78350f" stroke="#080a0f" stroke-width="4"/>
            <!-- Bro's head -->
            <ellipse cx="0" cy="10" rx="45" ry="40" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-15" cy="0" r="4" fill="#080a0f"/>
            <circle cx="15" cy="0" r="4" fill="#080a0f"/>
            <path d="M -15 25 Q 0 10 15 25" stroke="#080a0f" stroke-width="4" fill="none"/>
          </g>
        </g>
      `;

    case 'punch_defi_dead':
      return `
        <!-- Giant punch stickman -->
        <g transform="translate(0, 0)">
          <g transform="translate(50, -20)">
            <!-- Punching stickman -->
            <circle cx="0" cy="-60" r="35" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <line x1="0" y1="-25" x2="0" y2="80" stroke="#080a0f" stroke-width="7"/>
            <line x1="0" y1="80" x2="-40" y2="160" stroke="#080a0f" stroke-width="7"/>
            <line x1="0" y1="80" x2="30" y2="160" stroke="#080a0f" stroke-width="7"/>
            
            <!-- GIANT FIST -->
            <path d="M -30 0 C -150 -50 -250 -30 -300 0 C -320 20 -280 60 -240 50 Z" fill="#ffffff" stroke="#080a0f" stroke-width="7"/>
          </g>

          <!-- Tiny hit stickman -->
          <g transform="translate(-320, 0)">
            <circle cx="0" cy="-40" r="18" fill="#ffffff" stroke="#080a0f" stroke-width="4"/>
            <line x1="0" y1="-22" x2="0" y2="30" stroke="#080a0f" stroke-width="4"/>
          </g>
        </g>
      `;

    case 'flipflop':
      return `
        <!-- Flork holding flip flop (chancla) -->
        <g transform="translate(0, 10)">
          <ellipse cx="0" cy="20" rx="75" ry="95" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
          <circle cx="-25" cy="-10" r="5" fill="#080a0f"/>
          <circle cx="25" cy="-10" r="5" fill="#080a0f"/>
          <line x1="-35" y1="15" x2="35" y2="15" stroke="#080a0f" stroke-width="4"/>

          <!-- Arm holding flip flop high -->
          <path d="M -50 0 L -100 -70" stroke="#080a0f" stroke-width="8" stroke-linecap="round"/>
          <!-- Flip Flop (Slipper) -->
          <g transform="translate(-130, -130) rotate(25)">
            <ellipse cx="20" cy="40" rx="22" ry="45" fill="#1e293b" stroke="#080a0f" stroke-width="4"/>
            <path d="M 10 20 L 20 40 L 30 20" stroke="#f3d99b" stroke-width="4" fill="none"/>
          </g>
        </g>
      `;

    case 'gun_moai':
      return `
        <!-- Flork holding gun pointed at camera -->
        <g transform="translate(0, 20)">
          <ellipse cx="0" cy="20" rx="75" ry="95" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
          <circle cx="-25" cy="-15" r="5" fill="#080a0f"/>
          <circle cx="25" cy="-15" r="5" fill="#080a0f"/>
          <path d="M -20 20 Q 0 0 20 20" stroke="#080a0f" stroke-width="4" fill="none"/>

          <!-- Hand with Pistol pointed forward -->
          <g transform="translate(60, -10)">
            <rect x="0" y="0" width="75" height="22" fill="#080a0f" rx="3"/>
            <rect x="15" y="20" width="22" height="35" fill="#080a0f" rx="2"/>
            <circle cx="75" cy="11" r="8" fill="#475569" stroke="#080a0f" stroke-width="2"/>
          </g>
        </g>
      `;

    case 'bat_bonk':
      return `
        <!-- Flork hitting crying flork with baseball bat -->
        <g transform="translate(-100, 0)">
          <!-- Hitting Flork -->
          <g transform="translate(-40, -10)">
            <ellipse cx="0" cy="0" rx="70" ry="85" fill="#ffffff" stroke="#080a0f" stroke-width="6"/>
            <circle cx="-25" cy="-25" r="5" fill="#080a0f"/>
            <circle cx="15" cy="-25" r="5" fill="#080a0f"/>
            <path d="M -35 -40 L -10 -28 M 25 -40 L 0 -28" stroke="#080a0f" stroke-width="5"/>
            <!-- Baseball bat hitting -->
            <path d="M 10 -10 L 130 15 L 140 35 L 20 10 Z" fill="#78350f" stroke="#080a0f" stroke-width="4"/>
          </g>

          <!-- Crying Bonked Flork -->
          <g transform="translate(140, 50)">
            <ellipse cx="0" cy="0" rx="50" ry="60" fill="#ffffff" stroke="#080a0f" stroke-width="5"/>
            <circle cx="-15" cy="-10" r="4" fill="#080a0f"/>
            <circle cx="15" cy="-10" r="4" fill="#080a0f"/>
            <!-- Blue tears -->
            <path d="M -15 0 L -15 35 M 15 0 L 15 35" stroke="#0284c7" stroke-width="4"/>
          </g>
        </g>
      `;

    default:
      return `
        <rect x="-120" y="-80" width="240" height="160" fill="#e2ddd0" stroke="#080a0f" stroke-width="6" rx="8"/>
        <rect x="-80" y="-50" width="65" height="100" fill="#080a0f" rx="4"/>
        <rect x="15" y="-50" width="65" height="100" fill="#080a0f" rx="4"/>
        <text x="0" y="115" font-family="'Space Grotesk', sans-serif" font-weight="900" font-size="24" fill="#5b1e95" text-anchor="middle">CONCRETE</text>
      `;
  }
}
