package com.api.doan.service;

import com.api.doan.service.dto.DanhsachbaibaoDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.api.doan.domain.Danhsachbaibao}.
 */
public interface DanhsachbaibaoService {

    /**
     * Save a danhsachbaibao.
     *
     * @param danhsachbaibaoDTO the entity to save.
     * @return the persisted entity.
     */
    DanhsachbaibaoDTO save(DanhsachbaibaoDTO danhsachbaibaoDTO);

    /**
     * Get all the danhsachbaibaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<DanhsachbaibaoDTO> findAll(Pageable pageable);
    /**
     * Get all the DanhsachbaibaoDTO where Detai is {@code null}.
     *
     * @return the list of entities.
     */
    List<DanhsachbaibaoDTO> findAllWhereDetaiIsNull();


    /**
     * Get the "id" danhsachbaibao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<DanhsachbaibaoDTO> findOne(Long id);

    /**
     * Delete the "id" danhsachbaibao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
