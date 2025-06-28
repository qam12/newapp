import { Space, Typography } from "antd";

const { Text } = Typography;

function Footer() {
  const leftMenu = [
    { label: "About", link: "#" },
    { label: "LinkedIn", link: "https://www.linkedin.com/in/qamberhaider/" },
    { label: "GitHub", link: "https://github.com/qam12" },
  ];

  return (
    <footer className="bg-white text-black py-5 mt-auto">
      <div className="container mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
        <Space wrap className="mb-4 md:mb-0">
          {leftMenu.map((item, index) => (
            <Text key={index} className="text-black text-sm font-sans">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black no-underline"
                style={{ color: 'black' }}
              >
                {item.label}
              </a>
            </Text>
          ))}
        </Space>
        <div className="text-center md:text-right">
          <Text className="text-black text-sm font-sans">
            ©2025, Developed by Qamber.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
