import $ from "jquery";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  selectUserEmail,
  selectUserFullName,
} from "../../redux/User/userSelectors";
import { clearUserAction } from "../../redux/User/userSlice";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const userEmail = useSelector(selectUserEmail);
  const userFullName = useSelector(selectUserFullName);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(clearUserAction());
    history.push("/login");
  };

  useEffect(() => {
    const slideMenu = $(".side-menu");

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });

    //@ts-ignore
    if ($(window).width() > 739) {
      $(".app-sidebar").hover(function (event) {
        event.preventDefault();
        $(".app").removeClass("sidenav-toggled");
      });
    }

    // Activate sidebar slide toggle
    $("[data-toggle='slide']").click(function (event) {
      event.preventDefault();
      if (!$(this).parent().hasClass("is-expanded")) {
        slideMenu
          .find("[data-toggle='slide']")
          .parent()
          .removeClass("is-expanded");
      }
      $(this).parent().toggleClass("is-expanded");
    });

    // Set initial active toggle
    $("[data-toggle='slide.'].is-expanded").parent().toggleClass("is-expanded");
  }, []);

  return (
    <div>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <div className="dropdown">
            <a
              className="nav-link p-0 leading-none d-flex"
              data-toggle="dropdown"
              href=""
            >
              <img
                className="avatar avatar-md brround"
                src="/assets/images/profile.jpg"
                alt="profile_image"
              />
              <span className="ml-2 ">
                <span className="text-white app-sidebar__user-name font-weight-semibold">
                  {userFullName}
                </span>
                <br></br>
                <span className="text-muted app-sidebar__user-name text-sm">
                  {userEmail}
                </span>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
              <a className="dropdown-item" href="">
                <i className="dropdown-icon mdi mdi-account-outline"></i>{" "}
                Profile
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="">
                <i className="dropdown-icon mdi mdi-compass-outline"></i>Getting
                Started
              </a>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                <i className="dropdown-icon mdi mdi-logout-variant"></i> Sign
                out
              </a>
            </div>
          </div>
        </div>
        <ul className="side-menu">
          <li className="slide">
            <a className="side-menu__item active" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-home"></i>
              <span className="side-menu__label">Dashboard</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link to="/dashboard" className="slide-item">
                  Home
                </Link>
              </li>
            </ul>
          </li>

          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-table"></i>
              <span className="side-menu__label">Portfolio Wizard</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link to="/dashboard/addSnapshot" className="slide-item">
                  Add Snapshot
                </Link>
              </li>
              <li>
                <Link to="/dashboard/portfolioSnapshots" className="slide-item">
                  Portfolio Snapshots
                </Link>
              </li>
              <li>
                <Link to="/dashboard/rebalanceWizard" className="slide-item">
                  Rebalance Wizard
                </Link>
              </li>
            </ul>
          </li>

          {/* Investment Guidance */}
          <li className="slide">
            <a className="side-menu__item" data-toggle="slide" href="">
              <i className="side-menu__icon fas fa-table"></i>
              <span className="side-menu__label">Lazy Portfolios</span>
              <i className="angle fas fa-angle-right"></i>
            </a>
            <ul className="slide-menu">
              <li>
                <Link to="/dashboard/general" className="slide-item">
                  General
                </Link>
              </li>
              <li>
                <Link to="/dashboard/lazyPortfolios/tsm" className="slide-item">
                  Total Stock Market
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lazyPortfolios/sixtyForty"
                  className="slide-item"
                >
                  Classic 60/40
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lazyPortfolios/threeFund"
                  className="slide-item"
                >
                  Three Fund Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lazyPortfolios/noBrainer"
                  className="slide-item"
                >
                  No-Brainer Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lazyPortfolios/rickFerri"
                  className="slide-item"
                >
                  Rick Ferri Core Four
                </Link>
              </li>
              <li>
                <Link to="/dashboard/lazyPortfolios/ivy" className="slide-item">
                  Ivy Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lazyPortfolios/permanent"
                  className="slide-item"
                >
                  Permanent Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/lazyPortfolios/goldenButterfly"
                  className="slide-item"
                >
                  Golden Butterfly
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;