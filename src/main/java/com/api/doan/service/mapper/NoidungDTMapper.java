package com.api.doan.service.mapper;

import com.api.doan.domain.*;
import com.api.doan.service.dto.NoidungDTDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link NoidungDT} and its DTO {@link NoidungDTDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface NoidungDTMapper extends EntityMapper<NoidungDTDTO, NoidungDT> {


    @Mapping(target = "dutoanKPCTS", ignore = true)
    @Mapping(target = "removeDutoanKPCT", ignore = true)
    NoidungDT toEntity(NoidungDTDTO noidungDTDTO);

    default NoidungDT fromId(Long id) {
        if (id == null) {
            return null;
        }
        NoidungDT noidungDT = new NoidungDT();
        noidungDT.setId(id);
        return noidungDT;
    }
}
