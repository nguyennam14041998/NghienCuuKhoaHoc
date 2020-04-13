package com.api.doan.repository;
import com.api.doan.domain.Chunhiem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Chunhiem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChunhiemRepository extends JpaRepository<Chunhiem, Long>, JpaSpecificationExecutor<Chunhiem> {

}
