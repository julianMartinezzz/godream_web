package com.godream.api.controllers;

import com.godream.api.models.Asesor;
import com.godream.api.repositories.AsesorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asesores")
@CrossOrigin(origins = "http://localhost:5173") // Ajusta esto si tu React usa otro puerto
public class AsesorController {

    @Autowired
    private AsesorRepository asesorRepository;

    // Obtener todos los asesores
    @GetMapping
    public List<Asesor> getAllAsesores() {
        return asesorRepository.findAll();
    }

    // Crear un nuevo asesor
    @PostMapping
    public Asesor createAsesor(@RequestBody Asesor asesor) {
        // Por defecto, un asesor nuevo empieza con 0 ventas y meta de 20
        if (asesor.getVentas() == null) asesor.setVentas(0);
        if (asesor.getMeta() == null) asesor.setMeta(20);
        if (asesor.getCargo() == null) asesor.setCargo("Asesor");

        return asesorRepository.save(asesor);
    }

    // Eliminar un asesor
    @DeleteMapping("/{id}")
    public void deleteAsesor(@PathVariable Long id) {
        asesorRepository.deleteById(id);
    }
}