package com.api.doan.service.impl;

import com.api.doan.service.DanhgiaService;
import com.api.doan.domain.Danhgia;
import com.api.doan.repository.DanhgiaRepository;
import com.api.doan.service.dto.DanhgiaDTO;
import com.api.doan.service.mapper.DanhgiaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Danhgia}.
 */
@Service
@Transactional
public class DanhgiaServiceImpl implements DanhgiaService {

    private final Logger log = LoggerFactory.getLogger(DanhgiaServiceImpl.class);

    private final DanhgiaRepository danhgiaRepository;

    private final DanhgiaMapper danhgiaMapper;

    public DanhgiaServiceImpl(DanhgiaRepository danhgiaRepository, DanhgiaMapper danhgiaMapper) {
        this.danhgiaRepository = danhgiaRepository;
        this.danhgiaMapper = danhgiaMapper;
    }

    /**
     * Save a danhgia.
     *
     * @param danhgiaDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DanhgiaDTO save(DanhgiaDTO danhgiaDTO) {
        log.debug("Request to save Danhgia : {}", danhgiaDTO);
        Danhgia danhgia = danhgiaMapper.toEntity(danhgiaDTO);
        danhgia = danhgiaRepository.save(danhgia);
        return danhgiaMapper.toDto(danhgia);
    }

    /**
     * Get all the danhgias.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DanhgiaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Danhgias");
        return danhgiaRepository.findAll(pageable)
            .map(danhgiaMapper::toDto);
    }



    /**
    *  Get all the danhgias where Detai is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<DanhgiaDTO> findAllWhereDetaiIsNull() {
        log.debug("Request to get all danhgias where Detai is null");
        return StreamSupport
            .stream(danhgiaRepository.findAll().spliterator(), false)
            .filter(danhgia -> danhgia.getDetai() == null)
            .map(danhgiaMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one danhgia by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DanhgiaDTO> findOne(Long id) {
        log.debug("Request to get Danhgia : {}", id);
        return danhgiaRepository.findById(id)
            .map(danhgiaMapper::toDto);
    }

    /**
     * Delete the danhgia by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Danhgia : {}", id);
        danhgiaRepository.deleteById(id);
    }
}
