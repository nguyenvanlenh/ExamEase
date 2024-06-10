package com.nlu.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import com.nlu.exception.NotFoundException;
import com.nlu.model.dto.response.ExamResultResponse;
import com.nlu.model.entity.Exam;
import com.nlu.model.entity.Student;
import com.nlu.model.entity.WorkTime;
import com.nlu.repository.ExamRepository;
import com.nlu.repository.StudentRepository;
import com.nlu.repository.WorkTimeRepository;
@Service
public class ResultService {
	
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private WorkTimeRepository workTimeRepository;
	@Autowired
	private ExamNumberService examNumberService;

	@Transactional
	public Map<String, Object> getAllResultOfStudentByCodeGroupTest(String codeGroup) {
	    Map<String, Object> result = new HashMap<>();

	    Exam exam = examRepository.findByCodeGroup(codeGroup);
	    if (ObjectUtils.isEmpty(exam)) {
	        throw new NotFoundException("code_group_not_found",codeGroup);
	    }

	    List<Student> listStudents = studentRepository.findByCodeGroup(codeGroup);
	    if (listStudents.isEmpty()) {
	        result.put("title", exam.getTitle());
	        result.put("listResult", Collections.emptyList());
	        return result;
	    }

	    Map<Long, WorkTime> workTimesByStudentId = workTimeRepository.findByStudentIdIn(
	            listStudents.stream().map(Student::getId).toList())
	    		.stream().collect(Collectors.toMap(
	            workTime -> workTime.getStudent().getId(),
	            workTime -> workTime
	    ));

	    List<ExamResultResponse> listExamResults = listStudents.stream()
	            .map(student -> {
	                WorkTime workTime = workTimesByStudentId.get(student.getId());
	                if (!ObjectUtils.isEmpty(workTime)) {
	                    return examNumberService.getExamResultStudent(
	                            workTime.getExamNumber().getId().longValue(), student.getId()
	                    );
	                }
	                return null;
	            })
	            .filter(Objects::nonNull)
	            .toList();

	    result.put("title", exam.getTitle());
	    result.put("listResult", listExamResults);
	    return result;
	}
	@Transactional
	public Map<String, Object> getAllResultOfStudentByCodeGroup(String codeGroup) {
		Map<String, Object> result = new HashMap<>();
		
		Exam exam = examRepository.findByCodeGroup(codeGroup);
		List<ExamResultResponse> listExamResults = new ArrayList<>(); 
		List<Student> listStudents = studentRepository.findByCodeGroup(codeGroup);
		listStudents.forEach(student -> {
			WorkTime workTime = workTimeRepository.findByStudent_Id(student.getId());
			ExamResultResponse rs = 
					examNumberService.getExamResultStudent(workTime.getExamNumber().getId().longValue(),student.getId());
			listExamResults.add(rs);
		});
		
		result.put("title", exam.getTitle());
		result.put("listResult", listExamResults);
		return result;
	}

}
