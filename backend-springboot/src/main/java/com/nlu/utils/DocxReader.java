package com.nlu.utils;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFParagraph;

import java.io.IOException;
import java.io.InputStream;

public class DocxReader {

    public static void readDocxFile(InputStream inputStream) {
        try (XWPFDocument document = new XWPFDocument(inputStream)) {
            for (XWPFParagraph paragraph : document.getParagraphs()) {
                String text = paragraph.getText();
                System.out.println(text);
                // Xử lý đoạn văn để trích xuất câu hỏi và đáp án
                extractQuestions(text);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void extractQuestions(String text) {
        String[] lines = text.split("\\r?\\n");
        for (String line : lines) {
            if (line.startsWith("Câu ")) {
                System.out.println("Question: " + line);
            } else if (line.startsWith("A.") || line.startsWith("B.") || line.startsWith("C.") || line.startsWith("D.")) {
                System.out.println("Answer: " + line);
            }
        }
    }
}
