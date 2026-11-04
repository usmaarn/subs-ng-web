import { BrowserRouter, Route, Routes } from "react-router"
import { ErrorPage } from "./pages/ErrorPage"
import { HomePage } from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route errorElement={<ErrorPage />}>
                    <Route index element={<HomePage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
                <Route path="app">
                    {/* <Route index element={<DashboardPage />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
}