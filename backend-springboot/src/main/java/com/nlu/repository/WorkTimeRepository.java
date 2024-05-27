package com.nlu.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.WorkTime;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Long>{

    WorkTime findByStudent_Id(Long idStudent);

    WorkTime findByUser_IdAndExamNumber_Id(Long userId, Integer examNumberId);
}
