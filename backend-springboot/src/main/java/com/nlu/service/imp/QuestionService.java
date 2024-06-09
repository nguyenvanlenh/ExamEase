package com.nlu.service.imp;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.model.dto.response.QuestionResultResponse;
import com.nlu.utils.AuthenticationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nlu.exception.NotFoundException;
import com.nlu.model.dto.request.OptionRequest;
import com.nlu.model.dto.request.QuestionRequest;
import com.nlu.model.dto.response.QuestionResponse;
import com.nlu.model.entity.Option;
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
	@Transactional(readOnly = true)
	public List<QuestionResponse> getQuestionByExamNumberId(Integer examNumberId) {
		return QuestionResponse.fromEntities(questionRepository.findByListExamNumbers_Id(examNumberId));
	}
	
	
	public void updateQuestion(Long idQuestion, QuestionRequest request) {
		Question question = questionRepository.findById(idQuestion)
				.orElseThrow(() -> new NotFoundException("Question not found"));
		question.setNameQuestion(request.getQuestion());
		Question questionUpdated = questionRepository.save(question);
		List<Option> listOptionsFromRequest = OptionRequest.toEntities(request.getListOptionRequests());
		Set<Option> listOptions = listOptionsFromRequest.stream()
				.map(option -> {
				option.setQuestion(questionUpdated);
				return optionRepository.save(option);
				})
				.collect(Collectors.toSet());
		question.setOptions(listOptions);
	}

	public List<QuestionResultResponse> getQuestionResult(Integer examNumberId) {
		Long idUser = AuthenticationUtils.extractUserId();
		return questionRepository.questionResult(examNumberId, idUser);
	}
}
