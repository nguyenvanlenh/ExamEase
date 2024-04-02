package com.nlu.service.imp;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nlu.exception.NotFoundException;
import com.nlu.model.dto.response.QuestionResponse;
import com.nlu.model.entity.Question;
import com.nlu.repository.OptionRepository;
import com.nlu.repository.QuestionRepository;
@Service
public class QuestionService {

	@Autowired private QuestionRepository questionRepository;
	@Autowired private OptionRepository optionRepository;
	@Transactional(readOnly = true)
	public QuestionResponse getQuesitonById(Long id) {
		Question question = questionRepository.findById(id)
				.orElseThrow(() -> new NotFoundException("Question not found"));
		return QuestionResponse.fromEntity(question);
	}
	public List<QuestionResponse> getQuestionByExamNumberId(Integer examNumberId) {
		
		return QuestionResponse.fromEntities(new HashSet<>(questionRepository.findByExamNumberId(examNumberId)));
		
	}
	
}
