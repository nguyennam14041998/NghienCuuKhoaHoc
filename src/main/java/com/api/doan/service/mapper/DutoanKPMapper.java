package com.api.doan.service.mapper;

import com.api.doan.domain.*;
import com.api.doan.service.dto.DutoanKPDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DutoanKP} and its DTO {@link DutoanKPDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DutoanKPMapper extends EntityMapper<DutoanKPDTO, DutoanKP> {


    @Mapping(target = "dutoanKPCTS", ignore = true)
    @Mapping(target = "removeDutoanKPCT", ignore = true)
    @Mapping(target = "detai", ignore = true)
    DutoanKP toEntity(DutoanKPDTO dutoanKPDTO);

    default DutoanKP fromId(Long id) {
        if (id == null) {
            return null;
        }
        DutoanKP dutoanKP = new DutoanKP();
        dutoanKP.setId(id);
        return dutoanKP;
    }
}
