
export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  companyDescription?: string;
  jobDescription?: string;
}

export const GLOBAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    firstName: 'Sarah',
    lastName: 'Chen',
    jobTitle: 'VP of Engineering',
    email: 'sarah.chen@techflow.io',
    phone: '+1 (555) 123-4567',
    companyName: 'TechFlow',
    industry: 'Software',
    companySize: '51-200 employees',
    location: 'San Francisco, CA',
    companyDescription: 'TechFlow is a leading cloud infrastructure optimization platform.',
    jobDescription: 'Leading engineering strategy and infrastructure teams.'
  },
  {
    id: 'lead-2',
    firstName: 'Marcus',
    lastName: 'Rodriguez',
    jobTitle: 'Head of Sales',
    email: 'm.rodriguez@fintech-solutions.com',
    phone: '+1 (555) 987-6543',
    companyName: 'FinTech Solutions',
    industry: 'Financial Services',
    companySize: '501-1000 employees',
    location: 'New York, NY',
    companyDescription: 'FinTech Solutions provides enterprise-grade payment processing.',
    jobDescription: 'Driving revenue growth and managing enterprise sales teams.'
  },
  {
    id: 'lead-3',
    firstName: 'Elena',
    lastName: 'Ivanov',
    jobTitle: 'Marketing Director',
    email: 'elena@green-energy.co',
    phone: '+44 20 7946 0123',
    companyName: 'Green Energy Co',
    industry: 'Renewables',
    companySize: '11-50 employees',
    location: 'London, UK',
    companyDescription: 'Innovating in the sustainable energy storage sector.',
    jobDescription: 'Global marketing strategy and brand positioning.'
  },
  {
    id: 'lead-4',
    firstName: 'David',
    lastName: 'Kim',
    jobTitle: 'CTO',
    email: 'david.kim@ai-insights.ai',
    phone: '+1 (555) 444-3322',
    companyName: 'AI Insights',
    industry: 'Artificial Intelligence',
    companySize: '201-500 employees',
    location: 'Austin, TX',
    companyDescription: 'Enterprise AI analytics platform for data-driven decisions.',
    jobDescription: 'Overseeing technology stack and R&D for AI products.'
  },
  {
    id: 'lead-5',
    firstName: 'Jessica',
    lastName: 'Walsh',
    jobTitle: 'HR Manager',
    email: 'j.walsh@retailpulse.com',
    phone: '+61 2 9876 5432',
    companyName: 'RetailPulse',
    industry: 'Retail',
    companySize: '1001-5000 employees',
    location: 'Sydney, Australia',
    companyDescription: 'Global retail chain specializing in lifestyle products.',
    jobDescription: 'Managing talent acquisition and employee relations.'
  },
  {
    id: 'lead-6',
    firstName: 'Robert',
    lastName: 'Smith',
    jobTitle: 'Project Manager',
    email: 'robert@builders-hub.com',
    phone: '+1 (555) 111-2222',
    companyName: 'Builders Hub',
    industry: 'Construction',
    companySize: '51-200 employees',
    location: 'Chicago, IL',
    companyDescription: 'Modern project management software for construction sites.',
    jobDescription: 'Leading digital transformation projects in construction.'
  }
];

export const INITIAL_USER_STATE = {
  credits: 50,
  unlockedLeads: [] as string[],
  savedLists: [
    { id: 'list-1', name: 'Hot Leads Q4', leadIds: [] as string[] }
  ]
};
