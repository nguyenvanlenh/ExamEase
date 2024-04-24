import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import { FormQuestion } from "./pages/FormQuestion/FormQuestion";
import { CreateExam } from "./pages/CreateExam/CreateExam";
import { CreateStudent } from "./pages/CreateStudent/CreateStudent";
import { ListExams } from "./pages/ListExams/ListExams";

import { ResultStatistics } from "./pages/Statistics/ResultStatistics";

import Examdetail from "./pages/examdetail/Examdetail";
import Examining from "./pages/examing/Examining";
import Result from "./pages/result/Result";


export const router = createBrowserRouter([
    {
        path: "/",

        element: <Home />

    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/login",
        element: <Login />

    }
    ,
    {
        path: "/create-exam",
        element: <CreateExam />
    }
    ,
    {
        path: "/form-question",
        element: <FormQuestion />
    },
    {
        path: "/create-student",
        element: <CreateStudent />
    },
    {
        path: "/list-exams",
        element: <ListExams />
    },
    {
        path: "/exam-detail",
        element: <Examdetail />
    },
     {
        path: "examining",
        element: <Examining />
     },
     {
        path: "/result",
        element: <Result />
     }

]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
