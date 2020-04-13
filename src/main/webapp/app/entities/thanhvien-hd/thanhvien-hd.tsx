import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { IRootState } from 'app/shared/reducers';
import { getEntities,updateEntity, createEntity  } from './thanhvien-hd.reducer';
import { IThanhvienHD } from 'app/shared/model/thanhvien-hd.model';
import { getEntities as getHoidongdanhgias } from 'app/entities/hoidongdanhgia/hoidongdanhgia.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IThanhvienHDProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IThanhvienHDState = IThanhvienHD;

export class ThanhvienHD extends React.Component<IThanhvienHDProps, IThanhvienHDState> {
  state: IThanhvienHDState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    tenTV:'',
    tenDV:'',
    tenTN:0,
    ModalAdd:false,
    sd:1,
    hoidongdanhgia:0,
    thanhvienid:0,
    filterHoidong:'',
    filterDonvi:'',
    filterTen:'',
    sort:'ten'
    
  };

  componentDidMount() {
    this.getEntities();
    Modal.setAppElement('body');
    this.props.getHoidongdanhgias();
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
  CloseModalAdd = () => {
    this.setState({
      tenTV:'',
    tenDV:'',
    tenTN:0,
    ModalAdd:false,
    sd:1,
    hoidongdanhgia:0,
    thanhvienid:0,
    })
  }
  show=(thanhvien)=>{
    this.setState({
      tenTV:thanhvien.ten,
      tenDV:thanhvien.donvi,
      tenTN:thanhvien.trachnhiem,
      ModalAdd:true,
      sd:thanhvien.sudung,
      hoidongdanhgia:thanhvien.hoidongdanhgiaId,
      thanhvienid:thanhvien.id,
    });
 }
  enter=(e)=>{
    if(e.key==="Enter"){
      this.sortEntities();
    }
  }
  saveEntity = () => {
    
    if(this.state.thanhvienid===0){
      const entity={
      ten:this.state.tenTV,
      donvi:this.state.tenDV,
      trachnhiem:this.state.tenTN,
      hoidongdanhgiaId:this.state.hoidongdanhgia,
      sudung:1
      }
      this.props.createEntity(entity);
      this.CloseModalAdd();
    }
    else{
      const entity={
      id:this.state.thanhvienid,
      ten:this.state.tenTV,
      donvi:this.state.tenDV,
      trachnhiem:this.state.tenTN,
      hoidongdanhgiaId:this.state.hoidongdanhgia,
      sudung:1
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
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&ten=${this.state.filterTen}&donvi=${this.state.filterDonvi}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order,filterTen,filterDonvi } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`,filterTen,filterDonvi);
  };
  

  render() {
    const { thanhvienHDList, match, totalItems,hoidongdanhgiaList } = this.props;
    let count=10*(this.state.activePage - 1);
    return (
      <div>
      <div className="card card-quanlydulieu">
        <div className="card-header card-header-quanlydulieu">
          <div className="row">
            <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU THÀNH VIÊN HỘI ĐỒNG  </h5></div>
            <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
          </div>

        </div>
        <div className="card-body card-body-quanlydulieu">
          <div className="filter-quanlydulieu">
            <div className="row">
              <div className="col-3">

                <input type="text" name="filterTen" value={this.state.filterTen} onChange={this.onChange} className="form-control" placeholder="Tên thành viên" onKeyDown={this.enter} />
              </div>
              <div className="col-3">

                <input type="text" name="filterDonvi" value={this.state.filterDonvi} onChange={this.onChange} className="form-control" placeholder="Tên đơn vị" onKeyDown={this.enter} />
              </div>
              <div className="col-3">

                <input type="text" name="filterHoidong" value={this.state.filterHoidong} onChange={this.onChange} className="form-control" placeholder="Tên hội đồng" onKeyDown={this.enter} />
              </div>
              <div className="col-2">
                <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
              </div>
            </div>
          </div>
          <br></br>
          <div className="table-quanlydulieu">
            {thanhvienHDList && thanhvienHDList.length > 0 ? (
              <table className="table table-hover table-striped table-bordered" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Tên thành viên</th>
                    <th>Đơn vị</th>
                    <th>Trách nhiệm</th>
                    <th>Hội đồng đánh giá</th>
                    
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {thanhvienHDList.map((thanhvien, i) => (
                    count++,
                    <tr key={`entity-${i}`}>
                      <td>{count}</td>
                      <td>{thanhvien.ten}</td>
                      <td>{thanhvien.donvi}</td>
                      <td>{this.tentrachnhiem(thanhvien)}</td>
                      <td>{thanhvien.hoidongdanhgiaId}</td>
                     
                      <td >
                        <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                          {close =>
                            <table className="table-hover table-button-active">

                              <tbody>
                                
                                <tr onClick={close}>
                                  <td><button className=" btn-sua" onClick={()=>this.show(thanhvien)} >Sửa</button></td>
                                </tr>
                                <tr onClick={close}>
                                  <td ><Button className="btn-sua" style={{color:'black'}} tag={Link} to={`${match.url}/${thanhvien.id}/delete`} >Xóa</Button></td>
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
          <div className={thanhvienHDList && thanhvienHDList.length > 0 ? '' : 'd-none'}>
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
            <span>MODAL THÀNH VIÊN HỘI ĐỒNG</span>
            <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
          </div>
          <div className="card-body card-body-modal-quanlydulieu">
              <div className="row">
                  <div className="col-6">
                        <label>Tên thành viên</label>
                        <input type="text" onChange={this.onChange} value={this.state.tenTV} name="tenTV" className="form-control" placeholder="..." />
                  </div>
                  <div className="col-6"> 
                        <label>Tên đơn vị</label>
                        <input type="text" onChange={this.onChange} value={this.state.tenDV} name="tenDV" className="form-control viethoa" placeholder="..."/>
                  </div>
              </div>
              <div className="row">
                  <div className="col-6">
                        <label>Trách nhiệm</label>
                        <select className="form-control" value={this.state.tenTN} name="tenTN" onChange={this.onChange}>
                          <option value="0">Chọn</option>
                          <option value="1">Chủ tịch hội đồng</option>
                          <option value="2">Thư ký</option>
                          <option value="3">Thành viên</option>
                        </select>
                  </div>
                  <div className="col-6"> 
                        <label>Tên hội đồng</label>
                        <select className="form-control" value={this.state.hoidongdanhgia} name="hoidongdanhgia" onChange={this.onChange}>
                        <option value="" key="0" >Chọn</option>
                    {hoidongdanhgiaList
                      ? hoidongdanhgiaList.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.tenhoidong}
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

const mapStateToProps = ({ thanhvienHD,hoidongdanhgia }: IRootState) => ({
  thanhvienHDList: thanhvienHD.entities,
  totalItems: thanhvienHD.totalItems,
  hoidongdanhgiaList: hoidongdanhgia.entities,
});

const mapDispatchToProps = {
  getEntities,
  getHoidongdanhgias,updateEntity, createEntity 
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ThanhvienHD);
