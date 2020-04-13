package com.api.doan.repository;
import com.api.doan.domain.DanhgiaCT;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DanhgiaCT entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DanhgiaCTRepository extends JpaRepository<DanhgiaCT, Long>, JpaSpecificationExecutor<DanhgiaCT> {

}
