package com.nlu.repository;

import com.nlu.model.dto.response.StudentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.nlu.model.entity.Student;
import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long>{
 	@Query("SELECT new Student(s.id, s.code, s.fullname, s.email) " +
			"FROM Student s " +
			"WHERE s.codeGroup = :codeGroup")
	List<Student> findByCodeGroup(String codeGroup);
	 @Query("SELECT w.examNumber.id " +
			 "FROM Student s " +
			 "JOIN WorkTime w ON s.id = w.student.id " +
			 "WHERE s.id = :idStudent")
	Long findIdExamByIdStudent(Long idStudent);
}
