package com.nlu.service;

import com.nlu.model.model.QuestionUploadFile;
import com.nlu.utils.DocxReaderUtils;
import com.nlu.utils.ExcelReaderAnswersUtils;
import com.nlu.utils.PdfReaderUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class QuestionUploadFileService {
    public List<Object> handleFileUpload(MultipartFile file, MultipartFile answerFile) {
        String fileType = file.getContentType();
        String answerFileType = answerFile.getContentType();
        List<QuestionUploadFile> questionUploadFiles;
        try {
            // Xử lý file DOCX hoặc PDF
            if (fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                questionUploadFiles = DocxReaderUtils.readDocxFile(file.getInputStream());
            } else if (fileType.equals("application/pdf")) {
                questionUploadFiles = PdfReaderUtils.readPdfFile(file.getInputStream());
            } else {
                return null;
            }
            // Xử lý file Excel
            if (questionUploadFiles!=null && answerFileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
                Map<Integer, String> answers = ExcelReaderAnswersUtils.read(answerFile.getInputStream());
                // In ra hoặc xử lý đáp án từ file Excel
                answers.forEach((questionNumber, answer) -> {
                    System.out.println("Question " + questionNumber + ": " + answer);
                    questionUploadFiles.get(questionNumber-1).setCorrect(answer);
                });
            } else {
                return null;
            }
            System.out.println(questionUploadFiles);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
        return null;

    }
}
