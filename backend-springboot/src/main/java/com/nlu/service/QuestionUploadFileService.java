package com.nlu.service;

import com.nlu.model.dto.request.QuestionRequest;
import com.nlu.model.model.QuestionUploadFileModel;
import com.nlu.utils.DocxReaderUtils;
import com.nlu.utils.ExcelReaderAnswersUtils;
import com.nlu.utils.PdfReaderUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class QuestionUploadFileService {
    private static final Logger log = LoggerFactory.getLogger(QuestionUploadFileService.class);

    public List<QuestionRequest> handleFileUpload(MultipartFile file, MultipartFile answerFile) {
        String fileType = file.getContentType();
        String answerFileType = answerFile.getContentType();
        List<QuestionUploadFileModel> questionUploadFiles;
        try {
            // Xử lý file DOCX hoặc PDF
            if (fileType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
                questionUploadFiles = DocxReaderUtils.readDocxFile(file.getInputStream());
            } else if (fileType.equals("application/pdf")) {
                questionUploadFiles = PdfReaderUtils.readPdfFile(file.getInputStream());
            } else {
                throw new RuntimeException("File type is not supported");
            }
            // Xử lý file Excel
            if (!CollectionUtils.isEmpty(questionUploadFiles) &&
                    answerFileType.equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
                Map<Integer, String> answers = ExcelReaderAnswersUtils.read(answerFile.getInputStream());
                // In ra hoặc xử lý đáp án từ file Excel
                if(answers.size() != questionUploadFiles.size()) throw new RuntimeException("The size of answers and questions' sizes are not equal!");
                answers.forEach((questionNumber, answer) -> {
                    questionUploadFiles.get(questionNumber-1).setCorrect(answer);
                });
            }

        } catch (IOException e) {
            log.error(e.getMessage());
            throw new RuntimeException("Error occurred while reading file");
        }
        return QuestionRequest.toListRequest(questionUploadFiles);

    }
}
