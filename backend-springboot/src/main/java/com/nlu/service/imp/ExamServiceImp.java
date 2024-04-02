package com.nlu.service.imp;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nlu.exception.NotFoundException;
import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.request.OptionRequest;
import com.nlu.model.dto.request.QuestionRequest;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.Exam;
import com.nlu.model.entity.ExamNumber;
import com.nlu.model.entity.Option;
import com.nlu.model.entity.Question;
import com.nlu.model.entity.TimeExam;
import com.nlu.model.entity.User;
import com.nlu.repository.ExamNumberRepository;
import com.nlu.repository.ExamRepository;
import com.nlu.repository.OptionRepository;
import com.nlu.repository.QuestionRepository;
import com.nlu.repository.TimeExamRepository;
import com.nlu.repository.UserRepository;
import com.nlu.service.ExamService;
import com.nlu.utils.AuthenticationUtils;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
/**
 * Implementation of the ExamService interface providing operations related to exams.
 * This service handles the creation, update, deletion, and retrieval of exams.
 */
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class ExamServiceImp implements ExamService {

	TimeExamRepository timeExamRepository;
	ExamNumberRepository examNumberRepository;
	QuestionRepository questionRepository;
	OptionRepository optionRepository;
	ExamRepository examRepository;
	UserRepository userRepository;

	 /**
     * Creates an exam based on the provided request.
     * 
     * @param request The request containing exam details.
     * @return An ExamResponse object representing the created exam.
     * @throws NotFoundException if time or user is not found.
     */
	@Transactional
	@Override
	public ExamResponse createExam(ExamRequest request) {
		TimeExam timeExam = timeExamRepository.findById(request.getTimeId())
				.orElseThrow(() -> new NotFoundException("time not found"));
		User user = userRepository.findById(AuthenticationUtils.extractUserId())
				.orElseThrow(() -> new NotFoundException("user not found"));
		/**
		 * sequence: save exam -> save question(shuffled) -> save option -> save exam number
		 */
		Exam exam = new Exam();
		exam.setTimeExam(timeExam);
		exam.setTitle(request.getTitle());
		exam.setShortDescription(request.getShortDescription());
		exam.setDescription(request.getDescription());
		exam.setQuantityQuestion(request.getQuantityQuestion());
		exam.setPublic(request.getIsPublic());
		exam.setTeacher(user);
		Exam examSaved = examRepository.save(exam);

		List<ExamNumber> listExamNumbers = request.getLisExamNumberRequests().stream().map(itemExamNumber -> {
			ExamNumber examNumber = new ExamNumber();
			examNumber.setName(itemExamNumber.getName());
			examNumber.setExam(examSaved);
			// save question
			// shuffle the elements inside list question request
			List<QuestionRequest> shuffledQuestionRequests = new ArrayList<>(request.getListQuestionRequests());
			Collections.shuffle(shuffledQuestionRequests);
			List<Question> listQuestions = saveQuestion(shuffledQuestionRequests);

			examNumber.setListQuestions(new HashSet<>(listQuestions));
			return examNumber;
		}).toList();
		// save exam number
		examNumberRepository.saveAll(listExamNumbers);

		return ExamResponse.fromEntity(examSaved);
	}

	// save options with related question 
	private List<Option> saveOption(Question question, List<OptionRequest> lisOptionRequests) {
		List<Option> listOptions = lisOptionRequests.stream().map(itemOption -> {
			Option option = new Option();
			option.setQuestion(question);
			option.setNameOption(itemOption.getContent());
			option.setCorrect(itemOption.getIsCorrect());
			return option;
		}).toList();
		return optionRepository.saveAll(listOptions);
	}

	// save question
	private List<Question> saveQuestion(List<QuestionRequest> listQuestionRequests) {
		List<Question> listQuestion = listQuestionRequests.stream().map(itemQuestion -> {
			Question question = new Question();
			question.setNameQuestion(itemQuestion.getQuestion());
			Question questionSaved = questionRepository.save(question);
			// save list option
			saveOption(questionSaved, itemQuestion.getLisOptionRequests());
			return questionSaved;
		}).toList();
		return listQuestion;
	}

	/**
	 * Updates an existing exam based on the provided exam ID and request.
	 * 
	 * @param examId The ID of the exam to update.
	 * @param request The request containing updated exam details.
	 * @return An ExamResponse object representing the updated exam.
	 * @throws NotFoundException if the exam with the specified ID is not found.
	 */
	@Override
	public ExamResponse updateExam(Long examId, ExamRequest request) {
		Exam exam = examRepository.findById(examId)
				.orElseThrow(()-> new NotFoundException("Exam not found"));
		ExamRequest.toEntity(exam, request);
		return ExamResponse.fromEntity(exam);
	}

	@Override
	public void deleteExam(Long id) {
		examRepository.deleteById(id);
	}
	
	  /**
     * Updates the visibility of an exam.
     * 
     * @param examId The ID of the exam to update.
     * @param request The boolean value indicating whether the exam is public or not.
     * @return An ExamResponse object representing the updated exam.
     * @throws NotFoundException if the exam is not found.
     */
	@Override
	public ExamResponse updatePublicExam(Long examId, boolean request) {
		Exam exam = examRepository.findById(examId)
				.orElseThrow(() -> new NotFoundException("exam not found"));
		exam.setPublic(request);
		examRepository.save(exam);
		return ExamResponse.fromEntity(exam);
	}
	

}
