// FOREnX - Forensic Digital Evidence & Crime Intelligence Data Store
// ISO/IEC 27037 compliant forensic data schema

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Agent Robert Miller',
    email: 'r.miller@forenx.gov',
    role: 'ADMIN', // ADMIN | INVESTIGATOR | VIEWER
    badgeNumber: 'FRX-901',
    title: 'Senior Forensic Director',
    department: 'Digital Forensic Unit (DFU) HQ',
    clearanceLevel: 'TOP SECRET // SCI',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-15 09:14:22 UTC',
    ipAddress: '10.240.12.84 (Secured VPN)'
  },
  {
    id: 'usr-2',
    name: 'Agent Maya Patel',
    email: 'm.patel@forenx.gov',
    role: 'INVESTIGATOR',
    badgeNumber: 'FRX-412',
    title: 'Lead Cybercrime Investigator',
    department: 'Cyber Threat Response Division',
    clearanceLevel: 'SECRET // LAW ENFORCEMENT SENSITIVE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-15 08:30:11 UTC',
    ipAddress: '10.240.14.19'
  },
  {
    id: 'usr-3',
    name: 'Dr. Sarah Chen',
    email: 's.chen@forenx.gov',
    role: 'INVESTIGATOR',
    badgeNumber: 'FRX-605',
    title: 'Forensic AI & Cryptographic Analyst',
    department: 'Advanced Evidence Analytics Lab',
    clearanceLevel: 'SECRET',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-15 07:45:00 UTC',
    ipAddress: '10.240.18.52'
  },
  {
    id: 'usr-4',
    name: 'Auditor James Wilson',
    email: 'j.wilson@oversight.gov',
    role: 'VIEWER',
    badgeNumber: 'FRX-108',
    title: 'Judicial Oversight Liaison',
    department: 'Office of Inspector General',
    clearanceLevel: 'RESTRICTED OVERSIGHT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastLogin: '2026-09-14 16:20:05 UTC',
    ipAddress: '192.168.100.41'
  }
];

export const USERS = {
  ADMIN: INITIAL_USERS[0],
  INVESTIGATOR: INITIAL_USERS[1],
  ANALYST: INITIAL_USERS[2],
  VIEWER: INITIAL_USERS[3]
};

export const INITIAL_CASES = [
  {
    id: 'FRX-2026-001',
    name: 'Operation Blackout',
    description: 'Investigation into unauthorized SCADA gateway penetration and ransomware payload staged against regional grid distribution networks.',
    caseType: 'Critical Infrastructure Cyberattack',
    priority: 'Critical', // Critical | High | Medium | Low
    status: 'Active', // Active | Under Review | Closed
    investigator: 'Agent Maya Patel',
    investigatorId: 'usr-2',
    createdDate: '2026-08-10',
    lastUpdated: '2026-09-14 23:41 UTC',
    evidenceCount: 14,
    riskScore: 92,
    leadSummary: 'Command-and-control beaconing traced to bulletproof VPS in Eastern Europe. Staged data contains turbine synchronization credentials and employee PII.',
    tags: ['SCADA', 'Ransomware', 'Critical Infra', 'APT-44'],
    keyEntities: [
      { name: 'Vikram Sharma', type: 'PERSON', role: 'Key Suspect / Ex-Contractor' },
      { name: 'CipherCorp Global Logistics', type: 'ORGANIZATION', role: 'Shell Company Cover' },
      { name: 'Kanpur Safehouse Sector 4', type: 'LOCATION', role: 'Suspect Staging Ground' },
      { name: '0x71C...4e8', type: 'ACCOUNT', role: 'Ransom Escrow Wallet' }
    ],
    timelineEvents: [
      { date: '2026-08-10 03:14 UTC', title: 'Initial Compromise', description: 'Spear-phishing email delivered weaponized PDF to SCADA Engineer workstation.' },
      { date: '2026-08-12 11:20 UTC', title: 'Lateral Movement', description: 'Pass-the-hash authentication observed against domain controller DC-02.' },
      { date: '2026-08-14 02:44 UTC', title: 'Evidence Ingested', description: 'Bitstream disk image of SCADA server acquired with Tableau Forensic Bridge.' },
      { date: '2026-09-02 18:30 UTC', title: 'AI Entity Correlation', description: 'NLP matched contractor signature to offshore shell accounts in Panama registry.' }
    ]
  },
  {
    id: 'FRX-2026-002',
    name: 'Digital Fraud & Asset Laundering Investigation',
    description: 'Cross-border syndicate laundering $18.4M in illicit darknet revenues through high-frequency algorithmic cryptocurrency swaps and forged real-estate invoices.',
    caseType: 'Financial Crime / Money Laundering',
    priority: 'High',
    status: 'Active',
    investigator: 'Agent Robert Miller',
    investigatorId: 'usr-1',
    createdDate: '2026-07-28',
    lastUpdated: '2026-09-15 01:12 UTC',
    evidenceCount: 22,
    riskScore: 84,
    leadSummary: 'Multiple transaction ledgers link shell accounts in Zurich and Singapore. AI entity detection uncovered 14 fictitious vendor invoices.',
    tags: ['Crypto', 'Money Laundering', 'Interpol', 'Shell Accounts'],
    keyEntities: [
      { name: 'John Doe / Alias Alex Vance', type: 'PERSON', role: 'Syndicate Financier' },
      { name: 'Apex Global Assets Ltd', type: 'ORGANIZATION', role: 'Layering Vehicle' },
      { name: 'Zurich Financial District', type: 'LOCATION', role: 'Escrow Point' }
    ],
    timelineEvents: [
      { date: '2026-07-28 09:00 UTC', title: 'Referral Received', description: 'FinCEN Suspicious Activity Report (SAR) flagged anomalous $4.2M wire.' },
      { date: '2026-08-04 14:15 UTC', title: 'Subpoena Served', description: 'Encrypted email archives and ledger files subpoenaed from cloud provider.' },
      { date: '2026-08-20 16:00 UTC', title: 'Blockchain Analysis', description: 'Mixer transactions peeled to identify recipient cold storage hardware wallet.' }
    ]
  },
  {
    id: 'FRX-2026-003',
    name: 'Cyber Intrusion & Data Exfiltration Analysis',
    description: 'Advanced persistent threat targeting defense contractor aerospace propulsion blueprints via zero-day perimeter firewall exploitation.',
    caseType: 'Espionage & Trade Secrets',
    priority: 'Critical',
    status: 'Under Review',
    investigator: 'Dr. Sarah Chen',
    investigatorId: 'usr-3',
    createdDate: '2026-08-22',
    lastUpdated: '2026-09-14 19:10 UTC',
    evidenceCount: 9,
    riskScore: 96,
    leadSummary: 'Memory dump confirms reflective DLL injection inside svchost.exe. Exfiltrated files were compressed into password-protected split 7z archives.',
    tags: ['Espionage', 'Defense', 'Memory Forensics', 'Zero-Day'],
    keyEntities: [
      { name: 'Elena Rostova', type: 'PERSON', role: 'Identified Threat Actor Handle' },
      { name: 'AeroDynamics Defense Labs', type: 'ORGANIZATION', role: 'Victim Organization' },
      { name: 'Prague Proxy Node', type: 'LOCATION', role: 'Exfiltration Relay' }
    ],
    timelineEvents: [
      { date: '2026-08-22 04:02 UTC', title: 'Perimeter Breach', description: 'Zero-day vulnerability in VPN gateway triggered egress alert.' },
      { date: '2026-08-23 08:30 UTC', title: 'Memory Capture', description: 'Live volatile RAM captured from primary CAD design server using LiME/FTK Imager.' }
    ]
  },
  {
    id: 'FRX-2026-004',
    name: 'Trade Secret IP Theft & Insider Tampering',
    description: 'Disgruntled senior research scientist copied proprietary semiconductor lithography patents to personal encrypted NVMe drive prior to foreign departure.',
    caseType: 'Insider Threat',
    priority: 'Medium',
    status: 'Under Review',
    investigator: 'Agent Maya Patel',
    investigatorId: 'usr-2',
    createdDate: '2026-09-01',
    lastUpdated: '2026-09-13 14:05 UTC',
    evidenceCount: 6,
    riskScore: 68,
    leadSummary: 'USB device serial number logged in Windows Registry matches seized Samsung T7 SSD found in suspect luggage during airport customs stop.',
    tags: ['Insider Threat', 'Semiconductors', 'USB Forensics'],
    keyEntities: [
      { name: 'Dr. Arthur Pendelton', type: 'PERSON', role: 'Suspect / Principal Scientist' },
      { name: 'Nexus Semi Fab', type: 'ORGANIZATION', role: 'Victim Corporation' },
      { name: 'Terminal 3 International', type: 'LOCATION', role: 'Seizure Location' }
    ],
    timelineEvents: [
      { date: '2026-09-01 17:45 UTC', title: 'USB Insert Event', description: 'Event ID 20001 recorded USB 3.2 drive serial #SM-T7-9941.' },
      { date: '2026-09-03 21:10 UTC', title: 'Border Seizure', description: 'Device seized by federal customs agents under judicial inspection warrant.' }
    ]
  },
  {
    id: 'FRX-2026-005',
    name: 'Distributed Darknet Market Nexus',
    description: 'Takedown and forensic autopsy of underground illicit escrow market server cluster operating across hidden Tor .onion services.',
    caseType: 'Darknet / Narcotics Trafficking',
    priority: 'Low',
    status: 'Closed',
    investigator: 'Agent Robert Miller',
    investigatorId: 'usr-1',
    createdDate: '2026-05-12',
    lastUpdated: '2026-09-08 10:20 UTC',
    evidenceCount: 31,
    riskScore: 45,
    leadSummary: 'Server images fully decrypted with recovery master key. Court presentation complete; conviction secured in federal district court.',
    tags: ['Darknet', 'Tor', 'Court Verified', 'Decrypted'],
    keyEntities: [
      { name: 'Marcus "Cipher" Kane', type: 'PERSON', role: 'Convicted Administrator' },
      { name: 'HydraShadow Market', type: 'ORGANIZATION', role: 'Dismantled Platform' }
    ],
    timelineEvents: [
      { date: '2026-05-12 01:00 UTC', title: 'Coordinated Seizure', description: 'Physical server hardware seized at Netherlands hosting facility.' },
      { date: '2026-09-05 14:00 UTC', title: 'Sentencing Hearing', description: 'Expert forensic testimony accepted without defense challenge.' }
    ]
  }
];

