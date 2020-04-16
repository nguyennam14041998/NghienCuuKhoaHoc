package com.api.doan.service.mapper;

import com.api.doan.domain.*;
import com.api.doan.service.dto.DetaiDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Detai} and its DTO {@link DetaiDTO}.
 */
@Mapper(componentModel = "spring", uses = {DutoanKPMapper.class, DanhgiaMapper.class, DanhsachbaibaoMapper.class, LinhvucMapper.class, CapdetaiMapper.class, HoidongdanhgiaMapper.class, ChunhiemMapper.class})
public interface DetaiMapper extends EntityMapper<DetaiDTO, Detai> {

    @Mapping(source = "dutoanKP.id", target = "dutoanKPId")
    @Mapping(source = "danhgia.id", target = "danhgiaId")
    @Mapping(source = "danhsachbaibao.id", target = "danhsachbaibaoId")
    @Mapping(source = "linhvuc.id", target = "linhvucId")
    @Mapping(source = "capdetai.id", target = "capdetaiId")
    @Mapping(source = "hoidongdanhgia.id", target = "hoidongdanhgiaId")
    @Mapping(source = "chunhiem.id", target = "chunhiemId")
    DetaiDTO toDto(Detai detai);

    @Mapping(source = "dutoanKPId", target = "dutoanKP")
    @Mapping(source = "danhgiaId", target = "danhgia")
    @Mapping(source = "danhsachbaibaoId", target = "danhsachbaibao")
    @Mapping(target = "tiendos", ignore = true)
    @Mapping(target = "removeTiendo", ignore = true)
    @Mapping(target = "upfiles", ignore = true)
    @Mapping(target = "removeUpfile", ignore = true)
    @Mapping(target = "nhansuthamgias", ignore = true)
    @Mapping(target = "removeNhansuthamgia", ignore = true)
    @Mapping(target = "nguonkinhphis", ignore = true)
    @Mapping(target = "removeNguonkinhphi", ignore = true)
    @Mapping(target = "coquanphoihopthamgias", ignore = true)
    @Mapping(target = "removeCoquanphoihopthamgia", ignore = true)
    @Mapping(source = "linhvucId", target = "linhvuc")
    @Mapping(source = "capdetaiId", target = "capdetai")
    @Mapping(source = "hoidongdanhgiaId", target = "hoidongdanhgia")
    @Mapping(source = "chunhiemId", target = "chunhiem")
    Detai toEntity(DetaiDTO detaiDTO);

    default Detai fromId(Long id) {
        if (id == null) {
            return null;
        }
        Detai detai = new Detai();
        detai.setId(id);
        return detai;
    }
}
