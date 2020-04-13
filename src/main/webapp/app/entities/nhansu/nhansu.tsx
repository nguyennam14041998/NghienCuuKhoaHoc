import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, createEntity } from './nhansu.reducer';
import { getEntities as getDonvis } from 'app/entities/donvi/donvi.reducer';
import { getEntities as getChucdanhs } from 'app/entities/chucdanh/chucdanh.reducer';
import { getEntities as getHochams } from 'app/entities/hocham/hocham.reducer';
import { INhansu } from 'app/shared/model/nhansu.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import moment from 'moment';
export interface INhansuProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type INhansuState = INhansu;

export class Nhansu extends React.Component<INhansuProps, INhansuState> {
  state: INhansuState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    sort:'tennhansu',
    nhansuid:0,
    ngaysinhnhansu: '',
    ma:'',
    ten:'',
    dienthoai:0,
    diachiemail:'',
    diachinhansu:'',
    sd:1,
    donvi:0,
    chucdanh:0,
    hocham:0,
    ModalAdd:false,
    filterTen:'',
    filterMa:'',
    filterChuyennganh:''
    
  };

  componentDidMount() {
    this.getEntities();
    Modal.setAppElement('body');
    this.props.getDonvis();
    this.props.getChucdanhs();
    this.props.getHochams();
  }
  onChange=(e)=>{
    const target =e.target;
    const value =target.value;
    const name = target.name;
    this.setState({
      [name]:value
    }); 
  }
  OpenModalAdd = () => {
    this.setState({
      ModalAdd: true
      
    })

  }
  CloseModalAdd = () => {
    this.setState({
      nhansuid:0,
      ngaysinhnhansu: '',
      ma:'',
      ten:'',
      dienthoai:0,
      diachiemail:'',
      diachinhansu:'',
      sd:1,
      donvi:0,
      chucdanh:0,
      hocham:0,
      ModalAdd:false
    })
  }
  show=(nhansu)=>{
    this.setState({
      nhansuid:nhansu.id,
      ngaysinhnhansu: nhansu.ngaysinh,
      ma:nhansu.manhansu,
      ten:nhansu.tennhansu,
      dienthoai:nhansu.sdt,
      diachiemail:nhansu.email,
      diachinhansu:nhansu.diachi,
      sd:nhansu.sudung,
      donvi:nhansu.donviId,
      chucdanh:nhansu.chucdanhId,
      hocham:nhansu.hochamId,
      ModalAdd:true
    });
 }
 enter=(e)=>{
  if(e.key==="Enter"){
    this.sortEntities();
  }
}
saveEntity = () => {
    
  if(this.state.nhansuid===0){
    const entity={
    tennhansu:this.state.ten,
    manhansu:this.state.ma,
    ngaysinh:moment(this.state.ngaysinhnhansu),
    sdt:this.state.dienthoai,
    email:this.state.diachiemail,
    diachi:this.state.diachinhansu,
    sudung:1,
    donviId:this.state.donvi,
    chucdanhId:this.state.chucdanh,
    hochamId:this.state.hocham

    }
    this.props.createEntity(entity);
    this.CloseModalAdd();
  }
  else{
    const entity={
      id:this.state.nhansuid,
      tennhansu:this.state.ten,
      manhansu:this.state.ma,
      ngaysinh:moment(this.state.ngaysinhnhansu),
      sdt:this.state.dienthoai,
      email:this.state.diachiemail,
      diachi:this.state.diachinhansu,
      sudung:1,
      donviId:this.state.donvi,
      chucdanhId:this.state.chucdanh,
      hochamId:this.state.hocham
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

  sortEntities=()=> {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&ma=${this.state.filterMa}&ten=${this.state.filterTen}&chuyennganhid=${this.state.filterChuyennganh}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order,filterMa,filterTen,filterChuyennganh } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`,filterMa,filterTen,filterChuyennganh);
  };

  render() {
    const { nhansuList, match, totalItems,donviList,chucdanhList,hochamList } = this.props;
    let count = 10*(this.state.activePage - 1);
    return (
      <div>
        <div className="card card-quanlydulieu">
          <div className="card-header card-header-quanlydulieu">
            <div className="row">
              <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU NHÂN SỰ  </h5></div>
              <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
            </div>

          </div>
          <div className="card-body card-body-quanlydulieu">
            <div className="filter-quanlydulieu">
              <div className="row">
                <div className="col-3">

                  <input type="text" name="filterMa" value={this.state.filterMa} onChange={this.onChange} className="form-control" placeholder="Mã nhân sự" onKeyDown={this.enter} />
                </div>
                <div className="col-3">

                  <input type="text" name="filterTen" value={this.state.filterTen} onChange={this.onChange} className="form-control" placeholder="Tên nhân sự" onKeyDown={this.enter} />
                </div>
                <div className="col-3">
                  <select className="form-control" value={this.state.filterChuyennganh} name="filterChuyennganh" onChange={this.onChange} >
                    <option value=''>Chọn chuyên ngành</option>
                    {donviList
                      ? donviList.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.tendv}
                          </option>
                        ))
                      : null}
                  </select>
                </div>
                <div className="col-2">
                  <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="table-quanlydulieu">
              {nhansuList && nhansuList.length > 0 ? (
                <table className="table table-hover table-striped table-bordered" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã nhân sự</th>
                      <th>Tên nhân sự</th>
                      <th>Điện thoại</th>
                      <th>Email</th>
                      <th>Địa chỉ</th>
                      <th>Ngày sinh</th>
                      <th>Chuyên ngành</th>
                      <th>Chức danh</th>
                      <th>Học hàm</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {nhansuList.map((nhansu, i) => (
                      count++,
                      <tr key={`entity-${i}`}>
                        <td>{count}</td>
                        <td>{nhansu.manhansu}</td>
                        <td>{nhansu.tennhansu}</td>
                        <td>{nhansu.sdt}</td>
                        <td>{nhansu.email}</td>
                        <td>{nhansu.diachi}</td>
                        <td>{nhansu.ngaysinh}</td>
                        <td>{nhansu.donviId}</td>
                        <td>{nhansu.chucdanhId}</td>
                        <td>{nhansu.hochamId}</td>
                        <td >
                          <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                            {close =>
                              <table className="table-hover table-button-active">

                                <tbody>
                                  
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" onClick={()=>this.show(nhansu)} >Sửa</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td ><Button className="btn-sua" style={{color:'black'}} tag={Link} to={`${match.url}/${nhansu.id}/delete`} >Xóa</Button></td>
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
            <div className={nhansuList && nhansuList.length > 0 ? '' : 'd-none'}>
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
              <span>MODAL NHÂN SỰ</span>
              <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
            </div>
            <div className="card-body card-body-modal-quanlydulieu">
                <div className="row">
                    <div className="col-6">
                          <label>Mã nhân sự</label>
                          <input type="text" onChange={this.onChange} value={this.state.ma} name="ma" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-6"> 
                          <label>Tên nhân sự</label>
                          <input type="text" onChange={this.onChange} value={this.state.ten} name="ten" className="form-control viethoa " placeholder="..."/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                          <label>Số điện thoại</label>
                          <input type="number" onChange={this.onChange} value={this.state.dienthoai} name="dienthoai" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-6"> 
                          <label>Email</label>
                          <input type="email" onChange={this.onChange} value={this.state.diachiemail} name="diachiemail" className="form-control" placeholder="..." />
                    </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Địa chỉ</label>
                    <input type="text" onChange={this.onChange} value={this.state.diachinhansu} name="diachinhansu" className="form-control" placeholder="..." />
                  </div>
                  <div className="col-6">
                    <label>Ngày sinh</label>
                    <input type="date" onChange={this.onChange} value={this.state.ngaysinhnhansu} name="ngaysinhnhansu" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                      <label>Chuyên ngành</label>
                      <select className="form-control" value={this.state.donvi} name="donvi" onChange={this.onChange}>
                        <option value=''>Chọn</option>
                        {donviList
                      ? donviList.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.tendv}
                          </option>
                        ))
                      : null}
                      </select>
                  </div>
                  <div className="col-6">
                      <label>Chức danh</label>
                      <select className="form-control" value={this.state.chucdanh} name="chucdanh" onChange={this.onChange}>
                        <option value=''>Chọn</option>
                        {chucdanhList
                      ? chucdanhList.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.tenchucdanh}
                          </option>
                        ))
                      : null}
                      </select>
                  </div>
                </div>
                <div>
                <label>Học hàm</label>
                      <select className="form-control" value={this.state.hocham} name="hocham" onChange={this.onChange}>
                        <option value=''>Chọn</option>
                        {hochamList
                      ? hochamList.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.tenhocham}
                          </option>
                        ))
                      : null}
                      </select>
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

const mapStateToProps = ({ nhansu,donvi,chucdanh,hocham }: IRootState) => ({
  nhansuList: nhansu.entities,
  totalItems: nhansu.totalItems,
  donviList: donvi.entities,
  chucdanhList: chucdanh.entities,
  hochamList: hocham.entities,
});

const mapDispatchToProps = {
  getEntities, updateEntity, createEntity,getDonvis,getChucdanhs,getHochams
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nhansu);
