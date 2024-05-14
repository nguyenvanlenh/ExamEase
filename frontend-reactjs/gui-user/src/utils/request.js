export const RequestData = () => {

    const ExamRequest = (teacherId, title, shortDescription, description, quantityQuestion, timeId, categoryId, startTime, endTime, isPublic, lisExamNumberRequests, listQuestionRequests) => {
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
            lisExamNumberRequests: lisExamNumberRequests,
            listQuestionRequests: listQuestionRequests
        };
    }

    const ExamNumberRequest = (id, name) => {
        return {
            id: id,
            name: name
        };
    }

    const OptionRequest = (id, content, isCorrect) => {
        return {
            id: id,
            content: content,
            isCorrect: isCorrect
        };
    }

    const QuestionRequest = (id, question, listOptionRequests) => {
        return {
            id: id,
            question: question,
            listOptionRequests: listOptionRequests
        };
    }

    const LoginRequest = (username, password) => {
        return {
            username: username,
            password: password
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
        OptionRequest
    };
}