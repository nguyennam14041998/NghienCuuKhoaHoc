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
import { getEntities,updateEntity, createEntity,reset  } from './coquanphoihop.reducer';
import { ICoquanphoihop } from 'app/shared/model/coquanphoihop.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICoquanphoihopProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICoquanphoihopState = ICoquanphoihop;

export class Coquanphoihop extends React.Component<ICoquanphoihopProps, ICoquanphoihopState> {
  state: ICoquanphoihopState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ten:'',
    ma:'',
    nd:'',
    sd:1,
    daidien:'',
    coquanid:0,
    sort:'tencoquan',
    filterMa:'',
    filterTen:'',
    filterDaidien:'',
    ModalAdd:false
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
    nd:'',
    sd:1,
    daidien:'',
    coquanid:0,
    ModalAdd:false
    })
  }
  show=(coquanphoihop)=>{
    this.setState({
     ten:coquanphoihop.tencoquan,
     ma:coquanphoihop.macoquan,
     nd:coquanphoihop.noidung,
     daidien:coquanphoihop.tendaidien,
     sd:coquanphoihop.sudung,
     coquanid:coquanphoihop.id,
     ModalAdd:true
    });
 }
 enter=(e)=>{
   if(e.key==="Enter"){
     this.sortEntities();
   }
 }
 saveEntity = () => {
   
     if(this.state.coquanid===0){
       const entity={
       tencoquan:this.state.ten,
       macoquan:this.state.ma,
       noidung:this.state.nd,
       tendaidien:this.state.daidien,
       sudung:1
       }
       this.props.createEntity(entity);
       this.CloseModalAdd();
     }
     else{
       const entity={
       id:this.state.coquanid,
       tencoquan:this.state.ten,
       macoquan:this.state.ma,
       noidung:this.state.nd,
       tendaidien:this.state.daidien,
       sudung:this.state.sd
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
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&ten=${this.state.filterTen}&ma=${this.state.filterMa}&daidien=${this.state.filterDaidien}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order,filterMa,filterTen,filterDaidien } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`,filterMa,filterTen,filterDaidien);
  };

  render() {
    const { coquanphoihopList, match, totalItems } = this.props;
    let count=10*(this.state.activePage - 1);
    return (
      <div>
        <div className="card card-quanlydulieu">
          <div className="card-header card-header-quanlydulieu">
            <div className="row">
              <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU CƠ QUAN PHỐI HỢP  </h5></div>
              <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
            </div>

          </div>
          <div className="card-body card-body-quanlydulieu">
            <div className="filter-quanlydulieu">
              <div className="row">
                <div className="col-3">

                  <input type="text" name="filterMa" value={this.state.filterMa} onChange={this.onChange} className="form-control" placeholder="Mã chuyên ngành" onKeyDown={this.enter} />
                </div>
                <div className="col-3">

                  <input type="text" name="filterTen" value={this.state.filterTen} onChange={this.onChange} className="form-control" placeholder="Tên chuyên ngành" onKeyDown={this.enter} />
                </div>
                <div className="col-3">

                  <input type="text" name="filterDaidien" value={this.state.filterDaidien} onChange={this.onChange} className="form-control" placeholder="Tên đại diện" onKeyDown={this.enter} />
                </div>
                <div className="col-2">
                  <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="table-quanlydulieu">
              {coquanphoihopList && coquanphoihopList.length > 0 ? (
                <table className="table table-hover table-striped table-bordered" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã cơ quan</th>
                      <th>Tên cơ quan</th>
                      <th>Người đại diện</th>
                      <th>Nội dung</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {coquanphoihopList.map((coquanphoihop, i) => (
                      count++,
                      <tr key={`entity-${i}`}>
                        <td>{count}</td>
                        <td>{coquanphoihop.macoquan}</td>
                        <td>{coquanphoihop.tencoquan}</td>
                        <td>{coquanphoihop.tendaidien}</td>
                        <td>{coquanphoihop.noidung}</td>
                        <td >
                          <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                            {close =>
                              <table className="table-hover table-button-active">

                                <tbody>
                                  
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" onClick={()=>this.show(coquanphoihop)} >Sửa</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td ><Button className="btn-sua" style={{color:'black'}} tag={Link} to={`${match.url}/${coquanphoihop.id}/delete`} >Xóa</Button></td>
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
            <div className={coquanphoihopList && coquanphoihopList.length > 0 ? '' : 'd-none'}>
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
              <span>MODAL CƠ QUAN PHỐI HỢP</span>
              <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
            </div>
            <div className="card-body card-body-modal-quanlydulieu">
                <div className="row">
                    <div className="col-6">
                          <label>Mã cơ quan</label>
                          <input type="text" onChange={this.onChange} value={this.state.ma} name="ma" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-6"> 
                          <label>Tên cơ quan</label>
                          <input type="text" onChange={this.onChange} value={this.state.ten} name="ten" className="form-control viethoa " placeholder="..."/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                          <label>Nội dung</label>
                          <input type="text" onChange={this.onChange} value={this.state.nd} name="nd" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-6"> 
                          <label>Người đại diện</label>
                          <input type="text" onChange={this.onChange} value={this.state.daidien} name="daidien" className="form-control" placeholder="..."/>
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

const mapStateToProps = ({ coquanphoihop }: IRootState) => ({
  coquanphoihopList: coquanphoihop.entities,
  totalItems: coquanphoihop.totalItems
});

const mapDispatchToProps = {
  getEntities,
  updateEntity, createEntity,reset 
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Coquanphoihop);
