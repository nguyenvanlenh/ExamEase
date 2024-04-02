package com.nlu.service.imp;

import com.nlu.exception.ResourceExistedException;
import com.nlu.exception.ResourceNotExistException;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.Exam;
import com.nlu.repository.ExamRepository;
import com.nlu.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
@Service
public class ExamServiceImp implements ExamService {
    @Autowired
    private ExamRepository examRepository;
    @Override
    public ResponseEntity<ExamResponse> getExamById(Long id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new ResourceNotExistException("Exam not found with id:"+ id));

        ExamResponse examResponse = ExamResponse.builder()
                .id(exam.getId())
                .title(exam.getTitle())
                .description(exam.getDescription())
                .quantityQuestion(exam.getQuantityQuestion())
                .build();

        return ResponseEntity.ok(examResponse);
    }
}
