package com.nlu.service.imp;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

import com.nlu.exception.ResourceNotExistException;
import com.nlu.model.dto.response.ExamNumberResponse;
import com.nlu.model.dto.response.ExamResponse;
import com.nlu.model.entity.*;
import com.nlu.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nlu.exception.NotFoundException;
import com.nlu.service.ExamNumberService;

@Service
public class ExamNumberServiceImp implements ExamNumberService {
    @Autowired
    private ExamNumberRepository examNumberRepo;
    @Autowired
    private ExamRepository examRepository;
    @Autowired
    private WorkTimeRepository workTimeRepo;
    @Autowired
    private StudentRepository studentRepository;

    @Override
    public ExamResponse getExamNumberUser(Integer id, Long idUser) {
        Exam exam = examRepository.findByExamNumbers_Id(id);
        Set<ExamNumber>  examNumberList = exam.getExamNumbers()
                .stream()
                .filter(item -> item.getId().equals(id)).collect(Collectors.toSet());
        exam.setExamNumbers(examNumberList);
        return ExamResponse.fromEntity(exam);
    }

    @Override
    public ExamResponse getExamNumberStudent(Long idStudent) {

        // get exam by idStudent
        WorkTime workTime = workTimeRepo.findByStudent_Id(idStudent);
        ExamNumber examNumber = workTime.getExamNumber();
        Integer idExamNumber = examNumber.getId();
        Exam exam = examRepository.findByExamNumbers_Id(idExamNumber);

        Set<ExamNumber>  examNumberList = exam.getExamNumbers()
                .stream()
                .filter(item -> item.getId().equals(idExamNumber)).collect(Collectors.toSet());
        exam.setExamNumbers(examNumberList);

        // check expiry equal time between start_time and end_time
        long startTime = exam.getStartTime().getTime();
        long endTime = exam.getEndTime().getTime();
        long timeNow = new Timestamp(System.currentTimeMillis()).getTime();

        if(timeNow < startTime || timeNow > endTime) {
            throw new ResourceNotExistException("Outside exam time");
        }
        return ExamResponse.fromEntity(exam);
    }


}
