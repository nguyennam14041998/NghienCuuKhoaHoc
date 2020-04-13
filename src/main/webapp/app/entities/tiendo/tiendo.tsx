import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tiendo.reducer';
import { ITiendo } from 'app/shared/model/tiendo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITiendoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type ITiendoState = IPaginationBaseState;

export class Tiendo extends React.Component<ITiendoProps, ITiendoState> {
  state: ITiendoState = {
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
    const { tiendoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="tiendo-heading">
          <Translate contentKey="nghienCuuKhoaHocApp.tiendo.home.title">Tiendos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="nghienCuuKhoaHocApp.tiendo.home.createLabel">Create a new Tiendo</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {tiendoList && tiendoList.length > 0 ? (
            <Table responsive aria-describedby="tiendo-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('matiendo')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.matiendo">Matiendo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('kybaocao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.kybaocao">Kybaocao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('noidung')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.noidung">Noidung</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('thoigianbatdau')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.thoigianbatdau">Thoigianbatdau</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('thoigianketthuc')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.thoigianketthuc">Thoigianketthuc</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('khoiluonghoanthanh')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.khoiluonghoanthanh">Khoiluonghoanthanh</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ghichu')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.ghichu">Ghichu</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sudung')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.sudung">Sudung</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.tiendo.detai">Detai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tiendoList.map((tiendo, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${tiendo.id}`} color="link" size="sm">
                        {tiendo.id}
                      </Button>
                    </td>
                    <td>{tiendo.matiendo}</td>
                    <td>{tiendo.kybaocao}</td>
                    <td>{tiendo.noidung}</td>
                    <td>
                      <TextFormat type="date" value={tiendo.thoigianbatdau} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={tiendo.thoigianketthuc} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{tiendo.khoiluonghoanthanh}</td>
                    <td>{tiendo.ghichu}</td>
                    <td>{tiendo.sudung}</td>
                    <td>{tiendo.detaiId ? <Link to={`detai/${tiendo.detaiId}`}>{tiendo.detaiId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${tiendo.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${tiendo.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${tiendo.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="nghienCuuKhoaHocApp.tiendo.home.notFound">No Tiendos found</Translate>
            </div>
          )}
        </div>
        <div className={tiendoList && tiendoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ tiendo }: IRootState) => ({
  tiendoList: tiendo.entities,
  totalItems: tiendo.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tiendo);
