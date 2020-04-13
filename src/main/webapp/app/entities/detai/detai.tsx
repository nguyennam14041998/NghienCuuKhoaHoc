import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './detai.reducer';
import { IDetai } from 'app/shared/model/detai.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDetaiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDetaiState = IPaginationBaseState;

export class Detai extends React.Component<IDetaiProps, IDetaiState> {
  state: IDetaiState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
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
    const { detaiList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="detai-heading">
          <Translate contentKey="nghienCuuKhoaHocApp.detai.home.title">Detais</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="nghienCuuKhoaHocApp.detai.home.createLabel">Create a new Detai</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {detaiList && detaiList.length > 0 ? (
            <Table responsive aria-describedby="detai-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ma')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.ma">Ma</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ten')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.ten">Ten</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('thoigiantao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.thoigiantao">Thoigiantao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('thoigianbatdau')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.thoigianbatdau">Thoigianbatdau</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('thoigianketthuc')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.thoigianketthuc">Thoigianketthuc</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('muctieu')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.muctieu">Muctieu</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('noidung')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.noidung">Noidung</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tinhcapthiet')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.tinhcapthiet">Tinhcapthiet</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ketqua')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.ketqua">Ketqua</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('xeploai')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.xeploai">Xeploai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('trangthai')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.trangthai">Trangthai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sudung')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.sudung">Sudung</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.dutoanKP">Dutoan KP</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.danhgia">Danhgia</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.linhvuc">Linhvuc</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.capdetai">Capdetai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.hoidongdanhgia">Hoidongdanhgia</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.detai.chunhiem">Chunhiem</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {detaiList.map((detai, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${detai.id}`} color="link" size="sm">
                        {detai.id}
                      </Button>
                    </td>
                    <td>{detai.ma}</td>
                    <td>{detai.ten}</td>
                    <td>
                      <TextFormat type="date" value={detai.thoigiantao} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={detai.thoigianbatdau} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={detai.thoigianketthuc} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{detai.muctieu}</td>
                    <td>{detai.noidung}</td>
                    <td>{detai.tinhcapthiet}</td>
                    <td>{detai.ketqua}</td>
                    <td>{detai.xeploai}</td>
                    <td>{detai.trangthai}</td>
                    <td>{detai.sudung}</td>
                    <td>{detai.dutoanKPId ? <Link to={`dutoan-kp/${detai.dutoanKPId}`}>{detai.dutoanKPId}</Link> : ''}</td>
                    <td>{detai.danhgiaId ? <Link to={`danhgia/${detai.danhgiaId}`}>{detai.danhgiaId}</Link> : ''}</td>
                    <td>{detai.linhvucId ? <Link to={`linhvuc/${detai.linhvucId}`}>{detai.linhvucId}</Link> : ''}</td>
                    <td>{detai.capdetaiId ? <Link to={`capdetai/${detai.capdetaiId}`}>{detai.capdetaiId}</Link> : ''}</td>
                    <td>
                      {detai.hoidongdanhgiaId ? <Link to={`hoidongdanhgia/${detai.hoidongdanhgiaId}`}>{detai.hoidongdanhgiaId}</Link> : ''}
                    </td>
                    <td>{detai.chunhiemId ? <Link to={`chunhiem/${detai.chunhiemId}`}>{detai.chunhiemId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${detai.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${detai.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${detai.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="nghienCuuKhoaHocApp.detai.home.notFound">No Detais found</Translate>
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
    );
  }
}

const mapStateToProps = ({ detai }: IRootState) => ({
  detaiList: detai.entities,
  totalItems: detai.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Detai);
