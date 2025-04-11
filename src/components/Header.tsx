'use client';
import { faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { parseFullName } from "parse-full-name";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const name = session?.user?.name || '';
  const { first: firstName } = parseFullName(name);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <meta name="cryptomus" content="6e56e941" />
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link href={'/'} className="inline-flex gap-1 items-center">
            <FontAwesomeIcon className="h-8" icon={faMugHot}/>
            <span className="mt-2">Buy me a Tea</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-gray-900 transition-colors text-lg">
              About
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-gray-900 transition-colors text-lg">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors text-lg">
              Contact
            </Link>

            <div className="flex items-center space-x-4 ml-4">
              {session ? (
                <Link
                  href="/profile"
                  className="flex items-center space-x-2 bg-yellow-100 hover:bg-yellow-200 rounded-full px-4 py-2 transition-colors"
                >
                  <Image
                    src={session.user?.image as string}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <span className="text-md font-medium">{firstName}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => signIn('google')}
                    className="border border-gray-300 hover:bg-gray-50 rounded-full px-5 py-2 text-md font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => signIn('google')}
                    className="bg-yellow-400 hover:bg-yellow-500 rounded-full px-5 py-2 text-md font-medium transition-colors shadow-sm"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </nav>

          <button 
            className="md:hidden p-3 rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/faq" 
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-gray-900 px-4 py-2 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className="flex flex-col space-y-4 mt-4 px-4">
              {session ? (
                <Link
                  href="/profile"
                  className="flex items-center justify-center space-x-2 bg-yellow-100 hover:bg-yellow-200 rounded-full px-4 py-3 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src={session.user?.image as string}
                    alt="avatar"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <span className="text-md font-medium">{firstName}</span>
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => {
                      signIn('google');
                      setMobileMenuOpen(false);
                    }}
                    className="border border-gray-300 hover:bg-gray-50 rounded-full px-5 py-3 text-md font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      signIn('google');
                      setMobileMenuOpen(false);
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 rounded-full px-5 py-3 text-md font-medium transition-colors shadow-sm"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}