package com.api.doan.service.impl;

import com.api.doan.service.DetaiService;
import com.api.doan.domain.Detai;
import com.api.doan.repository.DetaiRepository;
import com.api.doan.service.dto.DetaiDTO;
import com.api.doan.service.mapper.DetaiMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link Detai}.
 */
@Service
@Transactional
public class DetaiServiceImpl implements DetaiService {

    private final Logger log = LoggerFactory.getLogger(DetaiServiceImpl.class);

    private final DetaiRepository detaiRepository;

    private final DetaiMapper detaiMapper;

    public DetaiServiceImpl(DetaiRepository detaiRepository, DetaiMapper detaiMapper) {
        this.detaiRepository = detaiRepository;
        this.detaiMapper = detaiMapper;
    }

    /**
     * Save a detai.
     *
     * @param detaiDTO the entity to save.
     * @return the persisted entity.
     */
    @Override
    public DetaiDTO save(DetaiDTO detaiDTO) {
        log.debug("Request to save Detai : {}", detaiDTO);
        Detai detai = detaiMapper.toEntity(detaiDTO);
        detai = detaiRepository.save(detai);
        return detaiMapper.toDto(detai);
    }

    /**
     * Get all the detais.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Override
    @Transactional(readOnly = true)
    public Page<DetaiDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Detais");
        return detaiRepository.findAll(pageable)
            .map(detaiMapper::toDto);
    }


    /**
     * Get one detai by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<DetaiDTO> findOne(Long id) {
        log.debug("Request to get Detai : {}", id);
        return detaiRepository.findById(id)
            .map(detaiMapper::toDto);
    }

    /**
     * Delete the detai by id.
     *
     * @param id the id of the entity.
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Detai : {}", id);
        detaiRepository.deleteById(id);
    }
}
