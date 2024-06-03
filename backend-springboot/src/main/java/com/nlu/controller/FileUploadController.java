package com.nlu.controller;

import com.nlu.service.QuestionUploadFileService;
import com.nlu.utils.DocxReaderUtils;
import com.nlu.utils.ExcelReaderAnswersUtils;
import com.nlu.utils.PdfReaderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Autowired
    private QuestionUploadFileService questionUploadFileService;
    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("answerFile") MultipartFile answerFile) {

        questionUploadFileService.handleFileUpload(file, answerFile);
        return "File processed successfully.";
    }


}
