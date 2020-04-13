package com.api.doan.repository;
import com.api.doan.domain.Linhvuc;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Linhvuc entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LinhvucRepository extends JpaRepository<Linhvuc, Long>, JpaSpecificationExecutor<Linhvuc> {

}
