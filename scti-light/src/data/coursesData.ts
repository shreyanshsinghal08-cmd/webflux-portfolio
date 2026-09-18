import { Course, StudentCertificate, LabFeature, Testimonial, FaqItem } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'basic-computing',
    title: 'Basic Computing & Office Productivity',
    subtitle: 'Master Windows 11, MS Office 365, Advanced Excel, Cloud Storage & Typing Mastery',
    category: 'Foundation',
    level: 'Beginner',
    duration: '2.5 Months',
    totalHours: '60 Hours Lab + Theory',
    mode: '100% In-Person Lab',
    badge: 'Govt. Recognized Diploma',
    featured: true,
    price: 4500,
    originalPrice: 6500,
    rating: 4.9,
    reviewCount: 1420,
    enrolledStudents: 6200,
    description: 'Essential digital literacy and administrative computer mastery for students, job seekers, office clerks, and professionals. Complete coverage of Word, Excel with PivotTables/VLOOKUP, PowerPoint presentations, internet security, and touch typing.',
    highlights: [
      'Touch Typing Speed Guarantee (35+ WPM)',
      'Advanced MS Excel (Formulas, VLOOKUP, Pivot, Charts)',
      'Office 365, OneDrive & Google Workspace Workflows',
      'Govt. Job & Bank Exam Computer Eligibility Certified'
    ],
    tools: [
      { name: 'Windows 11', iconName: 'Monitor' },
      { name: 'MS Word', iconName: 'FileText' },
      { name: 'MS Excel', iconName: 'Sheet' },
      { name: 'PowerPoint', iconName: 'Presentation' },
      { name: 'Google Cloud', iconName: 'Cloud' }
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Computer Fundamentals & Operating Systems',
        duration: '10 Hours',
        topics: [
          'Hardware anatomy, CPU architecture, RAM, storage devices',
          'Windows 11 file hierarchy, shortcuts, control panel, settings',
          'Peripheral configuration (printers, scanners, projectors)',
          'Cyber safety, antivirus management, safe internet browsing'
        ],
        handsOnProject: 'OS Customization & System Troubleshooting Lab'
      },
      {
        moduleNumber: 2,
        title: 'Touch Typing & Digital Documentation',
        duration: '12 Hours',
        topics: [
          'QWERTY muscle memory drills and posture guidelines',
          'Speed benchmarks: building 35-45 Words Per Minute',
          'Official letterheads, resumes, and legal memo creation in MS Word',
          'Mail Merge automation and smart page formatting'
        ],
        handsOnProject: 'Professional Business Report & Automated Mail Merge'
      },
      {
        moduleNumber: 3,
        title: 'Advanced MS Excel & Data Crunching',
        duration: '22 Hours',
        topics: [
          'Spreadsheet structure, formula syntax (SUM, AVERAGE, IF, IFS)',
          'Lookup mastery: XLOOKUP, VLOOKUP, HLOOKUP & INDEX-MATCH',
          'Pivot Tables, Slicers, Conditional Formatting & Sparklines',
          'Data validation, invoice building, payroll sheet calculations'
        ],
        handsOnProject: 'Complete Inventory & Payroll Management System'
      },
      {
        moduleNumber: 4,
        title: 'Executive Presentations & Cloud Collaboration',
        duration: '16 Hours',
        topics: [
          'Slide storytelling in MS PowerPoint, typography & master slides',
          'Transitions, animations, infographics & embedded media',
          'Google Docs, Sheets, Forms & Drive cloud sharing',
          'Email etiquette in MS Outlook & professional digital communication'
        ],
        handsOnProject: 'Executive Boardroom Pitch Deck & Cloud Form Workflow'
      }
    ],
    careerOpportunities: [
      'Office Administrator',
      'Data Entry Specialist',
      'Executive Assistant',
      'Govt. Computer Operator',
      'Front Desk Manager'
    ],
    certificateType: 'Govt. Recognized Diploma in Computer Applications (DCA)',
    nextBatchDate: 'Starts Monday • Morning / Evening slots',
    scheduleOptions: [
      'Morning: 08:30 AM - 10:00 AM (Mon-Fri)',
      'Noon: 11:30 AM - 01:00 PM (Mon-Fri)',
      'Evening: 05:30 PM - 07:00 PM (Mon-Fri)',
      'Weekend Fast-Track: 10:00 AM - 02:00 PM (Sat-Sun)'
    ]
  },
  {
    id: 'python-coding',
    title: 'Python Coding & Software Engineering',
    subtitle: 'From Core Syntax to OOP, Automation Scripts, SQLite Databases & Web APIs',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    duration: '3.5 Months',
    totalHours: '85 Hours Lab + Capstone',
    mode: 'Lab Hands-on + Online',
    badge: 'Industry High Demand',
    featured: true,
    price: 8500,
    originalPrice: 12000,
    rating: 4.95,
    reviewCount: 1890,
    enrolledStudents: 4950,
    description: 'Learn modern programming with Python 3.12. Build real software, automate repetitive tasks, query relational databases, build REST API backends, and develop computational problem-solving skills with clean code standards.',
    highlights: [
      'Modern Python 3.12 with Clean Code & PEP-8 Standards',
      'Object-Oriented Programming (OOP) & Data Structures',
      'Web Scraping with BeautifulSoup & Task Automation',
      'SQL & SQLite Database Integration with GUI Apps'
    ],
    tools: [
      { name: 'Python 3.12', iconName: 'Code' },
      { name: 'VS Code', iconName: 'Terminal' },
      { name: 'SQLite', iconName: 'Database' },
      { name: 'Git / GitHub', iconName: 'GitBranch' },
      { name: 'FastAPI', iconName: 'Zap' }
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Core Python Syntax & Logical Problem Solving',
        duration: '18 Hours',
        topics: [
          'Variables, dynamic typing, primitive data types and memory model',
          'Conditional logic, match-case, loops (for, while, nested loops)',
          'Functions, parameter passing, return values, recursion, lambda expressions',
          'Lists, Tuples, Dictionaries, Sets & List Comprehensions'
        ],
        handsOnProject: 'CLI Banking & ATM Simulation System'
      },
      {
        moduleNumber: 2,
        title: 'Object-Oriented Programming (OOP) & Modular Architecture',
        duration: '22 Hours',
        topics: [
          'Classes, Objects, __init__ constructor, self reference',
          'Encapsulation, Inheritance, Polymorphism & Abstract Classes',
          'Exception handling (try-except-finally) & custom exceptions',
          'File I/O (CSV, JSON, text) and context managers (with)'
        ],
        handsOnProject: 'School ERP & Student Grade Analytics Engine'
      },
      {
        moduleNumber: 3,
        title: 'Database Persistence, Web Scraping & Automation',
        duration: '25 Hours',
        topics: [
          'SQLite database integration, SQL CRUD operations',
          'Automating Excel files with openpyxl & PDF generation',
          'Web scraping live websites with Requests & BeautifulSoup4',
          'Automated email notification bots and scheduled background scripts'
        ],
        handsOnProject: 'Real-time Price Tracker & Automated Email Alert Bot'
      },
      {
        moduleNumber: 4,
        title: 'REST APIs, GUI Desktop Apps & Capstone Project',
        duration: '20 Hours',
        topics: [
          'Building GUI interfaces with CustomTkinter',
          'Consuming & building RESTful APIs with FastAPI / Flask',
          'Git version control, code branching & GitHub portfolio hosting',
          'Final Capstone: Full-stack Python application development'
        ],
        handsOnProject: 'Production Ready Inventory Management Desktop App'
      }
    ],
    careerOpportunities: [
      'Junior Python Developer',
      'Software Engineering Trainee',
      'Automation & QA Specialist',
      'Data Operations Associate',
      'Backend Developer'
    ],
    certificateType: 'Govt. Recognized Advanced Certificate in Python Software Engineering',
    nextBatchDate: 'Starts Next Tuesday • Morning & Weekend options',
    scheduleOptions: [
      'Morning: 07:00 AM - 08:30 AM (Tue-Sat)',
      'Evening: 07:00 PM - 08:30 PM (Tue-Sat)',
      'Weekend Intensive: 09:00 AM - 01:30 PM (Sat-Sun)'
    ]
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Digital Creative Media',
    subtitle: 'Adobe Photoshop, Illustrator, Figma UI/UX, Typography & Brand Identity Design',
    category: 'Design',
    level: 'Beginner to Intermediate',
    duration: '3 Months',
    totalHours: '75 Hours Studio Lab',
    mode: '100% In-Person Lab',
    badge: 'Portfolio Included',
    featured: true,
    price: 7900,
    originalPrice: 11000,
    rating: 4.92,
    reviewCount: 1560,
    enrolledStudents: 3800,
    description: 'Turn your creativity into high-paying commercial design skills. Master industry standard vector graphics, digital image manipulation, modern brand identity kits, social media creatives, print production, and Figma UI/UX prototyping.',
    highlights: [
      'Hands-on Adobe Suite (Photoshop, Illustrator, InDesign)',
      'Figma UI/UX Fundamentals & Interactive Prototyping',
      'Scandinavian Minimalist Typography & Color Theory',
      'Job-Ready 10+ Project Behance/Dribbble Portfolio'
    ],
    tools: [
      { name: 'Photoshop', iconName: 'Image' },
      { name: 'Illustrator', iconName: 'PenTool' },
      { name: 'Figma', iconName: 'Figma' },
      { name: 'Typography', iconName: 'Type' },
      { name: 'Color Systems', iconName: 'Palette' }
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Design Foundations, Color Theory & Typography',
        duration: '15 Hours',
        topics: [
          'Principles of visual hierarchy, contrast, balance and negative space',
          'Scandinavian minimalist layout aesthetics and modern grid systems',
          'Color psychology, RGB vs CMYK, pantone palettes and harmonic schemes',
          'Type anatomy, font pairing, kerning, tracking, and editorial styling'
        ],
        handsOnProject: 'Editorial Magazine Cover & Minimalist Poster Series'
      },
      {
        moduleNumber: 2,
        title: 'Raster Mastery with Adobe Photoshop',
        duration: '20 Hours',
        topics: [
          'Non-destructive editing with layers, clipping masks, and smart objects',
          'High-end portrait retouching, frequency separation, blemish removal',
          'Advanced photo manipulation, lighting effects, and composite blending',
          'Commercial banner ads, social media post templates, product mockups'
        ],
        handsOnProject: 'Commercial Brand Campaign & E-Commerce Product Ads'
      },
      {
        moduleNumber: 3,
        title: 'Vector Art & Brand Identity in Adobe Illustrator',
        duration: '22 Hours',
        topics: [
          'Pen tool precision, Bezier curves, and geometric path construction',
          'Corporate logo design: monogram, wordmark, abstract and mascot icons',
          'Brand identity collateral: business cards, letterheads, invoice templates',
          'Print prepress standards, bleed margins, crop marks and packaging dielines'
        ],
        handsOnProject: 'Complete 360° Corporate Brand Identity Guideline Book'
      },
      {
        moduleNumber: 4,
        title: 'UI/UX Design Systems & Interactive Prototyping in Figma',
        duration: '18 Hours',
        topics: [
          'Figma interface, auto-layout, components, variants, and design tokens',
          'Wireframing web landing pages & mobile application interfaces',
          'Interactive prototyping with smart animate and micro-interactions',
          'Exporting developer handoff assets & publishing online portfolio'
        ],
        handsOnProject: 'High-Fidelity Mobile App UI & Client Presentation Deck'
      }
    ],
    careerOpportunities: [
      'Visual Graphic Designer',
      'Brand Identity Specialist',
      'UI/UX Junior Designer',
      'Digital Marketing Creative Lead',
      'Freelance Creative Director'
    ],
    certificateType: 'Govt. Recognized Diploma in Commercial Graphic Design & UI/UX',
    nextBatchDate: 'Starts Wednesday • Dedicated Design iMacs',
    scheduleOptions: [
      'Morning Studio: 10:00 AM - 12:00 PM (Mon-Thu)',
      'Evening Studio: 04:00 PM - 06:00 PM (Mon-Thu)',
      'Weekend Studio: 11:00 AM - 03:00 PM (Sat-Sun)'
    ]
  },
  {
    id: 'full-stack-web',
    title: 'Full Stack Web Development (MERN & React)',
    subtitle: 'HTML5, Tailwind CSS, TypeScript, React 19, Node.js, Express & MongoDB',
    category: 'Programming',
    level: 'Beginner to Intermediate',
    duration: '4 Months',
    totalHours: '100 Hours Lab',
    mode: 'Lab Hands-on + Online',
    badge: '100% Placement Support',
    featured: false,
    price: 9900,
    originalPrice: 15000,
    rating: 4.96,
    reviewCount: 980,
    enrolledStudents: 2100,
    description: 'Learn modern web engineering from scratch. Build responsive client interfaces with React & Tailwind CSS and robust cloud backends with Node.js and MongoDB.',
    highlights: [
      'Clean Modern Frontend with Tailwind CSS & React',
      'REST APIs with Node.js, Express & JWT Authentication',
      'MongoDB database indexing and aggregation pipeline',
      'Cloud deployment on Vercel, Netlify & Render'
    ],
    tools: [
      { name: 'React 19', iconName: 'Component' },
      { name: 'TypeScript', iconName: 'FileCode' },
      { name: 'Tailwind CSS', iconName: 'Paintbrush' },
      { name: 'Node.js', iconName: 'Server' },
      { name: 'MongoDB', iconName: 'Database' }
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Semantic HTML5, CSS3 & Responsive Tailwind Layouts',
        duration: '22 Hours',
        topics: ['Semantic markup, CSS Grid & Flexbox, Tailwind utility-first styling, mobile-first design'],
        handsOnProject: 'Responsive SaaS Landing Page'
      },
      {
        moduleNumber: 2,
        title: 'Modern JavaScript (ES6+) & TypeScript Foundations',
        duration: '26 Hours',
        topics: ['DOM manipulation, async/await, fetch API, type safety, generics, interfaces'],
        handsOnProject: 'Interactive Task Management Dashboard'
      },
      {
        moduleNumber: 3,
        title: 'React 19 Architecture & State Management',
        duration: '28 Hours',
        topics: ['Component lifecycle, custom hooks, context API, client routing, performance optimization'],
        handsOnProject: 'E-Commerce Storefront with Cart & Checkout'
      },
      {
        moduleNumber: 4,
        title: 'Backend Node.js, REST APIs, Auth & Cloud Deployment',
        duration: '24 Hours',
        topics: ['Express.js routing, MongoDB schemas, JWT auth, environment security, cloud CI/CD'],
        handsOnProject: 'Full Stack Social Networking Portal'
      }
    ],
    careerOpportunities: ['Full Stack Developer', 'Frontend React Developer', 'Node.js Backend Engineer', 'Web Consultant'],
    certificateType: 'Govt. Recognized Advanced Diploma in Full Stack Web Engineering',
    nextBatchDate: 'Starts 1st of next month',
    scheduleOptions: ['Weekday Evening: 06:00 PM - 08:00 PM', 'Weekend Fast-Track: 09:00 AM - 02:00 PM']
  },
  {
    id: 'financial-tally',
    title: 'Computerized Accounting & TallyPrime with GST',
    subtitle: 'TallyPrime 4.0, GST Return Filing, TDS, Payroll, Balance Sheet & Financial Auditing',
    category: 'Foundation',
    level: 'Beginner to Intermediate',
    duration: '2 Months',
    totalHours: '50 Hours Lab',
    mode: '100% In-Person Lab',
    badge: 'Job Ready in 60 Days',
    featured: false,
    price: 5200,
    originalPrice: 7500,
    rating: 4.88,
    reviewCount: 740,
    enrolledStudents: 2800,
    description: 'Master computerized double-entry accounting with industry standard TallyPrime. Learn invoicing, GST compliance, TDS deductions, inventory management, and final accounts.',
    highlights: [
      'Latest TallyPrime with live GST portal integration simulation',
      'GSTR-1, GSTR-3B monthly return filing workflow',
      'Payroll processing with PF, ESI & Professional Tax',
      'Bank reconciliation statement (BRS) automation'
    ],
    tools: [
      { name: 'TallyPrime', iconName: 'Calculator' },
      { name: 'GST Portal', iconName: 'Receipt' },
      { name: 'Excel for CA', iconName: 'FileSpreadsheet' },
      { name: 'Tax Compliance', iconName: 'ShieldCheck' }
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Accounting Fundamentals & TallyPrime Setup',
        duration: '12 Hours',
        topics: ['Golden rules of accounting, ledger groups, voucher types, company configuration'],
        handsOnProject: 'Corporate Ledger & Voucher Journal Entry Lab'
      },
      {
        moduleNumber: 2,
        title: 'Inventory & Purchase/Sales Order Processing',
        duration: '14 Hours',
        topics: ['Stock items, godown management, purchase orders, sales invoices, discount matrices'],
        handsOnProject: 'Multi-Location Warehouse Inventory Setup'
      },
      {
        moduleNumber: 3,
        title: 'GST Compliance, TDS & Statutory Deductions',
        duration: '14 Hours',
        topics: ['CGST, SGST, IGST calculation, tax invoices, TDS deduction rules, e-Way bills'],
        handsOnProject: 'Monthly GST Calculation & E-Invoice Generation'
      },
      {
        moduleNumber: 4,
        title: 'Final Accounts, Balance Sheets & Audit Reports',
        duration: '10 Hours',
        topics: ['Trial balance verification, Profit & Loss statements, Balance Sheet analysis, BRS'],
        handsOnProject: 'Annual Financial Audit Statement Presentation'
      }
    ],
    careerOpportunities: ['Accountant', 'Tally Operator', 'Tax Filing Associate', 'Billing Executive', 'Audit Assistant'],
    certificateType: 'Govt. Recognized Certification in Computerized Accounting & Taxation',
    nextBatchDate: 'New Batch Every Monday',
    scheduleOptions: ['Morning: 09:00 AM - 10:30 AM', 'Evening: 05:00 PM - 06:30 PM']
  },
  {
    id: 'cyber-security',
    title: 'Cyber Security & Network Hardware Essentials',
    subtitle: 'Ethical Hacking Fundamentals, Network Routing, Firewalls, Wireshark & Linux System Admin',
    category: 'Advanced IT',
    level: 'Intermediate to Pro',
    duration: '3 Months',
    totalHours: '70 Hours Lab',
    mode: 'Lab Hands-on + Online',
    badge: 'Govt. Aligned Security',
    featured: false,
    price: 8900,
    originalPrice: 13500,
    rating: 4.93,
    reviewCount: 620,
    enrolledStudents: 1450,
    description: 'Hands-on practical training on computer networking, TCP/IP, Linux command line, vulnerability assessment, firewall defense, and digital forensic fundamentals.',
    highlights: [
      'Hands-on Kali Linux virtual sandboxes and Wireshark packet capture',
      'Network router/switch configuration & subnetting calculations',
      'Web application vulnerability scanning (OWASP Top 10)',
      'Security incident response & data encryption techniques'
    ],
    tools: [
      { name: 'Kali Linux', iconName: 'Terminal' },
      { name: 'Wireshark', iconName: 'Activity' },
      { name: 'Cisco Packet Tracer', iconName: 'Network' },
      { name: 'Nmap & Burp Suite', iconName: 'ShieldAlert' }
    ],
    syllabus: [
      {
        moduleNumber: 1,
        title: 'Computer Networking & TCP/IP Protocols',
        duration: '18 Hours',
        topics: ['OSI Model, IPv4/IPv6 addressing, subnet masking, DNS, DHCP, NAT protocols'],
        handsOnProject: 'LAN Infrastructure & Cisco Router Configuration'
      },
      {
        moduleNumber: 2,
        title: 'Linux System Administration & Shell Scripting',
        duration: '16 Hours',
        topics: ['Linux file permissions, process monitoring, user access control, Bash scripting'],
        handsOnProject: 'Hardened Linux Server Deployment'
      },
      {
        moduleNumber: 3,
        title: 'Network Defense, Firewalls & Traffic Analysis',
        duration: '18 Hours',
        topics: ['Packet sniffing with Wireshark, IDS/IPS rules, VPN tunnels, firewall policy design'],
        handsOnProject: 'Real-time Packet Inspection & Intrusion Detection'
      },
      {
        moduleNumber: 4,
        title: 'Ethical Hacking Essentials & Vulnerability Assessment',
        duration: '18 Hours',
        topics: ['Reconnaissance with Nmap, password audits, OWASP Top 10 web vulnerabilities, mitigation'],
        handsOnProject: 'Penetration Testing Security Audit Report'
      }
    ],
    careerOpportunities: ['Network Administrator', 'Junior Security Analyst', 'IT Support Specialist', 'SOC Tier 1 Analyst'],
    certificateType: 'Govt. Recognized Advanced Diploma in Cyber Security & Network Systems',
    nextBatchDate: 'Starts 15th of next month',
    scheduleOptions: ['Evening: 07:00 PM - 09:00 PM', 'Weekend: 02:00 PM - 06:00 PM']
  }
];