export const INITIAL_EVIDENCE = [
  {
    id: 'EV-2026-001284',
    filename: 'suspect_document.pdf',
    type: 'Document', // Document | Disk Image | Log | Image | Audio | Video | Network | Other
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    fileSize: '3.4 MB',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    md5: '7d659a2feaa0c55ad015a3bf4f1b2b0b',
    uploadedBy: 'Agent Maya Patel',
    uploadedById: 'usr-2',
    uploadedAt: '2026-08-14 10:22:15 UTC',
    integrity: 'Verified', // Verified | Requires Review | Integrity Failed
    aiStatus: 'Analyzed', // Pending | Processing | Analyzed
    deviceSource: 'HP EliteBook 840 (G8-SCADA-01) - Acquired via Logicube Falcon',
    writeBlockerUsed: true,
    writeBlockerModel: 'Tableau T8u Forensic USB 3.0 Bridge',
    evidenceRoomLocation: 'Vault B - Secure Locker #419',
    description: 'Encrypted PDF invoice with embedded steganographic script and hidden offshore bank details.',
    extractedText: `CONFIDENTIAL ESCROW AGREEMENT
Client Identifier: CipherCorp Global Logistics
Reference Number: TX-9082-KANPUR
Date of Wire Transfer: 14 August 2026

Authorized by: Vikram Sharma (Designated Director)
Recipient Institution: Safehouse Banking Syndicate
Routing: Account #0x71C882194e8
Total Authorized: $4,250,000 USD Equivalent (USDT-TRC20)
Purpose: "Consulting & Infrastructure Maintenance Access Override"
Warning: This document is classified. Release unauthorized access keys upon receipt of hash confirmation.`,
    classification: 'Financial Fraud & Infrastructure Access Extortion',
    confidenceScore: 98.4,
    aiSummary: 'Extracted text confirms high-value offshore payment authorization directly referencing SCADA override credentials and suspect Vikram Sharma. Cryptographic hash matches original seizure inventory.',
    entities: [
      { type: 'PERSON', value: 'Vikram Sharma', confidence: 98 },
      { type: 'ORGANIZATION', value: 'CipherCorp Global Logistics', confidence: 96 },
      { type: 'LOCATION', value: 'Kanpur Safehouse Sector 4', confidence: 94 },
      { type: 'ACCOUNT', value: '0x71C882194e8 (USDT Wallet)', confidence: 99 },
      { type: 'DATE', value: '14 August 2026', confidence: 99 }
    ],
    keywords: ['Escrow Agreement', 'SCADA Override', 'Wire Transfer', 'CipherCorp', 'Offshore']
  },
  {
    id: 'EV-2026-001285',
    filename: 'device_image.dd',
    type: 'Disk Image',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    fileSize: '128.4 GB',
    sha256: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    md5: '8f76673e2cc77ab2127b7afdeda33b4a',
    uploadedBy: 'Dr. Sarah Chen',
    uploadedById: 'usr-3',
    uploadedAt: '2026-08-15 14:05:00 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Samsung Galaxy S23 (IMEI: 354892091823901) - Physical Bitstream Dump',
    writeBlockerUsed: true,
    writeBlockerModel: 'Cellebrite UFED 4PC Ultra Forensic Hardware Bridge',
    evidenceRoomLocation: 'Digital Evidence Server Cluster SAN-02',
    description: 'Raw physical memory and flash partition dump from suspect mobile device. Recovered deleted Signal messages and GPS waypoint cache.',
    extractedText: `[Extracted Artifact Log - EnCase / Autopsy Parse]
Partition 0: /system (Ext4, SHA256: 4a5e... Verified)
Partition 1: /data (F2FS, Decrypted with Hardware Key Passcode)
Deleted Database Records: 84 records recovered from /data/data/org.thoughtcrime.securesms/databases/signal.db
Contact: "Apex Courier" (+91-98765-43210)
Last Lat/Long: 26.4499° N, 80.3319° E (Kanpur Port Industrial Sector)`,
    classification: 'Physical Mobile Storage Bitstream (Android OS 14)',
    confidenceScore: 99.1,
    aiSummary: 'Physical extraction yielded complete message thread between suspect Vikram Sharma and unlisted contact "Apex Courier", coordinating physical access to grid sub-station.',
    entities: [
      { type: 'PERSON', value: 'Vikram Sharma', confidence: 99 },
      { type: 'PHONE', value: '+91-98765-43210', confidence: 97 },
      { type: 'LOCATION', value: 'Kanpur Port Industrial Sector', confidence: 95 },
      { type: 'ORGANIZATION', value: 'Apex Courier Relay', confidence: 92 }
    ],
    keywords: ['Physical Dump', 'Signal Messenger', 'Recovered Database', 'GPS Cache', 'IMEI']
  },
  {
    id: 'EV-2026-001286',
    filename: 'transaction_log.txt',
    type: 'Log',
    caseId: 'FRX-2026-002',
    caseName: 'Digital Fraud & Asset Laundering Investigation',
    fileSize: '842 KB',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    md5: '98fc1c149afbf4c8996fb92427ae41e4',
    uploadedBy: 'Agent Robert Miller',
    uploadedById: 'usr-1',
    uploadedAt: '2026-08-18 09:12:44 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Tornado.cash & Railgun Relayer Node Access Logs (Seized by Court Order)',
    writeBlockerUsed: false,
    writeBlockerModel: 'Direct API Cryptographic Verification Handshake',
    evidenceRoomLocation: 'Secure Evidence Cloud Bucket S3-GovCloud',
    description: 'Structured CSV/Text ledger of 418 transactions through decentralized mixer contracts over 72-hour window.',
    extractedText: `TIMESTAMP,TX_HASH,FROM_ADDRESS,TO_ADDRESS,AMOUNT_ETH,TOKEN,STATUS
2026-08-16T12:04:12Z,0x99fa...31,0x71C...4e8,0xMixerPool_1,450.00,ETH,CONFIRMED
2026-08-16T12:15:02Z,0x81bb...aa,0xMixerPool_1,0xZurichEscrow_8,442.50,ETH,DISBURSED
2026-08-17T03:19:22Z,0x33aa...ee,0xZurichEscrow_8,Apex Global Assets,1250000.00,USDT,CONVERTED
Note: Cross-referenced with suspect email timestamps. 98.7% temporal alignment.`,
    classification: 'Decentralized Blockchain Mixer Transaction Log',
    confidenceScore: 97.5,
    aiSummary: 'Financial intelligence analysis successfully unmixed and attributed $1.25M in USDT to shell company Apex Global Assets, directly funding purchase of real estate in Zurich.',
    entities: [
      { type: 'ACCOUNT', value: '0x71C...4e8', confidence: 99 },
      { type: 'ORGANIZATION', value: 'Apex Global Assets Ltd', confidence: 98 },
      { type: 'LOCATION', value: 'Zurich Financial District', confidence: 95 },
      { type: 'PERSON', value: 'John Doe / Alex Vance', confidence: 90 }
    ],
    keywords: ['Blockchain Mixer', 'Tornado Cash', 'USDT', 'Layering', 'Temporal Alignment']
  },
  {
    id: 'EV-2026-001287',
    filename: 'surveillance_photo.jpg',
    type: 'Image',
    caseId: 'FRX-2026-003',
    caseName: 'Cyber Intrusion & Data Exfiltration Analysis',
    fileSize: '14.8 MB',
    sha256: 'c8996fb92427ae41e4649b934ca495991b7852b8559f86d081884c7d659a2fea',
    md5: 'b934ca495991b7852b8559f86d081884',
    uploadedBy: 'Dr. Sarah Chen',
    uploadedById: 'usr-3',
    uploadedAt: '2026-08-25 11:30:19 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Axis Q6075-E Forensic PTZ Surveillance Camera (Perimeter Post 7)',
    writeBlockerUsed: true,
    writeBlockerModel: 'Digital Watermark & Cryptographic Authenticator Module',
    evidenceRoomLocation: 'Digital Video Management Archival LTO-9 Tape #302',
    description: 'High-resolution security frame capturing physical hand-off of waterproof military-grade NVMe drive outside secure defense facility perimeter.',
    extractedText: `[EXIF / Computer Vision Analysis]
Camera Make: Axis Communications
Exposure: 1/500s at f/2.8, ISO 800
Timestamp: 2026-08-22 03:45:11 UTC
GPS Coordinates: 50.0755° N, 14.4378° E (Prague Diplomatic Enclave)
AI Object Detection: 2 Human Subjects, 1 Vehicle (Mercedes E-Class, License Plate: PR-904-XY), 1 Handheld Storage Device (SanDisk Extreme Pro Portable SSD).
Facial Recognition Match: Elena Rostova (Confidence 93.4%)`,
    classification: 'Physical Surveillance Video Still & Facial Recognition Match',
    confidenceScore: 95.8,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    aiSummary: 'Computer vision analysis identified subject Elena Rostova meeting unidentified courier in Prague diplomatic zone within 45 minutes of network exfiltration trigger.',
    entities: [
      { type: 'PERSON', value: 'Elena Rostova', confidence: 93 },
      { type: 'LOCATION', value: 'Prague Diplomatic Enclave', confidence: 96 },
      { type: 'ORGANIZATION', value: 'AeroDynamics Defense Labs', confidence: 90 },
      { type: 'DATE', value: '2026-08-22 03:45 UTC', confidence: 99 }
    ],
    keywords: ['Surveillance Still', 'EXIF Metadata', 'Facial Recognition', 'Elena Rostova', 'License Plate']
  },
  {
    id: 'EV-2026-001292',
    filename: 'bank_robbery_lexington_cctv.jpg',
    type: 'Image',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    fileSize: '8.4 MB',
    sha256: '8b29103c3f8b9e24a15cd87019f3b9284a8f9b23c10e8d7521a6b89c741e05a8',
    md5: '4a8f9b23c10e8d7521a6b89c741e05a8',
    uploadedBy: 'Agent Maya Patel',
    uploadedById: 'usr-2',
    uploadedAt: '2026-10-02 21:20:00 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'First Metropolitan Trust Vault Cam #3 (1204 Lexington Blvd)',
    writeBlockerUsed: true,
    writeBlockerModel: 'Tableau T8u Hardware Bridge',
    evidenceRoomLocation: 'Secure Evidence Vault Locker #419',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    description: 'High-resolution security frame capturing commercial bank armed robbery in progress with brandished Glock firearm, broken safety barrier, and strapped currency collection.',
    classification: 'Armed Robbery & Brandishing of Deadly Weapon',
    confidenceScore: 99.1,
    aiSummary: 'Multimodal vision scan extracts 21:18:42 UTC terminal timecode, 1204 Lexington Boulevard address signage, Glock semi-automatic handgun brandished by masked suspect in motorcycle helmet, and escape motorcycle.',
    entities: [
      { type: 'LOCATION', value: '1204 Lexington Boulevard, Suite 100', confidence: 99 },
      { type: 'ORGANIZATION', value: 'First Metropolitan Trust', confidence: 98 },
      { type: 'DATE', value: '2026-10-02 21:18:42 UTC', confidence: 99 }
    ],
    keywords: ['Armed Robbery', 'Brandished Firearm', 'Lexington Blvd', 'CCTV Frame', 'Currency Bricks']
  },
  {
    id: 'EV-2026-001293',
    filename: 'homicide_elm_st_alley.jpg',
    type: 'Image',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    fileSize: '11.2 MB',
    sha256: '4a8f9b23c10e8d7521a6b89c741e05a8f23491827c02b5de738491048b29103c',
    md5: '7d659a2feaa0c55ad015a3bf4f1b2b0b',
    uploadedBy: 'Dr. Sarah Chen',
    uploadedById: 'usr-3',
    uploadedAt: '2026-09-14 03:00:00 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Industrial Service Alley Axis PTZ Camera (482 Elm St)',
    writeBlockerUsed: true,
    writeBlockerModel: 'Tableau T8u Hardware Bridge',
    evidenceRoomLocation: 'Secure Evidence Vault Locker #419',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    description: 'Post-incident homicide crime scene capture showing rain-dampened cobblestones, 9mm spent brass casing (Marker #1), St. Jude smokestack landmark, and fleeing masked subject.',
    classification: 'Homicide / Violent Crime Scene Investigation',
    confidenceScore: 98.7,
    aiSummary: 'Multimodal vision scan extracts 02:44:18 UTC timestamp, 482 Elm Street / St. Jude Alley address, ballistic 9mm casing, blood spatter trace, and fleeing suspect heading north toward 5th Avenue.',
    entities: [
      { type: 'LOCATION', value: '482 Elm Street / St. Jude Alley', confidence: 98 },
      { type: 'DATE', value: '2026-09-14 02:44:18 UTC', confidence: 99 }
    ],
    keywords: ['Homicide', '9mm Ballistics', 'Elm Street Alley', 'St Jude Landmark', 'Blood Spatter']
  },
  {
    id: 'EV-2026-001288',
    filename: 'email_archive.eml',
    type: 'Document',
    caseId: 'FRX-2026-002',
    caseName: 'Digital Fraud & Asset Laundering Investigation',
    fileSize: '24.1 MB',
    sha256: '7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a089f86d081884c',
    md5: 'aa0c55ad015a3bf4f1b2b0b822cd15d6',
    uploadedBy: 'Agent Maya Patel',
    uploadedById: 'usr-2',
    uploadedAt: '2026-08-29 16:40:02 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'ProtonMail Encrypted Cloud Export via Federal Grand Jury Subpoena',
    writeBlockerUsed: false,
    writeBlockerModel: 'Cryptographic PGP Key Import & Ledger Verification',
    evidenceRoomLocation: 'Evidence Cold Storage NAS-01',
    description: 'Decrypted email mbox archive containing 1,420 communications between syndicate leaders and overseas money transfer agents.',
    extractedText: `From: "Blackout Coordinator" <encrypted-relay@proton.me>
To: "Apex Liaison" <alex.vance@apexglobal.ch>
Date: Wed, 12 Aug 2026 21:14:09 +0000
Subject: Updated Routing Confirmation - Batch #4

Attached is the revised escrow disbursement schedule. All funds from the turbine project must clear through the Kanpur hub before conversion. The local engineer has confirmed the gateway is open until 04:00 AM.
Do NOT use standard telecom channels. Reach out via Telegram burner ID: @apex_relay_09.
All hashes must verify on the internal portal.`,
    classification: 'Encrypted Electronic Mail Communication Thread',
    confidenceScore: 99.4,
    aiSummary: 'Direct conspiratorial email proving coordination between Operation Blackout SCADA intrusion and Digital Fraud asset laundering syndicate.',
    entities: [
      { type: 'EMAIL', value: 'encrypted-relay@proton.me', confidence: 99 },
      { type: 'EMAIL', value: 'alex.vance@apexglobal.ch', confidence: 98 },
      { type: 'PERSON', value: 'John Doe / Alex Vance', confidence: 95 },
      { type: 'LOCATION', value: 'Kanpur Hub', confidence: 96 }
    ],
    keywords: ['Email Archive', 'Conspiracy', 'ProtonMail', 'Telegram Burner', 'Gateway Access']
  },
  {
    id: 'EV-2026-001289',
    filename: 'network_capture.pcap',
    type: 'Network',
    caseId: 'FRX-2026-003',
    caseName: 'Cyber Intrusion & Data Exfiltration Analysis',
    fileSize: '2.1 GB',
    sha256: '2b0b822cd15d6c15b0f00a089f86d081884c7d659a2feaa0c55ad015a3bf4f1b',
    md5: 'd6c15b0f00a089f86d081884c7d659a2',
    uploadedBy: 'Dr. Sarah Chen',
    uploadedById: 'usr-3',
    uploadedAt: '2026-09-02 08:15:22 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Core Switch Span Port Cisco Nexus 9300 - Full Packet Capture',
    writeBlockerUsed: true,
    writeBlockerModel: 'EndaceProbe 100G Hardware Packet Capture Appliance',
    evidenceRoomLocation: 'DFU Threat Intelligence Repository Volume 8',
    description: 'Packet capture file covering 6 hours of egress traffic during data exfiltration window. Identified cobalt strike beaconing and DNS tunneling.',
    extractedText: `[Zeek / Suricata PCAP Analysis Summary]
Total Packets: 18,409,211
Protocols: TCP (84%), UDP (14%), ICMP (2%)
Alert: ET MALWARE Cobalt Strike Beacon Observed (Port 443 with self-signed wildcard cert)
DNS Tunneling Detected: Query to base64.tunnel.c2-relay.ru (Egress volume: 1.84 GB encoded payload)
Destination IP: 185.220.101.44 (AS9009 Bulletproof Hosting)`,
    classification: 'Network Telemetry & C2 Protocol Analysis',
    confidenceScore: 98.7,
    aiSummary: 'Packet dissection confirmed exfiltration of CAD engineering drawings encoded in high-frequency TXT DNS queries to malicious Russian hosting provider.',
    entities: [
      { type: 'ORGANIZATION', value: 'Cobalt Strike C2 Infrastructure', confidence: 97 },
      { type: 'LOCATION', value: 'Prague Proxy Node', confidence: 92 },
      { type: 'ACCOUNT', value: 'IP 185.220.101.44', confidence: 99 }
    ],
    keywords: ['PCAP', 'Cobalt Strike', 'DNS Tunneling', 'Data Exfiltration', 'Packet Inspection']
  },
  {
    id: 'EV-2026-001290',
    filename: 'memory_dump.raw',
    type: 'Other',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    fileSize: '32 GB',
    sha256: '15b0f00a089f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c',
    md5: 'aa0c55ad015a3bf4f1b2b0b822cd15d6',
    uploadedBy: 'Agent Maya Patel',
    uploadedById: 'usr-2',
    uploadedAt: '2026-09-05 13:00:10 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Dell PowerEdge R750 (SCADA Gateway) - Volatile RAM Dump via WinPmem',
    writeBlockerUsed: false,
    writeBlockerModel: 'Cryptographic Snapshot Token #RAM-901',
    evidenceRoomLocation: 'SAN-01 High-Speed Forensic Pool',
    description: 'Volatile RAM image preserved prior to server shutdown. Volatility framework extracted unencrypted memory keys and active TCP connections.',
    extractedText: `[Volatility 3 Memory Forensic Output]
Kernel Base: 0xfffff8046d800000 (Windows Server 2022)
Injected Process: svchost.exe (PID 1488) - VAD protection PAGE_EXECUTE_READWRITE
Extracted AES-256 Key: 3a9f4c82b1d0e5f7a2c4e680913579bdfa0123456789abcdef0123456789abcd
Active Socket: 10.0.4.12:49152 -> 185.220.101.44:443 (ESTABLISHED)`,
    classification: 'Volatile RAM Artifact (Process Injection & Encryption Keys)',
    confidenceScore: 99.8,
    aiSummary: 'Memory analysis recovered in-memory AES-256 encryption key used to encrypt the turbine control parameters, enabling complete file restoration without ransom.',
    entities: [
      { type: 'ORGANIZATION', value: 'SCADA Gateway Infrastructure', confidence: 98 },
      { type: 'ACCOUNT', value: 'AES Key #3a9f...abcd', confidence: 99 },
      { type: 'DATE', value: '2026-09-05 13:00 UTC', confidence: 99 }
    ],
    keywords: ['RAM Dump', 'Volatility', 'AES Key Recovery', 'Process Injection', 'Svchost']
  },
  {
    id: 'EV-2026-001291',
    filename: 'burner_phone_backup.tar',
    type: 'Other',
    caseId: 'FRX-2026-004',
    caseName: 'Trade Secret IP Theft & Insider Tampering',
    fileSize: '1.8 GB',
    sha256: '6c15b0f00a089f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d',
    md5: 'f00a089f86d081884c7d659a2feaa0c5',
    uploadedBy: 'Dr. Sarah Chen',
    uploadedById: 'usr-3',
    uploadedAt: '2026-09-09 18:22:40 UTC',
    integrity: 'Requires Review',
    aiStatus: 'Processing',
    deviceSource: 'Nokia 225 4G Feature Phone & MicroSD Card',
    writeBlockerUsed: true,
    writeBlockerModel: 'Tableau TD3 Forensic Duplicator',
    evidenceRoomLocation: 'Evidence Safe Locker #11',
    description: 'Logical backup of prepaid SIM card and MicroSD storage. Discrepancy noted in file modified timestamp during extraction.',
    extractedText: `[Extraction In Progress - Checksum Verification Warning]
Header Checksum: Valid
Sector 1048-2048: Minor timestamp variance detected between FAT32 directory table and file header.
Requires manual forensic re-acquisition check under judicial supervision.`,
    classification: 'Mobile Feature Phone Logical Backup',
    confidenceScore: 82.1,
    aiSummary: 'Integrity review flag initiated due to 4-minute divergence in FAT32 time table. Secondary hardware hash calculation requested.',
    entities: [
      { type: 'PERSON', value: 'Dr. Arthur Pendelton', confidence: 88 },
      { type: 'LOCATION', value: 'Terminal 3 International', confidence: 91 }
    ],
    keywords: ['Burner Phone', 'SIM Extraction', 'Timestamp Discrepancy', 'Requires Review']
  },
  {
    id: 'EV-2026-001292',
    filename: 'wiretap_intercept_session4.mp3',
    type: 'Audio',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    fileSize: '42.6 MB',
    sha256: '884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a089f86d081',
    md5: 'c55ad015a3bf4f1b2b0b822cd15d6c15',
    uploadedBy: 'Agent Maya Patel',
    uploadedById: 'usr-2',
    uploadedAt: '2026-09-12 04:10:00 UTC',
    integrity: 'Verified',
    aiStatus: 'Analyzed',
    deviceSource: 'Title III Lawful Intercept Audio Tap (Carrier Telemetry Gateway)',
    writeBlockerUsed: false,
    writeBlockerModel: 'Digital Legal Intercept Encrypted Pipeline',
    evidenceRoomLocation: 'Audio Intercept Vault Tier 1',
    description: 'Recorded telephone conversation between suspect Vikram Sharma and overseas handler discussing transfer deadlines.',
    extractedText: `[Whisper AI / Forensic Speech Transcription]
Speaker 1 (Vikram Sharma): "The gateway is primed. If the escrow doesn't confirm in Zurich by morning, they'll patch the firmware and we lose all leverage."
Speaker 2 (Unidentified Male): "The funds are in the Kanpur account already. Keep your burner phone off until you clear customs."
Speaker 1: "Make sure CipherCorp honors the secondary payout. I have the drive in my briefcase."`,
    classification: 'Lawful Audio Wiretap Intercept Recording',
    confidenceScore: 97.2,
    aiSummary: 'Voice biometric analysis confirms 96.4% acoustic match to Vikram Sharma. Suspect explicitly acknowledges holding the contraband storage media.',
    entities: [
      { type: 'PERSON', value: 'Vikram Sharma', confidence: 99 },
      { type: 'ORGANIZATION', value: 'CipherCorp Global Logistics', confidence: 97 },
      { type: 'LOCATION', value: 'Zurich Financial District', confidence: 94 },
      { type: 'LOCATION', value: 'Kanpur Safehouse Sector 4', confidence: 96 }
    ],
    keywords: ['Wiretap Audio', 'Voice Biometrics', 'Firmware Patch', 'Escrow Confirmation']
  }
];

