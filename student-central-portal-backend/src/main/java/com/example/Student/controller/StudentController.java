package com.example.Student.controller;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import com.example.Student.entity.Student;
import com.example.Student.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @GetMapping
    public Page<Student> getAll(
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service.getAll(search, PageRequest.of(page, size));
    }

    @PostMapping
    public Student create(@Valid @RequestBody Student student) {
        return service.save(student);
    }

    @PutMapping("/{id}")
    public Student update(@PathVariable Long id, @Valid @RequestBody Student student) {
        student.setId(id);
        return service.save(student);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
