package com.api.doan.service.dto;

import java.io.Serializable;
import java.util.Objects;
import io.github.jhipster.service.Criteria;
import io.github.jhipster.service.filter.BooleanFilter;
import io.github.jhipster.service.filter.DoubleFilter;
import io.github.jhipster.service.filter.Filter;
import io.github.jhipster.service.filter.FloatFilter;
import io.github.jhipster.service.filter.IntegerFilter;
import io.github.jhipster.service.filter.LongFilter;
import io.github.jhipster.service.filter.StringFilter;
import io.github.jhipster.service.filter.LocalDateFilter;

/**
 * Criteria class for the {@link com.api.doan.domain.Detai} entity. This class is used
 * in {@link com.api.doan.web.rest.DetaiResource} to receive all the possible filtering options from
 * the Http GET request parameters.
 * For example the following could be a valid request:
 * {@code /detais?id.greaterThan=5&attr1.contains=something&attr2.specified=false}
 * As Spring is unable to properly convert the types, unless specific {@link Filter} class are used, we need to use
 * fix type specific filters.
 */
public class DetaiCriteria implements Serializable, Criteria {

    private static final long serialVersionUID = 1L;

    private LongFilter id;

    private StringFilter ma;

    private StringFilter ten;

    private LocalDateFilter thoigiantao;

    private LocalDateFilter thoigianbatdau;

    private LocalDateFilter thoigianketthuc;

    private StringFilter muctieu;

    private StringFilter noidung;

    private IntegerFilter tinhcapthiet;

    private StringFilter ketqua;

    private IntegerFilter xeploai;

    private IntegerFilter trangthai;

    private IntegerFilter sudung;

    private StringFilter chunhiemdetai;

    private LongFilter dutoanKPId;

    private LongFilter danhgiaId;

    private LongFilter danhsachbaibaoId;

    private LongFilter tiendoId;

    private LongFilter upfileId;

    private LongFilter nhansuthamgiaId;

    private LongFilter nguonkinhphiId;

    private LongFilter coquanphoihopthamgiaId;

    private LongFilter linhvucId;

    private LongFilter capdetaiId;

    private LongFilter hoidongdanhgiaId;

    private LongFilter chunhiemId;

    public DetaiCriteria(){
    }

    public DetaiCriteria(DetaiCriteria other){
        this.id = other.id == null ? null : other.id.copy();
        this.ma = other.ma == null ? null : other.ma.copy();
        this.ten = other.ten == null ? null : other.ten.copy();
        this.thoigiantao = other.thoigiantao == null ? null : other.thoigiantao.copy();
        this.thoigianbatdau = other.thoigianbatdau == null ? null : other.thoigianbatdau.copy();
        this.thoigianketthuc = other.thoigianketthuc == null ? null : other.thoigianketthuc.copy();
        this.muctieu = other.muctieu == null ? null : other.muctieu.copy();
        this.noidung = other.noidung == null ? null : other.noidung.copy();
        this.tinhcapthiet = other.tinhcapthiet == null ? null : other.tinhcapthiet.copy();
        this.ketqua = other.ketqua == null ? null : other.ketqua.copy();
        this.xeploai = other.xeploai == null ? null : other.xeploai.copy();
        this.trangthai = other.trangthai == null ? null : other.trangthai.copy();
        this.sudung = other.sudung == null ? null : other.sudung.copy();
        this.chunhiemdetai = other.chunhiemdetai == null ? null : other.chunhiemdetai.copy();
        this.dutoanKPId = other.dutoanKPId == null ? null : other.dutoanKPId.copy();
        this.danhgiaId = other.danhgiaId == null ? null : other.danhgiaId.copy();
        this.danhsachbaibaoId = other.danhsachbaibaoId == null ? null : other.danhsachbaibaoId.copy();
        this.tiendoId = other.tiendoId == null ? null : other.tiendoId.copy();
        this.upfileId = other.upfileId == null ? null : other.upfileId.copy();
        this.nhansuthamgiaId = other.nhansuthamgiaId == null ? null : other.nhansuthamgiaId.copy();
        this.nguonkinhphiId = other.nguonkinhphiId == null ? null : other.nguonkinhphiId.copy();
        this.coquanphoihopthamgiaId = other.coquanphoihopthamgiaId == null ? null : other.coquanphoihopthamgiaId.copy();
        this.linhvucId = other.linhvucId == null ? null : other.linhvucId.copy();
        this.capdetaiId = other.capdetaiId == null ? null : other.capdetaiId.copy();
        this.hoidongdanhgiaId = other.hoidongdanhgiaId == null ? null : other.hoidongdanhgiaId.copy();
        this.chunhiemId = other.chunhiemId == null ? null : other.chunhiemId.copy();
    }

    @Override
    public DetaiCriteria copy() {
        return new DetaiCriteria(this);
    }

    public LongFilter getId() {
        return id;
    }

    public void setId(LongFilter id) {
        this.id = id;
    }

