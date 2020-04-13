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
import { getEntities,updateEntity, createEntity  } from './capdetai.reducer';
import { ICapdetai } from 'app/shared/model/capdetai.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICapdetaiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ICapdetaiState = ICapdetai;

export class Capdetai extends React.Component<ICapdetaiProps, ICapdetaiState> {
  state: ICapdetaiState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ten:'',
    ma:'',
    sd:1,
    filterMa:'',
    filterTen:'',
    capdetaiid:0,
    ModalAdd:false,
    sort:'tencapdetai'
  };

  componentDidMount() {
    this.getEntities();
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
      capdetaiid:0,
      ModalAdd:false
    })
  }
  show=(capdetai)=>{
    this.setState({
     ten:capdetai.tencapdetai,
     ma:capdetai.macapdetai,
     sd:capdetai.sudung,
     capdetaiid:capdetai.id,
     ModalAdd:true
    });
 }
 enter=(e)=>{
  if(e.key==="Enter"){
    this.sortEntities();
  }
}
 saveEntity = () => {
    
  if(this.state.capdetaiid===0){
    const entity={
    tencapdetai:this.state.ten,
    macapdetai:this.state.ma,
    sudung:1
    }
    this.props.createEntity(entity);
    this.CloseModalAdd();
  }
  else{
    const entity={
    id:this.state.capdetaiid,
    tencapdetai:this.state.ten,
    macapdetai:this.state.ma,
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
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}&ten=${this.state.filterTen}&ma=${this.state.filterMa}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage,sort ,order,filterMa,filterTen } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`,filterMa,filterTen);
  };

  render() {
    const { capdetaiList, match, totalItems } = this.props;
    let count =10*(this.state.activePage - 1);
    return (
      <div>
      <div className="card card-quanlydulieu">
        <div className="card-header card-header-quanlydulieu">
          <div className="row">
            <div className="col-10"> <h5 className="title-quanlydulieu">DỮ LIỆU CẤP ĐỀ TÀI </h5></div>
            <div className="col-2"><button onClick={this.OpenModalAdd} style={{ width: '50%' }} type="button" className="btn btn-primary"><FontAwesomeIcon icon="plus" /> Tạo mới</button></div>
          </div>

        </div>
        <div className="card-body card-body-quanlydulieu">
          <div className="filter-quanlydulieu">
            <div className="row">
              <div className="col-3">

                <input type="text" name="filterMa" value={this.state.filterMa} onChange={this.onChange} className="form-control" placeholder="Mã cấp đề tài" onKeyDown={this.enter} />
              </div>
              <div className="col-3">

                <input type="text" name="filterTen" value={this.state.filterTen} onChange={this.onChange} className="form-control" placeholder="Tên cấp đề tài" onKeyDown={this.enter} />
              </div>
              <div className="col-2">
                <button className="btn btn-primary" type="button" onClick={this.sortEntities}>Tìm kiếm</button>
              </div>
            </div>
          </div>
          <br></br>
          <div className="table-quanlydulieu">
            {capdetaiList && capdetaiList.length > 0 ? (
              <table className="table table-hover table-striped table-bordered" >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Mã cấp đề tài</th>
                    <th>Tên cấp đề tài</th>
                    
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {capdetaiList.map((capdetai, i) => (
                    count++,
                    <tr key={`entity-${i}`}>
                      <td>{count}</td>
                      <td>{capdetai.macapdetai}</td>
                      <td>{capdetai.tencapdetai}</td>
                     
                      <td >
                        <Popup trigger={<i className="fa fa-cog" ></i>} position='left top'>
                          {close =>
                            <table className="table-hover table-button-active">

                              <tbody>
                                
                                <tr onClick={close}>
                                  <td><button className=" btn-sua" onClick={()=>this.show(capdetai)} >Sửa</button></td>
                                </tr>
                                <tr onClick={close}>
                                  <td ><Button className="btn-sua" style={{color:'black'}} tag={Link} to={`${match.url}/${capdetai.id}/delete`} >Xóa</Button></td>
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
          <div className={capdetaiList && capdetaiList.length > 0 ? '' : 'd-none'}>
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
            <span>MODAL CẤP ĐỀ TÀI</span>
            <button type="button" onClick={() => this.CloseModalAdd()}><i className="fa fa-close"></i></button>
          </div>
          <div className="card-body card-body-modal-quanlydulieu">
              <div className="row">
                  <div className="col-6">
                        <label>Mã cấp đề tài</label>
                        <input type="text" onChange={this.onChange} value={this.state.ma} name="ma" className="form-control" placeholder="..." />
                  </div>
                  <div className="col-6"> 
                        <label>Tên cấp đề tài</label>
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
    </div>
      
    );
  }
}

const mapStateToProps = ({ capdetai }: IRootState) => ({
  capdetaiList: capdetai.entities,
  totalItems: capdetai.totalItems
});

const mapDispatchToProps = {
  getEntities,
  createEntity,
  updateEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Capdetai);
