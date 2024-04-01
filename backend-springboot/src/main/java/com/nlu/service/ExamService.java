package com.nlu.service;

import com.nlu.model.dto.response.ExamResponse;
import org.springframework.stereotype.Service;


public interface ExamService {
    public ExamResponse getExamById(Long id);
}
