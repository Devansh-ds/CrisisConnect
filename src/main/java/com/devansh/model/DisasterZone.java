package com.devansh.model;

import com.devansh.model.enums.DangerLevel;
import com.devansh.model.enums.DisasterType;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class DisasterZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;

    @Enumerated(EnumType.STRING)
    private DisasterType disasterType;

    private BigDecimal centerLatitude;
    private BigDecimal centerLongitude;
    private double radius;

    @Enumerated(EnumType.STRING)
    private DangerLevel dangerLevel;

    @OneToMany(mappedBy = "disasterZone", fetch = FetchType.LAZY,
            cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SafetyTip> safetyTips;

}
