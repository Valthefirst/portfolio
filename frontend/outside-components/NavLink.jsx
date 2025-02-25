const NavLink = ({ href, title, className }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`block py-2 pl-3 pr-4 text-gray-900 dark:text-white sm:text-xl rounded md:p-0 ${className}`}
    >
      {title}
    </a>
  );
};

export default NavLink;
