import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import { ListExams } from "./pages/ListExams/ListExams";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ListExams />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />
    }
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}