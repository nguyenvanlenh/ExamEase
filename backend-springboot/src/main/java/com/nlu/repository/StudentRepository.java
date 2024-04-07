package com.nlu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nlu.model.entity.Student;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
 
	List<Student> findByCodeGroup(String codeGroup);
	
}
