package com.api.doan.service.mapper;

import com.api.doan.domain.*;
import com.api.doan.service.dto.DanhgiaDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Danhgia} and its DTO {@link DanhgiaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DanhgiaMapper extends EntityMapper<DanhgiaDTO, Danhgia> {


    @Mapping(target = "danhgiaCTS", ignore = true)
    @Mapping(target = "removeDanhgiaCT", ignore = true)
    @Mapping(target = "detai", ignore = true)
    Danhgia toEntity(DanhgiaDTO danhgiaDTO);

    default Danhgia fromId(Long id) {
        if (id == null) {
            return null;
        }
        Danhgia danhgia = new Danhgia();
        danhgia.setId(id);
        return danhgia;
    }
}
