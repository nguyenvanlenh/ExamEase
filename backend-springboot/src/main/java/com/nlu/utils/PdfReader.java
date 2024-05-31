package com.nlu.utils;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import java.io.IOException;
import java.io.InputStream;

public class PdfReader {

    public static void readPdfFile(InputStream inputStream) {
        try (PDDocument document = PDDocument.load(inputStream)) {
            PDFTextStripper pdfStripper = new PDFTextStripper();
            String text = pdfStripper.getText(document);
            extractQuestions(text);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void extractQuestions(String text) {
        String[] lines = text.split("\\r?\\n");
        StringBuilder currentQuestion = new StringBuilder();
        boolean isQuestion = false;

        for (String line : lines) {
            if (line.startsWith("Câu ")) {
                if (isQuestion) {
                    System.out.println("Question: " + currentQuestion.toString());
                    currentQuestion.setLength(0);
                }
                currentQuestion.append(line).append("\n");
                isQuestion = true;
            } else if (line.startsWith("A.") || line.startsWith("B.") || line.startsWith("C.") || line.startsWith("D.")) {
                currentQuestion.append(line).append("\n");
            } else {
                // Xử lý công thức toán học trong dòng hiện tại nếu có
                if (isQuestion) {
                    currentQuestion.append(line).append("\n");
                }
            }
        }

        // In câu hỏi cuối cùng nếu có
        if (isQuestion) {
            System.out.println("Question: " + currentQuestion.toString());
        }
    }
}
