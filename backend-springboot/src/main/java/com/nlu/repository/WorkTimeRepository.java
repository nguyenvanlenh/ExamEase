package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nlu.model.entity.WorkTime;

public interface WorkTimeRepository extends JpaRepository<WorkTime, Long>{

}
