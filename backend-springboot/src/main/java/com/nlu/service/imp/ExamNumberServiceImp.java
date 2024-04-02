package com.nlu.service.imp;

import com.nlu.exception.ResourceNotExistException;
import com.nlu.model.entity.ExamNumber;
import com.nlu.model.entity.Question;
import com.nlu.repository.ExamNumberRepository;
import com.nlu.repository.OptionRepository;
import com.nlu.repository.QuestionRepository;
import com.nlu.repository.UserAnswerRepository;
import com.nlu.service.ExamNumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ExamNumberServiceImp implements ExamNumberService {
    @Autowired
    private ExamNumberRepository examNumberRepo;
    @Autowired
    private UserAnswerRepository userAnswerRepo;
    @Autowired
    private QuestionRepository questionRepo;
    @Autowired
    private OptionRepository optionRepo;

    @Override
    public ResponseEntity<ExamNumber> getExamNumberById(Long id, Long idUser) {
        ExamNumber examNumber = examNumberRepo.findById(id)
                .orElseThrow(() -> new ResourceNotExistException("No such exam"));
        Set<Question> listQuestions = examNumber.getListQuestions();

        return ResponseEntity.ok(examNumber);
    }
}
