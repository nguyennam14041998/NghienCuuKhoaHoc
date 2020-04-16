package com.api.doan.service.impl;

import com.api.doan.service.DanhsachbaibaoService;
import com.api.doan.domain.Danhsachbaibao;
import com.api.doan.repository.DanhsachbaibaoRepository;
import com.api.doan.service.dto.DanhsachbaibaoDTO;
import com.api.doan.service.mapper.DanhsachbaibaoMapper;
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
 * Service Implementation for managing {@link Danhsachbaibao}.
 */
@Service
@Transactional
public class DanhsachbaibaoServiceImpl implements DanhsachbaibaoService {

    private final Logger log = LoggerFactory.getLogger(DanhsachbaibaoServiceImpl.class);

    private final DanhsachbaibaoRepository danhsachbaibaoRepository;

    private final DanhsachbaibaoMapper danhsachbaibaoMapper;

    public DanhsachbaibaoServiceImpl(DanhsachbaibaoRepository danhsachbaibaoRepository, DanhsachbaibaoMapper danhsachbaibaoMapper) {
        this.danhsachbaibaoRepository = danhsachbaibaoRepository;
        this.danhsachbaibaoMapper = danhsachbaibaoMapper;
    }

    /**
     * Save a danhsachbaibao.
     *
     * @param danhsachbaibaoDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DanhsachbaibaoDTO save(DanhsachbaibaoDTO danhsachbaibaoDTO) {
        log.debug("Request to save Danhsachbaibao : {}", danhsachbaibaoDTO);
        Danhsachbaibao danhsachbaibao = danhsachbaibaoMapper.toEntity(danhsachbaibaoDTO);
        danhsachbaibao = danhsachbaibaoRepository.save(danhsachbaibao);
        return danhsachbaibaoMapper.toDto(danhsachbaibao);
    }

    /**
     * Get all the danhsachbaibaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DanhsachbaibaoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Danhsachbaibaos");
        return danhsachbaibaoRepository.findAll(pageable)
            .map(danhsachbaibaoMapper::toDto);
    }



    /**
    *  Get all the danhsachbaibaos where Detai is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<DanhsachbaibaoDTO> findAllWhereDetaiIsNull() {
        log.debug("Request to get all danhsachbaibaos where Detai is null");
        return StreamSupport
            .stream(danhsachbaibaoRepository.findAll().spliterator(), false)
            .filter(danhsachbaibao -> danhsachbaibao.getDetai() == null)
            .map(danhsachbaibaoMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one danhsachbaibao by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DanhsachbaibaoDTO> findOne(Long id) {
        log.debug("Request to get Danhsachbaibao : {}", id);
        return danhsachbaibaoRepository.findById(id)
            .map(danhsachbaibaoMapper::toDto);
    }

    /**
     * Delete the danhsachbaibao by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Danhsachbaibao : {}", id);
        danhsachbaibaoRepository.deleteById(id);
    }
}
