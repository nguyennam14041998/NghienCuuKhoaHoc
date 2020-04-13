package com.api.doan.repository;
import com.api.doan.domain.Danhgia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Danhgia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DanhgiaRepository extends JpaRepository<Danhgia, Long>, JpaSpecificationExecutor<Danhgia> {

}
