import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './hoidongdanhgia.scss';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { IRootState } from 'app/shared/reducers';
import { getEntities,updateEntity, createEntity } from './hoidongdanhgia.reducer';
import { IHoidongdanhgia } from 'app/shared/model/hoidongdanhgia.model';
import { getThanhVienHoiDong as getThanhVien } from 'app/entities/thanhvien-hd/thanhvien-hd.reducer';
import { xoaTV,addTV } from 'app/entities/thanhvien-hd/thanhvien-hd.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHoidongdanhgiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IHoidongdanhgiaState = IHoidongdanhgia;

export class Hoidongdanhgia extends React.Component<IHoidongdanhgiaProps, IHoidongdanhgiaState> {
  state: IHoidongdanhgiaState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ten:'',
    ma:'',
    sd:1,
    filterMa:'',
    filterTen:'',
    filterHoidong:'',
    hoidongid:0,
    ModalAdd:false,
    sort:'tenhoidong',
    sapxep:'trachnhiem',
    ModalAddthanhvien:false,
    tenTV:'',
    donviTV:'',
    trachnhiemTV:0
  };

  componentDidMount() {
    this.getEntities();
    Modal.setAppElement('body');
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
      ten:'',
      ma:'',
      sd:1,
      filterMa:'',
      filterTen:'',
      hoidongid:0,
      ModalAdd:false
    })
  }
  OpenModalAddThanhvien=(hoidong)=>{
    this.setState({
      ModalAddthanhvien:true,
      filterHoidong:hoidong.id
    });
    setTimeout(this.getThanhVienHD,500);
  }
  CloseModalAddThanhvien=()=>{
    this.setState({
      ModalAddthanhvien:false,
      filterHoidong:'0'
    })
    setTimeout(this.getThanhVienHD,500);
  }
  show=(hoidong)=>{
    this.setState({
     ten:hoidong.tenhoidong,
     ma:hoidong.mahoidong,
     sd:hoidong.sudung,
     hoidongid:hoidong.id,
     ModalAdd:true
    });
 }
 enter=(e)=>{
   if(e.key==="Enter"){
     this.sortEntities();
   }
 }
 tentrachnhiem=(thanhvien)=>{
  if(thanhvien.trachnhiem===1){
    return 'Chủ tịch hội đồng'
  }
  else if(thanhvien.trachnhiem===2){
    return 'Thư ký'
  }
  else if(thanhvien.trachnhiem===3){
    return 'Thành viên'
  }
  else{
    return ''
  }
}
 saveEntity = () => {
    
  if(this.state.hoidongid===0){
    const entity={
    tenhoidong:this.state.ten,
    mahoidong:this.state.ma,
    sudung:1
    }
    this.props.createEntity(entity);
    this.CloseModalAdd();
  }
  else{
    const entity={
    id:this.state.hoidongid,
    tenhoidong:this.state.ten,
    mahoidong:this.state.ma,
    sudung:this.state.sd
    }
    this.props.updateEntity(entity);
    this.CloseModalAdd();
  }
  

};
xoathanhvien=(thanhvien)=>{
  const entity={
    id:thanhvien.id,
    ten:thanhvien.ten,
    donvi:thanhvien.donvi,
    trachnhiem:thanhvien.trachnhiem,
    sudung:0,
    hoidongdanhgiaId:thanhvien.hoidongdanhgiaId
  }
  this.props.xoaTV(entity);
  setTimeout(this.getThanhVienHD,500);
}
clearTV=()=>{
  this.setState({
    tenTV:'',
    donviTV:'',
    trachnhiemTV:0
  })
}
themthanhvien=()=>{
  const entity={
    ten:this.state.tenTV,
    donvi:this.state.donviTV,
    trachnhiem:this.state.trachnhiemTV,
    sudung:1,
    hoidongdanhgiaId:Number(this.state.filterHoidong)
  }
  this.props.addTV(entity);
  this.clearTV();
  setTimeout(this.getThanhVienHD,500);
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
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&ten=${this.state.filterTen}&ma=${this.state.filterMa}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order,filterMa,filterTen } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`,filterMa,filterTen);
  };
  getThanhVienHD=()=>{
    const {sapxep,order,filterHoidong}=this.state;
    this.props.getThanhVien(`${sapxep},${order}`,filterHoidong);
  }
  render() {
    const { hoidongdanhgiaList, match, totalItems,thanhvienList } = this.props;
    let count=10*(this.state.activePage - 1);
    let countTV=0;
    return (
      <div>
      <div className="card card-quanlydulieu">
        <div className="card-header card-header-quanlydulieu">
          <div className="row">
            <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU HỘI ĐỒNG  </h5></div>
            <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
          </div>

        </div>
        <div className="card-body card-body-quanlydulieu">
          <div className="filter-quanlydulieu">
            <div className="row">
              <div className="col-3">

                <input type="text" name="filterMa" value={this.state.filterMa} onChange={this.onChange} className="form-control" placeholder="Mã hội đồng" onKeyDown={this.enter} />
              </div>
              <div className="col-3">

                <input type="text" name="filterTen" value={this.state.filterTen} onChange={this.onChange} className="form-control" placeholder="Tên hội đồng" onKeyDown={this.enter} />
              </div>
              <div className="col-2">
                <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
              </div>
            </div>
          </div>
          <br></br>
          <div className="table-quanlydulieu">
            {hoidongdanhgiaList && hoidongdanhgiaList.length > 0 ? (
              <table className="table table-hover table-striped table-bordered" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã hội đồng</th>
                    <th>Tên hội đồng</th>
                    
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {hoidongdanhgiaList.map((hoidong, i) => (
                    count++,
                    <tr key={`entity-${i}`}>
                      <td>{count}</td>
                      <td>{hoidong.mahoidong}</td>
                      <td>{hoidong.tenhoidong}</td>
                     
                      <td >
                        <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                          {close =>
                            <table className="table-hover table-button-active">

                              <tbody>
                                
                                <tr onClick={close}>
                                  <td><button className=" btn-sua" onClick={()=>this.show(hoidong)} >Sửa</button></td>
                                </tr>
                                <tr onClick={close}>
                                  <td><button className=" btn-sua" onClick={()=>this.OpenModalAddThanhvien(hoidong)}  >Thành viên hội đồng</button></td>
                                </tr>
                                <tr onClick={close}>
                                  <td ><Button className="btn-sua" style={{color:'black'}} tag={Link} to={`${match.url}/${hoidong.id}/delete`} >Xóa</Button></td>
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
          <div className={hoidongdanhgiaList && hoidongdanhgiaList.length > 0 ? '' : 'd-none'}>
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
            <span>MODAL HỘI ĐỒNG</span>
            <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
          </div>
          <div className="card-body card-body-modal-quanlydulieu">
              <div className="row">
                  <div className="col-6">
                        <label>Mã hội đồng</label>
                        <input type="text" onChange={this.onChange} value={this.state.ma} name="ma" className="form-control" placeholder="..." />
                  </div>
                  <div className="col-6"> 
                        <label>Tên hội đồng</label>
                        <input type="text" onChange={this.onChange} value={this.state.ten} name="ten" className="form-control viethoa" placeholder="..."/>
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
      <Modal isOpen={this.state.ModalAddthanhvien} className="modal-quanlydulieu">
      
        <div className="card card-modal-quanlydulieu">
          <div className="card-header card-header-modal-quanlydulieu">
            <span>MODAL QUẢN LÝ THÀNH VIÊN</span>
            <button type="button" onClick={() => this.CloseModalAddThanhvien()}><i className="fa fa-close"></i></button>
          </div>
          <div className="card-body card-body-modal-quanlydulieu">
              <div className="row">
                  <div className="col-6">
                    <label>Tên thành viên</label>
                    <input type="text" className="form-control" name="tenTV" value={this.state.tenTV} onChange={this.onChange} placeholder="..." />
                  </div>
                  <div className="col-6">
                    <label>Tên đơn vị</label>
                    <input type="text" className="form-control" name="donviTV" value={this.state.donviTV} onChange={this.onChange} placeholder="..." />
                  </div>
              </div>
              <div className="row themtv">
                  <div className="col-6">
                    <label>Trách nhiệm</label>
                    <select className="form-control" name="trachnhiemTV" value={this.state.trachnhiemTV} onChange={this.onChange}>
                        <option value="">Chọn</option>
                        <option value="1">Chủ tịch hội đồng</option>
                        <option value="2">Thư ký</option>
                        <option value="3">Thành viên</option>
                    </select>
                  </div>
                  <div className="col-3">
                      <button type="button" onClick={()=>this.themthanhvien()} className="btn btn-primary btn-themtv"><i className="fa fa-download"></i> Thêm</button>
                  </div>
              </div>
              <br></br>
              <div>
                <h5>Danh sách thành viên</h5>
                <div className="table-thanhvien">
                  <div className="table-thanhvien-scroll">
                  {thanhvienList && thanhvienList.length > 0 ? (
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
                    {thanhvienList.map((thanhvien, i) => (
                      countTV++,
                      <tr key={`entity-${i}`}>
                        <td>{countTV}</td>
                        <td>{thanhvien.ten}</td>
                        <td>{thanhvien.donvi}</td>
                        <td>{this.tentrachnhiem(thanhvien)}</td>
                        <td><i className="fa fa-close xoa-tv" onClick={()=>this.xoathanhvien(thanhvien)} ></i></td>
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
                <button type="submit" onClick={() => this.CloseModalAddThanhvien()} className="btn btn-primary"> Lưu</button>
                <button className="btn btn-default" onClick={() => this.CloseModalAddThanhvien()}> Đóng</button>
                
              </div>

            </div>
          </div>
        </div>
      
      </Modal>
    </div>
        
    );
  }
}

const mapStateToProps = ({ hoidongdanhgia,thanhvienHD }: IRootState) => ({
  hoidongdanhgiaList: hoidongdanhgia.entities,
  totalItems: hoidongdanhgia.totalItems,
  thanhvienList:thanhvienHD.entities
});

const mapDispatchToProps = {
  getEntities,updateEntity, createEntity,getThanhVien,xoaTV,addTV
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hoidongdanhgia);
