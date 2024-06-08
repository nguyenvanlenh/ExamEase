package com.nlu.service;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.nlu.model.entity.Student;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailService {

	@Autowired
    private JavaMailSender mailSender;
	@Autowired
    private TemplateEngine templateEngine;

    @Value("${spring.mail.username}")
    private String sender;

    @Async
    public CompletableFuture<Void> sendMailNotification(Student student) {
        return CompletableFuture.runAsync(() -> {
            try {
                String subject = "Exam notification from Study5";
                String senderName = "Teacher";
                Map<String, Object> model = new HashMap<>();
                model.put("user", student);
                model.put("url", "https://translate.google.com/?sl=en&tl=vi&text=mails&op=translate");
                model.put("senderName", senderName);
                sendEmailFromTemplate(student.getEmail(), "mails/notifyExam", subject, senderName, model);
            } catch (UnsupportedEncodingException | MessagingException e) {
                throw new RuntimeException("An error occurred when sending notification emails to students", e);
            }
        });
    }

    public void sendEmailFromTemplate(String to, String templateName, String subject, String personal, Map<String, Object> model) throws MessagingException, UnsupportedEncodingException {
        Context context = new Context(Locale.getDefault(), model);
        String content = templateEngine.process(templateName, context);
        send(personal, to, subject, content, false, true);
    }

    private void send(String personal, String to, String subject, String content, boolean isMultipart, boolean isHtml) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, isMultipart, "UTF-8");
        messageHelper.setFrom(sender, personal);
        messageHelper.setTo(to);
        messageHelper.setSubject(subject);
        messageHelper.setText(content, isHtml);
        mailSender.send(message);
    }
}
