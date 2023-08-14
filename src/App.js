import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import HeaderContext from './context/HeaderContext'
import ProtectedRoute from './components/ProtectedRoute'
import Bookshelves from './components/Bookshelves'
import BookItemDetails from './components/BookItemDetails'
import NotFound from './components/NotFound'
import './App.css'
// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

class App extends Component {
  state = {
    isDarkTheme: false,
    showNavIcons: false,
    activeNavId: '',
    favoritesList: [],
  }

  onToggleTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  updateActiveNavId = navId => {
    this.setState({activeNavId: navId})
  }

  onToggleIcon = () => {
    this.setState(prevState => ({
      showNavIcons: !prevState.showNavIcons,
    }))
  }

  onClose = () => {
    this.setState({showNavIcons: false})
  }

  removeAllFavorites = () => {
    this.setState({favoritesList: []})
  }

  addFavorites = book => {
    const {favoritesList} = this.state
    const bookObject = favoritesList.find(eachBook => eachBook.id === book.id)
    if (bookObject === undefined) {
      this.setState(prevState => ({
        favoritesList: [...prevState.favoritesList, book],
      }))
    }
  }

  removeFavorites = id => {
    const {favoritesList} = this.state
    const updatedFavoritesList = favoritesList.filter(
      eachItem => eachItem.id !== id,
    )

    this.setState({favoritesList: updatedFavoritesList})
  }

  render() {
    const {isDarkTheme, showNavIcons, activeNavId, favoritesList} = this.state
    const appBg = isDarkTheme ? 'dark-theme' : 'light-theme'
    return (
      <HeaderContext.Provider
        value={{
          showNavIcons,
          activeNavId,
          updateActiveNavId: this.updateActiveNavId,
          onToggleIcon: this.onToggleIcon,
          onClose: this.onClose,
          isDarkTheme,
          onToggleTheme: this.onToggleTheme,
          favoritesList,
          removeAllFavorites: this.removeAllFavorites,
          removeFavorites: this.removeFavorites,
          addFavorites: this.addFavorites,
        }}
      >
        <div className={`app-container ${appBg}`}>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/shelf" component={Bookshelves} />
            <ProtectedRoute
              exact
              path="/books/:id"
              component={BookItemDetails}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </HeaderContext.Provider>
    )
  }
}

export default App
