package com.nlu.controller;

import com.nlu.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user_answers")
public class UserAnswerController {
    @Autowired
    private UserAnswerService userAnswerService;
    @PostMapping("/users/{idUser}")
    public void saveAnswerUser(@PathVariable Long idUser, @RequestParam Long idOption) {
        userAnswerService.saveAnswerUser(idUser, idOption);
    }
    @PutMapping("/users/{idUser}")
    public void updateAnswerUser
            (@PathVariable Long idUser, @RequestParam Long idOptionFirst, @RequestParam Long idOptionLast) {
        userAnswerService.updateAnswerUser(idUser, idOptionFirst, idOptionLast);
    }

    @PostMapping("/students/{idStudent}")
    public void saveAnswerStudent(@PathVariable Long idStudent, @RequestParam Long idOption) {
        userAnswerService.saveAnswerStudent(idStudent, idOption);
    }

    @PutMapping("/students/{idStudent}")
    public void updateAnswerStudent
            (@PathVariable Long idStudent, @RequestParam Long idOptionFirst, @RequestParam Long idOptionLast) {
        userAnswerService.updateAnswerStudent(idStudent, idOptionFirst, idOptionLast);
    }
}
