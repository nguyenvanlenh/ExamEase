package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nlu.model.entity.Student;
@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{

}
