package com.api.doan.repository;
import com.api.doan.domain.Tiendo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Tiendo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TiendoRepository extends JpaRepository<Tiendo, Long>, JpaSpecificationExecutor<Tiendo> {

}
