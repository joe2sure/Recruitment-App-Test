import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { IoMdClose, IoMdMenu } from 'react-icons/io';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const navItems = [
    {
      id: 2,
      name: 'Job Board',
      dropdown: [
        { name: 'Search Jobs', href: '#' },
        { name: 'Training Center', href: '#' },
        { name: 'Careers', href: '#' },
      ],
    },
    { id: 3, name: 'Services', href: '#' },
    { id: 4, name: 'About', href: '/about' },
    { id: 5, name: 'Contact Us', href: '#' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#46007a]/50 bg-opacity-50 backdrop-blur-[24.5px] p-2 max-w-[80%] mx-auto mt-8 rounded-2xl">
      <div className="flex flex-wrap items-center justify-between h-full">
        {/* Mobile Controls */}
        <div className="w-full flex items-center justify-between md:hidden">
          <section className="flex items-center gap-2">
            <button
              className="text-white text-3xl p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
            </button>
            <a href="/">
              <img
                src="/favicon.svg"
                alt="Logo"
                className="h-10 w-auto text-white"
              />
            </a>
          </section>
          <button className="px-6 py-3 rounded-xl bg-[#46007a] text-white text-base font-medium hover:bg-secondary transition cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden w-full md:flex items-center justify-between">
          <a href="/">
            <img src="/favicon.svg" alt="Logo" className="h-12 w-auto" />
          </a>

          <nav className="flex space-x-8 text-white text-lg font-medium">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.dropdown ? (
                  <div className="group">
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="flex items-center hover:underline"
                    >
                      {item.name}
                      <FiChevronDown
                        className={`ml-1 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {activeDropdown === item.id && (
                      <div className="absolute left-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                        {item.dropdown.map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a href={item.href} className="hover:underline">
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </nav>

          <button className="px-6 py-3 rounded-xl bg-[#46007a] text-white text-base font-medium hover:bg-secondary transition cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="w-full mt-4 bg-white rounded-lg shadow-lg p-4 md:hidden space-y-2">
            {navItems.map((item) => (
              <div key={item.id}>
                {item.dropdown ? (
                  <div className="border-t border-gray-200 pt-2">
                    <button
                      onClick={() => toggleDropdown(item.id)}
                      className="w-full flex justify-between items-center text-gray-800 py-2 px-2 hover:bg-gray-100 rounded"
                    >
                      {item.name}
                      <FiChevronDown
                        className={`transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {activeDropdown === item.id && (
                      <div className="pl-4 space-y-2 mt-2">
                        {item.dropdown.map((subItem, index) => (
                          <a
                            key={index}
                            href={subItem.href}
                            className="block text-gray-700 py-1 hover:bg-gray-100 rounded px-2"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block text-gray-800 py-2 hover:bg-gray-100 rounded px-2"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