export const MOCK_CERTIFICATES: StudentCertificate[] = [
  {
    certificateId: 'SCTI-2025-9842',
    studentName: 'Aarav Sharma',
    courseName: 'Basic Computing & Office Productivity (DCA)',
    grade: 'Distinction',
    issueDate: 'January 18, 2025',
    duration: '60 Hours Lab Practicum',
    verificationStatus: 'Verified & Active',
    regNumber: 'SCTI/2024/BC-84920',
    centerCode: 'CTR-NDLS-041',
    skillsMastered: ['Windows 11 OS', 'Advanced MS Excel & Macros', 'MS Word & Mail Merge', 'PowerPoint', '38 WPM Touch Typing']
  },
  {
    certificateId: 'SCTI-2025-4120',
    studentName: 'Priya Mukherjee',
    courseName: 'Python Coding & Software Engineering',
    grade: 'Distinction',
    issueDate: 'February 04, 2025',
    duration: '85 Hours Software Lab',
    verificationStatus: 'Verified & Active',
    regNumber: 'SCTI/2024/PY-39012',
    centerCode: 'CTR-NDLS-041',
    skillsMastered: ['Python 3.12', 'Object-Oriented Architecture', 'SQLite Database', 'FastAPI', 'Automation Bots']
  },
  {
    certificateId: 'SCTI-2025-7731',
    studentName: 'Rohan Verma',
    courseName: 'Graphic Design & Digital Creative Media',
    grade: 'A+',
    issueDate: 'February 12, 2025',
    duration: '75 Hours Studio Practicum',
    verificationStatus: 'Verified & Active',
    regNumber: 'SCTI/2024/GD-55198',
    centerCode: 'CTR-NDLS-041',
    skillsMastered: ['Adobe Photoshop', 'Adobe Illustrator', 'Figma UI/UX Systems', 'Brand Identity', 'Print Prepress']
  },
  {
    certificateId: 'SCTI-2025-1049',
    studentName: 'Ananya Deshmukh',
    courseName: 'Full Stack Web Development (MERN & React)',
    grade: 'Distinction',
    issueDate: 'February 20, 2025',
    duration: '100 Hours Engineering Lab',
    verificationStatus: 'Verified & Active',
    regNumber: 'SCTI/2024/FS-10492',
    centerCode: 'CTR-NDLS-041',
    skillsMastered: ['React 19', 'Tailwind CSS', 'TypeScript', 'Node.js & Express', 'MongoDB Atlas']
  }
];

