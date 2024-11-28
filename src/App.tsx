import { MainLayout } from "./layout/main-layout";
import { Route,Routes } from "react-router-dom";
import { LoginUser } from "./service/loginUser";

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<LoginUser />} />
     <Route path="/app" element={<MainLayout />} />
     </Routes>
       
    </>
  )
}

export default App
