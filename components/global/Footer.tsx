import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
              <Link href="/" className="me-4 hover:underline md:me-6">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#about" className="me-4 hover:underline md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/#skills" className="me-4 hover:underline md:me-6">
                Skills
              </Link>
            </li>
            <li>
              <Link href="/#projects" className="hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-gray-400 sm:text-center">
          © {currentYear}{" "}
          <Link href="/" className="hover:underline">
            Shankalpa Pokharel
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
