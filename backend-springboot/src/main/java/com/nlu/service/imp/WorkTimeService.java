package com.nlu.service.imp;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import com.nlu.exception.NotFoundException;
import com.nlu.model.dto.response.ExamResultResponse;
import com.nlu.model.dto.response.WorkTimeResponse;
import com.nlu.model.entity.Exam;
import com.nlu.model.entity.ExamNumber;
import com.nlu.model.entity.Student;
import com.nlu.model.entity.User;
import com.nlu.model.entity.WorkTime;
import com.nlu.repository.ExamNumberRepository;
import com.nlu.repository.ExamRepository;
import com.nlu.repository.StudentRepository;
import com.nlu.repository.UserRepository;
import com.nlu.repository.WorkTimeRepository;
import com.nlu.service.ExamNumberService;

@Service
public class WorkTimeService {

	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private WorkTimeRepository workTimeRepository;
	@Autowired
    private ExamNumberRepository examNumberRepository;
	@Autowired
	private ExamNumberService examNumberService;

	@Transactional
	public boolean createWorkTime(Long examId) {
		Exam exam = examRepository.findById(examId)
				.orElseThrow(() -> new NotFoundException("exam_not_found",examId));
		String codeGroup = exam.getCodeGroup();

		List<ExamNumber> listExamNumbers = exam.getExamNumbers().stream().toList();

		List<Student> listStudents = studentRepository.findByCodeGroup(codeGroup);

		AtomicInteger examNumberIndex = new AtomicInteger(0);
		listStudents.forEach(student -> {
		    ExamNumber examNumber = listExamNumbers.get(examNumberIndex.get());
		    createWorkTime(student, examNumber);
		    examNumberIndex.set((examNumberIndex.get() + 1) % listExamNumbers.size());
		});

		return true;
	}

	private WorkTime createWorkTime(Student student, ExamNumber examNumber) {
		WorkTime workTime = new WorkTime();
		workTime.setStudent(student);
		workTime.setExamNumber(examNumber);
		return workTimeRepository.save(workTime);
	}
	
	public boolean addWorkTimeByUser(Long userId, Integer examNumberId , Integer timeExam) {

		WorkTime workTimeCheck = getWorkTimeByUser(userId, examNumberId);
		if(workTimeCheck != null) return false;

		Timestamp beginExam = new Timestamp(System.currentTimeMillis()); 
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("user not found"));
		ExamNumber examNumber = examNumberRepository.findById(examNumberId).orElseThrow(() -> new RuntimeException("exam not found"));
		WorkTime workTime = new WorkTime();
		workTime.setUser(user);
		workTime.setExamNumber(examNumber);
		workTime.setBeginExam(beginExam);
		workTime.setEndExam(new Timestamp(beginExam.getTime() + timeExam*60000));
		return workTimeRepository.save(workTime) != null;
	}

	public WorkTime getWorkTimeByUser(Long userId, Integer examNumberId) {
		return workTimeRepository.findByUser_IdAndExamNumber_Id(userId, examNumberId);
	}

	public boolean updateEndExamWorkTimeByUser(Long userId, Integer examNumberId, Timestamp endExam) {
		    // Find the existing WorkTime entry
			WorkTime workTime = getWorkTimeByUser(userId, examNumberId);
    
			if (workTime == null) {
				return false;
			}
			workTime.setEndExam(endExam);
			return workTimeRepository.save(workTime) != workTime;
	}

	public boolean removeWorkTimeByUser(Long userId, Integer examNumberId) {
		 // Find the existing WorkTime entry
		 WorkTime workTime = getWorkTimeByUser(userId, examNumberId);
		 if (workTime == null) {
			 return false;
		 }
		 try {
			workTimeRepository.delete(workTime);
		 } catch (Exception e) {
			return false;
		 }
		 return true;
	}

	@Transactional
    public List<WorkTimeResponse> getAllWorkTimeByUser(Long id) {
		List<WorkTime> workTimes = workTimeRepository.findAllByUser_IdOrderByBeginExamDesc(id);
		List<WorkTimeResponse> workTimeResponses = new ArrayList<>();
		for (WorkTime workTime : workTimes) {
			Long idExamNumber = Long.valueOf(workTime.getExamNumber().getId());
			Integer totalCorrect = examNumberRepository.getExamNumberQuestionCorrectByIdExamAndIdUser(idExamNumber, id);
			Integer totalQuestion = examNumberRepository.getExamNumberCountById(idExamNumber);
			String title = examNumberRepository.getExamNumberExamTitleById(idExamNumber);
			String result = totalCorrect +"/"+ totalQuestion;
			long milliseconds = workTime.getEndExam().getTime() - workTime.getBeginExam().getTime();
			Integer completionTime = (int) TimeUnit.MILLISECONDS.toSeconds(milliseconds);
			WorkTimeResponse workTimeResponse = WorkTimeResponse.builder()
					.id(workTime.getId())
					.idExamNumber(workTime.getExamNumber().getId())
					.time(workTime.getExamNumber().getExam().getTimeExam().getId()+"")
					.completionTime(completionTime)
					.workDay(workTime.getBeginExam())
					.result(result)
					.title(title)
					.build();
			workTimeResponses.add(workTimeResponse);
		}
		return workTimeResponses;
    }
	
}
