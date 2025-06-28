import React from "react";
import logo from "../../../assets/newsLogo.png";

const Logo: React.FC = () => (
  <a href="/" className="flex items-center space-x-2">
    <img
      src={logo}
      alt="News App Logo"
      className="h-16 w-auto"
    />
  </a>
);

export default Logo;