export const LAB_FEATURES: LabFeature[] = [
  {
    id: 'lab-pc',
    title: '1:1 Dedicated High-Performance PC',
    description: 'Every student gets their own individual high-speed workstation with 12th Gen Intel Core i7, 16GB DDR5 RAM, and ultra-fast NVMe SSD storage.',
    spec: 'Intel i7 • 16GB RAM • 512GB NVMe SSD • Windows 11 Pro',
    icon: 'Cpu',
    image: 'https://images.pexels.com/photos/18024478/pexels-photo-18024478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'lab-screen',
    title: 'Dual 24" IPS Color-Calibrated Displays',
    description: 'Equipped with anti-glare IPS dual monitors so students can write code or design graphics on one screen while viewing reference material on the other.',
    spec: '1080p Full HD • 99% sRGB Color Accuracy • Eye-Care Low Blue Light',
    icon: 'Monitor',
    image: 'https://images.pexels.com/photos/5082554/pexels-photo-5082554.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'lab-network',
    title: '1 Gbps Gigabit Dedicated Optical Fiber',
    description: 'Ultra-fast gigabit internet connection backed up by secondary fiber redundancy and online power backup generators to ensure zero downtime.',
    spec: '1000 Mbps High Speed • Dedicated VLAN • 100% Online UPS Backup',
    icon: 'Wifi',
    image: 'https://images.pexels.com/photos/5530478/pexels-photo-5530478.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  },
  {
    id: 'lab-environment',
    title: 'Minimalist Scandinavian Study Environment',
    description: 'Acoustically treated, air-conditioned quiet workspace designed with natural wood accents, warm lighting, and ergonomic mesh chairs.',
    spec: 'Ergonomic Herman Miller Style Seating • Climate Controlled • Sound Dampened',
    icon: 'Sparkles',
    image: 'https://images.pexels.com/photos/18024488/pexels-photo-18024488.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Meera Nambiar',
    role: 'Junior UI Designer',
    company: 'Studio Craft Interactive',
    course: 'Graphic Design & Digital Creative Media',
    avatar: 'https://images.pexels.com/photos/14587417/pexels-photo-14587417.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    quote: 'Before joining Smart Computer Training Institute, I had zero design knowledge. The Scandinavian aesthetics and direct hands-on Figma lab transformed my portfolio. Within 3 weeks of graduation, I landed a UI design role!',
    rating: 5,
    year: 'Class of 2024'
  },
  {
    id: 't2',
    name: 'Rahul K. Soni',
    role: 'Python Automation Engineer',
    company: 'Apex Data Labs',
    course: 'Python Coding & Software Engineering',
    avatar: 'https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    quote: 'The 1:1 lab practice approach made all the difference. Writing code every single day with the instructor reviewing my scripts helped me understand OOP and SQL effortlessly. The Govt. recognized certificate helped me pass corporate screening.',
    rating: 5,
    year: 'Class of 2024'
  },
  {
    id: 't3',
    name: 'Sneha Patel',
    role: 'Administrative Executive',
    company: 'State Urban Infrastructure Board',
    course: 'Basic Computing & Office Productivity',
    avatar: 'https://images.pexels.com/photos/3209624/pexels-photo-3209624.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    quote: 'I needed a verified computer certification for government clerical exams. Not only did I get my typing speed up to 42 WPM, but the advanced Excel module with VLOOKUP and Pivot Tables made me stand out in my practical tests.',
    rating: 5,
    year: 'Class of 2024'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Certification',
    question: 'Are the certificates awarded by Smart Computer Training Institute government recognized?',
    answer: 'Yes. All our diploma and certificate courses are recognized under ISO 9001:2015 quality standards and aligned with national digital skill qualification frameworks. Each student receives a unique Certificate ID with a scannable QR code that can be verified 24/7 on our online portal and is valid for both government exams and private sector employment.'
  },
  {
    id: 'faq-2',
    category: 'Admission',
    question: 'Do I need prior coding or technical computer experience to enroll?',
    answer: 'No prior technical experience is required! Our "Basic Computing", "Python Coding", and "Graphic Design" curriculums are engineered starting from foundational zero-level concepts. Our 1-on-1 lab mentors guide you step by step at your own pace.'
  },
  {
    id: 'faq-3',
    category: 'Admission',
    question: 'What is the daily lab practice policy? Can I practice outside batch hours?',
    answer: 'Yes! All enrolled students get unlimited free extra practice lab hours (up to 2 hours daily) in addition to their scheduled batch time. Our lab supervisors are always on the floor to clear doubts during practice sessions.'
  },
  {
    id: 'faq-4',
    category: 'Fees',
    question: 'Are installment payment plans or student discounts available?',
    answer: 'Yes, we offer easy interest-free 2-part and 3-part installment payment plans for all multi-month courses. We also provide a flat 15% discount for one-time full payments and special student concessions for college ID holders.'
  },
  {
    id: 'faq-5',
    category: 'Placements',
    question: 'How does the institute assist with job placements and interviews?',
    answer: 'Our dedicated Career Placement Cell assists with resume building, mock technical interviews, LinkedIn profile optimization, Behance/GitHub portfolio reviews, and connects eligible graduates directly with over 85+ hiring partner companies.'
  }
];
