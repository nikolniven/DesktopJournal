function HomePage() {
  return (
    <div className="min-h-screen bg-indigo-50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-8">
          Welcome to Desktop Journal
        </h1>

        <div className="bg-[oklch(0.89_0.1_280)] p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Record Dreams & Reflections for Better Mental Wellness
          </h2>

          <p className="text-gray-600 mb-6">
            Desktop Journal transforms your spoken dreams and personal
            reflections into written insights. Research shows that dream
            journaling can reduce anxiety and improve emotional awareness.
            Simply record your dreams and thoughts as they come, add your
            reflections, and watch as patterns emerge in your subconscious mind.
            Join thousands who've enhanced their mental well-being through
            regular dream reflection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="p-4 bg-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">
                Dream & Reflect
              </h3>
              <p className="text-gray-600">
                Record dreams and add personal insights effortlessly
              </p>
            </div>

            <div className="p-4 bg-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">
                Voice to Text
              </h3>
              <p className="text-gray-600">
                Smart transcription for dreams and reflections
              </p>
            </div>

            <div className="p-4 bg-indigo-100 rounded-lg">
              <h3 className="font-semibold text-indigo-700 mb-2">
                Private & Secure tracking of your progress
              </h3>
              <p className="text-gray-600">
                Monitor your emotional patterns over time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
