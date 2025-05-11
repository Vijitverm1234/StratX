import React from 'react';

const Feedback = () => {
  return (
    <div
      className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden "
      id="#feedback"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-blue-800">
        Share Your <span className="underline underline-offset-4 decoration-1 font-light text-blue-600">Feedback</span>
      </h1>
      <p className="text-blue-700 max-w-80 text-center mb-8">
        Ready to make a move? We'd love to hear your thoughts!
      </p>

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="w-full text-blue-800 pt-8"
      >
        <input type="hidden" name="access_key" value="979927bf-936d-40bd-b4d6-d1e37a8a38b1" />

        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 text-left pr-0 md:pr-4 mb-6">
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="Name"
              required
            />
          </div>
          <div className="w-full md:w-1/2 text-left md:pl-4 mb-6">
            <label className="block font-medium mb-1">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="Email"
              required
            />
          </div>
        </div>

        <div className="text-left mb-6 w-full">
          <label className="block font-medium mb-1">Your Feedback</label>
          <textarea
            name="Message"
            placeholder="Write your feedback here..."
            required
            className="w-full border border-gray-300 rounded-md py-3 px-4 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-10 rounded-md transition-all"
        >
          Send Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedback;
