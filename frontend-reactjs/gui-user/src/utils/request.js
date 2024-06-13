export const RequestData = () => {

    const ExamRequest = (teacherId, title, shortDescription, description, quantityQuestion, timeId, categoryId, startTime, endTime, isPublic, listExamNumberRequests, listQuestionRequests) => {
        return {
            teacherId: teacherId,
            title: title,
            shortDescription: shortDescription,
            description: description,
            quantityQuestion: quantityQuestion,
            timeId: timeId,
            categoryId: categoryId,
            startTime: startTime,
            endTime: endTime,
            isPublic: isPublic,
            listExamNumberRequests: listExamNumberRequests,
            listQuestionRequests: listQuestionRequests
        };
    }

    const ExamNumberRequest = (name) => {
        return {
            name: name
        };
    }
    const QuestionRequest = (id, question, listOptionRequests) => {
        return {
            id: id,
            question: question,
            listOptionRequests: listOptionRequests
        };
    }
    const OptionRequest = (id, content, isCorrect) => {
        return {
            id: id,
            content: content,
            isCorrect: isCorrect
        };
    }



    const LoginRequest = (username, password) => {
        return {
            username: username,
            password: password
        };
    }

    const LoginStudentRequest = (email, password, codeGroup) => {
        return {
            email: email,
            password: password,
            codeGroup: codeGroup
        };
    }

    const RegisterRequest = (username, password, email, listRoles) => {
        return {
            username: username,
            password: password,
            email: email,
            listRoles: listRoles
        };
    }

    return {
        LoginRequest,
        RegisterRequest,
        ExamRequest,
        ExamNumberRequest,
        QuestionRequest,
        OptionRequest,
        LoginStudentRequest
    };
}