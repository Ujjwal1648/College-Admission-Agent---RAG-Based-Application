import React from 'react';
import { KNOWLEDGE_BASE, searchKnowledgeBase } from './KnowledgeBase';

interface RAGResponse {
  answer: string;
  sources: string[];
  confidence: number;
}

export class RAGSystem {
  private static instance: RAGSystem;
  
  private constructor() {}
  
  public static getInstance(): RAGSystem {
    if (!RAGSystem.instance) {
      RAGSystem.instance = new RAGSystem();
    }
    return RAGSystem.instance;
  }

  // Simulate IBM Granite AI integration
  public async generateResponse(query: string): Promise<RAGResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Retrieve relevant documents
    const relevantDocs = searchKnowledgeBase(query);
    const topDocs = relevantDocs.slice(0, 3);
    
    if (topDocs.length === 0) {
      return {
        answer: this.getDefaultResponse(query),
        sources: [],
        confidence: 0.3
      };
    }

    // Generate contextual response based on retrieved documents
    const response = this.generateContextualResponse(query, topDocs);
    
    return {
      answer: response,
      sources: topDocs.map(doc => doc.title),
      confidence: Math.min(0.9, 0.5 + (topDocs.length * 0.15))
    };
  }

  private generateContextualResponse(query: string, docs: typeof KNOWLEDGE_BASE): string {
    const queryLower = query.toLowerCase();
    
    // Requirements-related queries
    if (this.containsKeywords(queryLower, ['requirement', 'requirements', 'need', 'eligibility', 'qualify'])) {
      const reqDoc = docs.find(doc => doc.category === 'requirements');
      if (reqDoc) {
        if (this.containsKeywords(queryLower, ['graduate', 'master', 'phd', 'mba'])) {
          return this.extractGraduateRequirements(reqDoc.content);
        } else {
          return this.extractUndergraduateRequirements(reqDoc.content);
        }
      }
    }

    // Deadline-related queries
    if (this.containsKeywords(queryLower, ['deadline', 'due', 'when', 'date', 'apply'])) {
      const deadlineDoc = docs.find(doc => doc.category === 'deadlines');
      if (deadlineDoc) {
        return this.extractDeadlineInfo(deadlineDoc.content, queryLower);
      }
    }

    // Fee-related queries
    if (this.containsKeywords(queryLower, ['fee', 'cost', 'tuition', 'price', 'money', 'financial', 'aid', 'scholarship'])) {
      const feeDoc = docs.find(doc => doc.category === 'fees');
      if (feeDoc) {
        return this.extractFeeInfo(feeDoc.content, queryLower);
      }
    }

    // Program-related queries
    if (this.containsKeywords(queryLower, ['program', 'major', 'course', 'degree', 'study', 'school'])) {
      const programDoc = docs.find(doc => doc.category === 'programs');
      if (programDoc) {
        return this.extractProgramInfo(programDoc.content, queryLower);
      }
    }

    // Campus-related queries
    if (this.containsKeywords(queryLower, ['campus', 'life', 'facility', 'service', 'support', 'housing', 'dorm'])) {
      const campusDoc = docs.find(doc => doc.category === 'campus');
      if (campusDoc) {
        return this.extractCampusInfo(campusDoc.content, queryLower);
      }
    }

    // Fallback: return summary from most relevant document
    return this.extractSummary(docs[0].content);
  }

  private containsKeywords(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private extractUndergraduateRequirements(content: string): string {
    return `For undergraduate admission, you'll need:

**Academic Requirements:**
• High school diploma with minimum 3.0 GPA
• Core curriculum completion (4 years English, 3 years Math, 3 years Science, 2 years Social Studies)

**Test Scores:**
• SAT: Minimum 1200 (recommended 1350+)
• ACT: Minimum 26 (recommended 30+)
• International students: TOEFL 80+ or IELTS 6.5+

**Application Materials:**
• Completed application form
• Official transcripts
• Two letters of recommendation
• Personal statement (500-750 words)
• Resume/Activity list
• $75 application fee

Some programs have additional requirements. Would you like details about a specific program?`;
  }

  private extractGraduateRequirements(content: string): string {
    return `For graduate admission, you'll need:

**General Requirements:**
• Bachelor's degree from accredited institution
• Minimum undergraduate GPA of 3.2
• GRE/GMAT scores (varies by program)
• Statement of Purpose
• Three academic/professional references
• Resume/CV

**Program-Specific Highlights:**
• MBA: 2+ years work experience, GMAT 550+
• Engineering: Relevant undergraduate degree, GRE required
• Computer Science: Programming background preferred
• International students need TOEFL 100+ or IELTS 7.0+

Which graduate program interests you most?`;
  }

  private extractDeadlineInfo(content: string, query: string): string {
    if (this.containsKeywords(query, ['graduate', 'master', 'phd'])) {
      return `**Graduate Application Deadlines:**
• Fall Semester: February 1, 2025
• Spring Semester: October 15, 2024
• Summer Semester: March 1, 2025
• International Students (Fall): January 15, 2025

**Financial Aid Deadlines:**
• FAFSA: March 1, 2025
• Scholarship Applications: January 31, 2025

Submit all materials by 11:59 PM EST on the deadline date.`;
    }

    return `**Undergraduate Application Deadlines:**
• Early Decision I: November 15, 2024
• Early Decision II: January 15, 2025
• Regular Decision: February 1, 2025
• Transfer Applications: March 15, 2025

**Financial Aid Deadlines:**
• FAFSA: March 1, 2025
• CSS Profile: February 15, 2025

International students should apply by January 15, 2025 for best consideration.`;
  }

  private extractFeeInfo(content: string, query: string): string {
    if (this.containsKeywords(query, ['graduate', 'master', 'mba', 'phd'])) {
      return `**Graduate Program Costs (per year):**
• Master's Programs: $52,000
• Doctoral Programs: $55,000
• MBA Program: $65,000
• Law School: $58,000
• Medical School: $62,000

**Financial Aid Available:**
• Merit scholarships: $5,000-$25,000
• Need-based aid: Up to full tuition
• Graduate assistantships available
• Monthly payment plans offered

Would you like information about specific scholarship opportunities?`;
    }

    return `**Undergraduate Costs (2024-2025):**
• Tuition: $45,000
• Room & Board: $12,000-$13,000
• Books & Supplies: $1,200
• Total Estimated Cost: $58,000-$60,000

**Financial Aid:**
• Merit scholarships: $5,000-$25,000
• Need-based aid available
• 94% of students receive some form of aid
• Full payment discount: 2%

The average financial aid package covers 65% of total costs.`;
  }

  private extractProgramInfo(content: string, query: string): string {
    if (this.containsKeywords(query, ['engineering', 'computer', 'technology'])) {
      return `**School of Engineering Programs:**
• Computer Science (BS, MS, PhD)
• Electrical Engineering (BS, MS, PhD)
• Mechanical Engineering (BS, MS, PhD)
• Civil Engineering (BS, MS, PhD)
• Biomedical Engineering (BS, MS, PhD)
• Data Science (BS, MS)

All engineering programs feature hands-on learning, industry partnerships, and excellent job placement rates (95%+).`;
    }

    if (this.containsKeywords(query, ['business', 'mba', 'finance', 'marketing'])) {
      return `**School of Business Programs:**
• Business Administration (BBA, MBA, Executive MBA)
• Accounting (BS, MS)
• Finance (BS, MS)
• Marketing (BS, MS)
• International Business (BS, MS)
• Entrepreneurship (BS, Certificate)

Our business school is AACSB accredited with strong industry connections and internship opportunities.`;
    }

    return `We offer 230+ academic programs across multiple schools:
• Engineering & Technology
• Business & Management
• Liberal Arts & Sciences
• Medicine & Health Sciences
• Law and Legal Studies
• Education
• Natural Sciences

Which field interests you most? I can provide detailed information about specific programs.`;
  }

  private extractCampusInfo(content: string, query: string): string {
    return `**Campus Life Highlights:**
• 15 Residence Halls (4,500 bed capacity)
• 3 Dining Centers + 12 Cafés
• 200+ Student Organizations
• State-of-the-art Recreation Centers
• Comprehensive Support Services

**Student Support:**
• Academic Advising & Career Services
• Counseling & Health Services
• International Student Support
• Disability Services
• 24/7 Campus Security

95% of freshmen live on campus, creating a vibrant community experience. What aspect of campus life interests you most?`;
  }

  private extractSummary(content: string): string {
    const sentences = content.split('.').slice(0, 3);
    return sentences.join('.') + (sentences.length > 0 ? '.' : '') + '\n\nWould you like more specific information about any aspect?';
  }

  private getDefaultResponse(query: string): string {
    return `I'd be happy to help you with information about college admissions! I can assist with:

• **Admission Requirements** - GPA, test scores, application materials
• **Application Deadlines** - Important dates and timelines
• **Tuition & Financial Aid** - Costs, scholarships, and payment options
• **Academic Programs** - Available majors and degree options
• **Campus Life** - Housing, activities, and support services

What specific aspect would you like to know more about?

*This response is powered by IBM Granite AI with Retrieval-Augmented Generation (RAG) technology.*`;
  }
}

// React hook for using RAG system
export const useRAG = () => {
  const ragSystem = RAGSystem.getInstance();
  
  const generateResponse = async (query: string): Promise<string> => {
    try {
      const response = await ragSystem.generateResponse(query);
      
      let answer = response.answer;
      
      if (response.sources.length > 0) {
        answer += `\n\n*Sources: ${response.sources.join(', ')}*`;
      }
      
      if (response.confidence < 0.7) {
        answer += `\n\n*For more detailed information, please contact our admissions office directly.*`;
      }
      
      return answer;
    } catch (error) {
      console.error('RAG System Error:', error);
      return "I apologize, but I'm experiencing technical difficulties. Please try again or contact our admissions office for immediate assistance.";
    }
  };

  return { generateResponse };
};