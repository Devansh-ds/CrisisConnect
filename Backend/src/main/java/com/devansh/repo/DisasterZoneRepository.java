package com.devansh.repo;

import com.devansh.model.DisasterZone;
import com.devansh.model.enums.DisasterType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DisasterZoneRepository extends JpaRepository<DisasterZone, Integer> {
    List<DisasterZone> findByDisasterType(DisasterType disasterType);
}
