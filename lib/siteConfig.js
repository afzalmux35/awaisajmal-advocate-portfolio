// ============================================================================
//  ADMIN EDITABLE CONTENT  —  Edit everything about the website from here.
//  Text, phone, email, images, testimonials, achievements, etc.
// ============================================================================

const IMG = {
  heroBg: 'https://images.unsplash.com/photo-1573575536645-051d14056400?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHw0fHxjb3VydHJvb218ZW58MHx8fGJsYWNrfDE3ODU5OTcyMDN8MA&ixlib=rb-4.1.0&q=85',
  heroPortrait: '/awais-pro.png',
  aboutPortrait: '/awais-pro.png',
  courtroom2: 'https://images.unsplash.com/photo-1702628771524-25d5174e919b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNDR8MHwxfHNlYXJjaHwyfHxjb3VydHJvb218ZW58MHx8fGJsYWNrfDE3ODU5OTcyMDN8MA&ixlib=rb-4.1.0&q=85',
  justiceScales: 'https://images.unsplash.com/photo-1573475758790-04df4385481f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHw0fHxqdXN0aWNlJTIwc2NhbGVzfGVufDB8fHxibGFja3wxNzg1OTk3MjAzfDA&ixlib=rb-4.1.0&q=85',
  gavel: 'https://images.unsplash.com/photo-1645570990200-2701a49d45ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxnYXZlbHxlbnwwfHx8YmxhY2t8MTc4NTk5NzIxNXww&ixlib=rb-4.1.0&q=85',
  books1: 'https://images.unsplash.com/photo-1619771766980-368d32e44b82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHw0fHxsYXclMjBib29rc3xlbnwwfHx8YmxhY2t8MTc4NTk5NzIwM3ww&ixlib=rb-4.1.0&q=85',
  books2: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rc3xlbnwwfHx8YmxhY2t8MTc4NTk5NzIwM3ww&ixlib=rb-4.1.0&q=85',
  books3: 'https://images.unsplash.com/photo-1505664063603-28e48ca204eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwyfHxsYXclMjBib29rc3xlbnwwfHx8YmxhY2t8MTc4NTk5NzIwM3ww&ixlib=rb-4.1.0&q=85',
  books4: 'https://images.unsplash.com/photo-1535905496755-26ae35d0ae54?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwzfHxsYXclMjBib29rc3xlbnwwfHx8YmxhY2t8MTc4NTk5NzIwM3ww&ixlib=rb-4.1.0&q=85',
  certificate: 'https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  meeting: 'https://images.unsplash.com/photo-1606836559739-7b1d9fbf8a6e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fGJsYWNrfDE3ODU5OTcyNjN8MA&ixlib=rb-4.1.0&q=85',
  scalesDesk: 'https://images.pexels.com/photos/7781900/pexels-photo-7781900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
}

