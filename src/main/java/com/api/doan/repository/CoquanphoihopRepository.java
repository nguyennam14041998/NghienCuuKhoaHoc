package com.api.doan.repository;
import com.api.doan.domain.Coquanphoihop;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Coquanphoihop entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CoquanphoihopRepository extends JpaRepository<Coquanphoihop, Long>, JpaSpecificationExecutor<Coquanphoihop> {

}
