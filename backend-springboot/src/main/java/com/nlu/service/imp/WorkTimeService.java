package com.nlu.service.imp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nlu.exception.NotFoundException;
import com.nlu.model.entity.Exam;
import com.nlu.model.entity.ExamNumber;
import com.nlu.model.entity.Student;
import com.nlu.model.entity.WorkTime;
import com.nlu.repository.ExamRepository;
import com.nlu.repository.StudentRepository;
import com.nlu.repository.UserRepository;
import com.nlu.repository.WorkTimeRepository;

@Service
public class WorkTimeService {

	@Autowired
	private ExamRepository examRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private WorkTimeRepository workTimeRepository;

	@Transactional
	public List<WorkTime> createWorkTime(Long examId) {
		// Lấy thông tin về kỳ thi từ examId
		Exam exam = examRepository.findById(examId).orElseThrow(() -> new NotFoundException("Exam not found"));

		// Lấy mã nhóm của kỳ thi
		String codeGroup = exam.getCodeGroup();

		List<ExamNumber> listExamNumbers = exam.getExamNumbers().stream().toList();

		List<Student> listStudents = studentRepository.findByCodeGroup(codeGroup);

		List<WorkTime> workTimes = new ArrayList<>();

		int examNumberIndex = 0;
		for (Student student : listStudents) {

			// Lấy đề cho học sinh hiện tại
			ExamNumber examNumber = listExamNumbers.get(examNumberIndex);
			// Tạo đối tượng chứa thông tin về thời gian làm việc của học sinh với đề
			WorkTime workTime = createWorkTime(student, examNumber);
			workTimes.add(workTime);
			// Di chuyển đến số báo danh tiếp theo, lặp lại danh sách
			examNumberIndex = (examNumberIndex + 1) % listExamNumbers.size();
		}

		return workTimes;
	}

	private WorkTime createWorkTime(Student student, ExamNumber examNumber) {
		// Tạo và trả về đối tượng chứa thông tin về thời gian làm việc của học sinh với
		// đề
		// Bạn có thể tạo một đối tượng WorkTime hoặc sử dụng một cấu trúc dữ liệu phù
		// hợp khác
		// Trong ví dụ này, tôi sẽ trả về một String đơn giản
		WorkTime workTime = new WorkTime();
		workTime.setStudent(student);
		workTime.setExamNumber(examNumber);
		return workTimeRepository.save(workTime);
	}
	

}
