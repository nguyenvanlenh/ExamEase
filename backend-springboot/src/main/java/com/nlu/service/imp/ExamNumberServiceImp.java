package com.nlu.service.imp;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nlu.exception.NotFoundException;
import com.nlu.model.entity.ExamNumber;
import com.nlu.model.entity.Question;
import com.nlu.repository.ExamNumberRepository;
import com.nlu.repository.OptionRepository;
import com.nlu.repository.QuestionRepository;
import com.nlu.repository.UserAnswerRepository;
import com.nlu.service.ExamNumberService;

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
    public ResponseEntity<ExamNumber> getExamNumberById(Integer id, Long idUser) {
        ExamNumber examNumber = examNumberRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("No such exam"));
        Set<Question> listQuestions = examNumber.getListQuestions();

        return ResponseEntity.ok(examNumber);
    }
}
