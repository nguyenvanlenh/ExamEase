package com.nlu.controller;

import com.nlu.model.dto.request.ExamRequest;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.repository.OptionRepository;
import com.nlu.repository.UserAnswerRepository;
import com.nlu.service.ExamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

	@Autowired
	private ExamService examService;
	@Autowired
	private UserAnswerRepository userAnswerRepository;
	@Autowired
	private OptionRepository optionRepository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ExamResponse createExam(@RequestBody ExamRequest request) {
		return examService.createExam(request);
	}

	@PutMapping("/{id}")
	public ExamResponse updateExam(@PathVariable Long id, @RequestBody ExamRequest request) {
		return examService.updateExam(id, request);
	}

	@PatchMapping("/{id}")
	public ExamResponse updatePublicExam(@PathVariable Long id,@RequestParam Boolean isPublic) {
		return examService.updatePublicExam(id, isPublic);
	}

	@GetMapping("/{id}")
	public ExamResponse getExam(@PathVariable Long id) {
		return examService.getExamById(id);
	}

//	@GetMapping
//	public List<ExamResponse> getExams() {
//		return examService.getAllExams();
//	}
	
//	@PutMapping("/{idStudent}/{idOp}/{idOpNew}")
//	public UserAnswer getTestAnswer(@PathVariable("idStudent") Long idS
//			, @PathVariable("idOp") Long idOp
//			, @PathVariable("idOpNew") Long idOpNew) {
//
//				UserAnswer u =	userAnswerRepository.findByStudent_IdAndOption_Id(idS, idOp);
//				Option newOption = optionRepository.findById(idOpNew)
//						.orElseThrow(()-> new NotFoundException("Option not found"));
//				u.setOption(newOption);
//				return userAnswerRepository.save(u);
//	}

	@GetMapping
	public ResponseEntity<Map<String, Object>>
	getExamsByTitle(
			@RequestParam(required = false) String title,
			@RequestParam(defaultValue = "0" ) int page,
			@RequestParam(defaultValue = "3") int size
		)
	{
		Pageable paging = PageRequest.of(page, size);
		return examService.getExamsByTitle(title, paging);
	}

	@GetMapping("/search")
	public ResponseEntity<Map<String, Object>>
	searchExamsByKeyWord(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "3") int size
        )
	{
		Pageable paging = PageRequest.of(page, size);
		return examService.searchExamsByKeyWord(keyword, paging);
	}
}