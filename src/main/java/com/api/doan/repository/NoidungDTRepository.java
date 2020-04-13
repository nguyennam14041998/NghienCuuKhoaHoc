package com.api.doan.repository;
import com.api.doan.domain.NoidungDT;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NoidungDT entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoidungDTRepository extends JpaRepository<NoidungDT, Long>, JpaSpecificationExecutor<NoidungDT> {

}
