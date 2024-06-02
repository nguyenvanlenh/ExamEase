export const listQuestionLocalStorage = {
    save: (list) => {
        localStorage.setItem('listQuestions', JSON.stringify(list));
    },
    get: () => {
        return JSON.parse(localStorage.getItem('listQuestions'));
    },
    update: (idQuestion, idOption) => {
        const list = JSON.parse(localStorage.getItem('listQuestions'))
        if(list) {
            const updatedList = list.map(question => {
                if (question.id === idQuestion) {
                  return { ...question, done: true, idAnswerSelected: Number(idOption) };
                }
                return question;
              });
            
              localStorage.setItem('listQuestions', JSON.stringify(updatedList));
        }
        
    },
    remove: ()=> {
        localStorage.removeItem('listQuestions');
    },
    getById: (idQuestion)=> {
        const list = JSON.parse(localStorage.getItem('listQuestions'))
        if(list) {
            return list.find(question => question.id === idQuestion);
        }
        return null;
    }
}

export const examiningLocalStorage = {
    save: (object) => {
        localStorage.setItem('examining', JSON.stringify(object));
    },
    get: () => {
        return JSON.parse(localStorage.getItem('examining'));
    },
    remove: () => {
        localStorage.removeItem('examining');
    }
}

export const authLocalStorage = {
    save: (object) => {
        localStorage.setItem('auth', JSON.stringify(object));
    },
    get: () => {
        return JSON.parse(localStorage.getItem('auth'));
    },
    remove: () => {
        localStorage.removeItem('auth');
    }
}

export const idExamNumberLocalStorage = {
    save: (object) => {
        localStorage.setItem('idExamNumber', JSON.stringify(object));
    },
    get: () => {
        return JSON.parse(localStorage.getItem('idExamNumber'));
    },
    remove: () => {
        localStorage.removeItem('idExamNumber');
    }
}

export const examWorkedsLocalStorage = {
    save: (object) => {
        localStorage.setItem('examWorkeds', JSON.stringify(object));
    },
    get: () => {
        return JSON.parse(localStorage.getItem('examWorkeds'));
    },
    remove: () => {
        localStorage.removeItem('examWorkeds');
    }
}