import Header from "./components/layouts/header/Header";
import Footer from "./components/layouts/footer/Footer";
import { ConfigProvider, theme } from "antd";
import "./styles/main.css";
import NewsCardListing from "./components/features/newsArticleListing/NewsArticleListing";
import { CategoryEnum } from "./domain/types/types";
import NavigationMenu from "./components/layouts/navigation/Navigation";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { updateCategory } from "./store/slices/articleSlice";

function App() {

  const dispatch = useAppDispatch();
  const selectedCategory = useAppSelector((state) => state.articles.category);


  const handleCategoryChange = (category: CategoryEnum): void => {
    dispatch(updateCategory(category));

  };

  return (
    <ConfigProvider theme={{
      algorithm: theme.defaultAlgorithm,
      token: {
        colorPrimary: "#000000", 
        colorText: "#000000", 
        colorBgContainer: "#ffffff", 
        colorBgElevated: "#ffffff",
        borderRadius: 8,
        fontFamily: "Inter, sans-serif",
      },
    }}>
      <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <NavigationMenu onChangeMenu={handleCategoryChange}/>
        <main className="container mx-auto px-4 py-8 flex-grow">
          <NewsCardListing category={selectedCategory}/>
        </main>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
