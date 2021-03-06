import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, createEntity } from './chunhiem.reducer';
import { getEntities as getNhansus } from 'app/entities/nhansu/nhansu.reducer';
import { IChunhiem } from 'app/shared/model/chunhiem.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IChunhiemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export type IChunhiemState = IChunhiem;

export class Chunhiem extends React.Component<IChunhiemProps, IChunhiemState> {
  state: IChunhiemState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ModalAdd: false,
    chunhiemid: 0,
    filterTen: '',
    sd: 1,
    nhansu: 0
  };

  componentDidMount() {
    this.getEntities();
    this.props.getNhansus();
    Modal.setAppElement('body');
  }
  onChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  OpenModalAdd = () => {
    this.setState({
      ModalAdd: true

    })

  }
  CloseModalAdd = () => {
    this.setState({
      filterTen: '',
      chunhiemid: 0,
      ModalAdd: false,
      nhansu: 0
    })
  }
  show = (chunhiem) => {
    this.setState({
      chunhiemid: chunhiem.id,
      nhansu: chunhiem.nhansuId,
      ModalAdd: true
    });
  }
  enter = (e) => {
    if (e.key === "Enter") {
      this.sortEntities();
    }
  }
  saveEntity = () => {

    if (this.state.chunhiemid === 0) {
      const entity = {
        nhansuId: this.state.nhansu,
        sudung: 1
      }
      this.props.createEntity(entity);
      this.CloseModalAdd();
    }
    else {
      const entity = {
        id: this.state.chunhiemid,
        nhansuId: this.state.nhansu,
        sudung: this.state.sd
      }
      this.props.updateEntity(entity);
      this.CloseModalAdd();
    }


  };
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
    const { chunhiemList, match, totalItems, nhansuList } = this.props;
    let count = 10*(this.state.activePage - 1);
    return (
      <div>
        <div className="card card-quanlydulieu">
          <div className="card-header card-header-quanlydulieu">
            <div className="row">
              <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU CHỦ NHIỆM  </h5></div>
              <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
            </div>

          </div>
          <div className="card-body card-body-quanlydulieu">
            <div className="filter-quanlydulieu">
              <div className="row">

                <div className="col-3">

                  <input type="text" name="filterTen" value={this.state.filterTen} onChange={this.onChange} className="form-control" placeholder="Tên chủ nhiệm" onKeyDown={this.enter} />
                </div>
                <div className="col-2">
                  <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="table-quanlydulieu">
              {chunhiemList && chunhiemList.length > 0 ? (
                <table className="table table-hover table-striped table-bordered" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Tên chủ nhiệm</th>
                      <th>Email</th>
                      <th>Địa chỉ</th>
                      <th>Ngày sinh</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {chunhiemList.map((chunhiem, i) => (
                      count++,
                      <tr key={`entity-${i}`}>
                        <td>{count}</td>
                        <td>{chunhiem.nhansuId}</td>
                        <th>{chunhiem.email}</th>
                        <th>{chunhiem.diachi}</th>
                        <th>{chunhiem.ngaysinh}</th>

                        <td >
                          <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                            {close =>
                              <table className="table-hover table-button-active">

                                <tbody>

                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" onClick={() => this.show(chunhiem)} >Sửa</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td ><Button className="btn-sua" style={{ color: 'black' }} tag={Link} to={`${match.url}/${chunhiem.id}/delete`} >Xóa</Button></td>
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
            <div className={chunhiemList && chunhiemList.length > 0 ? '' : 'd-none'}>
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
        <Modal isOpen={this.state.ModalAdd} className="modal-quanlydulieu">

          <div className="card card-modal-quanlydulieu">
            <div className="card-header card-header-modal-quanlydulieu">
              <span>MODAL CHỦ NHIỆM</span>
              <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
            </div>
            <div className="card-body card-body-modal-quanlydulieu">
              <div className="row">
                <div className="col-6">
                  <label>Nhân sự</label>
                  <select className="form-control" value={this.state.nhansu} onChange={this.onChange} name="nhansu" >
                    <option value="">Chọn</option>
                   
                    {nhansuList
                      ? nhansuList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.tennhansu}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
                <div className="col-6">
                  <label>Ngày sinh</label>
                  <select className="form-control" value={this.state.nhansu} onChange={this.onChange} name="nhansu" disabled >
                    <option value=""></option>
                    
                    {nhansuList
                      ? nhansuList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.ngaysinh}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <label>Email</label>
                  <select className="form-control" value={this.state.nhansu} onChange={this.onChange} name="nhansu" disabled >
                    <option value=""></option>
                   
                    {nhansuList
                      ? nhansuList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.email}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
                <div className="col-6">
                  <label>Địa chỉ</label>
                  <select className="form-control" value={this.state.nhansu} onChange={this.onChange} name="nhansu" disabled >
                    <option value=""></option>
                    
                    {nhansuList
                      ? nhansuList.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.diachi}
                        </option>
                      ))
                      : null}
                  </select>
                </div>
              </div>

            </div>
            <div className="card-footer card-footer-modal-quanlydulieu">
              <div className="row">
                <div className="col-8"></div>
                <div className="col-4">
                  <button type="submit" onClick={this.saveEntity} className="btn btn-primary"> Lưu</button>
                  <button className="btn btn-default" onClick={() => this.CloseModalAdd()}> Hủy</button>

                </div>

              </div>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ chunhiem, nhansu }: IRootState) => ({
  chunhiemList: chunhiem.entities,
  totalItems: chunhiem.totalItems,
  nhansuList: nhansu.entities,
});

const mapDispatchToProps = {
  getEntities, updateEntity, createEntity, getNhansus
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chunhiem);
