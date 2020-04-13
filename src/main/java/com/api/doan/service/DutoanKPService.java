package com.api.doan.service;

import com.api.doan.service.dto.DutoanKPDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.api.doan.domain.DutoanKP}.
 */
public interface DutoanKPService {

    /**
     * Save a dutoanKP.
     *
     * @param dutoanKPDTO the entity to save.
     * @return the persisted entity.
     */
    DutoanKPDTO save(DutoanKPDTO dutoanKPDTO);

    /**
     * Get all the dutoanKPS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DutoanKPDTO> findAll(Pageable pageable);
    /**
     * Get all the DutoanKPDTO where Detai is {@code null}.
     *
     * @return the list of entities.
     */
    List<DutoanKPDTO> findAllWhereDetaiIsNull();


    /**
     * Get the "id" dutoanKP.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DutoanKPDTO> findOne(Long id);

    /**
     * Delete the "id" dutoanKP.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
