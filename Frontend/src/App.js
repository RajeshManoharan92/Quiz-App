import './index.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RequireAuthUser, RequireAuthAdmin } from "./RequiredAuth";
import { AuthProvider } from "./auth";
import { Login } from "./components/login";
import { Admin } from "./components/Admin"
import { Register } from "./components/Register"
import { Adminlogin } from "./components/AdminLogin"
import { Userlogin } from "./components/UserLogin"
import { Createquestion } from "./components/CreateQuestion"
import { Enquirydetails } from "./components/EnquiryDetails"
import { Quizstart } from "./components/QuizStart"
import { Dashboard } from "./components/Dashboard"
import { Result } from "./components/Result"
import { Contactus } from "./components/ContactUs"


export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<RequireAuthAdmin><Admin /></RequireAuthAdmin>} />
            <Route path="/register" element={<Register />} />
            <Route path="/userlogin" element={<Userlogin />} />
            <Route path="/adminlogin" element={<Adminlogin />} />
            <Route path="/dashboard" element={<RequireAuthUser><Dashboard /></RequireAuthUser>} />
            <Route path="/listofquestion" element={<RequireAuthAdmin><Createquestion /></RequireAuthAdmin>} />
            <Route path="/Quizstart" element={<RequireAuthUser><Quizstart /></RequireAuthUser>} />
            <Route path="/Cart" element={<RequireAuthUser><Result /></RequireAuthUser>} />
            <Route path="/contactus" element={<RequireAuthUser><Contactus /></RequireAuthUser>} />
            <Route path="/Enquirydetails" element={<RequireAuthAdmin><Enquirydetails /></RequireAuthAdmin>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}























