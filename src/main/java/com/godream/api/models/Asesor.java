package com.godream.api.models;

import jakarta.persistence.*;

@Entity
@Table(name = "asesores")
public class Asesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String cargo;
    private Integer ventas;
    private Integer meta;

    // --- CONSTRUCTORES ---

    // Constructor vacío (Obligatorio para JPA)
    public Asesor() {
    }

    // Constructor con parámetros
    public Asesor(String nombre, String cargo, Integer ventas, Integer meta) {
        this.nombre = nombre;
        this.cargo = cargo;
        this.ventas = ventas;
        this.meta = meta;
    }

    // --- GETTERS Y SETTERS ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Integer getVentas() {
        return ventas;
    }

    public void setVentas(Integer ventas) {
        this.ventas = ventas;
    }

    public Integer getMeta() {
        return meta;
    }

    public void setMeta(Integer meta) {
        this.meta = meta;
    }
}