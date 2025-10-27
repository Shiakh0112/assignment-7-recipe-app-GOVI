const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      {/* Banner Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to RecipeHub 🍴</h1>
          <p className="text-lg">Discover and save your favorite meals!</p>
        </div>
      </div>

      {/* Floating Search Box */}
      <div className="absolute left-1/2 bottom-[-2rem] transform -translate-x-1/2 w-full flex justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-4 w-[90%] sm:w-[70%] md:w-[50%] flex items-center">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="ml-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
