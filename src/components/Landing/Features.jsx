const features = [
  {
    title: "Smart Developer Matching",
    description:
      "Find developers based on skills, technologies and interests instead of random profiles.",
  },
  {
    title: "Real-time Chat",
    description:
      "Start chatting instantly once both developers connect with each other.",
  },
  {
    title: "Build Your Network",
    description:
      "Expand your professional network and collaborate on exciting projects.",
  },
];

const Features = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-14">

      <div className="text-center">

        <p className="text-violet-400 font-semibold">
          FEATURES
        </p>

        <h2 className="text-5xl font-bold mt-4">
          Everything you need
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          DevTinder helps developers discover teammates,
          mentors and collaborators with a modern matching
          experience.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">

        {features.map((feature) => (

          <div
            key={feature.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition duration-300"
          >

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 flex items-center justify-center text-2xl">

              🚀

            </div>

            <h3 className="text-2xl font-semibold">

              {feature.title}

            </h3>

            <p className="text-gray-400 mt-4 leading-7">

              {feature.description}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
};

export default Features;