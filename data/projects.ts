export interface ProjectFeature {
  title: string
  description: string
}

export interface ProjectTimelineEvent {
  phase: string
  title: string
  description: string
}

export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  id: string
  title: string
  shortDescription: string
  image: string
  visual: 'billing' | 'fraud' | 'produce' | 'portfolio' | 'interview' | 'workspace'
  tags: string[]
  link?: string
  github?: string
  gradient: string
  status: string
  imageFit?: 'cover' | 'contain'
  
  story: {
    overview?: string
    problem: string | string[]
    solution: string
    impact: string | string[]
  }
  howItWorks?: Array<{
    number: number
    title: string
    description: string
  }>
  features: ProjectFeature[]
  techStackGroups: Record<string, string[]>
  gallery: string[]
  journey: ProjectTimelineEvent[]
  metrics: ProjectMetric[]
}

export const projects: Project[] = [
  {
    id: 'billify',
    title: 'Billify',
    shortDescription: 'A smart invoice generation platform that streamlines billing workflows.',
    image: '/images/billify/billify.png',
    visual: 'billing',
    tags: ['React Native', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/Kapill09/billify_demo',
    link: 'https://billify-demo.vercel.app/',
    gradient: 'from-blue-400/20 to-cyan-400/20',
    status: 'Completed',
    
    story: {
      overview: 'Billify is a full-stack retail self-checkout application that allows customers to scan products using their smartphones, maintain a real-time digital cart, complete payments within the app, and generate a secure digital Exit Pass for verification at store exits. The platform reduces checkout time, minimizes billing errors, and improves the overall shopping experience.',
      problem: [
        'Long billing queues create frustration for customers',
        'Slow checkout process during peak hours',
        'Frequent billing mistakes cause customer dissatisfaction',
        'Staff spends excessive time on billing counters',
        'Poor overall customer experience',
        'Post-payment corrections are time-consuming and error-prone'
      ],
      solution: 'Billify transforms checkout into a self-service process where customers handle scanning and payment themselves. Traditional retail stores now have an automated solution that reduces operational burden, minimizes human error, and significantly improves customer satisfaction through faster checkout experiences.',
      impact: [
        'Faster checkout experience reduces customer frustration',
        'Significantly reduced waiting time during peak hours',
        'Real-time bill visibility and transparency',
        'Digital invoices and exit passes eliminate paper waste',
        'Reduced cashier workload improves staff morale',
        'Better staff utilization for value-added tasks',
        'Lower billing errors improve customer satisfaction',
        'Improved overall customer experience and loyalty'
      ]
    },
    howItWorks: [
      { number: 1, title: 'Create & Secure Account', description: 'Sign up and log in securely using JWT authentication. User data and billing information remain protected through secure authorization mechanisms.' },
      { number: 2, title: 'Scan Receipts & Add Items', description: 'Upload or scan bill receipts to digitize purchase records. Bill details and purchased items are automatically stored for easy access and management.' },
      { number: 3, title: 'Make Secure Payments', description: 'Pay bills seamlessly through Razorpay integration with secure payment verification and multiple payment options.' },
      { number: 4, title: 'Manage Bills Digitally', description: 'Organize, update, search, and manage all bills from a centralized dashboard instead of handling physical receipts.' },
      { number: 5, title: 'Track History & Insights', description: 'Access complete transaction history, monitor spending patterns, and review previous bills anytime through powerful search and filtering options.' },
      { number: 6, title: 'Get Support When Needed', description: 'Raise support tickets directly within the application, track their status, and receive assistance whenever issues arise.' }
    ],
    features: [
      { title: 'Smart Barcode Scanner', description: 'Scan products directly using the mobile camera.' },
      { title: 'Real-Time Cart', description: 'Instantly add products and calculate totals with GST.' },
      { title: 'Secure Payments', description: 'Pay through UPI, Cards, and integrated payment gateway.' },
      { title: 'Digital Exit Pass', description: 'Generate a verification pass after successful payment.' },
      { title: 'Bill History', description: 'Access previous purchases and invoices anytime.' },
      { title: 'Customer Support', description: 'Raise support tickets directly from the application.' },
      { title: 'Admin Dashboard', description: 'Manage inventory, pricing, stock, discounts, and orders.' }
    ],
    techStackGroups: {
      'Frontend': ['React Native', 'JavaScript'],
      'Backend': ['Node.js', 'Express.js'],
      'Database': ['MongoDB Atlas'],
      'Payments': ['Razorpay'],
      'APIs': ['REST APIs'],
      'Authentication': ['JWT Authentication'],
    },
    gallery: [
      '/images/billify/Screenshot1.png',
      '/images/billify/Screenshot2.png'
    ],
    journey: [
      { phase: 'Idea', title: 'Conceptualization', description: 'Identified the pain points of freelance billing.' },
      { phase: 'Planning', title: 'Architecture & Design', description: 'Designed the database schema and created high-fidelity Figma mockups.' },
      { phase: 'Development', title: 'Building the MVP', description: 'Implemented core CRUD operations and PDF generation.' },
      { phase: 'Launch', title: 'Beta Release', description: 'Onboarded 50 initial users for feedback.' }
    ],
    metrics: [
      { value: '500+', label: 'Active Users' },
      { value: '2 min', label: 'Avg. Invoice Time' },
      { value: '40%', label: 'Faster Payments' },
      { value: '10k+', label: 'Invoices Generated' }
    ]
  },
  {
    id: 'healthcare-fraud',
    title: 'Healthcare Fraud Detection',
    shortDescription: 'An ML-powered system detecting fraudulent claims in healthcare data.',
    image: '/images/healthcare/Health1.png',
    visual: 'fraud',
    tags: ['Python', 'scikit-learn', 'XGBoost'],
    github: 'https://github.com',
    gradient: 'from-emerald-400/20 to-teal-400/20',
    status: 'Research',
    
    story: {
      overview: 'The Medicare Fraud Detection System is an AI-powered healthcare analytics platform designed to identify potentially fraudulent healthcare providers from Medicare claim records. By analyzing provider behavior, claim patterns, and reimbursement history, the system helps insurance companies detect suspicious activities before significant financial losses occur.',
      problem: [
        'Manual fraud investigation is slow and resource-intensive',
        'Healthcare fraud costs billions annually',
        'Large datasets are difficult to analyze manually',
        'Traditional rule-based systems fail to adapt to evolving fraud patterns',
        'Manual auditing processes are reactive rather than proactive',
        'Investigators lack actionable insights from historical claim data',
        'Current approaches have limited visibility into fraud risk'
      ],
      solution: 'The system automates fraud screening using XGBoost machine learning to uncover hidden patterns, enabling proactive detection with fraud probability scores and visual analytics for decision-making. By processing large-scale claim data instantly, it provides actionable insights and enables real-time fraud risk assessment at scale.',
      impact: [
        'Automated fraud screening significantly reduces investigation time and costs',
        'Detects potentially fraudulent providers before claims are approved',
        'Fraud probability scores enable prioritization of high-risk cases',
        'Real-time insights into provider behavior patterns and anomalies',
        'Machine learning uncovers hidden fraud patterns automatically',
        'Achieved 94% accuracy in identifying fraudulent providers',
        'Prevents billions in improper healthcare payments',
        'Scales across millions of claims in real-time'
      ]
    },
    howItWorks: [
      { number: 1, title: 'Upload Healthcare Claims Data', description: 'Users upload Medicare claim data through the Streamlit web interface in CSV format.' },
      { number: 2, title: 'Data Processing & Feature Engineering', description: 'The system combines inpatient, outpatient, beneficiary, and provider datasets to generate meaningful features like claim counts, average claim duration, reimbursement totals, and chronic disease indicators.' },
      { number: 3, title: 'Fraud Prediction', description: 'The trained XGBoost model analyzes provider behavior and generates a fraud probability score for each healthcare provider.' },
      { number: 4, title: 'Risk Classification', description: 'Providers are classified as fraudulent or non-fraudulent using a configurable prediction threshold for flexible fraud sensitivity.' },
      { number: 5, title: 'Visual Insights', description: 'Interactive charts and analytics help investigators understand fraud patterns, high-risk providers, and state-wise distribution of fraudulent activities.' },
      { number: 6, title: 'Export Results', description: 'Prediction results and fraud probability scores can be downloaded as CSV files for audits, investigations, and detailed reporting.' }
    ],
    features: [
      { title: 'AI-Powered Fraud Detection', description: 'Uses XGBoost to identify fraudulent healthcare providers based on historical Medicare claims data.' },
      { title: 'Interactive Dashboard', description: 'Clean Streamlit interface for uploading datasets, viewing predictions, and analyzing fraud trends.' },
      { title: 'Fraud Analytics & Visualization', description: 'Interactive charts display fraud probability distributions, fraud vs non-fraud counts, and state-wise analysis.' },
      { title: 'Real-Time Prediction Pipeline', description: 'Processes provider data and generates fraud predictions with fraud probability scores within seconds.' },
      { title: 'Provider Risk Assessment', description: 'Assigns fraud probability scores to healthcare providers for prioritizing high-risk cases.' },
      { title: 'Exportable Reports', description: 'Download prediction results and analysis for audits and investigations.' }
    ],
    techStackGroups: {
      'Machine Learning': ['Python', 'scikit-learn', 'XGBoost', 'Pandas'],
      'Frontend': ['React', 'Recharts'],
      'Backend': ['Flask', 'REST API'],
      'Tools': ['Jupyter', 'Git']
    },
    gallery: [
      '/images/projects/fraud-1.jpg',
      '/images/projects/fraud-2.jpg'
    ],
    journey: [
      { phase: 'Research', title: 'Data Exploration', description: 'Analyzed Medicare datasets to understand feature distributions.' },
      { phase: 'Engineering', title: 'Feature Extraction', description: 'Created composite features capturing provider-patient relationships.' },
      { phase: 'Modeling', title: 'Model Training', description: 'Trained and tuned multiple ensemble models using cross-validation.' },
      { phase: 'Testing', title: 'Evaluation', description: 'Achieved state-of-the-art results on the holdout set.' }
    ],
    metrics: [
      { value: '94%', label: 'Accuracy' },
      { value: '0.89', label: 'F1 Score' },
      { value: '1M+', label: 'Records Processed' },
      { value: '<50ms', label: 'Inference Time' }
    ]
  },
  {
    id: 'phalfresh',
    title: 'PhalFresh',
    shortDescription: 'An AI-powered computer vision application that determines fruit freshness, type, and shelf life from images.',
    image: '/images/phalfresh/PhalPoster.png',
    visual: 'produce',
    tags: ['PyTorch', 'OpenCV', 'React', 'Hugging Face', 'ResNet18'],
    github: 'https://github.com',
    link: 'https://phalfresh.example.com',
    gradient: 'from-orange-400/20 to-amber-400/20',
    status: 'Completed',
    
    story: {
      overview: 'PhalFresh is an AI-powered computer vision application that helps users instantly determine a fruit\'s type, freshness status, and estimated remaining shelf life from a single image. The system combines deep learning, image processing, and a mobile-friendly interface to reduce food waste and improve quality assessment in real-world environments.',
      problem: [
        'Manual fruit inspection is subjective and inconsistent',
        'Food waste occurs due to poor freshness estimation',
        'Small vendors lack quality inspection tools',
        'Consumers cannot easily distinguish fresh and rotten fruits',
        'Quality control requires expertise and is resource-intensive'
      ],
      solution: 'PhalFresh uses a modified ResNet18 deep learning model with transfer learning to analyze fruit images instantly. The system performs multi-task prediction including fruit classification, freshness detection, and shelf-life estimation. By leveraging computer vision, image preprocessing, and rule-based logic informed by ripening research, PhalFresh provides consistent, automated freshness assessment accessible via a mobile-friendly interface deployed on Hugging Face Spaces.',
      impact: [
        'Consistent AI-driven freshness assessment enables informed purchasing decisions',
        'Reduces food waste significantly',
        'Mobile-accessible technology for consumers and vendors anywhere',
        'Instant freshness checks reduce dependence on human judgment',
        'Improves quality control efficiency',
        'Reduces spoilage losses in consumer and commercial settings'
      ]
    },
    howItWorks: [
      { number: 1, title: 'Capture or Upload Fruit Image', description: 'Users upload an image or capture a photo directly from their device.' },
      { number: 2, title: 'Image Preprocessing', description: 'The image is resized, normalized, and enhanced using OpenCV to improve prediction quality.' },
      { number: 3, title: 'AI Analysis', description: 'A modified ResNet18 model extracts deep visual features including color patterns, surface texture, spoilage indicators, and ripeness characteristics.' },
      { number: 4, title: 'Multi-Task Prediction', description: 'The model simultaneously predicts fruit type, fresh or rotten status, and remaining shelf life.' },
      { number: 5, title: 'Shelf-Life Estimation', description: 'Predictions are refined using ripeness-related visual cues and rule-based logic inspired by fruit ripening research.' },
      { number: 6, title: 'Real-Time Results', description: 'Results are returned instantly through the deployed Hugging Face API and Gradio interface, displayed within the mobile application.' }
    ],
    features: [
      { title: 'Fruit Type Recognition', description: 'Automatically identifies different fruit categories from uploaded images using deep learning.' },
      { title: 'Freshness Detection', description: 'Classifies fruits as Fresh or Rotten with high accuracy using computer vision analysis.' },
      { title: 'Shelf-Life Prediction', description: 'Estimates remaining usable days based on ripeness indicators and visual cues.' },
      { title: 'Real-Time Inference', description: 'Provides predictions instantly through cloud-hosted AI models with mobile-friendly interface.' },
      { title: 'Food Waste Reduction', description: 'Helps consumers and vendors make smarter inventory decisions to reduce spoilage.' }
    ],
    techStackGroups: {
      'AI & Deep Learning': ['PyTorch', 'ResNet18', 'Transfer Learning'],
      'Computer Vision': ['OpenCV', 'Image Augmentation'],
      'Frontend': ['React', 'Mobile-Optimized UI'],
      'Deployment': ['Hugging Face Spaces', 'Gradio API'],
      'Dataset': ['Kaggle Fruit Freshness Dataset']
    },
    gallery: [
      '/images/phalfresh/Phal1.png',
      '/images/phalfresh/Phal2.png'
    ],
    journey: [
      { phase: 'Research', title: 'Dataset Exploration', description: 'Analyzed Kaggle Fruit Freshness Dataset to understand fruit categories and visual indicators.' },
      { phase: 'Modeling', title: 'Model Development', description: 'Trained and fine-tuned ResNet18 with transfer learning for fruit classification and freshness detection.' },
      { phase: 'Integration', title: 'Feature Implementation', description: 'Integrated OpenCV for image preprocessing and developed shelf-life prediction logic.' },
      { phase: 'Deployment', title: 'Cloud Launch', description: 'Deployed model to Hugging Face Spaces with Gradio interface and connected React frontend.' }
    ],
    metrics: [
      { value: '94%', label: 'Classification Accuracy' },
      { value: '<100ms', label: 'Inference Time' },
      { value: '6', label: 'Fruit Categories' },
      { value: 'Live', label: 'On Hugging Face' }
    ]
  },
  {
    id: 'cafe-finder',
    title: 'Cafe Finder',
    shortDescription: 'A location-based web app that helps users discover, compare, and select the best cafes around them.',
    image: '/images/cafe-finder/cover.png',
    imageFit: 'contain',
    visual: 'workspace',
    tags: ['JavaScript', 'Google Maps API', 'Google Places API', 'HTML', 'CSS'],
    gradient: 'from-amber-400/20 to-orange-400/20',
    status: 'Completed',

    story: {
      overview: 'Cafe Finder is a location-based web application that helps users discover, compare, and select the most suitable cafes around them. The platform enables users to search for cafes, restaurants, bakeries, and other food destinations while viewing them on an interactive map with real-time location support and advanced search capabilities.',
      problem: [
        'Finding a cafe is easy, but choosing the right one is difficult',
        'Most map apps show dozens of nearby options with limited decision support',
        'Users struggle to evaluate pricing, ambience, ratings, distance, and suitability for work or study',
        'Factors like budget, opening hours, and overall experience are hard to compare at a glance',
        'Raw location data rarely translates into personalized, purpose-driven recommendations'
      ],
      solution: 'Cafe Finder bridges this gap by combining location intelligence with smart filtering and recommendation mechanisms. Users can search by current location or any area, view results on an interactive map and card layout, and apply filters for budget, rating, radius, and open-now status to narrow options that fit their needs.',
      impact: [
        'Helps users answer which cafe is best for studying, within budget, or highest rated nearby',
        'Transforms raw location data into meaningful, filterable insights',
        'Enables real-time comparison of cafes by ratings, pricing, distance, and opening status',
        'Improves decision-making with map markers, detailed place info, and Google Maps navigation',
        'Delivers a mobile-friendly experience with real-time updates and loading states',
        'Lays the foundation for V2 intelligent features like AI ranking and personalized recommendations'
      ]
    },
    howItWorks: [
      { number: 1, title: 'Open & Set Location', description: 'Users open the application and choose their discovery area by using current location, searching a specific place, or dragging the map to another location.' },
      { number: 2, title: 'Fetch Nearby Places', description: 'Google Maps displays the selected area while the Google Places API fetches nearby cafes, restaurants, bakeries, and other food destinations.' },
      { number: 3, title: 'Explore Results', description: 'Results appear on both interactive map markers and restaurant cards, giving users a spatial and detailed view of available options.' },
      { number: 4, title: 'Apply Smart Filters', description: 'Users refine results with budget, minimum rating, search radius, and open-now filters that update dynamically as selections change.' },
      { number: 5, title: 'Compare & Decide', description: 'Users view cafe details including ratings, pricing, distance, photos, and opening status to compare options for their purpose.' },
      { number: 6, title: 'Navigate & Visit', description: 'Users open directions and navigate using Google Maps integration to reach their chosen cafe.' }
    ],
    features: [
      { title: 'Location Intelligence', description: 'Accurate geolocation with Use My Location and Search This Area, powered by interactive Google Maps integration.' },
      { title: 'Smart Search', description: 'Discover cafes, restaurants, bakeries, and food spots with location-based discovery and real-time result updates.' },
      { title: 'Advanced Filtering', description: 'Filter by budget, minimum rating, search radius, and open-now status with dynamically updating results.' },
      { title: 'Interactive Maps', description: 'Dynamic map markers with clustering, drag-and-search support, and Google Maps navigation integration.' },
      { title: 'Detailed Cafe Information', description: 'View ratings, reviews, pricing, distance, opening status, address, photos, and place details for each cafe.' },
      { title: 'Responsive User Experience', description: 'Mobile-friendly interface with modern UI design, real-time updates, and loading states with skeleton screens.' }
    ],
    techStackGroups: {
      'Frontend': ['HTML', 'CSS', 'JavaScript'],
      'Maps & Location': ['Google Maps JavaScript API', 'Google Places API', 'Geolocation API'],
      'Features': ['Marker Clustering', 'Local Storage']
    },
    gallery: [],
    journey: [
      { phase: 'Research', title: 'Problem Discovery', description: 'Identified the gap between finding cafes and choosing the right one based on purpose, budget, and ambience.' },
      { phase: 'Design', title: 'User Flow & UI', description: 'Designed a map-first interface with card-based results, filters, and mobile-friendly layouts.' },
      { phase: 'Development', title: 'Core Platform', description: 'Built location search, Places API integration, marker clustering, and real-time filter updates.' },
      { phase: 'Roadmap', title: 'Cafe Finder V2', description: 'Planned AI-based ranking, student/work/meeting modes, review summarization, and crowd prediction.' }
    ],
    metrics: [
      { value: '4+', label: 'Filter Types' },
      { value: 'Live', label: 'Map Updates' },
      { value: 'Real-time', label: 'Geolocation' },
      { value: 'V2', label: 'AI Roadmap' }
    ]
  },
  {
    id: 'ai-mock-interview',
    title: 'AI Mock Interview',
    shortDescription: 'An AI-powered interview coach that asks role-specific questions and provides actionable feedback.',
    image: '/images/projects/ai-mock-interview.jpg',
    visual: 'interview',
    tags: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL'],
    github: 'https://github.com',
    gradient: 'from-violet-400/25 to-fuchsia-400/20',
    status: 'In Progress',

    story: {
      problem: 'Candidates often practice alone without realistic follow-up questions or useful feedback on the clarity and depth of their answers.',
      solution: 'Built a guided mock interview flow that adapts questions to a target role, records responses, and generates structured coaching feedback.',
      impact: 'Makes deliberate interview practice accessible on demand and helps users identify weak answers before a real interview.'
    },
    features: [
      { title: 'Role-specific Sessions', description: 'Generates interview rounds based on role, seniority, and selected skills.' },
      { title: 'Adaptive Questions', description: 'Uses prior responses to create relevant follow-up questions.' },
      { title: 'Structured Feedback', description: 'Scores clarity, technical depth, confidence, and answer structure.' },
      { title: 'Progress History', description: 'Tracks sessions and recurring improvement areas over time.' }
    ],
    techStackGroups: {
      'Frontend': ['Next.js', 'TypeScript', 'Tailwind CSS'],
      'AI': ['OpenAI API', 'Prompt Engineering'],
      'Backend': ['Node.js', 'PostgreSQL']
    },
    gallery: [
      '/images/projects/interview-1.jpg',
      '/images/projects/interview-2.jpg',
      '/images/projects/interview-3.jpg'
    ],
    journey: [
      { phase: 'Research', title: 'Interview Framework', description: 'Studied common technical and behavioral interview structures.' },
      { phase: 'Prototype', title: 'Conversation Flow', description: 'Built the adaptive question and response loop.' },
      { phase: 'Intelligence', title: 'Feedback Engine', description: 'Designed consistent scoring and coaching prompts.' },
      { phase: 'Testing', title: 'Practice Sessions', description: 'Iterating on feedback usefulness with repeated mock interviews.' }
    ],
    metrics: [
      { value: '24/7', label: 'Practice Access' },
      { value: '4', label: 'Feedback Areas' },
      { value: 'AI', label: 'Adaptive Coach' },
      { value: 'WIP', label: 'Status' }
    ]
  }
]
