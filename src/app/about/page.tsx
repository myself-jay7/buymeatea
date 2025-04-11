import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Buy Me a Tea ☕</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Buy Me a Tea makes supporting fun and easy. In just a couple of taps, your fans can make the payment 
          (buy you a tea) and leave a message. They don't even have to create an account!
        </p>
      </section>

      <section className="my-12 bg-gray-100 rounded-lg overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <iframe 
            className="w-full h-96"
            src="https://www.youtube.com/embed/7WwIgs4q35c"
            title="Buy Me a Tea - How it works"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        </div>
      </section>

      <section className="my-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why creators love us</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy payments</h3>
            <p className="text-gray-600">
              Your supporters can pay you in just a couple of taps. No hassle, no forms, no extra steps.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No fees</h3>
            <p className="text-gray-600">
              100% of your earnings go straight to you. We charge 5% only when you withdraw.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-gray-600">
              Your supporters can leave a message with their payment, so you know who it's from.
            </p>
          </div>
        </div>
      </section>

      <section className="my-16 bg-blue-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">By the numbers</h2>
        
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">1M+</div>
            <div className="text-gray-600">Creators</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">$50M+</div>
            <div className="text-gray-600">Raised</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">190+</div>
            <div className="text-gray-600">Countries</div>
          </div>
        </div>
      </section>

      <section className="my-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to get started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join thousands of creators earning with Buy Me a Tea.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-200">
          Create your page
        </button>
      </section>

      <div className="text-center text-gray-500 text-sm mt-16">
        <p>Made with ❤️ for creators everywhere</p>
      </div>
    </div>
  );
};

export default AboutPage;