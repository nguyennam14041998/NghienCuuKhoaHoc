package com.api.doan.service.impl;

import com.api.doan.service.DutoanKPService;
import com.api.doan.domain.DutoanKP;
import com.api.doan.repository.DutoanKPRepository;
import com.api.doan.service.dto.DutoanKPDTO;
import com.api.doan.service.mapper.DutoanKPMapper;
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
 * Service Implementation for managing {@link DutoanKP}.
 */
@Service
@Transactional
public class DutoanKPServiceImpl implements DutoanKPService {

    private final Logger log = LoggerFactory.getLogger(DutoanKPServiceImpl.class);

    private final DutoanKPRepository dutoanKPRepository;

    private final DutoanKPMapper dutoanKPMapper;

    public DutoanKPServiceImpl(DutoanKPRepository dutoanKPRepository, DutoanKPMapper dutoanKPMapper) {
        this.dutoanKPRepository = dutoanKPRepository;
        this.dutoanKPMapper = dutoanKPMapper;
    }

    /**
     * Save a dutoanKP.
     *
     * @param dutoanKPDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DutoanKPDTO save(DutoanKPDTO dutoanKPDTO) {
        log.debug("Request to save DutoanKP : {}", dutoanKPDTO);
        DutoanKP dutoanKP = dutoanKPMapper.toEntity(dutoanKPDTO);
        dutoanKP = dutoanKPRepository.save(dutoanKP);
        return dutoanKPMapper.toDto(dutoanKP);
    }

    /**
     * Get all the dutoanKPS.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DutoanKPDTO> findAll(Pageable pageable) {
        log.debug("Request to get all DutoanKPS");
        return dutoanKPRepository.findAll(pageable)
            .map(dutoanKPMapper::toDto);
    }



    /**
    *  Get all the dutoanKPS where Detai is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<DutoanKPDTO> findAllWhereDetaiIsNull() {
        log.debug("Request to get all dutoanKPS where Detai is null");
        return StreamSupport
            .stream(dutoanKPRepository.findAll().spliterator(), false)
            .filter(dutoanKP -> dutoanKP.getDetai() == null)
            .map(dutoanKPMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * Get one dutoanKP by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DutoanKPDTO> findOne(Long id) {
        log.debug("Request to get DutoanKP : {}", id);
        return dutoanKPRepository.findById(id)
            .map(dutoanKPMapper::toDto);
    }

    /**
     * Delete the dutoanKP by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete DutoanKP : {}", id);
        dutoanKPRepository.deleteById(id);
    }
}
