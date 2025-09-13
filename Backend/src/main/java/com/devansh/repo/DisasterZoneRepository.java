package com.devansh.repo;

import com.devansh.model.DisasterZone;
import com.devansh.model.enums.DangerLevel;
import com.devansh.model.enums.DisasterType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface DisasterZoneRepository extends JpaRepository<DisasterZone, Integer> {
    List<DisasterZone> findByDisasterType(DisasterType disasterType);

    long countByDangerLevel(DangerLevel dangerLevel);

    Long countByCreatedAtBefore(LocalDateTime localDateTime);

    Long countByCreatedAtBetween(LocalDateTime createdAtAfter, LocalDateTime createdAtBefore);
}
