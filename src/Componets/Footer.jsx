import React from 'react'

function Footer() {
  return (


  
        <footer className="bg-gray-800 text-gray-200">
          <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h2 className="text-lg font-bold mb-4">About Us</h2>
              <p className="text-sm leading-relaxed">
                Welcome to our blog! We are passionate about bringing you stories
                that inspire, inform, and delight. From trends to timeless insights,
                our content is crafted with care to enrich your day.
              </p>
            </div>
    
            {/* Quick Links Section */}
            <div>
              <h2 className="text-lg font-bold mb-4">Quick Links</h2>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-gray-400 transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="hover:text-gray-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-gray-400 transition">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
    
            {/* Newsletter Section */}
            <div>
              <h2 className="text-lg font-bold mb-4">Stay Connected</h2>
              <p className="text-sm leading-relaxed mb-4">
                Subscribe to our newsletter for the latest updates and stories
                delivered straight to your inbox.
              </p>
              <form>
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-2 rounded bg-gray-700 text-gray-200 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
    
          {/* Social Media & Copyright */}
          <div className="bg-gray-700 text-gray-400 py-4 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              {/* Social Media Links */}
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24h11.495v-9.294H9.837v-3.62h2.983V8.413c0-2.951 1.796-4.556 4.43-4.556 1.257 0 2.337.093 2.65.135v3.075l-1.817.001c-1.425 0-1.699.676-1.699 1.667v2.185h3.396l-.443 3.62h-2.953V24h5.787c.735 0 1.325-.59 1.325-1.324V1.325C24 .59 23.41 0 22.675 0z" />
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.39-1.833.654-2.828.774a4.93 4.93 0 002.163-2.723c-.95.555-2.005.96-3.127 1.184a4.922 4.922 0 00-8.384 4.482C7.69 8.094 4.066 6.13 1.64 3.16a4.822 4.822 0 00-.665 2.475c0 1.708.869 3.214 2.188 4.098a4.904 4.904 0 01-2.23-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.934 4.934 0 01-2.224.084c.631 1.973 2.457 3.416 4.617 3.454a9.867 9.867 0 01-6.1 2.104c-.396 0-.79-.023-1.175-.067a13.933 13.933 0 007.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A9.935 9.935 0 0024 4.557z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.331 3.608 1.307.975.975 1.245 2.243 1.307 3.608.058 1.265.07 1.646.07 4.85s-.012 3.584-.07 4.849c-.062 1.366-.331 2.633-1.307 3.609-.975.975-2.243 1.245-3.608 1.307-1.265.058-1.646.07-4.85.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.331-3.609-1.307-.975-.975-1.245-2.243-1.307-3.609C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.331-2.633 1.307-3.608.975-.975 2.243-1.245 3.609-1.307C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.667 0 8.25.012 7.093.07c-1.57.075-2.956.396-4.062 1.502C1.927 2.927 1.607 4.313 1.532 5.883.012 7.093 0 8.667 0 12s.012 4.907.07 6.093c.075 1.57.396 2.956 1.502 4.062 1.106 1.106 2.492 1.427 4.062 1.502C8.25 23.988 8.667 24 12 24s4.907-.012 6.093-.07c1.57-.075 2.956-.396 4.062-1.502 1.106-1.106 1.427-2.492 1.502-4.062C23.988 19.25 24 18.667 24 12s-.012-4.907-.07-6.093c-.075-1.57-.396-2.956-1.502-4.062-1.106-1.106-2.492-1.427-4.062-1.502C15.907.012 15.333 0 12 0z" />
                    <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.838 3.838 0 110-7.676 3.838 3.838 0 010 7.676zm4.406-10.812a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
                  </svg>
                </a>
              </div>
    
              {/* Copyright */}
              <div>&copy; {new Date().getFullYear()} Blog Name. All Rights Reserved.</div>
            </div>
          </div>
        </footer>

    
  )
}

export default Footer;