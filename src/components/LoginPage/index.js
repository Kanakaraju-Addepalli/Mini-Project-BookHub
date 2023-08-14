import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMessage: errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state

    const passwordType = showPassword ? 'text' : 'password'

    return (
      <>
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          id="password"
          //  type={passwordType}
          type="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="password"
        />
      </>
    )
  }

  onToggleCheckbox = event => {
    this.setState({showPassword: event.target.checked})
  }

  renderCheckbox = () => (
    <div className="checkbox-input-container">
      <input
        id="checkboxInput"
        type="checkbox"
        className="checkbox-input-field"
        onChange={this.onToggleCheckbox}
      />
      <label className="input-label checkbox-label" htmlFor="checkboxInput">
        Show Password
      </label>
    </div>
  )

  render() {
    const {showSubmitError, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-desktop-image-container">
          <img
            src="https://res.cloudinary.com/dbavgpzve/image/upload/v1690450904/Rectangle_1467_o9u0mp.png"
            alt="website login"
            className="login-desktop-image"
          />
        </div>
        <div className="form-container">
          <img
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662553670/Ellipse_99_gsgnqs.png"
            alt="website login"
            className="login-mobile-image"
          />
          <img
            src="https://res.cloudinary.com/dinhpbueh/image/upload/v1662553813/BookHub_qnzptf.png"
            className="login-website-logo"
            alt="login website logo"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="input-container">{this.renderCheckbox()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && (
              <p className="error-message">*{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
