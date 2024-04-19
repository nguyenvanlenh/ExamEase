import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import { ListExams } from "./pages/ListExams/ListExams";
import Examdetail from "./pages/examdetail/Examdetail";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Examdetail />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/exam-detail",
        element: <Examdetail />
    }
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}