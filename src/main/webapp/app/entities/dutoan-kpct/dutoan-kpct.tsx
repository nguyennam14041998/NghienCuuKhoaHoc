import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './dutoan-kpct.reducer';
import { IDutoanKPCT } from 'app/shared/model/dutoan-kpct.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDutoanKPCTProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IDutoanKPCTState = IPaginationBaseState;

export class DutoanKPCT extends React.Component<IDutoanKPCTProps, IDutoanKPCTState> {
  state: IDutoanKPCTState = {
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
    const { dutoanKPCTList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="dutoan-kpct-heading">
          <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.home.title">Dutoan KPCTS</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.home.createLabel">Create a new Dutoan KPCT</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {dutoanKPCTList && dutoanKPCTList.length > 0 ? (
            <Table responsive aria-describedby="dutoan-kpct-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('soluong')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.soluong">Soluong</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('mucchi')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.mucchi">Mucchi</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tong')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.tong">Tong</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('sudung')}>
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.sudung">Sudung</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.dutoanKP">Dutoan KP</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.noidungDT">Noidung DT</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {dutoanKPCTList.map((dutoanKPCT, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${dutoanKPCT.id}`} color="link" size="sm">
                        {dutoanKPCT.id}
                      </Button>
                    </td>
                    <td>{dutoanKPCT.soluong}</td>
                    <td>{dutoanKPCT.mucchi}</td>
                    <td>{dutoanKPCT.tong}</td>
                    <td>{dutoanKPCT.sudung}</td>
                    <td>{dutoanKPCT.dutoanKPId ? <Link to={`dutoan-kp/${dutoanKPCT.dutoanKPId}`}>{dutoanKPCT.dutoanKPId}</Link> : ''}</td>
                    <td>
                      {dutoanKPCT.noidungDTId ? <Link to={`noidung-dt/${dutoanKPCT.noidungDTId}`}>{dutoanKPCT.noidungDTId}</Link> : ''}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${dutoanKPCT.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${dutoanKPCT.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${dutoanKPCT.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="nghienCuuKhoaHocApp.dutoanKPCT.home.notFound">No Dutoan KPCTS found</Translate>
            </div>
          )}
        </div>
        <div className={dutoanKPCTList && dutoanKPCTList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ dutoanKPCT }: IRootState) => ({
  dutoanKPCTList: dutoanKPCT.entities,
  totalItems: dutoanKPCT.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DutoanKPCT);
