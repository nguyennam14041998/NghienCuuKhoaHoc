package com.api.doan.repository;
import com.api.doan.domain.Capdetai;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Capdetai entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CapdetaiRepository extends JpaRepository<Capdetai, Long>, JpaSpecificationExecutor<Capdetai> {

}
