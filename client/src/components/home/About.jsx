import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Sparkles, FileText, Download, Palette, ArrowRight, Zap } from "lucide-react";

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Suggestions",
      description: "Get intelligent recommendations for your resume content, skills, and professional summary powered by advanced AI.",
      color: "violet",
      bgColor: "bg-violet-50",
      borderColor: "border-violet-200",
      iconColor: "text-violet-600",
      hoverBg: "hover:bg-violet-100",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Easy Resume Creation",
      description: "Build your professional resume with our intuitive step-by-step editor. No design skills required.",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      hoverBg: "hover:bg-green-100",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download as PDF",
      description: "Export your resume instantly as a polished PDF ready to share with employers and job platforms.",
      color: "blue",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      hoverBg: "hover:bg-blue-100",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Customizable Templates",
      description: "Choose from beautifully designed templates and customize colors, fonts, and layouts to match your style.",
      color: "orange",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      hoverBg: "hover:bg-orange-100",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-green-50/30 to-white pointer-events-none" />
      
      {/* Decorative blur elements */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-green-200/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-violet-200/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>Why Choose Us</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 mb-6 leading-tight">
            About <span className="text-green-600">Resume Builder</span>
          </h2>

          {/* Introduction */}
          <p className="max-w-2xl mx-auto text-lg text-slate-600 leading-relaxed">
            Our AI-powered resume builder helps you create professional, ATS-friendly resumes 
            in minutes. Stand out from the competition and land your dream job faster with 
            intelligent suggestions and stunning templates.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`group relative opacity-0 translate-y-6 transition-all duration-500 ease-out delay-${index * 100}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className={`relative h-full p-6 rounded-2xl border ${feature.bgColor} ${feature.borderColor} ${feature.hoverBg} transition-all duration-300 hover:shadow-lg hover:shadow-${feature.color}-100 hover:-translate-y-1`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl ${feature.bgColor} ${feature.iconColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 md:p-10 rounded-3xl bg-gradient-to-r from-green-500 to-green-600 shadow-xl shadow-green-500/20">
            <div className="text-center sm:text-left">
              <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                Ready to build your resume?
              </h3>
              <p className="text-green-100 text-sm md:text-base">
                Join thousands of job seekers who have landed their dream jobs.
              </p>
            </div>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-green-50 active:scale-95 transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              Create Resume Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
    </section>
  );
};

export default About;
