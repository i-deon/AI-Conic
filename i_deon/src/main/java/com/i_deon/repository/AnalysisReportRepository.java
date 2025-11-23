package com.i_deon.repository;

import com.i_deon.domain.AnalysisReport;
import com.i_deon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnalysisReportRepository extends JpaRepository<AnalysisReport, Long> {

    @Query("SELECT r FROM AnalysisReport r WHERE r.user = :user")
    List<AnalysisReport> findAllByUser(@Param("user") User user);
}
