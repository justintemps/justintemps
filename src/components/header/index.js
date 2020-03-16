import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Headr } from "./styled";
import { Grid } from "../../utils/layout";

const Header = ({ siteTitle }) => (
  <Headr>
    <Grid>
      <div className="logo">
        <h1>
          <Link to="/">{siteTitle}</Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link>Projects</Link>
          </li>
          <li>
            <Link>Writing</Link>
          </li>
          <li>
            <Link>Uses</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
        </ul>
      </nav>
    </Grid>
  </Headr>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
