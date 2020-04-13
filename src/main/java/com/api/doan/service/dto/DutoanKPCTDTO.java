package com.api.doan.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.api.doan.domain.DutoanKPCT} entity.
 */
public class DutoanKPCTDTO implements Serializable {

    private Long id;

    private Integer soluong;

    private Integer mucchi;

    private Integer tong;

    private Integer sudung;


    private Long dutoanKPId;

    private Long noidungDTId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSoluong() {
        return soluong;
    }

    public void setSoluong(Integer soluong) {
        this.soluong = soluong;
    }

    public Integer getMucchi() {
        return mucchi;
    }

    public void setMucchi(Integer mucchi) {
        this.mucchi = mucchi;
    }

    public Integer getTong() {
        return tong;
    }

    public void setTong(Integer tong) {
        this.tong = tong;
    }

    public Integer getSudung() {
        return sudung;
    }

    public void setSudung(Integer sudung) {
        this.sudung = sudung;
    }

    public Long getDutoanKPId() {
        return dutoanKPId;
    }

    public void setDutoanKPId(Long dutoanKPId) {
        this.dutoanKPId = dutoanKPId;
    }

    public Long getNoidungDTId() {
        return noidungDTId;
    }

    public void setNoidungDTId(Long noidungDTId) {
        this.noidungDTId = noidungDTId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DutoanKPCTDTO dutoanKPCTDTO = (DutoanKPCTDTO) o;
        if (dutoanKPCTDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dutoanKPCTDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DutoanKPCTDTO{" +
            "id=" + getId() +
            ", soluong=" + getSoluong() +
            ", mucchi=" + getMucchi() +
            ", tong=" + getTong() +
            ", sudung=" + getSudung() +
            ", dutoanKP=" + getDutoanKPId() +
            ", noidungDT=" + getNoidungDTId() +
            "}";
    }
}
