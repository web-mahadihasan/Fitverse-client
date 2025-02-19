import { BookOpen, Users, Calendar, CreditCard, Search, LayoutDashboard, Clock, Plus, DollarSign, HelpCircle, ExternalLink } from 'lucide-react';

const HelpPage = () => {
  const helpTopics = [
    {
      title: "Class Management",
      icon: <BookOpen className="w-6 h-6" />,
      questions: [
        {
          q: "How do I view available classes?",
          a: "Navigate to the Classes section where you can browse all available fitness classes. Use filters to sort by date, type, or trainer."
        },
        {
          q: "How do I sort and filter classes?",
          a: "Use the filter options at the top of the class list to sort by date, difficulty level, or trainer. You can also filter by class type or availability."
        }
      ]
    },
    {
      title: "Trainer Features",
      icon: <Users className="w-6 h-6" />,
      questions: [
        {
          q: "How do I manage my training slots?",
          a: "Access your trainer dashboard, click on 'Manage Slots' to add, edit, or remove available time slots for your classes."
        },
        {
          q: "How can I view my class bookings?",
          a: "In your trainer dashboard, check the 'Class Bookings' section to see all users who have purchased your classes."
        }
      ]
    },
    {
      title: "Payment & Bookings",
      icon: <CreditCard className="w-6 h-6" />,
      questions: [
        {
          q: "How do I purchase a class?",
          a: "Select your desired class, click 'Book Now', and complete the payment through our secure Stripe payment system."
        },
        {
          q: "Where can I view my payment history?",
          a: "Access your dashboard and navigate to 'Payment History' to view all your past transactions."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div 
        className="h-[350px] bg-gradient-to-r from-indigo-600 to-purple-600 relative overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-200 text-center max-w-2xl">
            Learn how to make the most of Fitverse's features and functionalities
          </p>
        </div>
      </div>

      {/* Quick Features Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: <LayoutDashboard />, title: "Dashboard Overview", desc: "Access your personalized dashboard" },
            { icon: <Calendar />, title: "Class Booking", desc: "Book and manage your fitness classes" },
            { icon: <Clock />, title: "Slot Management", desc: "Manage your training schedule" },
            { icon: <Search />, title: "Advanced Search", desc: "Find the perfect class or trainer" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 transform hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Help Topics */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {helpTopics.map((topic, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                  {topic.icon}
                </div>
                <h2 className="text-xl font-semibold">{topic.title}</h2>
              </div>
              <div className="space-y-6">
                {topic.questions.map((item, qIdx) => (
                  <div key={qIdx} className="space-y-2">
                    <h3 className="font-medium text-gray-900 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-indigo-600" />
                      {item.q}
                    </h3>
                    <p className="text-gray-600 ml-7">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Additional Resources</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a 
              href="https://fitverse-bd.web.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <ExternalLink className="w-5 h-5" />
              Visit Live Website
            </a>
            <a 
              href="https://github.com/web-mahadihasan/Fitverse-client" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <BookOpen className="w-5 h-5" />
              View Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;