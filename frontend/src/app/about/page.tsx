export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our History</span>
            <h1 className="font-playfair text-5xl font-bold mb-8 leading-tight">Serving Happiness <br/>Since 2020</h1>
            <div className="space-y-6 text-gray-600 text-lg">
              <p>
                Founded in 2020, JENIKS KITCHEN has been committed to serving quality meals to our customers, fostering a sense of community.
              </p>
              <p>
                Our mission is to provide delicious meals made from the freshest ingredients while creating a welcoming atmosphere for our customers.
              </p>
              <p>
                What started as a small family-owned kitchen has grown into a beloved local institution, known for our exceptional taste and customer service.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Chef at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-orange-600 p-8 rounded-3xl text-white hidden lg:block">
              <p className="text-4xl font-bold font-playfair">15+</p>
              <p className="text-orange-100 uppercase tracking-widest text-sm">Signature Dishes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
          <div className="bg-white p-12 rounded-[2rem] border border-gray-100">
            <h3 className="text-3xl font-bold font-playfair mb-6">Our Mission</h3>
            <p className="text-gray-600 text-lg">
              To provide delicious meals made from the freshest ingredients while creating a welcoming atmosphere for our customers.
            </p>
          </div>
          <div className="bg-white p-12 rounded-[2rem] border border-gray-100">
            <h3 className="text-3xl font-bold font-playfair mb-6">Our Vision</h3>
            <p className="text-gray-600 text-lg">
              To be the leading eatery known for exceptional taste and customer service in our community.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
