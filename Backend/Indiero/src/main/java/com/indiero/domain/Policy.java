package com.indiero.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "policies")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(nullable = false)
    private String policyId;

    @Column(nullable = false)
    private String title;

    private String info;
    private String detail;

    @Column(nullable = false)
    private String duration;
    private String period;
    private LocalDate startDate;
    private LocalDate endDate;

    @Column(nullable = false)
    private String age;
    @Column(nullable = false)
    private String ageCode;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private String region;

    private String residenceIncome;
    private String restriction;
    private String additionalInfo;
    private String education;
    private String major;
    private String jobStatus;
    private String documents;
    private String contacts;
    private String url;

    @Column(columnDefinition = "integer default 0", nullable = false)
    private Integer views;
}
