package com.nlu.service.imp;

import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.dto.response.ExamNumberResponse;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.Exam;
import com.nlu.model.entity.WorkTime;
import com.nlu.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nlu.exception.NotFoundException;
import com.nlu.model.entity.ExamNumber;
import com.nlu.model.entity.Question;
import com.nlu.service.ExamNumberService;

@Service
public class ExamNumberServiceImp implements ExamNumberService {
    @Autowired
    private ExamNumberRepository examNumberRepo;
    @Autowired
    private ExamRepository examRepository;

    @Override
    public ExamResponse getExamNumberUser(Integer id, Long idUser) {
        Exam exam = examRepository.findByExamNumbers_Id(id);
        Set<ExamNumber>  examNumberList = exam.getExamNumbers()
                .stream()
                .filter(item -> item.getId().equals(id)).collect(Collectors.toSet());
        exam.setExamNumbers(examNumberList);
        return ExamResponse.fromEntity(exam);
    }

    @Override
    public ExamResponse getExamNumberStudent(Long idStudent) {
//        Exam exam = examRepository.findByExamNumbers_Id(id);
//        Set<ExamNumber>  examNumberList = exam.getExamNumbers()
//                .stream()
//                .filter(item -> item.getId().equals(id)).collect(Collectors.toSet());

        return null;
    }


}
