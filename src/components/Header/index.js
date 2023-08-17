import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import NavItem from '../NavItem'

import './index.css'

const navItems = [
  {
    id: 1,
    displayText: 'Home',
    pathText: '',
  },
  {
    id: 2,
    displayText: 'Bookshelves',
    pathText: 'shelf',
  },
  {
    id: 3,
    displayText: 'Favorites',
    pathText: 'favorites',
  },
]

class Header extends Component {
  state = {clicked: false}

  handleClick = () => {
    this.setState(prevState => ({
      clicked: !prevState.clicked,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {clicked} = this.state
    return (
      <>
        <nav>
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dbavgpzve/image/upload/v1691819331/Group_7731_dyagdn.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <div>
            <ul id="navbar" className={clicked ? '#navbar active' : '#navbar'}>
              {navItems.map(eachItem => (
                <NavItem key={eachItem.id} navItemDetails={eachItem} />
              ))}
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </ul>

            <div
              id="mobile"
              role="button"
              tabIndex={0}
              onClick={this.handleClick}
            >
              {/* eslint-disable-next-line react/self-closing-comp */}
              <i
                id="bar"
                className={clicked ? 'fas fa-times' : 'fas fa-bars'}
              ></i>
            </div>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)

// above

// import {Link, withRouter} from 'react-router-dom'
// import {Component} from 'react'
// import Cookies from 'js-cookie'

// import {GiHamburgerMenu} from 'react-icons/gi'
// import {RiSunFill} from 'react-icons/ri'

// import './index.css'
// import HeaderContext from '../../context/HeaderContext'
// import NavItem from '../NavItem'

// const navItems = [
//   {
//     id: 1,
//     displayText: 'Home',
//     pathText: '',
//   },
//   {
//     id: 2,
//     displayText: 'Bookshelves',
//     pathText: 'shelf',
//   },
//   {
//     id: 3,
//     displayText: 'Favorites',
//     pathText: 'favorites',
//   },
// ]

// class Header extends Component {
//   onClickLogout = () => {
//     const {history} = this.props
//     Cookies.remove('jwt_token')
//     history.replace('/login')
//   }

//   renderMobileNavIconsContainer = () => (
//     <HeaderContext.Consumer>
//       {value => {
//         const {updateActiveNavId, isDarkTheme, onToggleTheme} = value

//         const darkThemeNavMenu = isDarkTheme ? 'dark-theme-mobile-nav-menu' : ''

//         const navIcon = isDarkTheme ? (
//           <RiSunFill size={25} color="#ffffff" />
//         ) : (
//           <RiSunFill size={25} color="#64748b" />
//         )

//         const onChangeTheme = () => {
//           onToggleTheme()
//         }

//         return (
//           <div className={`nav-menu-mobile ${darkThemeNavMenu}`}>
//             <ul className="nav-menu-list-mobile">
//               {navItems.map(eachItem => (
//                 <NavItem
//                   key={eachItem.id}
//                   navItemDetails={eachItem}
//                   updateActiveNavId={updateActiveNavId}
//                 />
//               ))}
//               <button
//                 type="button"
//                 className="logout-btn"
//                 onClick={this.onClickLogout}
//               >
//                 Logout
//               </button>
//               <button
//                 type="button"
//                 className="theme-button"
//                 onClick={onChangeTheme}
//               >
//                 {navIcon}
//               </button>
//             </ul>
//           </div>
//         )
//       }}
//     </HeaderContext.Consumer>
//   )

//   renderDesktopNavMenu = () => (
//     <HeaderContext.Consumer>
//       {value => {
//         const {updateActiveNavId} = value

//         const onClickWebsiteLogo = () => {
//           updateActiveNavId(navItems[0].id)
//         }

//         return (
//           <div className="nav-bar-large-container">
//             <Link to="/">
//               <img
//                 src="https://res.cloudinary.com/dbavgpzve/image/upload/v1691819331/Group_7731_dyagdn.png"
//                 alt="website logo"
//                 onClick={onClickWebsiteLogo}
//                 className="website-logo"
//               />
//             </Link>
//             <ul className="nav-menu">
//               {navItems.map(eachItem => (
//                 <NavItem
//                   key={eachItem.id}
//                   navItemDetails={eachItem}
//                   updateActiveNavId={updateActiveNavId}
//                 />
//               ))}
//             </ul>
//             <button
//               type="button"
//               className="logout-btn"
//               onClick={this.onClickLogout}
//             >
//               Logout
//             </button>
//           </div>
//         )
//       }}
//     </HeaderContext.Consumer>
//   )

//   render() {
//     return (
//       <HeaderContext.Consumer>
//         {value => {
//           const {
//             showNavIcons,
//             onToggleIcon,
//             updateActiveNavId,
//             isDarkTheme,
//           } = value

//           const onClickWebsiteLogo = () => {
//             updateActiveNavId(navItems[0].id)
//           }
//           const headerDarkTheme = isDarkTheme ? 'header-dark-theme-bg' : ''
//           const darkHamburger = isDarkTheme ? '#ffffff' : '#000000'
//           return (
//             <nav className={`nav-header ${headerDarkTheme}`}>
//               <div className="nav-content">
//                 <div className="nav-bar-mobile-logo-container">
//                   <Link to="/">
//                     <img
//                       src="https://res.cloudinary.com/dbavgpzve/image/upload/v1691819331/Group_7731_dyagdn.png"
//                       alt="website logo"
//                       onClick={onClickWebsiteLogo}
//                       className="website-logo"
//                     />
//                   </Link>
//                   <button
//                     type="button"
//                     className="nav-mobile-button"
//                     onClick={onToggleIcon}
//                   >
//                     <GiHamburgerMenu size={25} color={darkHamburger} />
//                   </button>
//                 </div>
//                 {this.renderDesktopNavMenu()}
//               </div>
//               {showNavIcons ? this.renderMobileNavIconsContainer() : null}
//             </nav>
//           )
//         }}
//       </HeaderContext.Consumer>
//     )
//   }
// }

// export default withRouter(Header)

// theme functionality

/* const navIcon = isDarkTheme ? (
          <RiSunFill size={25} color="#ffffff" />
        ) : (
          <RiSunFill size={25} color="#64748b" />
        )

        const onChangeTheme = () => {
          onToggleTheme()
        } */
