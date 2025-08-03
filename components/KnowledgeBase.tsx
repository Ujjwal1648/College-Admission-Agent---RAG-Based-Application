import React from 'react';
import { Book, FileText, Calendar, DollarSign, Users, MapPin } from 'lucide-react';

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: 'requirements' | 'deadlines' | 'fees' | 'programs' | 'campus' | 'support';
  tags: string[];
  lastUpdated: Date;
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: '1',
    title: 'Undergraduate Admission Requirements',
    content: `Complete admission requirements for undergraduate programs:

**Academic Requirements:**
- High school diploma or equivalent
- Minimum cumulative GPA of 3.0 (4.0 scale)
- Core curriculum completion (4 years English, 3 years Math, 3 years Science, 2 years Social Studies)

**Standardized Tests:**
- SAT: Minimum 1200 (recommended 1350+)
- ACT: Minimum 26 (recommended 30+)
- International students: TOEFL 80+ or IELTS 6.5+

**Application Materials:**
- Completed application form
- Official transcripts
- Two letters of recommendation (one academic, one personal)
- Personal statement (500-750 words)
- Resume/Activity list
- Application fee: $75

**Additional Requirements (Program-Specific):**
- Engineering: Advanced Math and Science courses
- Business: Economics or Statistics preferred
- Arts: Portfolio submission required
- Pre-Med: Biology, Chemistry, Physics, and Math courses`,
    category: 'requirements',
    tags: ['undergraduate', 'admission', 'GPA', 'SAT', 'ACT', 'requirements'],
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Graduate Admission Requirements',
    content: `Graduate program admission requirements:

**General Requirements:**
- Bachelor's degree from accredited institution
- Minimum undergraduate GPA of 3.2
- GRE/GMAT scores (varies by program)
- Statement of Purpose
- Three academic/professional references
- Resume/CV

**Program-Specific Requirements:**
- MBA: 2+ years work experience, GMAT 550+
- Engineering: Relevant undergraduate degree, GRE required
- Computer Science: Programming background, technical portfolio
- Education: Teaching license (for some programs)
- Law: LSAT required, bachelor's degree in any field
- Medicine: MCAT, prerequisite courses, clinical experience

**International Students:**
- TOEFL 100+ or IELTS 7.0+
- Credential evaluation required
- Financial documentation
- Visa support provided upon admission`,
    category: 'requirements',
    tags: ['graduate', 'admission', 'GRE', 'GMAT', 'international'],
    lastUpdated: new Date('2024-01-15')
  },
  {
    id: '3',
    title: 'Application Deadlines 2024-2025',
    content: `Important dates for the 2024-2025 academic year:

**Undergraduate Deadlines:**
- Early Decision I: November 15, 2024
- Early Decision II: January 15, 2025
- Regular Decision: February 1, 2025
- Transfer Applications: March 15, 2025
- Late Applications: May 1, 2025 (space permitting)

**Graduate Deadlines:**
- Fall Semester: February 1, 2025
- Spring Semester: October 15, 2024
- Summer Semester: March 1, 2025

**International Student Deadlines:**
- Fall Semester: January 15, 2025
- Spring Semester: September 15, 2024

**Financial Aid Deadlines:**
- FAFSA: March 1, 2025
- CSS Profile: February 15, 2025
- Scholarship Applications: January 31, 2025

**Important Reminders:**
- Submit all materials by 11:59 PM EST on deadline date
- Late applications accepted based on space availability
- Priority given to complete applications submitted by deadline`,
    category: 'deadlines',
    tags: ['deadlines', 'application', 'FAFSA', 'international', 'transfer'],
    lastUpdated: new Date('2024-01-10')
  },
  {
    id: '4',
    title: 'Tuition and Fees Structure',
    content: `Comprehensive cost breakdown for 2024-2025:

**Undergraduate Costs (per year):**
- Tuition: $45,000
- Technology Fee: $500
- Student Activity Fee: $300
- Health Services Fee: $400
- Total Academic Costs: $46,200

**Room and Board:**
- Standard Double Room: $8,500
- Premium Single Room: $12,000
- Meal Plan (19 meals/week): $4,500
- Meal Plan (14 meals/week): $3,800

**Graduate Costs (per year):**
- Master's Programs: $52,000
- Doctoral Programs: $55,000
- MBA Program: $65,000
- Law School: $58,000
- Medical School: $62,000

**Additional Expenses:**
- Books and Supplies: $1,200
- Personal Expenses: $2,000
- Transportation: $1,500
- Total Estimated Cost: $55,000-60,000

**Payment Options:**
- Full payment discount: 2%
- Monthly payment plan available
- Merit scholarships: $5,000-$25,000
- Need-based aid: Up to full tuition`,
    category: 'fees',
    tags: ['tuition', 'fees', 'costs', 'scholarships', 'financial aid'],
    lastUpdated: new Date('2024-01-12')
  },
  {
    id: '5',
    title: 'Academic Programs and Schools',
    content: `Comprehensive list of academic offerings:

**School of Engineering:**
- Computer Science (BS, MS, PhD)
- Electrical Engineering (BS, MS, PhD)
- Mechanical Engineering (BS, MS, PhD)
- Civil Engineering (BS, MS, PhD)
- Biomedical Engineering (BS, MS, PhD)
- Environmental Engineering (BS, MS)
- Data Science (BS, MS)

**School of Business:**
- Business Administration (BBA, MBA, Executive MBA)
- Accounting (BS, MS)
- Finance (BS, MS)
- Marketing (BS, MS)
- International Business (BS, MS)
- Entrepreneurship (BS, Certificate)

**School of Liberal Arts:**
- English Literature (BA, MA, PhD)
- History (BA, MA, PhD)
- Psychology (BA, MA, PhD)
- Sociology (BA, MA)
- Philosophy (BA, MA)
- Foreign Languages (BA, MA)

**School of Sciences:**
- Biology (BS, MS, PhD)
- Chemistry (BS, MS, PhD)
- Physics (BS, MS, PhD)
- Mathematics (BS, MS, PhD)
- Environmental Science (BS, MS)

**Professional Schools:**
- School of Medicine (MD, PhD)
- School of Law (JD, LLM)
- School of Education (MEd, EdD)
- School of Nursing (BSN, MSN, DNP)`,
    category: 'programs',
    tags: ['programs', 'majors', 'degrees', 'schools', 'undergraduate', 'graduate'],
    lastUpdated: new Date('2024-01-08')
  },
  {
    id: '6',
    title: 'Campus Life and Support Services',
    content: `Comprehensive support and campus life information:

**Student Support Services:**
- Academic Advising Center
- Career Services and Job Placement
- Counseling and Psychological Services
- Disability Support Services
- International Student Services
- Financial Aid Office
- Student Health Center
- Tutoring and Learning Center

**Campus Facilities:**
- 15 Residence Halls (4,500 bed capacity)
- 3 Dining Centers + 12 Cafés
- State-of-the-art Library System
- Recreation and Fitness Centers
- Student Union Building
- Performing Arts Center
- Research Laboratories
- Innovation and Entrepreneurship Hub

**Student Organizations:**
- 200+ Student Clubs and Organizations
- 25 Greek Life Organizations
- Student Government Association
- Honor Societies and Academic Clubs
- Cultural and International Organizations
- Sports and Recreation Clubs
- Volunteer and Service Organizations

**Campus Safety:**
- 24/7 Campus Security
- Emergency Alert System
- Safe Walk Program
- Well-lit Campus Pathways
- Security Cameras Throughout Campus

**Technology Resources:**
- Campus-wide WiFi
- Computer Labs and Study Spaces
- Online Learning Management System
- Digital Library Resources
- Tech Support Services`,
    category: 'campus',
    tags: ['campus life', 'support services', 'facilities', 'organizations'],
    lastUpdated: new Date('2024-01-05')
  }
];

export const getCategoryIcon = (category: KnowledgeItem['category']) => {
  switch (category) {
    case 'requirements': return FileText;
    case 'deadlines': return Calendar;
    case 'fees': return DollarSign;
    case 'programs': return Book;
    case 'campus': return MapPin;
    case 'support': return Users;
    default: return FileText;
  }
};

export const searchKnowledgeBase = (query: string): KnowledgeItem[] => {
  const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
  
  return KNOWLEDGE_BASE.filter(item => {
    const searchableText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
    return searchTerms.some(term => searchableText.includes(term));
  }).sort((a, b) => {
    // Prioritize items with more matching terms in title
    const aMatches = searchTerms.filter(term => a.title.toLowerCase().includes(term)).length;
    const bMatches = searchTerms.filter(term => b.title.toLowerCase().includes(term)).length;
    return bMatches - aMatches;
  });
};