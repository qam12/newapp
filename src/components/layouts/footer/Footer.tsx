import { Space, Typography } from "antd";

const { Text } = Typography;

function Footer() {
  const leftMenu = ["Abouts", "LinkedIn", "GitHub"];

  return (
    <footer className="bg-[#fff] text-black py-5 mt-auto">
      <div className="container mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
        <Space wrap className="mb-4 md:mb-0">
          {leftMenu?.map((item, index) => (
            <Text key={index} className="text-black-400 text-sm cursor-default font-sans">
              {item}
            </Text>
          ))}
        </Space>
        <div className="text-center md:text-right">
          <Text className="text-black-400 text-sm font-sans">
            @2025, Designed and Developed by Qamber.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
