import { MainLayout } from "./layout/main-layout";
import { Route, Routes } from "react-router-dom";
import { LoginUser } from "./service/loginUser";
import TableComponent from "./components/table";
import { CreateCategory } from "./components/create-category";
import { Tabb } from "./components/tab";
import { CreateSubCategory } from "./components/Create-Sub-Category";
import { SubCategory } from "./components/subCategory";
import Brand from "./components/Brand";
import { CreateBrand } from "./components/createBrand";
import Banner from "./components/Banner";
import { CreateBanner } from "./components/createBanner";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/app" element={<MainLayout />}>
                <Route index element={<TableComponent />} />

                <Route path="Tab-category" element={<Tabb />} />
                <Route path="create-category" element={<CreateCategory />} />
                <Route
                    path="/app/Sub-category/sub-category-create"
                    element={<CreateSubCategory />}
                />
                <Route path="Sub-category" element={<SubCategory />} />
                <Route path="Brand-list" element={<Brand />} />
                <Route
                    path="Brand-list/create-brand"
                    element={<CreateBrand />}
                />
                <Route path="Banner-list" element={<Banner />} />
                <Route
                    path="Banner-list/create-banner"
                    element={<CreateBanner />}
                />
            </Route>
        </Routes>
    );
}

export default App;
