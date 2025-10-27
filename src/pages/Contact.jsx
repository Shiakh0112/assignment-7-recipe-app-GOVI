import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="w-[90%] mx-auto mt-20 mb-16">
      {/* 🧡 Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center text-amber-600 mb-4"
      >
        Get in Touch ✉️
      </motion.h1>

      {/* 💬 Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="text-center text-gray-700 text-lg mb-10 max-w-2xl mx-auto"
      >
        Have a question, feedback, or just want to say hello? We’d love to hear
        from you! Fill out the form below or reach us directly.
      </motion.p>

      {/* 📞 Contact Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14"
      >
        {/* Email */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all">
          <FaEnvelope className="text-amber-500 text-3xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Us</h3>
          <p className="text-gray-600">support@flavorverse.com</p>
        </div>

        {/* Phone */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all">
          <FaPhoneAlt className="text-green-500 text-3xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Call Us</h3>
          <p className="text-gray-600">+91 98765 43210</p>
        </div>

        {/* Location */}
        <div className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-all">
          <FaMapMarkerAlt className="text-red-500 text-3xl mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Visit Us</h3>
          <p className="text-gray-600">Mumbai, India 🇮🇳</p>
        </div>
      </motion.div>

      {/* 📬 Contact Form */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-2xl mx-auto bg-white shadow-md rounded-2xl p-8"
      >
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-gray-700"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-gray-700"
          />
        </div>

        <textarea
          rows="5"
          placeholder="Your Message..."
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-gray-700 mb-6"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-md"
        >
          Send Message 💌
        </button>
      </motion.form>

      {/* 👨‍🍳 Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center mt-12"
      >
        <p className="text-gray-600">
          We’ll get back to you as soon as possible — thanks for reaching out!
          💛
        </p>
      </motion.div>
    </div>
  );
};

export default Contact;
