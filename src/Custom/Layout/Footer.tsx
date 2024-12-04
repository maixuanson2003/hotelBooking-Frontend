export function Footer() {
  return (
    <footer className="bg-gray-900 h-[300px] text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold">Call Us</h3>
          <p>+123-456-7890</p>
          <p>email@domain.com</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Our Story
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Travel Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Partnership
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Support</h3>
          <ul>
            <li>
              <a href="#" className="hover:underline">
                Customer Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Pay Safely With Us</h3>
          <p>Secure payment with SSL encryption.</p>
          <div className="flex space-x-4 mt-2">
            <img src="/visa.png" alt="Visa" className="w-10" />
            <img src="/mastercard.png" alt="Mastercard" className="w-10" />
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
        <p>© 2024 HotelBooking. All rights reserved.</p>
        <div className="flex justify-center mt-2 space-x-4">
          <a href="#" className="hover:underline">
            Facebook
          </a>
          <a href="#" className="hover:underline">
            Twitter
          </a>
          <a href="#" className="hover:underline">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
