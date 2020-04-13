package com.api.doan.repository;
import com.api.doan.domain.Nhansuthamgia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Nhansuthamgia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NhansuthamgiaRepository extends JpaRepository<Nhansuthamgia, Long>, JpaSpecificationExecutor<Nhansuthamgia> {

}
