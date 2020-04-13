package com.api.doan.repository;
import com.api.doan.domain.Hoidongdanhgia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Hoidongdanhgia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface HoidongdanhgiaRepository extends JpaRepository<Hoidongdanhgia, Long>, JpaSpecificationExecutor<Hoidongdanhgia> {

}
