import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import { ConfigProvider, theme } from "antd";
import "./styles/main.css";

function App() {

  return (
    <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: "#ff1a1a",
        borderRadius: 8,
        colorBgContainer: "#1a1a1a",
        colorBgElevated: "#262626",
        fontFamily: "Inter, sans-serif",
      },
    }}>
      <div className="min-h-screen bg-white flex flex-col">
        <Header/>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
