package com.api.doan.service.mapper;

import com.api.doan.domain.*;
import com.api.doan.service.dto.DanhsachbaibaoDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Danhsachbaibao} and its DTO {@link DanhsachbaibaoDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DanhsachbaibaoMapper extends EntityMapper<DanhsachbaibaoDTO, Danhsachbaibao> {


    @Mapping(target = "detai", ignore = true)
    Danhsachbaibao toEntity(DanhsachbaibaoDTO danhsachbaibaoDTO);

    default Danhsachbaibao fromId(Long id) {
        if (id == null) {
            return null;
        }
        Danhsachbaibao danhsachbaibao = new Danhsachbaibao();
        danhsachbaibao.setId(id);
        return danhsachbaibao;
    }
}
