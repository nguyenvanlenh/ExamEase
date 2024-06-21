import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { FormQuestion } from "./pages/FormQuestion/FormQuestion";
import { CreateExam } from "./pages/CreateExam/CreateExam";
import { CreateStudent } from "./pages/CreateStudent/CreateStudent";
import { ListExams } from "./pages/ListExams/ListExams";

import { ResultStatistics } from "./pages/Statistics/ResultStatistics";

import Examdetail from "./pages/examdetail/Examdetail";
import Examining from "./pages/examing/Examining";
import Result from "./pages/result/Result";
import Register from "./pages/register/Register";
import ExaminingRules from "./pages/examRules/ExaminingRules";
import { ManagementQuestion } from "./pages/ManagementQuestion/ManagementQuestion";
import LoginStudent from "./pages/loginStudent/LoginStudent";
import ExaminingStudent from "./pages/examiningStudent/ExaminingStudent";
import ResultStudent from "./pages/resultStudent/ResultStudent";
import { AdminLayout } from "./components/admin/Layout/AdminLayout";
import { Dashboard } from "./pages/admin/Dashboard/Dashboard";
import { ManagementExams } from "./pages/ManagementExams/ManagementExams";
import { Exams } from "./pages/admin/ManagementExams/ManagementExams";
import { Questions } from "./pages/admin/ManagementExams/ManagementQuestions";
import { Users } from "./pages/admin/ManagementUsers/ManagementUsers";


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

    },
    {
        path: "/register",
        element: <Register />

    },
    {
        path: "/create-exam",
        element: <CreateExam />
    },
    {
        path: "/form-question",
        element: <FormQuestion />
    },
    {
        path: "/create-student",
        element: <CreateStudent />
    },
    {
        path: "/statistics",
        element: <ResultStatistics />
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
    },
    {
        path: "/examining-rules",
        element: <ExaminingRules />

    },
    {
        path: "/manage-exam",
        element: <ManagementExams />
    },
    {
        path: "/manage-question",
        element: <ManagementQuestion />
    },
    {
        path: "/login-student",
        element: <LoginStudent />
    },
    {
        path: "/examining-student",
        element: <ExaminingStudent />
    },
    {
        path: "/result-student",
        element: <ResultStudent />
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "exams",
                element: <Exams />
            },
            {
                path: "question",
                element: <Questions />
            }
        ]
    }

]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
