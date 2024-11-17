import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="pt-8 bg-gray-100">
      <hr className="border-gray-400"/>
        <div className="px-4 py-12 mx-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div>
              <div className="flex items-center gap-1 lg:gap-2">
                <img
                  src="/logo192.png"
                  className="mr-5 h-16 sm:h-20"
                  alt="logo"
                />
                <h2 className="font-semibold">
                  Dr B R Ambedkar National Institute of Technology Jalandhar
                </h2>
              </div>
              <div className="max-w-xs mt-4 text-sm text-gray-700">
                <div className="flex justify-center pb-[6px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 6.042 11.215 6.334 11.49a.75.75 0 0 0 1.332 0C12.958 20.215 19 14.25 19 9c0-3.866-3.134-7-7-7zm0 12a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>

                  <span className="opacity-90">
                    G.T Road, Amritsar Bypass, Jalandhar, Punjab, India-144008
                  </span>
                </div>
                <div className="flex justify-center pb-[6px]">
                  <i className="fa fa-phone text-xl"></i>
                  <span className="opacity-90">
                    +91-0181-5037855, 2690301, 2690453, 3082000
                  </span>
                </div>
              </div>
              <div className="flex mt-8 space-x-6 text-gray-700">
                <a
                  className="hover:opacity-75"
                  href="https://www.facebook.com/NITJofficial/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only"> Facebook </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  className="hover:opacity-75"
                  href="https://www.instagram.com/nitjofficial/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only"> Instagram </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a
                  className="hover:opacity-75"
                  href="https://twitter.com/NITJofficial?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only"> Twitter </span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a
                  className="hover:opacity-75"
                  href="https://in.linkedin.com/school/dr-b-r-ambedkar-national-institute-of-technology-jalandhar-official/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only"> Linkedin </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.66c-1.14 0-2.06-.93-2.06-2.07 0-1.13.93-2.05 2.06-2.05s2.07.92 2.07 2.05c0 1.14-.93 2.07-2.07 2.07zM20.45 20.45h-3.57v-5.87c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.09v6h-3.57V9h3.43v1.56h.05c.48-.92 1.66-1.89 3.42-1.89 3.66 0 4.34 2.41 4.34 5.55v6.23z" />
                  </svg>
                </a>
                <a
                  className="hover:opacity-75"
                  href="https://www.youtube.com/c/NITJOfficial"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only"> Youtube </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a2.994 2.994 0 00-2.106-2.116C19.982 3.5 12 3.5 12 3.5s-7.982 0-9.392.57a2.994 2.994 0 00-2.106 2.116C0 8.6 0 12 0 12s0 3.4.502 5.814a2.994 2.994 0 002.106 2.116C4.018 20.5 12 20.5 12 20.5s7.982 0 9.392-.57a2.994 2.994 0 002.106-2.116C24 15.4 24 12 24 12s0-3.4-.502-5.814zM9.75 15.568V8.432L15.545 12 9.75 15.568z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="font-medium">Quick Links</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-700">
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://nitj.ac.in"
                    target="_blank"
                  >
                    {" "}
                    Main Website{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="http://www.nitcouncil.org.in/"
                    target="_blank"
                  >
                    {" "}
                    Council of NITS{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://www.ugc.gov.in/"
                    target="_blank"
                  >
                    {" "}
                    UGC{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://v1.nitj.ac.in/nitj_files/links/salientfeatures_Highereducation_final-merged_73472.pdf"
                    target="_blank"
                  >
                    {" "}
                    New Education Policy 2020{" "}
                  </a>
                </nav>
              </div>
              <div>
                <p className="font-medium">Documents</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-700">
                  <a
                    className="hover:opacity-75"
                    href="https://www.nitj.ac.in/template/index.html?id=64ae4b97a5e16718759c7e9c?category=newpage"
                    rel="noreferrer"
                    target="_blank"
                  >
                    {" "}
                    Rules/Policies{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://nitj.ac.in/template/index.html?id=6433e06be7b7ce1ef620fd53?category=notice"
                    target="_blank"
                  >
                    {" "}
                    Notice{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://www.nitj.ac.in/template/index.html?id=6551f252a7c0e1110f0f7882?category=newpage"
                    target="_blank"
                  >
                    {" "}
                    List of Holidays{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://www.nitj.ac.in/admin/UMC.html"
                    target="_blank"
                  >
                    {" "}
                    UMC Rules{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://www.nitj.ac.in/template/index.html?id=650a7d8fbce5d4cbc4fba0ef?category=newpage"
                    target="_blank"
                  >
                    {" "}
                    Proformas{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://www.nitj.ac.in/template/index.html?id=651e908479c68ff6aaa9df9e?category=newpage"
                    target="_blank"
                  >
                    {" "}
                    Annual Reports{" "}
                  </a>
                </nav>
              </div>
              <div>
                <p className="font-medium">Others</p>
                <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-700">
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://dexpertsystems.com/welcome?mid=287"
                    target="_blank"
                  >
                    {" "}
                    Other Charges Payment Link{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://v1.nitj.ac.in/NITJ-Compendium/"
                    target="_blank"
                  >
                    {" "}
                    NITJ Compendium{" "}
                  </a>
                  <a
                    className="hover:opacity-75"
                    rel="noreferrer"
                    href="https://www.vlab.co.in/"
                    target="_blank"
                  >
                    {" "}
                    Virtual Labs{" "}
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <p className="mt-8 text-s text-gray-800">
            © Copyright {year}, All Rights Reserved NIT Jalandhar
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
