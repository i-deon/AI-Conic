package com.i_deon.repository;

import com.i_deon.domain.GuardianAffinity;
import com.i_deon.domain.GuardianType;
import com.i_deon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GuardianAffinityRepository extends JpaRepository<GuardianAffinity, Long> {
    List<GuardianAffinity> findByUser(User user);
    Optional<GuardianAffinity> findByUserAndGuardianType(User user, GuardianType guardianType);
}
