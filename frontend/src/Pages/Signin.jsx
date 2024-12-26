import React from "react";

export default function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-gray-50">
      {/* Left Section */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
        <img
          src="https://via.placeholder.com/400x300" // Replace this with the actual image URL
          alt="Illustration"
          className="max-w-sm"
        />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8">
        <h2 className="text-2xl font-semibold mb-4">Sign in with</h2>
        <div className="flex gap-4 mb-6">
          {/* Google Icon */}
          <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google"
              className="h-6 w-6"
            />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-6">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-500 text-sm">Or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Login Form */}
        <form className="w-full max-w-sm">
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 text-sm">
              Email address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500 rounded border-gray-300"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-500 hover:underline focus:outline-none"
            >
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            LOGIN
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <a href="#" className="text-red-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </section>
  );
}
