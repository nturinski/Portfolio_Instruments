import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { selectAssetRebalanceFormat } from "../../redux/Benchmarks/benchmarkSelector";
import { selectHasSnapshots } from "../../redux/Snapshots/snapshotSelector";
import { selectUserFullName } from "../../redux/User/userSelectors";
import { clearUserAction } from "../../redux/User/userSlice";

const Header: React.FC = () => {
  const userFullName = useSelector(selectUserFullName);
  const [_, rebalanceRequired] = useSelector(selectAssetRebalanceFormat);
  const hasSnapshots = useSelector(selectHasSnapshots);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(clearUserAction());
    history.push("/login");
  };

  const renderNotifications = () => {
    const notificationStatus = [];
    const notificationMessages = [];

    if (rebalanceRequired && hasSnapshots) {
      notificationStatus.push(
        <div className="notifyimg">
          <i className="fas fa-thumbs-down"></i>
        </div>
      );
      notificationMessages.push(
        <div>
          <strong>Portfolio Status: Needs Rebalancing</strong>
          <div className="small text-muted">
            Please consult the "Rebalance Wizard" for more.
          </div>
        </div>
      );
    }

    if (!rebalanceRequired && hasSnapshots) {
      notificationStatus.push(
        <div className="notifyimg">
          <i className="fas fa-thumbs-up"></i>
        </div>
      );
      notificationMessages.push(
        <div>
          <strong>Portfolio Status: Excellent</strong>
          <div className="small text-muted">No change required.</div>
        </div>
      );
    }

    if (!hasSnapshots) {
      notificationStatus.push(
        <div className="notifyimg">
          <i className="fas fa-thumbs-down"></i>
        </div>
      );
      notificationMessages.push(
        <div>
          <strong>Portfolio Status: Unknown</strong>
          <div className="small text-muted">
            Please begin by clicking on "Getting Started".
          </div>
        </div>
      );
    }

    return [...notificationStatus, notificationMessages];
  };

  return (
    <div>
      <header className="app-header header">
        {/* <!-- Header Background Animation--> */}
        <div id="canvas" className="gradient"></div>

        {/* <!-- Navbar Top --> */}
        <div className="container-fluid">
          <div className="d-flex">
            <a className="header-brand">
              <img
                alt="Portfolio Instruments Logo"
                className="header-brand-img"
                src="/assets/images/PI_Logo.png"
                width="800"
              ></img>
            </a>
            <a
              aria-label="Hide Sidebar"
              className="app-sidebar__toggle"
              data-toggle="sidebar"
              href=""
            ></a>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown d-none d-md-flex">
                <a className="nav-link icon" data-toggle="dropdown">
                  <i className="fas fa-bell"></i>
                  <span className="nav-unread bg-danger"></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  {/* <!-- First Notification --> */}
                  <a className="dropdown-item d-flex pb-3" href="">
                    {renderNotifications()}
                  </a>

                  {/* <!-- View All Notifications --> */}
                  <div className="dropdown-divider"></div>
                  <a
                    className="dropdown-item text-center text-muted-dark"
                    href=""
                  >
                    View all Notifications
                  </a>
                </div>
              </div>

              <div className="dropdown">
                <a
                  className="nav-link pr-0 leading-none d-flex"
                  data-toggle="dropdown"
                  href=""
                >
                  <img
                    className="avatar avatar-md brround"
                    src="/assets/images/profile.jpg"
                    alt="profile_image"
                  />

                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-white">{userFullName}</span>
                  </span>
                </a>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link to="/benchmarks/general" className="dropdown-item">
                    Getting Started
                  </Link>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