    public StringFilter getMa() {
        return ma;
    }

    public void setMa(StringFilter ma) {
        this.ma = ma;
    }

    public StringFilter getTen() {
        return ten;
    }

    public void setTen(StringFilter ten) {
        this.ten = ten;
    }

    public LocalDateFilter getThoigiantao() {
        return thoigiantao;
    }

    public void setThoigiantao(LocalDateFilter thoigiantao) {
        this.thoigiantao = thoigiantao;
    }

    public LocalDateFilter getThoigianbatdau() {
        return thoigianbatdau;
    }

    public void setThoigianbatdau(LocalDateFilter thoigianbatdau) {
        this.thoigianbatdau = thoigianbatdau;
    }

    public LocalDateFilter getThoigianketthuc() {
        return thoigianketthuc;
    }

    public void setThoigianketthuc(LocalDateFilter thoigianketthuc) {
        this.thoigianketthuc = thoigianketthuc;
    }

    public StringFilter getMuctieu() {
        return muctieu;
    }

    public void setMuctieu(StringFilter muctieu) {
        this.muctieu = muctieu;
    }

    public StringFilter getNoidung() {
        return noidung;
    }

    public void setNoidung(StringFilter noidung) {
        this.noidung = noidung;
    }

    public IntegerFilter getTinhcapthiet() {
        return tinhcapthiet;
    }

    public void setTinhcapthiet(IntegerFilter tinhcapthiet) {
        this.tinhcapthiet = tinhcapthiet;
    }

    public StringFilter getKetqua() {
        return ketqua;
    }

    public void setKetqua(StringFilter ketqua) {
        this.ketqua = ketqua;
    }

    public IntegerFilter getXeploai() {
        return xeploai;
    }

    public void setXeploai(IntegerFilter xeploai) {
        this.xeploai = xeploai;
    }

    public IntegerFilter getTrangthai() {
        return trangthai;
    }

    public void setTrangthai(IntegerFilter trangthai) {
        this.trangthai = trangthai;
    }

    public IntegerFilter getSudung() {
        return sudung;
    }

    public void setSudung(IntegerFilter sudung) {
        this.sudung = sudung;
    }

    public StringFilter getChunhiemdetai() {
        return chunhiemdetai;
    }

    public void setChunhiemdetai(StringFilter chunhiemdetai) {
        this.chunhiemdetai = chunhiemdetai;
    }

    public LongFilter getDutoanKPId() {
        return dutoanKPId;
    }

    public void setDutoanKPId(LongFilter dutoanKPId) {
        this.dutoanKPId = dutoanKPId;
    }

    public LongFilter getDanhgiaId() {
        return danhgiaId;
    }

    public void setDanhgiaId(LongFilter danhgiaId) {
        this.danhgiaId = danhgiaId;
    }

    public LongFilter getDanhsachbaibaoId() {
        return danhsachbaibaoId;
    }

    public void setDanhsachbaibaoId(LongFilter danhsachbaibaoId) {
        this.danhsachbaibaoId = danhsachbaibaoId;
    }

    public LongFilter getTiendoId() {
        return tiendoId;
    }

    public void setTiendoId(LongFilter tiendoId) {
        this.tiendoId = tiendoId;
    }

    public LongFilter getUpfileId() {
        return upfileId;
    }

    public void setUpfileId(LongFilter upfileId) {
        this.upfileId = upfileId;
    }

    public LongFilter getNhansuthamgiaId() {
        return nhansuthamgiaId;
    }

    public void setNhansuthamgiaId(LongFilter nhansuthamgiaId) {
        this.nhansuthamgiaId = nhansuthamgiaId;
    }

    public LongFilter getNguonkinhphiId() {
        return nguonkinhphiId;
    }

    public void setNguonkinhphiId(LongFilter nguonkinhphiId) {
        this.nguonkinhphiId = nguonkinhphiId;
    }

    public LongFilter getCoquanphoihopthamgiaId() {
        return coquanphoihopthamgiaId;
    }

    public void setCoquanphoihopthamgiaId(LongFilter coquanphoihopthamgiaId) {
        this.coquanphoihopthamgiaId = coquanphoihopthamgiaId;
    }

    public LongFilter getLinhvucId() {
        return linhvucId;
    }

    public void setLinhvucId(LongFilter linhvucId) {
        this.linhvucId = linhvucId;
    }

    public LongFilter getCapdetaiId() {
        return capdetaiId;
    }

    public void setCapdetaiId(LongFilter capdetaiId) {
        this.capdetaiId = capdetaiId;
    }

    public LongFilter getHoidongdanhgiaId() {
        return hoidongdanhgiaId;
    }

    public void setHoidongdanhgiaId(LongFilter hoidongdanhgiaId) {
        this.hoidongdanhgiaId = hoidongdanhgiaId;
    }

    public LongFilter getChunhiemId() {
        return chunhiemId;
    }

