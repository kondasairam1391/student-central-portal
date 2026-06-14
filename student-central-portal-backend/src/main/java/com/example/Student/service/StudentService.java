package com.example.Student.service;

import com.example.Student.entity.Student;
import com.example.Student.repository.StudentRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public Page<Student> getAll(String search, Pageable pageable) {
        if (search == null || search.trim().isEmpty()) {
            return repository.findAll(pageable);
        }
        return repository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search, search, pageable);
    }

    public Student save(Student student) {
        return repository.save(student);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
