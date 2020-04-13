package com.api.doan.repository;
import com.api.doan.domain.ThanhvienHD;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ThanhvienHD entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThanhvienHDRepository extends JpaRepository<ThanhvienHD, Long>, JpaSpecificationExecutor<ThanhvienHD> {

}