export const INITIAL_CHAIN_OF_CUSTODY = [
  {
    id: 'COC-1001',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'Evidence Collected',
    timestamp: '2026-08-14 08:30:00 UTC',
    user: 'Det. Kevin Barnes',
    role: 'Crime Scene First Responder',
    badge: 'FRX-112',
    deviceInfo: 'Logicube Falcon Neo (Serial #FN-4029)',
    ipAddress: 'On-scene field terminal',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Document extracted from suspect workstation in presence of independent witness.'
  },
  {
    id: 'COC-1002',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'Evidence Uploaded & Ingested',
    timestamp: '2026-08-14 10:22:15 UTC',
    user: 'Agent Maya Patel',
    role: 'Lead Cybercrime Investigator',
    badge: 'FRX-412',
    deviceInfo: 'Forensic Ingestion Workstation (FRED-04)',
    ipAddress: '10.240.14.19',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Ingested into FOREnX cryptographic vault. Write-blocker hardware confirmed active.'
  },
  {
    id: 'COC-1003',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'Hash Generated & Validated',
    timestamp: '2026-08-14 10:22:18 UTC',
    user: 'System Automated Forensic Engine',
    role: 'Cryptographic Custody Daemon',
    badge: 'SYS-SEC',
    deviceInfo: 'FOREnX Core Cluster FIPS 140-2 HSM',
    ipAddress: '127.0.0.1 (Local Loopback)',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Dual SHA-256 and MD5 cryptographic fingerprint recorded in immutable ledger.'
  },
  {
    id: 'COC-1004',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'Evidence Reviewed',
    timestamp: '2026-08-14 13:45:00 UTC',
    user: 'Agent Robert Miller',
    role: 'Senior Forensic Director',
    badge: 'FRX-901',
    deviceInfo: 'Secure Analysis Terminal #01',
    ipAddress: '10.240.12.84',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Supervisory review of metadata; authorized for immediate AI NLP entity extraction.'
  },
  {
    id: 'COC-1005',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'AI Forensic Analysis Run',
    timestamp: '2026-08-14 14:02:10 UTC',
    user: 'Dr. Sarah Chen',
    role: 'Forensic AI Specialist',
    badge: 'FRX-605',
    deviceInfo: 'AI GPU Inference Node (A100-Gov)',
    ipAddress: '10.240.18.52',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Gemini-3.8-Flash OCR & Entity Extraction pipeline executed. Zero modifications to source bitstream.'
  },
  {
    id: 'COC-1006',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'Investigator Access',
    timestamp: '2026-08-15 09:11:32 UTC',
    user: 'Agent Maya Patel',
    role: 'Lead Cybercrime Investigator',
    badge: 'FRX-412',
    deviceInfo: 'Investigation Station IV-02',
    ipAddress: '10.240.14.19',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Correlated offshore account numbers with FinCEN repository records.'
  },
  {
    id: 'COC-1007',
    evidenceId: 'EV-2026-001284',
    evidenceName: 'suspect_document.pdf',
    caseId: 'FRX-2026-001',
    action: 'Evidence Archived & Sealed',
    timestamp: '2026-09-10 17:00:00 UTC',
    user: 'Agent Robert Miller',
    role: 'Senior Forensic Director',
    badge: 'FRX-901',
    deviceInfo: 'Long-term Evidence Custody Safe System',
    ipAddress: '10.240.12.84',
    hashSnapshot: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    status: 'Verified',
    notes: 'Sealed with tamper-evident digital signature #SIG-2026-8819 for grand jury submission.'
  }
];

