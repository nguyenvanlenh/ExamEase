package com.nlu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.nlu.service.StudentService;
import com.nlu.util.ExcelUtils;

@RestController
@RequestMapping("/api/student")
public class StudentController {

	@Autowired
	private StudentService studentService;

	@PostMapping("/excel/upload")
	public ResponseEntity<?> uploadFileExcel(@RequestParam(name = "file") MultipartFile file) {
		String message = "";
		if (ExcelUtils.hasExcelFormat(file)) {
			try {
				studentService.save(file);
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

}
