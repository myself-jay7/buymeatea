'use client';

import { faStar, faMugHot, faHeart, faRocket, faComments, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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


  return (
    <div className="max-w-6xl mx-auto">
      
      {/* Hero Section */}
      <section className="max-w-lg mx-auto text-center py-20 px-4">
        <div className="text-gray-600">
          <p>
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 mx-1"/>
            ))}
          </p>
          <p className="mt-3 text-lg">Loved by 100,000+ creators</p>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mt-8 mb-6 leading-tight">
          Fund your<br/>
          creative work
        </h1>
        <h2 className="text-xl text-gray-600 mb-10 leading-relaxed">
          Accept support for your work.<br/>
          It's easier than you think.
        </h2>
        <button
          onClick={handleAuthAction}
          className="inline-block bg-yellow-300 hover:bg-yellow-400 px-10 py-5 font-bold rounded-full text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Start my page
        </button>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-50 rounded-xl p-12 my-24 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">1M+</div>
            <div className="text-lg text-gray-600">Creators</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">$50M+</div>
            <div className="text-lg text-gray-600">Raised</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-600">190+</div>
            <div className="text-lg text-gray-600">Countries</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="my-28 px-4">
        <h2 className="text-3xl font-bold text-center mb-16">How Buy Me a Tea works</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {[
            {
              icon: faMugHot,
              title: "1. Set up your page",
              description: "Create your page in minutes. Add your story and set a coffee price."
            },
            {
              icon: faHeart,
              title: "2. Share with your audience",
              description: "Add a link to your bio, videos, or anywhere you connect with fans."
            },
            {
              icon: faComments,
              title: "3. Get support & messages",
              description: "Receive payments and heartfelt messages from your supporters."
            }
          ].map((item, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <FontAwesomeIcon icon={item.icon} className="h-12 text-blue-500 mb-6"/>
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600 text-lg">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="my-28 px-4">
        <h2 className="text-3xl font-bold text-center mb-16">What creators are saying</h2>
        <div className="relative">
          <div className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide space-x-6">
            {[
              {
                quote: "Buy Me a Tea helped me turn my passion into a sustainable career. In just 6 months, I'm earning enough to focus on my art full-time.",
                author: "Sarah J., Illustrator",
                icon: faRocket
              },
              {
                quote: "The messages from supporters keep me motivated. It's amazing to directly connect with people who appreciate my work.",
                author: "Michael T., Musician",
                icon: faHeart
              },
              {
                quote: "So much easier than Patreon for casual supporters. My audience loves the simplicity of one-time coffees.",
                author: "Priya K., Writer",
                icon: faMugHot
              },
              {
                quote: "I was skeptical at first, but the monthly memberships have provided stable income for my podcast.",
                author: "David L., Podcaster",
                icon: faComments
              },
              {
                quote: "The best decision I made was adding the widget to my YouTube videos. Support skyrocketed!",
                author: "Emma R., YouTuber",
                icon: faQuoteLeft
              }
            ].map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-80 bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                <FontAwesomeIcon icon={testimonial.icon} className="h-8 text-blue-500 mb-6"/>
                <blockquote className="text-lg italic text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="font-medium text-gray-900">{testimonial.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center my-28 px-4">
        <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Join thousands of creators earning with Buy Me a Tea.
        </p>
        <button 
          onClick={handleAuthAction}
          className="inline-block bg-yellow-300 hover:bg-yellow-400 px-10 py-5 font-bold rounded-full text-lg transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Create your page — it's free
        </button>
        <p className="text-gray-500 text-sm mt-4">No credit card required</p>
      </section>
    </div>
  );
}