// Crime Intelligence Network Graph Data
export const CRIME_INTEL_GRAPH = {
  nodes: [
    // People
    { id: 'p-1', label: 'Vikram Sharma', type: 'PERSON', category: 'People', riskScore: 94, cases: ['FRX-2026-001', 'FRX-2026-002'], details: 'Primary suspect in SCADA intrusion and beneficiary of offshore shell accounts.' },
    { id: 'p-2', label: 'John Doe (Alex Vance)', type: 'PERSON', category: 'People', riskScore: 89, cases: ['FRX-2026-002', 'FRX-2026-004'], details: 'International financial broker coordinating cryptocurrency mixer payouts.' },
    { id: 'p-3', label: 'Elena Rostova', type: 'PERSON', category: 'People', riskScore: 96, cases: ['FRX-2026-003'], details: 'Suspected state-sponsored APT operative spotted in Prague exfiltration surveillance.' },
    { id: 'p-4', label: 'Dr. Arthur Pendelton', type: 'PERSON', category: 'People', riskScore: 71, cases: ['FRX-2026-004'], details: 'Former semiconductor researcher stopped at airport with unauthorized trade secrets.' },

    // Cases
    { id: 'c-1', label: 'FRX-2026-001 (Op Blackout)', type: 'CASE', category: 'Cases', priority: 'Critical', details: 'Critical grid infrastructure cyberattack.' },
    { id: 'c-2', label: 'FRX-2026-002 (Digital Fraud)', type: 'CASE', category: 'Cases', priority: 'High', details: 'Cryptocurrency laundering & fake invoice syndicate.' },
    { id: 'c-3', label: 'FRX-2026-003 (Cyber Intrusion)', type: 'CASE', category: 'Cases', priority: 'Critical', details: 'Defense contractor aerospace blueprint exfiltration.' },
    { id: 'c-4', label: 'FRX-2026-004 (Insider Threat)', type: 'CASE', category: 'Cases', priority: 'Medium', details: 'Lithography patent IP theft.' },

    // Evidence
    { id: 'e-1', label: 'suspect_document.pdf', type: 'EVIDENCE', category: 'Evidence', hash: '9f86d081...', details: 'Escrow contract detailing $4.2M wire transfer.' },
    { id: 'e-2', label: 'device_image.dd', type: 'EVIDENCE', category: 'Evidence', hash: '4a5e1e4b...', details: 'Samsung Galaxy physical dump containing Signal chats.' },
    { id: 'e-3', label: 'transaction_log.txt', type: 'EVIDENCE', category: 'Evidence', hash: 'e3b0c442...', details: '418 cryptocurrency mixer ledger transactions.' },
    { id: 'e-4', label: 'surveillance_photo.jpg', type: 'EVIDENCE', category: 'Evidence', hash: 'c8996fb9...', details: 'PTZ surveillance capture outside defense plant.' },
    { id: 'e-5', label: 'email_archive.eml', type: 'EVIDENCE', category: 'Evidence', hash: '7d659a2f...', details: 'ProtonMail decrypted communication threads.' },

    // Locations
    { id: 'l-1', label: 'Kanpur Safehouse Sector 4', type: 'LOCATION', category: 'Locations', details: 'Staging ground for field laptop & hardware write-blocker recovery.' },
    { id: 'l-2', label: 'Zurich Financial District', type: 'LOCATION', category: 'Locations', details: 'Nexus for international escrow and banking shell accounts.' },
    { id: 'l-3', label: 'Prague Diplomatic Enclave', type: 'LOCATION', category: 'Locations', details: 'Physical surveillance site of courier data transfer.' },

    // Organizations
    { id: 'o-1', label: 'CipherCorp Global Logistics', type: 'ORGANIZATION', category: 'Organizations', details: 'Front company used to mask illicit financial wire transfers.' },
    { id: 'o-2', label: 'Apex Global Assets Ltd', type: 'ORGANIZATION', category: 'Organizations', details: 'Offshore asset holding entity registered in Seychelles.' },
    { id: 'o-3', label: 'AeroDynamics Defense Labs', type: 'ORGANIZATION', category: 'Organizations', details: 'Victim defense engineering firm.' },

    // Keywords / Accounts
    { id: 'k-1', label: '0x71C...4e8 (USDT Wallet)', type: 'ACCOUNT', category: 'Accounts', details: 'Cold storage cryptocurrency wallet receiving ransom payments.' },
    { id: 'k-2', label: 'SCADA Override Key', type: 'KEYWORD', category: 'Keywords', details: 'Industrial control credential string appearing in 3 separate evidence items.' }
  ],
  links: [
    { source: 'p-1', target: 'c-1', label: 'Primary Suspect In', weight: 3 },
    { source: 'p-1', target: 'c-2', label: 'Mentioned In Ledgers Of', weight: 2 },
    { source: 'p-1', target: 'e-1', label: 'Signed Authorizer Of', weight: 3 },
    { source: 'p-1', target: 'e-2', label: 'Owner Of Mobile Device', weight: 3 },
    { source: 'p-1', target: 'o-1', label: 'Managing Director Of', weight: 3 },
    { source: 'p-1', target: 'l-1', label: 'Located At Pings In', weight: 2 },
    { source: 'p-1', target: 'k-1', label: 'Control Key Associated With', weight: 3 },

    { source: 'p-2', target: 'c-2', label: 'Target Of Investigation', weight: 3 },
    { source: 'p-2', target: 'e-3', label: 'Transaction Initiator In', weight: 2 },
    { source: 'p-2', target: 'e-5', label: 'Recipient Of Proton Mail', weight: 3 },
    { source: 'p-2', target: 'o-2', label: 'Nominee Beneficiary Of', weight: 3 },
    { source: 'p-2', target: 'l-2', label: 'Bank Account Branch In', weight: 2 },
    { source: 'p-2', target: 'k-1', label: 'Mixer Outflow Transferred To', weight: 2 },

    { source: 'p-3', target: 'c-3', label: 'APT Operator Behind', weight: 3 },
    { source: 'p-3', target: 'e-4', label: 'Identified In Photo Frame', weight: 3 },
    { source: 'p-3', target: 'l-3', label: 'Physical Hand-off Observed In', weight: 3 },
    { source: 'p-3', target: 'o-3', label: 'Targeted Perimeter Of', weight: 3 },

    { source: 'p-4', target: 'c-4', label: 'Former Senior Scientist At', weight: 3 },
    { source: 'p-4', target: 'o-3', label: 'Ex-Employee Of', weight: 2 },

    { source: 'e-1', target: 'c-1', label: 'Admitted Evidence For', weight: 2 },
    { source: 'e-2', target: 'c-1', label: 'Admitted Evidence For', weight: 2 },
    { source: 'e-3', target: 'c-2', label: 'Admitted Evidence For', weight: 2 },
    { source: 'e-4', target: 'c-3', label: 'Admitted Evidence For', weight: 2 },
    { source: 'e-5', target: 'c-2', label: 'Admitted Evidence For', weight: 2 },

    { source: 'e-1', target: 'k-2', label: 'Contains Hardcoded Value Of', weight: 3 },
    { source: 'c-1', target: 'k-2', label: 'Compromised Via', weight: 2 },
    { source: 'o-1', target: 'l-1', label: 'Registered Address At', weight: 2 },
    { source: 'o-2', target: 'l-2', label: 'Banking Office Located In', weight: 2 }
  ]
};

