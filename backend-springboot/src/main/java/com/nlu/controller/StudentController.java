package com.nlu.controller;

import com.nlu.model.entity.Student;
import com.nlu.repository.StudentRepository;
import com.nlu.utils.ExcelStudentPointUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.nlu.service.StudentService;
import com.nlu.utils.ExcelUtils;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {
	
	@Autowired
	private StudentService studentService;

	@PostMapping("/import")
	public ResponseEntity<?> uploadFileExcel(@RequestParam(name = "file") MultipartFile file,
			@RequestParam(name = "code_group") String codeGroup ){
		String message = "";
		if(ExcelUtils.hasExcelFormat(file)) {
			try {
				studentService.save(file,codeGroup);
				return ResponseEntity.status(HttpStatus.CREATED)
						.body("upload FILE success!");
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED)
						.body("upload FILE fail!");
			}
		}
		 message = "Please upload an excel file!";
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(message);
	}
	@GetMapping("/download/{codeGroup}")
	public ResponseEntity<ByteArrayResource> downloadExcelFileByCodeGroup(@PathVariable String codeGroup) {
		return studentService.downloadExcelFileByCodeGroup(codeGroup);
	}
}
