import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import { ConfigProvider, theme } from "antd";
import "./styles/main.css";
import NewsCardListing from "./components/features/newsArticleListing/NewsArticleListing";

function App() {

  return (
    <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: "#ff1a1a",
        borderRadius: 8,
        colorBgContainer: "#ffffff",
        colorBgElevated: "#fff",
        fontFamily: "Inter, sans-serif",
      },
    }}>
      <div className="min-h-screen bg-white flex flex-col">
        <Header/>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <NewsCardListing/>
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
