package com.godream.api.repositories;

import com.godream.api.models.Asesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AsesorRepository extends JpaRepository<Asesor, Long> {
    // Aquí puedes añadir métodos personalizados en el futuro si los necesitas
}