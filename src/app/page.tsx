'use client';

import { faStar, faMugHot, faHeart, faRocket, faComments, faQuoteLeft, faMoneyBillWave, faCoffee, faDollarSign, faGem } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleAuthAction = () => {
    if (status === "authenticated") {
      router.push("/profile");
    } else {
      signIn("google", { callbackUrl: "/profile" });
    }
  };

  const bgElements = [
    { icon: faMugHot, color: "text-amber-400", size: "text-4xl", pos: "top-[15%] left-[15%]" },
    { icon: faBitcoin, color: "text-yellow-400", size: "text-3xl", pos: "top-[25%] left-[20%]" },
    { icon: faCoffee, color: "text-amber-300", size: "text-5xl", pos: "bottom-[35%] left-[18%]" },
    { icon: faGem, color: "text-blue-400", size: "text-4xl", pos: "bottom-[25%] left-[12%]" },
    { icon: faHeart, color: "text-pink-400", size: "text-3xl", pos: "top-[35%] left-[10%]" },
    
    { icon: faMoneyBillWave, color: "text-green-400", size: "text-5xl", pos: "top-[20%] right-[15%]" },
    { icon: faDollarSign, color: "text-green-300", size: "text-3xl", pos: "top-[60%] right-[20%]" },
    { icon: faMugHot, color: "text-amber-400", size: "text-4xl", pos: "bottom-[45%] right-[18%]" },
    { icon: faBitcoin, color: "text-yellow-500", size: "text-6xl", pos: "bottom-[20%] right-[12%]" },
    { icon: faComments, color: "text-blue-300", size: "text-3xl", pos: "top-[50%] right-[10%]" },

    // Center-flanking elements
    { icon: faStar, color: "text-yellow-300", size: "text-5xl", pos: "top-[40%] left-[30%]" },
    { icon: faRocket, color: "text-purple-400", size: "text-4xl", pos: "bottom-[30%] right-[30%]" }
  ];

  return (
    
    <div className="max-w-6xl mx-auto overflow-hidden relative">
    
      <Head>
        <title>Buy Me a Tea | Support Your Favorite Creators</title>
        <meta name="description" content="Accept support for your creative work. It's easier than you think." />
      </Head>

<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
  <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

  <motion.div
    className="absolute top-20 left-1/4 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-30"
    animate={{
      y: [0, -40, 0],
      x: [0, 30, 0],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  ></motion.div>
  
  <motion.div
    className="absolute bottom-20 right-1/4 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-30"
    animate={{
      y: [0, -50, 0],
      x: [0, -30, 0],
      opacity: [0.2, 0.4, 0.2]
    }}
    transition={{
      duration: 12,
      repeat: Infinity,
      delay: 2,
      ease: "easeInOut"
    }}
  ></motion.div>

  {/* Balanced decorative icons - distributed from 20% to 40% from edges */}
  {bgElements.map((element, index) => (
    <motion.div
      key={index}
      className={`absolute ${element.pos} ${element.size} ${element.color} opacity-50 will-change-transform`}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 0.6, 0.3],
        y: [0, -40, 0],
        x: [0, (index % 2 ? 20 : -20), 0],
        rotate: [0, (index % 2 ? 15 : -15), 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 8 + Math.random() * 4,
        repeat: Infinity,
        delay: Math.random() * 3,
        ease: "easeInOut"
      }}
    >
      <FontAwesomeIcon icon={element.icon} />
    </motion.div>
  ))}

  <motion.div
    className="absolute top-[30%] left-[25%] text-6xl text-amber-500 opacity-60"
    animate={{
      y: [0, -60, 0],
      x: [0, 40, 0],
      rotate: [0, 120, 0],
      opacity: [0.4, 0.7, 0.4]
    }}
    transition={{
      duration: 11,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <FontAwesomeIcon icon={faMugHot} />
  </motion.div>

  <motion.div
    className="absolute bottom-[25%] right-[25%] text-6xl text-green-500 opacity-60"
    animate={{
      y: [0, -70, 0],
      x: [0, -50, 0],
      rotate: [0, -120, 0],
      opacity: [0.4, 0.8, 0.4]
    }}
    transition={{
      duration: 13,
      repeat: Infinity,
      delay: 1.5,
      ease: "easeInOut"
    }}
  >
    <FontAwesomeIcon icon={faMoneyBillWave} />
  </motion.div>
</div>

      {/* Hero Section */}
      <section className="max-w-lg mx-auto text-center py-20 px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-10 blur-xl"></div>
          <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-blue-300 rounded-full opacity-10 blur-xl"></div>
          
          <div className="text-gray-600">
            <p>
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon 
                  key={i} 
                  icon={faStar} 
                  className="text-yellow-400 mx-1 animate-pulse"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </p>
            <p className="mt-3 text-lg">Loved by 100,000+ creators</p>
          </div>
          <div className="relative inline-block">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mt-8 mb-6 leading-tight bg-gradient-to-r from-yellow-500 to-blue-500 bg-clip-text text-transparent"
            >
              Fund your<br/>
              creative work
            </motion.h1>

            {/* Underline effect */}
            <span className="absolute bottom-2 left-0 w-full h-2 bg-yellow-300 opacity-50 -z-10 rounded-lg"></span>
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 mb-10 leading-relaxed"
          >
            Accept support for your work.<br/>
            It's easier than you think.
          </motion.h2>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAuthAction}
            className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 px-10 py-5 font-bold rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
          >
            {status==="authenticated" ?<span className="relative z-10">Open my page</span>:<span className="relative z-10">Start my page</span>}
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 my-24 mx-4 border border-blue-100 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto relative z-10">
          {[
            { value: "1M+", label: "Creators", color: "from-blue-500 to-indigo-500" },
            { value: "$50M+", label: "Raised", color: "from-yellow-500 to-amber-500" },
            { value: "190+", label: "Countries", color: "from-green-500 to-teal-500" }
          ].map((stat, index) => (
            <div key={index} className="space-y-4">
              <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-lg text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <section className="my-28 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          How Buy Me a Tea works
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: faMugHot,
              title: "1. Set up your page",
              description: "Create your page in minutes. Add your story and set a coffee price.",
              color: "bg-gradient-to-br from-amber-50 to-amber-100"
            },
            {
              icon: faHeart,
              title: "2. Share with your audience",
              description: "Add a link to your bio, videos, or anywhere you connect with fans.",
              color: "bg-gradient-to-br from-pink-50 to-pink-100"
            },
            {
              icon: faComments,
              title: "3. Get support & messages",
              description: "Receive payments and heartfelt messages from your supporters.",
              color: "bg-gradient-to-br from-blue-50 to-indigo-100"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`text-center p-8 rounded-2xl ${item.color} border border-opacity-20 border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-16 h-16 opacity-10">
                <FontAwesomeIcon icon={item.icon} className="h-full w-full" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-6">
                  <FontAwesomeIcon icon={item.icon} className="h-8 text-pink-500"/>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-28 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          What creators are saying
        </motion.h2>
        
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide space-x-6 snap-x snap-mandatory">
            {[
              {
                quote: "Buy Me a Tea helped me turn my passion into a sustainable career. In just 6 months, I'm earning enough to focus on my art full-time.",
                author: "Sarah J., Illustrator",
                icon: faRocket,
                bg: "bg-gradient-to-br from-purple-50 to-blue-50"
              },
              {
                quote: "The messages from supporters keep me motivated. It's amazing to directly connect with people who appreciate my work.",
                author: "Michael T., Musician",
                icon: faHeart,
                bg: "bg-gradient-to-br from-pink-50 to-rose-50"
              },
              {
                quote: "So much easier than Patreon for casual supporters. My audience loves the simplicity of one-time coffees.",
                author: "Priya K., Writer",
                icon: faMugHot,
                bg: "bg-gradient-to-br from-amber-50 to-yellow-50"
              },
              {
                quote: "I was skeptical at first, but the monthly memberships have provided stable income for my podcast.",
                author: "David L., Podcaster",
                icon: faComments,
                bg: "bg-gradient-to-br from-green-50 to-teal-50"
              },
              {
                quote: "The best decision I made was adding the widget to my YouTube videos. Support skyrocketed!",
                author: "Emma R., YouTuber",
                icon: faQuoteLeft,
                bg: "bg-gradient-to-br from-blue-50 to-indigo-50"
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex-shrink-0 w-80 p-8 rounded-2xl ${testimonial.bg} border border-opacity-20 border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-300 snap-center`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm mb-6">
                  <FontAwesomeIcon icon={testimonial.icon} className="h-5 text-pink-500"/>
                </div>
                <blockquote className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-medium text-gray-900">{testimonial.author}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center my-28 px-4 relative"
      >
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-200 rounded-full opacity-10 blur-3xl"></div>
        
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Ready to get started?
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of creators earning with Buy Me a Tea.
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAuthAction}
          className="inline-block bg-gradient-to-r from-yellow-300 to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 px-10 py-5 font-bold rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-xl relative overflow-hidden group"
        >
          <span className="relative z-10">Create your page — it's free</span>
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
        </motion.button>
        
        <p className="text-gray-500 text-sm mt-4">No credit card required</p>
        
        <div className="mt-12 flex justify-center space-x-4">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            >
              <FontAwesomeIcon icon={faMugHot} className="h-6 text-amber-500"/>
            </motion.div>
          ))}
        </div>
      </motion.section>
      
      {/* Floating animation in the background */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 8s ease-in-out infinite 2s; }
        .animate-float-delay-2 { animation: float 8s ease-in-out infinite 4s; }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}