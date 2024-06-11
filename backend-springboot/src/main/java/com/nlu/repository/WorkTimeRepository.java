package com.nlu.repository;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import com.nlu.model.dto.response.WorkTimeResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.WorkTime;
import org.springframework.data.jpa.repository.Query;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Long>{

    WorkTime findByStudent_Id(Long idStudent);

    WorkTime findByUser_IdAndExamNumber_Id(Long userId, Integer examNumberId);
    List<WorkTime> findAllByUser_IdOrderByBeginExamDesc(Long id);

    WorkTime findByStudent_IdAndExamNumber_Id(Long students, Integer examNumberId);
}
