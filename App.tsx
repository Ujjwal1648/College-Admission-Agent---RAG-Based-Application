import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, GraduationCap, FileText, Calendar, DollarSign, BookOpen, MessageCircle, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const SAMPLE_FAQS: FAQ[] = [
  {
    question: "What are the admission requirements for undergraduate programs?",
    answer: "For undergraduate programs, you need: High school diploma or equivalent, minimum GPA of 3.0, SAT scores (1200+ recommended), two letters of recommendation, and a personal statement. Some programs may have additional requirements.",
    category: "Eligibility"
  },
  {
    question: "What is the application deadline?",
    answer: "Early Decision: November 15th, Regular Decision: February 1st, Late Applications: March 15th (limited availability). International students should apply by January 15th for best consideration.",
    category: "Deadlines"
  },
  {
    question: "What are the tuition fees for the academic year?",
    answer: "Undergraduate tuition: $45,000/year, Graduate tuition: $52,000/year. Additional costs include housing ($12,000), meal plans ($4,500), and books/supplies ($1,200). Financial aid is available.",
    category: "Fees"
  },
  {
    question: "What programs does the university offer?",
    answer: "We offer 150+ undergraduate programs and 80+ graduate programs across 12 schools including Engineering, Business, Liberal Arts, Medicine, Law, Computer Science, and more.",
    category: "Programs"
  },
  {
    question: "How do I apply for financial aid?",
    answer: "Complete the FAFSA by March 1st. Submit CSS Profile for institutional aid. Merit scholarships are automatically considered with admission application. Work-study programs available.",
    category: "Financial Aid"
  }
];

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm your College Admission Assistant powered by IBM Granite AI. I'm here to help you with admission requirements, application guidance, course selection, fees, and deadlines. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestMatch = (userInput: string): FAQ | null => {
    const input = userInput.toLowerCase();
    let bestMatch: FAQ | null = null;
    let highestScore = 0;

    SAMPLE_FAQS.forEach(faq => {
      const questionWords = faq.question.toLowerCase().split(' ');
      const answerWords = faq.answer.toLowerCase().split(' ');
      const categoryWords = faq.category.toLowerCase().split(' ');
      
      let score = 0;
      const inputWords = input.split(' ');
      
      inputWords.forEach(word => {
        if (word.length > 3) {
          if (questionWords.some(qw => qw.includes(word) || word.includes(qw))) score += 3;
          if (answerWords.some(aw => aw.includes(word) || word.includes(aw))) score += 2;
          if (categoryWords.some(cw => cw.includes(word) || word.includes(cw))) score += 1;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = faq;
      }
    });

    return highestScore > 2 ? bestMatch : null;
  };

  const generateResponse = (userInput: string): string => {
    const bestMatch = findBestMatch(userInput);
    
    if (bestMatch) {
      return `${bestMatch.answer}\n\nIs there anything specific about ${bestMatch.category.toLowerCase()} you'd like to know more about?`;
    }

    // Fallback responses based on keywords
    const input = userInput.toLowerCase();
    
    if (input.includes('deadline') || input.includes('due date')) {
      return "Here are our key application deadlines:\n• Early Decision: November 15th\n• Regular Decision: February 1st\n• Late Applications: March 15th\n• International Students: January 15th\n\nWould you like more details about any specific deadline?";
    }
    
    if (input.includes('fee') || input.includes('cost') || input.includes('tuition')) {
      return "Our tuition structure is:\n• Undergraduate: $45,000/year\n• Graduate: $52,000/year\n• Housing: $12,000/year\n• Meal Plan: $4,500/year\n\nFinancial aid and scholarships are available. Would you like information about financial assistance options?";
    }
    
    if (input.includes('program') || input.includes('course') || input.includes('major')) {
      return "We offer 150+ undergraduate and 80+ graduate programs across:\n• Engineering & Technology\n• Business & Management\n• Liberal Arts & Sciences\n• Computer Science\n• Medicine & Health Sciences\n• Law\n\nWhich field interests you most?";
    }
    
    if (input.includes('requirement') || input.includes('eligibility')) {
      return "General admission requirements include:\n• High school diploma (3.0+ GPA)\n• Standardized test scores (SAT/ACT)\n• Letters of recommendation\n• Personal statement\n• Application form\n\nSpecific programs may have additional requirements. Which program are you interested in?";
    }

    return "I'd be happy to help you with information about:\n• Admission requirements and eligibility\n• Application deadlines and process\n• Tuition fees and financial aid\n• Available programs and courses\n• Campus life and facilities\n\nWhat specific aspect would you like to know about?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: generateResponse(inputValue),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const QuickActionCard = ({ icon: Icon, title, description, onClick }: {
    icon: any;
    title: string;
    description: string;
    onClick: () => void;
  }) => (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-blue-500 hover:border-blue-600 group"
    >
      <div className="flex items-center mb-3">
        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">College Admission Agent</h1>
                <p className="text-sm text-gray-600 flex items-center">
                  <Sparkles className="w-4 h-4 mr-1" />
                  Powered by IBM Granite AI & RAG Technology
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                AI Assistant Online
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Actions Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                Quick Help
              </h2>
              <div className="space-y-4">
                <QuickActionCard
                  icon={FileText}
                  title="Requirements"
                  description="Learn about admission requirements and eligibility criteria"
                  onClick={() => setInputValue("What are the admission requirements?")}
                />
                <QuickActionCard
                  icon={Calendar}
                  title="Deadlines"
                  description="Important application deadlines and dates"
                  onClick={() => setInputValue("What are the application deadlines?")}
                />
                <QuickActionCard
                  icon={DollarSign}
                  title="Fees & Aid"
                  description="Tuition fees and financial assistance options"
                  onClick={() => setInputValue("What are the tuition fees and financial aid options?")}
                />
                <QuickActionCard
                  icon={BookOpen}
                  title="Programs"
                  description="Available courses and degree programs"
                  onClick={() => setInputValue("What programs do you offer?")}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Programs Offered</span>
                  <span className="font-bold">230+</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate</span>
                  <span className="font-bold">94%</span>
                </div>
                <div className="flex justify-between">
                  <span>Students Helped</span>
                  <span className="font-bold">15,000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg h-[700px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">AI Admission Assistant</h3>
                    <p className="text-sm text-gray-500">Always here to help with your admission queries</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === 'bot' && (
                          <Bot className="w-5 h-5 mt-1 text-blue-600 flex-shrink-0" />
                        )}
                        {message.type === 'user' && (
                          <User className="w-5 h-5 mt-1 text-white flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {message.content}
                          </p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-2xl px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-5 h-5 text-blue-600" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex space-x-4">
                  <div className="flex-1 relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about admissions, requirements, deadlines, fees, or programs..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      rows={2}
                      disabled={isTyping}
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by IBM Granite AI - Press Enter to send, Shift + Enter for new line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;