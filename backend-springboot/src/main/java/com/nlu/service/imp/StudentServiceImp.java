package com.nlu.service.imp;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.nlu.model.entity.Student;
import com.nlu.model.entity.User;
import com.nlu.repository.StudentRepository;
import com.nlu.repository.UserRepository;
import com.nlu.service.StudentService;
import com.nlu.util.AuthenticationUtils;
import com.nlu.util.ExcelUtils;
@Service
public class StudentServiceImp implements StudentService{

	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private UserRepository userRepository;
	@Override
	public void save(MultipartFile file) {
		try {
			User teacher = userRepository.findById(AuthenticationUtils.extractUserId())
					.orElseThrow(() -> new RuntimeException("teacher not found!"));
			List<Student> listStudents = ExcelUtils.toListStudents(file.getInputStream());
			createAndSaveListStudentOfTeacher( teacher,  listStudents);
			
		} catch (IOException ex) {
			 throw new RuntimeException("Excel data is failed to store: " + ex.getMessage());
		}
		
	}

	@Override
	public List<Student> findAll() {
		 return studentRepository.findAll();
	}
	
	private void createAndSaveListStudentOfTeacher(User teacher, List<Student> listStudents) {
		listStudents.forEach(student ->{
			student.setTeacher(teacher);
			student.setUsername(student.getCode());
			student.setPassword(student.getCode());
			studentRepository.save(student);
		});
	}

	
}
