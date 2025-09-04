import Link from "next/link";

export default function Footer() {
  return (
    <footer className="m-4 rounded-lg shadow">
      <div className="mx-auto w-full md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between px-10">
          <Link
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-white">
              Shankalpa
            </span>
          </Link>
          <ul className="mb-6 flex flex-col gap-6 text-sm font-medium text-gray-400 sm:mb-0 md:flex-row md:items-center">
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="me-4 hover:underline md:me-6">
                Skills
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center">
          © 2024 <span className="hover:underline">Shankalpa™</span>. All
          Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
