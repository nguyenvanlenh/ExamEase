package com.nlu.controller;

import com.nlu.utils.DocxReader;
import com.nlu.utils.PdfReader;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        String fileType = file.getContentType();

        try {
            if (fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                // Đọc file DOCX
                DocxReader.readDocxFile(file.getInputStream());
            } else if (fileType.equals("application/pdf")) {
                // Đọc file PDF
                PdfReader.readPdfFile(file.getInputStream());
            } else {
                return "Unsupported file type.";
            }
        } catch (IOException e) {
            e.printStackTrace();
            return "Error reading file.";
        }

        return "File processed successfully.";
    }
}
