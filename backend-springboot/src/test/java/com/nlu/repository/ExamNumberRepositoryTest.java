package com.nlu.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class ExamNumberRepositoryTest {
    @Autowired
    private ExamNumberRepository examNumberRepository;
    @Test
    public void testSubmitExamNumber() {
        int total = examNumberRepository.getExamNumberCountById(1L);
        System.out.println("total: "+ total);

        int totalCorrect = examNumberRepository.getExamNumberQuestionCorrectByIdExamAndIdUser(1L, 1L);
        System.out.println("totalCorrect: "+totalCorrect);

        int totalWrong = examNumberRepository.getExamNumberQuestionWrongByIdExamAndIdUser(1L, 1L);
        System.out.println("totalWrong: "+ totalWrong);

        String nameExam = examNumberRepository.getExamNumberExamTitleById(1L);
        System.out.println("nameExam: "+nameExam);
    }

}