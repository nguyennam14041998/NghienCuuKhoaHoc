package com.api.doan.service;

import com.api.doan.service.dto.DanhgiaDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.api.doan.domain.Danhgia}.
 */
public interface DanhgiaService {

    /**
     * Save a danhgia.
     *
     * @param danhgiaDTO the entity to save.
     * @return the persisted entity.
     */
    DanhgiaDTO save(DanhgiaDTO danhgiaDTO);

    /**
     * Get all the danhgias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DanhgiaDTO> findAll(Pageable pageable);
    /**
     * Get all the DanhgiaDTO where Detai is {@code null}.
     *
     * @return the list of entities.
     */
    List<DanhgiaDTO> findAllWhereDetaiIsNull();


    /**
     * Get the "id" danhgia.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DanhgiaDTO> findOne(Long id);

    /**
     * Delete the "id" danhgia.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
