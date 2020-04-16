import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './danhsachbaibao.reducer';
import { IDanhsachbaibao } from 'app/shared/model/danhsachbaibao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDanhsachbaibaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDanhsachbaibaoState = IPaginationBaseState;

export class Danhsachbaibao extends React.Component<IDanhsachbaibaoProps, IDanhsachbaibaoState> {
  state: IDanhsachbaibaoState = {
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
    const { danhsachbaibaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="danhsachbaibao-heading">
          <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.home.title">Danhsachbaibaos</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.home.createLabel">Create a new Danhsachbaibao</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {danhsachbaibaoList && danhsachbaibaoList.length > 0 ? (
            <Table responsive aria-describedby="danhsachbaibao-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tenbaibao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tenbaibao">Tenbaibao</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('phanloai')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.phanloai">Phanloai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tenhoithao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tenhoithao">Tenhoithao</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('namxuatban')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.namxuatban">Namxuatban</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('thangxuatban')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.thangxuatban">Thangxuatban</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('danhmuc')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.danhmuc">Danhmuc</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('iffff')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.iffff">Iffff</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('hindex')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.hindex">Hindex</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('xeploai')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.xeploai">Xeploai</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('rankbaibao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.rankbaibao">Rankbaibao</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('volbaibao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.volbaibao">Volbaibao</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sobaibao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.sobaibao">Sobaibao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ppbaibao')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.ppbaibao">Ppbaibao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('link')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.link">Link</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('ghichu')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.ghichu">Ghichu</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tacgiachinh')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tacgiachinh">Tacgiachinh</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tacgiakhac')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.tacgiakhac">Tacgiakhac</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {danhsachbaibaoList.map((danhsachbaibao, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${danhsachbaibao.id}`} color="link" size="sm">
                        {danhsachbaibao.id}
                      </Button>
                    </td>
                    <td>{danhsachbaibao.tenbaibao}</td>
                    <td>{danhsachbaibao.phanloai}</td>
                    <td>{danhsachbaibao.tenhoithao}</td>
                    <td>{danhsachbaibao.namxuatban}</td>
                    <td>{danhsachbaibao.thangxuatban}</td>
                    <td>{danhsachbaibao.danhmuc}</td>
                    <td>{danhsachbaibao.iffff}</td>
                    <td>{danhsachbaibao.hindex}</td>
                    <td>{danhsachbaibao.xeploai}</td>
                    <td>{danhsachbaibao.rankbaibao}</td>
                    <td>{danhsachbaibao.volbaibao}</td>
                    <td>{danhsachbaibao.sobaibao}</td>
                    <td>{danhsachbaibao.ppbaibao}</td>
                    <td>{danhsachbaibao.link}</td>
                    <td>{danhsachbaibao.ghichu}</td>
                    <td>{danhsachbaibao.tacgiachinh}</td>
                    <td>{danhsachbaibao.tacgiakhac}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${danhsachbaibao.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${danhsachbaibao.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${danhsachbaibao.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="nghienCuuKhoaHocApp.danhsachbaibao.home.notFound">No Danhsachbaibaos found</Translate>
            </div>
          )}
        </div>
        <div className={danhsachbaibaoList && danhsachbaibaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ danhsachbaibao }: IRootState) => ({
  danhsachbaibaoList: danhsachbaibao.entities,
  totalItems: danhsachbaibao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Danhsachbaibao);