export const siteConfig = {
  name: 'Awais Ajmal',
  fullName: 'Muhammad Awais Ajmal',
  initials: 'AA',
  designation: 'Advocate High Court',
  credentials: 'BA • LLB • LLM',
  membership: 'Member Punjab Bar Council',
  tagline: 'Justice Through Integrity, Knowledge & Commitment.',
  location: 'Multan, Punjab, Pakistan',

  contact: {
    phone: '+92 303 5686074',
    phoneDial: '+923035686074',
    whatsapp: '923035686074',
    email: 'contact@awaisajmal.law',
    address: 'District Courts Area, Multan, Punjab, Pakistan',
    hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
    mapUrl: 'https://maps.google.com/?q=District+Courts+Multan',
  },

  images: IMG,

  social: [
    { name: 'Facebook', href: '#', icon: 'facebook' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'WhatsApp', href: 'https://wa.me/923035686074', icon: 'whatsapp' },
  ],

  about: {
    heading: 'A Dedicated Advocate Committed to Justice',
    paragraphs: [
      'Muhammad Awais Ajmal is a hardworking and dedicated Advocate of the High Court, practicing with distinction in Multan, Pakistan. Backed by rigorous academic training — BA, LLB and LLM — and a deep respect for the rule of law, he brings intelligence, integrity, and relentless preparation to every case he represents.',
      'Known for strong courtroom advocacy and a client-focused approach, he believes that every client deserves honest counsel, clear communication, and uncompromising commitment. Whether the matter is criminal, civil, family, or constitutional, his practice is built on trust, thorough research, and strategic legal planning.',
      'As a proud Member of the Punjab Bar Council, Awais Ajmal upholds the highest standards of professional ethics — combining wisdom with hard work to protect the rights and interests of those he serves.',
    ],
    stats: [
      { label: 'Cases Handled', value: 950, suffix: '+' },
      { label: 'Clients Served', value: 1200, suffix: '+' },
      { label: 'Legal Consultations', value: 2500, suffix: '+' },
      { label: 'Success Rate', value: 96, suffix: '%' },
    ],
  },

  qualifications: [
    { year: 'Foundation', title: 'Bachelor of Arts (BA)', desc: 'Built a strong academic foundation in humanities, reasoning and analytical thinking.' },
    { year: 'Law Degree', title: 'Bachelor of Laws (LLB)', desc: 'Comprehensive study of Pakistani law, jurisprudence, and courtroom procedure.' },
    { year: 'Specialisation', title: 'Master of Laws (LLM)', desc: 'Advanced specialisation in legal research, constitutional and corporate law.' },
    { year: 'Enrollment', title: 'Member, Punjab Bar Council', desc: 'Formally enrolled and licensed to practice as an Advocate in Punjab.' },
    { year: 'Elevation', title: 'Advocate of the High Court', desc: 'Elevated to represent clients before the Honourable High Court.' },
    { year: 'Ongoing', title: 'Professional Certifications', desc: 'Continuing legal education, seminars and specialised advocacy trainings.' },
  ],

  practiceAreas: [
    { title: 'Criminal Law', icon: 'gavel', desc: 'Robust defence and prosecution across all criminal matters.' },
    { title: 'Civil Law', icon: 'scale', desc: 'Disputes, suits, injunctions and civil remedies.' },
    { title: 'Family Law', icon: 'users', desc: 'Marriage, custody, guardianship and maintenance.' },
    { title: 'Property Law', icon: 'home', desc: 'Titles, transfers, partition and possession disputes.' },
    { title: 'Constitutional Matters', icon: 'landmark', desc: 'Writ petitions and fundamental rights litigation.' },
    { title: 'Corporate Law', icon: 'building', desc: 'Company formation, compliance and commercial advice.' },
    { title: 'Consumer Protection', icon: 'cart', desc: 'Safeguarding consumer rights and fair trade.' },
    { title: 'Taxation', icon: 'receipt', desc: 'Income tax, sales tax and revenue matters.' },
    { title: 'Service Matters', icon: 'file', desc: 'Employment, promotions and departmental cases.' },
    { title: 'Labour Law', icon: 'hardhat', desc: 'Industrial relations and workers\u2019 rights.' },
    { title: 'Banking Law', icon: 'bank', desc: 'Recovery suits, finance and banking disputes.' },
    { title: 'Rental Matters', icon: 'key', desc: 'Landlord\u2013tenant, ejectment and rent cases.' },
  ],

  whyChoose: [
    { title: 'Dead Honest', icon: 'shield', desc: 'Straight, truthful counsel — no false promises.' },
    { title: 'Transparent Advice', icon: 'eye', desc: 'Clear guidance on every option and outcome.' },
    { title: 'Courtroom Excellence', icon: 'award', desc: 'Confident, prepared and persuasive advocacy.' },
    { title: 'Client Confidentiality', icon: 'lock', desc: 'Your matters remain strictly private.' },
    { title: 'Strong Research', icon: 'search', desc: 'Deep case-law and statutory preparation.' },
    { title: 'Dedicated Representation', icon: 'handshake', desc: 'Your case receives full, personal attention.' },
    { title: 'Professional Ethics', icon: 'balance', desc: 'Uncompromising integrity and standards.' },
    { title: 'Timely Communication', icon: 'clock', desc: 'Prompt updates at every stage.' },
    { title: 'Hardworking Approach', icon: 'trending', desc: 'Relentless effort on every file.' },
    { title: 'Strategic Planning', icon: 'target', desc: 'Tailored legal strategy for the best result.' },
  ],

  achievements: [
    { label: 'Cases Won', value: 850, suffix: '+' },
    { label: 'Years Experience', value: 12, suffix: '+' },
    { label: 'Happy Clients', value: 1200, suffix: '+' },
    { label: 'Court Appearances', value: 3000, suffix: '+' },
    { label: 'Legal Research Papers', value: 45, suffix: '+' },
    { label: 'Awards & Honours', value: 8, suffix: '' },
  ],

  caseStudies: [
    {
      category: 'Criminal Law',
      title: 'Acquittal in Complex Criminal Appeal',
      challenge: 'Client faced serious charges based on circumstantial evidence and weak identification.',
      approach: 'Meticulous cross-examination, forensic scrutiny and strong case-law on benefit of doubt.',
      outcome: 'Full acquittal secured on appeal before the High Court.',
    },
    {
      category: 'Property Law',
      title: 'Recovery of Ancestral Property',
      challenge: 'Decades-old fraudulent transfer clouding a family\u2019s rightful title.',
      approach: 'Historical record analysis, revenue documentation and partition suit strategy.',
      outcome: 'Title restored and lawful possession delivered to the client.',
    },
    {
      category: 'Family Law',
      title: 'Child Custody & Guardianship',
      challenge: 'Contested custody with cross-jurisdiction complications.',
      approach: 'Welfare-of-child centred pleadings backed by strong documentary support.',
      outcome: 'Custody and fair maintenance secured in the client\u2019s favour.',
    },
    {
      category: 'Constitutional',
      title: 'Writ Petition — Service Reinstatement',
      challenge: 'Wrongful termination of a government servant without due process.',
      approach: 'Constitutional petition invoking fundamental rights and natural justice.',
      outcome: 'Reinstatement with back-benefits ordered by the Court.',
    },
  ],

  testimonials: [
    { name: 'Imran H.', role: 'Business Owner', rating: 5, text: 'Awais Sahab handled my commercial dispute with remarkable clarity and confidence. Honest, prepared, and always available — truly a professional you can trust.' },
    { name: 'Sadia K.', role: 'Family Law Client', rating: 5, text: 'During a very difficult time he guided me with patience and dignity. His courtroom command and integrity gave me real peace of mind.' },
    { name: 'Rana Tariq', role: 'Property Client', rating: 5, text: 'He recovered our family property after years of struggle. His research and strategy were simply outstanding. Highly recommended.' },
    { name: 'Dr. Ahmed N.', role: 'Service Matter', rating: 5, text: 'Transparent from day one about my chances and the process. Professional, ethical and hardworking — exactly the advocate I needed.' },
  ],

  gallery: [
    { src: IMG.heroBg, caption: 'Court Appearances' },
    { src: IMG.aboutPortrait, caption: 'Professional Portrait' },
    { src: IMG.books1, caption: 'Legal Library' },
    { src: IMG.certificate, caption: 'Certificates & Honours' },
    { src: IMG.meeting, caption: 'Client Meetings' },
    { src: IMG.justiceScales, caption: 'Scales of Justice' },
    { src: IMG.gavel, caption: 'In Chambers' },
    { src: IMG.books2, caption: 'Research & Study' },
    { src: IMG.scalesDesk, caption: 'The Office' },
    { src: IMG.courtroom2, caption: 'The High Court' },
    { src: IMG.books3, caption: 'Case Files' },
    { src: IMG.books4, caption: 'Seminars & Learning' },
  ],

  philosophy:
    'Law is not merely a profession\u2014it is a commitment to uphold justice with honesty, wisdom, and unwavering dedication.',

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Practice Areas', href: '#practice' },
    { label: 'Qualifications', href: '#qualifications' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ],
}

export default siteConfig
