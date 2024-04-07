package com.nlu.service;

import com.nlu.model.dto.response.ExamNumberResponse;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.ExamNumber;
import org.springframework.http.ResponseEntity;

public interface ExamNumberService {
    ExamResponse getExamNumberUser(Integer id, Long idUser);
    ExamResponse getExamNumberStudent(Long idStudent);
}
