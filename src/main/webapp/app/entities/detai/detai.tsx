import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import './detai.scss';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, createEntity } from './detai.reducer';
import { getEntities as getLinhvucs } from 'app/entities/linhvuc/linhvuc.reducer';
import { getEntities as getCapdetais } from 'app/entities/capdetai/capdetai.reducer';
import { getEntities as getNguonkinhphi } from 'app/entities/nguonkinhphi/nguonkinhphi.reducer';
import { getEntities as getDutoanCT } from 'app/entities/dutoan-kpct/dutoan-kpct.reducer';
import { getEntity as getDutoan } from 'app/entities/dutoan-kp/dutoan-kp.reducer';
import { IDetai } from 'app/shared/model/detai.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import moment from 'moment';
export interface IDetaiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export type IDetaiState = IDetai;

export class Detai extends React.Component<IDetaiProps, IDetaiState> {
  state: IDetaiState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ModalAdd: false,
    ModalNguonkinhphi:false,
    ModalDutoan:false,
    
  };

  componentDidMount() {
    this.getEntities();
    Modal.setAppElement('body');
    this.props.getLinhvucs();
    this.props.getCapdetais();
  }

  OpenModalAdd = () => {
    this.setState({
      ModalAdd: true

    })

  }
  CloseModalAdd = () => {
    this.setState({
      ModalAdd: false
    })
  }
  OpenModalNguonkinhphi = () => {
    this.setState({
      ModalNguonkinhphi: true

    })

  }
  CloseModalNguonkinhphi = () => {
    this.setState({
      ModalNguonkinhphi: false
    })
  }
  OpenModalDutoan = () => {
    this.setState({
      ModalDutoan: true

    })

  }
  CloseModalDutoan = () => {
    this.setState({
      ModalDutoan: false
    })
  }
  
  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { detaiList, match, totalItems, linhvucList, capdetaiList,nguonkinhphiList,dutoanKP,dutoanKPCTList } = this.props;
    let count = 10 * (this.state.activePage - 1);
    let countNKP = 0;
    return (
      <div>
        <div className="card card-quanlydulieu">
          <div className="card-header card-header-quanlydulieu">
            <div className="row">
              <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU ĐỀ TÀI </h5></div>
              <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
            </div>

          </div>
          <div className="card-body card-body-quanlydulieu">
            <div className="filter-quanlydulieu">
              <div className="row">
                <div className="col-2">
                  <label>Mã đề tài</label>
                  <input type="text" name="filterMa" className="form-control" placeholder="..." />
                </div>
                <div className="col-2">
                  <label>Tên đề tài</label>
                  <input type="text" name="filterTen" className="form-control" placeholder="..." />
                </div>
                <div className="col-2">
                  <label>Tên chủ nhiệm</label>
                  <input type="text" name="filterChunhiem" className="form-control" placeholder="..." />
                </div>
               
                <div className="col-2">
                  <label>Ngày bắt đầu</label>
                  <input type="date" name="filterThoigianBD" className="form-control" />
                </div>
                <div className="col-2">
                  <label>Ngày kết thúc</label>
                  <input type="date" name="filterThoigianKT" className="form-control" />
                </div>
              </div>
              <br></br>
              <div className="row">
                
                <div className="col-2">
                  <label>Lĩnh vực</label>
                  <select className="form-control" name="filterLinhvuc">
                    <option value="" key="0">Chọn</option>
                    {linhvucList
                      ? linhvucList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tenlv}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
                <div className="col-2" style={{width:'50px'}}>
                  <label>Cấp đề tài</label>
                  
                  <select className="form-control" name="filterCapdetai" >
                    <option value="" key="0">Chọn</option>
                    {capdetaiList
                      ? capdetaiList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tencapdetai}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
                <div className="col-2">
                  <label>Trạng thái</label>
                  <select className="form-control" name="filterTrangthai">
                    <option value="">Chọn</option>
                    <option value="1">Chưa xác nhận</option>
                    <option value="2">Đang nghiên cứu</option>
                    <option value="3">Tạm dừng</option>
                    <option value="4">Hoàn thành</option>
                  </select>
                </div>
                <div className="col-2 filter-detai">
                  <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="table-quanlydulieu">
              {detaiList && detaiList.length > 0 ? (
                <table className="table table-hover table-striped table-bordered" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã </th>
                      <th>Tên </th>
                      <th>Cấp đề tài</th>
                      <th>Lĩnh vực</th>
                      <th>Chủ nhiệm</th>
                      <th>Thời gian bắt đầu</th>
                      <th>Thời gian kết thúc</th>
                      <th>Mục tiêu</th>
                      <th>Nội dung</th>
                      <th>Trạng thái</th>
                      <th>kết quả</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {detaiList.map((detai, i) => (
                      count++,
                      <tr key={`entity-${i}`}>
                        <td>{count}</td>
                        <td>{detai.ma}</td>
                        <td>{detai.ten}</td>
                        <td>{detai.capdetaiId}</td>
                        <td>{detai.linhvucId}</td>
                        <td>{detai.chunhiemdetai}</td>
                        <td>{detai.thoigianbatdau}</td>
                        <td>{detai.thoigianketthuc}</td>
                        <td>{detai.muctieu}</td>
                        <td>{detai.noidung}</td>
                        <td>{detai.trangthai}</td>
                        <td>{detai.ketqua}</td>
                        <td >
                          <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                            {close =>
                              <table className="table-hover table-button-active">

                                <tbody>

                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" >Xem thông tin đề tài</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" >Sửa thông tin đề tài</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" onClick={this.OpenModalNguonkinhphi} >Nguồn kinh phí</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" >Dự toán kinh phí</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" >Tiến độ</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" >Thành viên tham gia</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" >Hội đồng đánh giá</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td ><Button className="btn-sua" style={{ color: 'black' }} tag={Link} to={`${match.url}/${detai.id}/delete`} >Xóa</Button></td>
                                  </tr>

                                </tbody>

                              </table>
                            }
                          </Popup>

                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                  <div className="alert alert-warning">
                    <span>Không có dữ liệu</span>
                  </div>
                )}
            </div>
            <div className={detaiList && detaiList.length > 0 ? '' : 'd-none'}>
              <Row className="justify-content-center">
                <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
              </Row>
              <Row className="justify-content-center">
                <JhiPagination
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={5}
                  itemsPerPage={this.state.itemsPerPage}
                  totalItems={this.props.totalItems}
                />
              </Row>
            </div>
          </div>
        </div>
        <Modal isOpen={this.state.ModalAdd} className="modal-quanlydetai">

          <div className="card card-modal-quanlydulieu">
            <div className="card-header card-header-modal-quanlydulieu">
              <span>MODAL ĐỀ TÀI</span>
              <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
            </div>
            <div className="card-body card-body-modal-quanlydulieu">
              <div className="row">
                <div className="col-3">
                  <label>Mã đề tài</label>
                  <input type="text" name="madetai" className="form-control" placeholder="..." />
                </div>
                <div className="col-3">
                  <label>Tên đề tài</label>
                  <input type="text" name="tendetai" className="form-control" placeholder="..." />
                </div>
                <div className="col-3">
                  <label>Chủ nhiệm đề tài</label>
                  <input type="text" name="chunhiemdetai" className="form-control" placeholder="..." />
                </div>
                <div className="col-3">
                  <label>Cấp đề tài</label>
                  <select className="form-control" name="capdetai">
                    <option value="" key="0">Chọn</option>
                    {capdetaiList
                      ? capdetaiList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tencapdetai}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-3">
                  <label>Ngày bắt đầu</label>
                  <input type="date" name="ngaybatdau" className="form-control" />
                </div>
                <div className="col-3">
                  <label>Ngày kết thúc</label>
                  <input type="date" name="ngayketthuc" className="form-control" />
                </div>
                <div className="col-3">
                  <label>Lĩnh vực</label>
                  <select className="form-control" name="linhvuc">
                    <option value="" key="0">Chọn</option>
                    {linhvucList
                      ? linhvucList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tenlv}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
                <div className="col-3">
                    <label>Tính cấp thiết</label>
                    <select className="form-control" name="tinhcapthiet">
                        <option value="">Chọn</option>
                        <option value="1">Cấp 1</option>
                        <option value="2">Cấp 2</option>
                        <option value="3">Cấp 3</option>
                    </select>
                </div>
              </div>
              <br></br>
              <div className="row">
                    <div className="col-3">
                        <label>Mục tiêu</label>
                        <input type="text" name="muctieu" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-3">
                        <label>Kết quả</label>
                        <input type="text" name="ketqua" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-3">
                        <label>Trạng thái</label>
                        <select className="form-control" name="trangthai">
                          <option value="">Chọn</option>
                          <option value="1">Chưa xác nhận</option>
                          <option value="2">Đang nghiên cứu</option>
                          <option value="3">Tạm dừng</option>
                          <option value="4">Hoàn thành</option>
                        </select>
                    </div>
                    <div className="col-3">
                        <label>Xếp loại</label>
                        <select className="form-control" name="xeploai">
                          <option value="">Chọn</option>
                          <option value="1">Xuất sắc</option>
                          <option value="2">Tốt</option>
                          <option value="3">Khá</option>
                          <option value="4">Trung bình</option>
                          <option value="5">Kém</option>
                        </select>
                    </div>
              </div>
              <div>
                <label>Nội dung</label>
                <textarea className="form-control" name="noidung" rows={4} placeholder="..."></textarea>
              </div>
            </div>
            <div className="card-footer card-footer-modal-quanlydulieu">
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" className="btn btn-primary"> Lưu</button>
                  <button className="btn btn-default" onClick={() => this.CloseModalAdd()}> Hủy</button>

                </div>

              </div>
            </div>
          </div>

        </Modal>
       
    <Modal isOpen={this.state.ModalNguonkinhphi} className="modal-quanlydulieu">
      
      <div className="card card-modal-quanlydulieu">
        <div className="card-header card-header-modal-quanlydulieu">
          <span>MODAL NGUỒN KINH PHÍ</span>
          <button type="button" onClick={() => this.CloseModalNguonkinhphi()}><i className="fa fa-close"></i></button>
        </div>
        <div className="card-body card-body-modal-quanlydulieu">
            <div className="row">
                <div className="col-5">
                  <label>Mã </label>
                  <input type="text" className="form-control" name="manguonkinhphi"  placeholder="..." />
                </div>
                <div className="col-5">
                  <label>Tên </label>
                  <input type="text" className="form-control" name="tennguonkinhphi"  placeholder="..." />
                </div>
            </div>
            <div className="row themtv">
                <div className="col-5">
                  <label>Số tiền cấp</label>
                  <input type="number" className="form-control" name="sotiencap" placeholder="..." />
                </div>
                <div className="col-5">
                    <label>Ghi chú</label>
                    <input type="text" className="form-control" name="ghichu" placeholder="..." />
                </div>
                <div className="col-2">
                    <button type="button" className="btn btn-primary btn-themtv"><i className="fa fa-download"></i> Thêm</button>
                </div>
            </div>
            <br></br>
            <div>
              <h5>Danh sách nguồn kinh phí</h5>
              <div className="table-thanhvien">
                <div className="table-thanhvien-scroll">
                {nguonkinhphiList && nguonkinhphiList.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Đơn vị</th>
                    <th>Trách nhiệm</th>
                  </tr>
                </thead>
                <tbody>
                  {nguonkinhphiList.map((nguonkinhphi, i) => (
                    countNKP++,
                    <tr key={`entity-${i}`}>
                      <td>{countNKP}</td>
                      <td>{nguonkinhphi.manguonkinhphi}</td>
                      <td>{nguonkinhphi.tennguonkinhphi}</td>
                      <td>{nguonkinhphi.sotiencap}</td>
                      <td>{nguonkinhphi.noidung}</td>
                      <td><i className="fa fa-close xoa-tv"  ></i></td>
                      </tr>
                      ))}
                      
                </tbody>
              </table>
              ) : (
                <div className="alert alert-warning">
                  <span>Không có dữ liệu</span>
                </div>
              )}
            </div>
            </div></div>
        </div>
        <div className="card-footer card-footer-modal-quanlydulieu">
          <div className="row">
            <div className="col-8"></div>
            <div className="col-4">
              <button type="submit" onClick={() => this.CloseModalNguonkinhphi()} className="btn btn-primary"> Lưu</button>
              <button className="btn btn-default" onClick={() => this.CloseModalNguonkinhphi()}> Đóng</button>
              
            </div>

          </div>
        </div>
      </div>
    
    </Modal>
      </div>

    );
  }
}

const mapStateToProps = ({ detai, capdetai, linhvuc,nguonkinhphi,dutoanKP,dutoanKPCT }: IRootState) => ({
  detaiList: detai.entities,
  totalItems: detai.totalItems,
  capdetaiList: capdetai.entities,
  linhvucList: linhvuc.entities,
  nguonkinhphiList: nguonkinhphi.entities,
  dutoanKP:dutoanKP.entity,
  dutoanKPCTList: dutoanKPCT.entities
});

const mapDispatchToProps = {
  getEntities, updateEntity, createEntity, getLinhvucs, getCapdetais,getNguonkinhphi,getDutoan,getDutoanCT
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detai);
