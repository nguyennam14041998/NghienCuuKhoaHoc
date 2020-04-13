import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './donvi.scss';
import 'font-awesome/css/font-awesome.min.css';
import Popup from 'reactjs-popup';
import Modal from 'react-modal';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, createEntity,reset } from './donvi.reducer';
import { IDonvi } from 'app/shared/model/donvi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
export interface IDonviProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export type IDonviState = IDonvi;

export class Donvi extends React.Component<IDonviProps, IDonviState> {
  state: IDonviState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ModalAdd: false,
    ten:'',
    ma:'',
    sdt:0,
    sofax:0,
    diachiemail:'',
    sd:1,
    donviid:0,
    filterMa:'',
    filterTen:'',
    sort:'tendv',
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
      ModalAdd: false,
      ten:'',
      ma:'',
      sdt:0,
      sofax:0,
      diachiemail:'',
      sd:1,
      donviid:0
    })
  }
  show=(donvi)=>{
     this.setState({
      ten:donvi.tendv,
      ma:donvi.madv,
      sdt:donvi.dienthoai,
      sofax:donvi.fax,
      diachiemail:donvi.email,
      sd:donvi.sudung,
      donviid:donvi.id,
      ModalAdd:true
     });
  }
  enter=(e)=>{
    if(e.key==="Enter"){
      this.sortEntities();
    }
  }
  saveEntity = () => {
    
      if(this.state.donviid===0){
        const entity={
        tendv:this.state.ten,
        madv:this.state.ma,
        dienthoai:this.state.sdt,
        email:this.state.diachiemail,
        fax:this.state.sofax,
        sudung:1
        }
        this.props.createEntity(entity);
        this.CloseModalAdd();
      }
      else{
        const entity={
        id:this.state.donviid,
        tendv:this.state.ten,
        madv:this.state.ma,
        dienthoai:this.state.sdt,
        email:this.state.diachiemail,
        fax:this.state.sofax,
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
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&ma=${this.state.filterMa}&ten=${this.state.filterTen}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order,filterTen,filterMa } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`,filterTen,filterMa);
  };

  render() {
    const { donviList, match, totalItems } = this.props;
    let count = 10*(this.state.activePage - 1);
    return (
      <div>
        <div className="card card-quanlydulieu">
          <div className="card-header card-header-quanlydulieu">
            <div className="row">
              <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU CHUYÊN NGÀNH  </h5></div>
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
                <div className="col-2">
                  <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
                </div>
              </div>
            </div>
            <br></br>
            <div className="table-quanlydulieu">
              {donviList && donviList.length > 0 ? (
                <table className="table table-hover table-striped table-bordered" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã chuyên ngành</th>
                      <th>Tên chuyên ngành</th>
                      <th>Điện thoại</th>
                      <th>Fax</th>
                      <th>Email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {donviList.map((donvi, i) => (
                      count++,
                      <tr key={`entity-${i}`}>
                        <td>{count}</td>
                        <td>{donvi.madv}</td>
                        <td>{donvi.tendv}</td>
                        <td>{donvi.dienthoai}</td>
                        <td>{donvi.fax}</td>
                        <td>{donvi.email}</td>
                        <td >
                          <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                            {close =>
                              <table className="table-hover table-button-active">

                                <tbody>
                                  
                                  <tr onClick={close}>
                                    <td><button className=" btn-sua" onClick={()=>this.show(donvi)} >Sửa</button></td>
                                  </tr>
                                  <tr onClick={close}>
                                    <td ><Button className="btn-sua" style={{color:'black'}} tag={Link} to={`${match.url}/${donvi.id}/delete`} >Xóa</Button></td>
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
            <div className={donviList && donviList.length > 0 ? '' : 'd-none'}>
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
        <AvForm onSubmit={this.saveEntity}>
          <div className="card card-modal-quanlydulieu">
            <div className="card-header card-header-modal-quanlydulieu">
              <span>MODAL CHUYÊN NGÀNH</span>
              <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
            </div>
            <div className="card-body card-body-modal-quanlydulieu">
                <div className="row">
                    <div className="col-6">
                          <label>Mã chuyên ngành</label>
                          <input type="text" onChange={this.onChange} value={this.state.ma} name="ma" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-6"> 
                          <label>Tên chuyên ngành</label>
                          <input type="text" onChange={this.onChange} value={this.state.ten} name="ten" className="form-control viethoa " placeholder="..."/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                          <label>Số điện thoại</label>
                          <input type="number" onChange={this.onChange} value={this.state.sdt} name="sdt" className="form-control" placeholder="..." />
                    </div>
                    <div className="col-6"> 
                          <label>Fax</label>
                          <input type="number" onChange={this.onChange} value={this.state.sofax} name="sofax" className="form-control" placeholder="..."/>
                    </div>
                </div>
                <div>
                  <label>Email</label>
                  <input type="email" onChange={this.onChange} value={this.state.diachiemail} name="diachiemail" className="form-control" placeholder="..." />
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
          </AvForm>
        </Modal>
      </div>
     
    );
  }
}

const mapStateToProps = (storeState : IRootState) => ({
  donviList: storeState.donvi.entities,
  totalItems: storeState.donvi.totalItems,
  loading:storeState.donvi.loading,
  updating: storeState.donvi.updating,
  updateSuccess: storeState.donvi.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Donvi);
