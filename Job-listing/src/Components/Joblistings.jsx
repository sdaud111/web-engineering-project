
const Joblistings = ({ isHome = false }) => {
  return (
    <section className="bg-[#D1F8EF] bg-opacity-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-[#3674B5] mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'All Jobs'}
        </h2>
        <p className="text-center text-gray-500">Job listings are disabled.</p>
      </div>
    </section>
  );
};

export default Joblistings;