    public void setChunhiemId(LongFilter chunhiemId) {
        this.chunhiemId = chunhiemId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        final DetaiCriteria that = (DetaiCriteria) o;
        return
            Objects.equals(id, that.id) &&
            Objects.equals(ma, that.ma) &&
            Objects.equals(ten, that.ten) &&
            Objects.equals(thoigiantao, that.thoigiantao) &&
            Objects.equals(thoigianbatdau, that.thoigianbatdau) &&
            Objects.equals(thoigianketthuc, that.thoigianketthuc) &&
            Objects.equals(muctieu, that.muctieu) &&
            Objects.equals(noidung, that.noidung) &&
            Objects.equals(tinhcapthiet, that.tinhcapthiet) &&
            Objects.equals(ketqua, that.ketqua) &&
            Objects.equals(xeploai, that.xeploai) &&
            Objects.equals(trangthai, that.trangthai) &&
            Objects.equals(sudung, that.sudung) &&
            Objects.equals(chunhiemdetai, that.chunhiemdetai) &&
            Objects.equals(dutoanKPId, that.dutoanKPId) &&
            Objects.equals(danhgiaId, that.danhgiaId) &&
            Objects.equals(danhsachbaibaoId, that.danhsachbaibaoId) &&
            Objects.equals(tiendoId, that.tiendoId) &&
            Objects.equals(upfileId, that.upfileId) &&
            Objects.equals(nhansuthamgiaId, that.nhansuthamgiaId) &&
            Objects.equals(nguonkinhphiId, that.nguonkinhphiId) &&
            Objects.equals(coquanphoihopthamgiaId, that.coquanphoihopthamgiaId) &&
            Objects.equals(linhvucId, that.linhvucId) &&
            Objects.equals(capdetaiId, that.capdetaiId) &&
            Objects.equals(hoidongdanhgiaId, that.hoidongdanhgiaId) &&
            Objects.equals(chunhiemId, that.chunhiemId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
        id,
        ma,
        ten,
        thoigiantao,
        thoigianbatdau,
        thoigianketthuc,
        muctieu,
        noidung,
        tinhcapthiet,
        ketqua,
        xeploai,
        trangthai,
        sudung,
        chunhiemdetai,
        dutoanKPId,
        danhgiaId,
        danhsachbaibaoId,
        tiendoId,
        upfileId,
        nhansuthamgiaId,
        nguonkinhphiId,
        coquanphoihopthamgiaId,
        linhvucId,
        capdetaiId,
        hoidongdanhgiaId,
        chunhiemId
        );
    }

    @Override
    public String toString() {
        return "DetaiCriteria{" +
                (id != null ? "id=" + id + ", " : "") +
                (ma != null ? "ma=" + ma + ", " : "") +
                (ten != null ? "ten=" + ten + ", " : "") +
                (thoigiantao != null ? "thoigiantao=" + thoigiantao + ", " : "") +
                (thoigianbatdau != null ? "thoigianbatdau=" + thoigianbatdau + ", " : "") +
                (thoigianketthuc != null ? "thoigianketthuc=" + thoigianketthuc + ", " : "") +
                (muctieu != null ? "muctieu=" + muctieu + ", " : "") +
                (noidung != null ? "noidung=" + noidung + ", " : "") +
                (tinhcapthiet != null ? "tinhcapthiet=" + tinhcapthiet + ", " : "") +
                (ketqua != null ? "ketqua=" + ketqua + ", " : "") +
                (xeploai != null ? "xeploai=" + xeploai + ", " : "") +
                (trangthai != null ? "trangthai=" + trangthai + ", " : "") +
                (sudung != null ? "sudung=" + sudung + ", " : "") +
                (chunhiemdetai != null ? "chunhiemdetai=" + chunhiemdetai + ", " : "") +
                (dutoanKPId != null ? "dutoanKPId=" + dutoanKPId + ", " : "") +
                (danhgiaId != null ? "danhgiaId=" + danhgiaId + ", " : "") +
                (danhsachbaibaoId != null ? "danhsachbaibaoId=" + danhsachbaibaoId + ", " : "") +
                (tiendoId != null ? "tiendoId=" + tiendoId + ", " : "") +
                (upfileId != null ? "upfileId=" + upfileId + ", " : "") +
                (nhansuthamgiaId != null ? "nhansuthamgiaId=" + nhansuthamgiaId + ", " : "") +
                (nguonkinhphiId != null ? "nguonkinhphiId=" + nguonkinhphiId + ", " : "") +
                (coquanphoihopthamgiaId != null ? "coquanphoihopthamgiaId=" + coquanphoihopthamgiaId + ", " : "") +
                (linhvucId != null ? "linhvucId=" + linhvucId + ", " : "") +
                (capdetaiId != null ? "capdetaiId=" + capdetaiId + ", " : "") +
                (hoidongdanhgiaId != null ? "hoidongdanhgiaId=" + hoidongdanhgiaId + ", " : "") +
                (chunhiemId != null ? "chunhiemId=" + chunhiemId + ", " : "") +
            "}";
    }

}
