import { MainLayout } from "./layout/main-layout";
import { Route, Routes } from "react-router-dom";
import { LoginUser } from "./service/loginUser";
// import TableComponent from "./components/table";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginUser />} />
                <Route path="/app" element={<MainLayout />}>
                    {/* <Route path="/app" element={<TableComponent />} /> */}
                </Route>
            </Routes>
        </>
    );
}

export default App;
