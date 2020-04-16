package com.api.doan.repository;
import com.api.doan.domain.Danhsachbaibao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Danhsachbaibao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DanhsachbaibaoRepository extends JpaRepository<Danhsachbaibao, Long>, JpaSpecificationExecutor<Danhsachbaibao> {

}
