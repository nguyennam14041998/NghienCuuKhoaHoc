import './footer.scss';
import { connect } from 'react-redux';
import React from 'react';
export type IFooterProp = StateProps;
export const Footer = (props: IFooterProp) => {
const { account } = props;
return(
  <div>
  {account && account.login ? (
    <footer className="footer-web-hist">
      <div className="container">
        <div className="row content-footer">
          <div className="col-xs-5 ">
            <div>
            Người dùng: {account.login}
            </div>
          </div>
        </div>
      </div>
    </footer>
    ) : (
    <div>

    </div>
  )}

  </div>
)
};
const mapStateToProps = storeState => ({
account: storeState.authentication.account,
isAuthenticated: storeState.authentication.isAuthenticated
});
type StateProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(Footer);
