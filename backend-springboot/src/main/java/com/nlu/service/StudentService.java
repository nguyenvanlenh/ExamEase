package com.nlu.service;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.nlu.model.entity.Student;

public interface StudentService {
	void save(MultipartFile file,String codeGroup);
	List<Student> findAll();

	ResponseEntity<ByteArrayResource>  downloadExcelFileByCodeGroup(String codeGroup);
}
