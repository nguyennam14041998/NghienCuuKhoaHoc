package com.api.doan.repository;
import com.api.doan.domain.Noidungdanhgia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Noidungdanhgia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoidungdanhgiaRepository extends JpaRepository<Noidungdanhgia, Long>, JpaSpecificationExecutor<Noidungdanhgia> {

}