// Immutable Forensic Audit Logs
export const INITIAL_AUDIT_LOGS = [
  {
    id: 'AUD-8910',
    timestamp: '2026-09-15 09:28:14 UTC',
    user: 'Agent Robert Miller',
    role: 'ADMIN',
    action: 'LOGIN',
    resource: 'System Session / Auth Gateway',
    caseId: 'SYSTEM',
    ipAddress: '10.240.12.84',
    result: 'SUCCESS',
    details: 'Hardware FIDO2 Security Key multi-factor verification confirmed.'
  },
  {
    id: 'AUD-8909',
    timestamp: '2026-09-15 09:14:02 UTC',
    user: 'Agent Maya Patel',
    role: 'INVESTIGATOR',
    action: 'ANALYZE',
    resource: 'EV-2026-001284 (suspect_document.pdf)',
    caseId: 'FRX-2026-001',
    ipAddress: '10.240.14.19',
    result: 'SUCCESS',
    details: 'Triggered Gemini-3.8-Flash AI entity re-indexing; 5 new entities cataloged.'
  },
  {
    id: 'AUD-8908',
    timestamp: '2026-09-15 08:52:19 UTC',
    user: 'Dr. Sarah Chen',
    role: 'INVESTIGATOR',
    action: 'VIEW',
    resource: 'EV-2026-001289 (network_capture.pcap)',
    caseId: 'FRX-2026-003',
    ipAddress: '10.240.18.52',
    result: 'SUCCESS',
    details: 'Exported Zeek protocol dissection summary for grand jury packet.'
  },
  {
    id: 'AUD-8907',
    timestamp: '2026-09-15 08:31:00 UTC',
    user: 'Auditor James Wilson',
    role: 'VIEWER',
    action: 'VIEW',
    resource: 'FRX-2026-001 (Operation Blackout)',
    caseId: 'FRX-2026-001',
    ipAddress: '192.168.100.41',
    result: 'SUCCESS',
    details: 'Oversight inspection of evidentiary integrity log.'
  },
  {
    id: 'AUD-8906',
    timestamp: '2026-09-15 07:11:44 UTC',
    user: 'Auditor James Wilson',
    role: 'VIEWER',
    action: 'DELETE',
    resource: 'EV-2026-001284 (suspect_document.pdf)',
    caseId: 'FRX-2026-001',
    ipAddress: '192.168.100.41',
    result: 'DENIED',
    details: 'Action blocked by RBAC policy: VIEWER role lacks destructive permissions.'
  },
  {
    id: 'AUD-8905',
    timestamp: '2026-09-14 22:45:10 UTC',
    user: 'Agent Maya Patel',
    role: 'INVESTIGATOR',
    action: 'UPLOAD',
    resource: 'EV-2026-001292 (wiretap_intercept_session4.mp3)',
    caseId: 'FRX-2026-001',
    ipAddress: '10.240.14.19',
    result: 'SUCCESS',
    details: 'SHA-256 computed on ingest: 884c7d65... Verified against Title III carrier manifest.'
  },
  {
    id: 'AUD-8904',
    timestamp: '2026-09-14 18:02:55 UTC',
    user: 'Agent Robert Miller',
    role: 'ADMIN',
    action: 'EXPORT',
    resource: 'Case Investigation Report (FRX-2026-001)',
    caseId: 'FRX-2026-001',
    ipAddress: '10.240.12.84',
    result: 'SUCCESS',
    details: 'Encrypted PDF evidentiary dossier generated for US Attorney Office.'
  },
  {
    id: 'AUD-8903',
    timestamp: '2026-09-14 15:20:11 UTC',
    user: 'External Gateway Probe (Suspicious IP 198.51.100.22)',
    role: 'UNAUTHENTICATED',
    action: 'LOGIN',
    resource: 'Forensic Vault SSH API Endpoint',
    caseId: 'SYSTEM',
    ipAddress: '198.51.100.22',
    result: 'FLAGGED',
    details: 'Automated IP drop rule triggered: 5 failed credential attempts from unauthorized subnet.'
  }
];

