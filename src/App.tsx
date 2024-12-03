import { MainLayout } from "./layout/main-layout";
import { Route, Routes } from "react-router-dom";
import { LoginUser } from "./service/loginUser";
import TableComponent from "./components/table";
import { CreateCategory } from "./components/create-category";
import { Tabb } from "./components/tab";
import { CreateSubCategory } from "./components/Create-Sub-Category";
import { SubCategory } from "./components/subCategory";
import { TabSub } from "./components/TabSub";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginUser />} />
            <Route path="/app" element={<MainLayout />}>
                <Route index element={<TableComponent />} />
                <Route path="Tab-category" element={<Tabb />} />
                <Route path="create-category" element={<CreateCategory />} />
                <Route
                    path="create-sub-category"
                    element={<CreateSubCategory />}
                />
                <Route path="Sub-category" element={<SubCategory />} />
                <Route
                    path="Sub-category/Tab-Sub-category"
                    element={<TabSub />}
                />
            </Route>
        </Routes>
    );
}

export default App;
