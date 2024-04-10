const Footer = () => {
  return (
    <div className="w-full  container mx-auto  bottom-0 left-0">
      <footer className="bg-primary_colors  shadow z-50">
        <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:items-center md:justify-center">
          <span className="text-sm  sm:text-center ">
            © 2024{" "}
            <a href="#" className="hover:underline">
              Juza
            </a>
            . All Rights Reserved.
          </span>
          <span className="text-xs sm:text-center">
            Developed By
            <a
              href="https://qmarktechnolabs.com/"
              target="blank"
              className="hover:underline text-primary"
            >
              {" "}
              Qmark Technolabs
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
