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
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./pages/Error/NotFound";
import { ROLE_ADMIN, ROLE_TEACHER, ROLE_USER } from "./utils/constants";
import { CreateExamAdmin } from "./pages/admin/ManagementExams/CreateExamAdmin";
import { CreateQuestionAdmin } from "./pages/admin/ManagementExams/CreateQuestionAdmin";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER, ROLE_ADMIN]}><Home /></ProtectedRoute>
    },
    {
        path: "/home",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER, ROLE_ADMIN]}><Home /></ProtectedRoute>
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
        element: <ProtectedRoute roles={[ROLE_TEACHER]}><CreateExam /></ProtectedRoute>
    },
    {
        path: "/form-question",
        element: <ProtectedRoute roles={[ROLE_TEACHER]}><FormQuestion /></ProtectedRoute>
    },
    {
        path: "/create-student",
        element: <ProtectedRoute roles={[ROLE_TEACHER]}><CreateStudent /></ProtectedRoute>
    },
    {
        path: "/statistics",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER]}><ResultStatistics /></ProtectedRoute>
    },
    {
        path: "/list-exams",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER]}><ListExams /></ProtectedRoute>
    },
    {
        path: "/exam-detail",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER, ROLE_ADMIN]}><Examdetail /></ProtectedRoute>
    },
    {
        path: "examining",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER]}><Examining /></ProtectedRoute>
    },
    {
        path: "/result",
        element: <ProtectedRoute roles={[ROLE_TEACHER, ROLE_USER]}><Result /></ProtectedRoute>
    },
    {
        path: "/examining-rules",
        element: <ExaminingRules />

    },
    {
        path: "/manage-exam",
        element: <ProtectedRoute roles={[ROLE_TEACHER]}><ManagementExams /></ProtectedRoute>
    },
    {
        path: "/manage-question",
        element: <ProtectedRoute roles={[ROLE_TEACHER]}><ManagementQuestion /></ProtectedRoute>
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
        element: <ProtectedRoute roles={[ROLE_ADMIN]}><AdminLayout /></ProtectedRoute>,
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
            },
            {
                path: "create-exam",
                element: <CreateExamAdmin />
            }, {
                path: "create-question",
                element: <CreateQuestionAdmin />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }

]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}