// Pre-defined Forensic Reports
export const INITIAL_REPORTS = [
  {
    id: 'REP-2026-01',
    title: 'Case Investigation Report',
    type: 'Comprehensive Investigation Dossier',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    lastGenerated: '2026-09-14 18:02 UTC',
    generatedBy: 'Agent Robert Miller',
    classification: 'LAW ENFORCEMENT SENSITIVE // COURT ADMISSIBLE',
    summary: 'Exhaustive 42-page technical dossier combining memory forensics, recovered mobile communications, and cryptographic asset tracing establishing criminal conspiracy to compromise electrical grid infrastructure.',
    evidenceItemsIncluded: 14,
    tamperFreeStatus: true
  },
  {
    id: 'REP-2026-02',
    title: 'Evidence Integrity & Hash Verification Report',
    type: 'Cryptographic Audit Certificate',
    caseId: 'ALL CASES',
    caseName: 'System-Wide Forensic Ingest Audit',
    lastGenerated: '2026-09-15 00:00 UTC',
    generatedBy: 'System Automated Forensic Engine',
    classification: 'OFFICIAL USE ONLY',
    summary: 'Cryptographic validation certificate attesting that 1,284 ingested digital artifacts exhibit zero bitrot or checksum deviations. All SHA-256 signatures match intake ledger entries.',
    evidenceItemsIncluded: 1284,
    tamperFreeStatus: true
  },
  {
    id: 'REP-2026-03',
    title: 'Chain of Custody Legal Certifications',
    type: 'ISO/IEC 27037 Attestation Record',
    caseId: 'FRX-2026-001',
    caseName: 'Operation Blackout',
    lastGenerated: '2026-09-12 11:30 UTC',
    generatedBy: 'Agent Maya Patel',
    classification: 'DEFENSIBLE COURT RECORD',
    summary: 'Chronological timeline of all 7 custodial transfers for physical and digital artifacts in Operation Blackout, accompanied by digital signatures and hardware write-blocker serial numbers.',
    evidenceItemsIncluded: 14,
    tamperFreeStatus: true
  },
  {
    id: 'REP-2026-04',
    title: 'AI Analysis & Entity Correlation Findings',
    type: 'AI Forensic Intelligence Report',
    caseId: 'FRX-2026-002',
    caseName: 'Digital Fraud & Asset Laundering Investigation',
    lastGenerated: '2026-09-13 14:15 UTC',
    generatedBy: 'Dr. Sarah Chen',
    classification: 'CONFIDENTIAL FORENSIC DISCOVERY',
    summary: 'Deep NLP parsing across 1,420 email records and 418 blockchain transactions uncovering shell company layers across 3 international jurisdictions.',
    evidenceItemsIncluded: 22,
    tamperFreeStatus: true
  },
  {
    id: 'REP-2026-05',
    title: 'Crime Intelligence Network Association Map',
    type: 'Cross-Case Linkage Matrix',
    caseId: 'MULTI-CASE NEXUS',
    caseName: 'Inter-Agency Syndicate Analysis',
    lastGenerated: '2026-09-11 09:40 UTC',
    generatedBy: 'Agent Maya Patel',
    classification: 'TOP SECRET // LAW ENFORCEMENT ONLY',
    summary: 'Graph linkage analysis confirming that suspect Vikram Sharma in Operation Blackout shared escrow wallets with subjects in Digital Fraud Investigation FRX-2026-002.',
    evidenceItemsIncluded: 36,
    tamperFreeStatus: true
  },
  {
    id: 'REP-2026-06',
    title: 'System Access & Security Audit Trail',
    type: 'Immutable Compliance Audit',
    caseId: 'SYSTEM SECURITY',
    caseName: 'Platform Security Verification',
    lastGenerated: '2026-09-15 06:00 UTC',
    generatedBy: 'Agent Robert Miller',
    classification: 'RESTRICTED COMPLIANCE AUDIT',
    summary: '30-day immutable activity log validating zero unauthorized access grants, 100% RBAC policy enforcement, and automatic mitigation of hostile probe attempts.',
    evidenceItemsIncluded: 0,
    tamperFreeStatus: true
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'ALERT', // ALERT | SUCCESS | INFO | WARNING
    title: 'Critical Security Alert: Tamper Check Anomaly Flagged',
    message: 'Burner phone backup EV-2026-001291 exhibits FAT32 directory timestamp divergence. Physical re-acquisition mandatory.',
    timestamp: '12 minutes ago',
    caseId: 'FRX-2026-004',
    isCritical: true,
    isRead: false
  },
  {
    id: 'notif-2',
    type: 'SUCCESS',
    title: 'AI Forensic Analysis Completed',
    message: 'Gemini-3.8-Flash finished entity extraction on suspect_document.pdf. 5 key entities and 1 offshore escrow account indexed.',
    timestamp: '42 minutes ago',
    caseId: 'FRX-2026-001',
    isCritical: false,
    isRead: false
  },
  {
    id: 'notif-3',
    type: 'INFO',
    title: 'New Chain of Custody Event Logged',
    message: 'Wiretap intercept audio EV-2026-001292 sealed under digital legal warrant #SIG-2026-8819 by Agent Maya Patel.',
    timestamp: '2 hours ago',
    caseId: 'FRX-2026-001',
    isCritical: false,
    isRead: true
  },
  {
    id: 'notif-4',
    type: 'WARNING',
    title: 'Unauthorized Export Attempt Blocked',
    message: 'User Auditor James Wilson (VIEWER role) attempted restricted evidence download on EV-2026-001284. Blocked by policy.',
    timestamp: '4 hours ago',
    caseId: 'FRX-2026-001',
    isCritical: true,
    isRead: true
  },
  {
    id: 'notif-5',
    type: 'INFO',
    title: 'Crime Intelligence Link Discovered',
    message: 'Cross-case correlation detected: Suspect Vikram Sharma directly connected to escrow wallet 0x71C...4e8 in Case FRX-2026-002.',
    timestamp: 'Yesterday at 17:30 UTC',
    caseId: 'FRX-2026-002',
    isCritical: false,
    isRead: true
  }
];
