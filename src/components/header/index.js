import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { Headr } from "./styled"

const Header = ({ siteTitle }) => (
  <Headr>
    <div className="inner-header">
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
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
    </div>
  </Headr>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
