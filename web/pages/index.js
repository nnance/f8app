import React, { PropTypes } from 'react'
import Parse from 'parse'
import Head from 'next/head'
import {style, merge, $} from 'next/css'
import {connect} from 'react-redux'

import setup from '../js/setup'
import {selector, actions} from '../features/auth'

const formCSS = merge(
  style({
    'fontFamily': 'sans-serif',
    'paddingTop': '20%',
    'textAlign': 'center'
  }),
  $(' input', {
    'padding': '10px',
    'borderRadius': '5px',
    'border': '1px solid #ccc'
  }),
  $(' input:focus', {
    outline: 'none'
  }),
  $(' button', {
    'padding': '10px 30px 10px 30px',
    'backgroundColor': '#0288D1',
    'color': 'white',
    'border': 'none',
    'cursor': 'pointer'
  }),
  $(' .error', {
    'color': 'red'
  })
)

const rowCSS = style({
  'padding': '5px'
})

const Index = React.createClass({
  getInitialState () {
    return {
      route: 'login',
      showError: true
    }
  },

  render () {
    if (this.props.user) {
      return <div {...formCSS}>
        <button onClick={this.logout}>Logout</button>
      </div>
    }
    return <form {...formCSS} onSubmit={this.submit}>
      {
        this.props.forgotPasswordState === 'ed' ?
        <div>
          <p>
            mail has been sent, go <a href='#' onClick={this.toggleSignUp}>back</a>
          </p>
        </div>
        :
        <div>
        {this.renderForm()}
        {this.renderButton()}
        </div>
      }
    </form>
  },

  renderButton () {
    return <div>
      <div {...rowCSS}>
        {
        this.state.route === 'login' ?
        <button onClick={this.submit}>Login</button> :
        this.state.route === 'signup' ?
        <button onClick={this.signUp}>Sign up</button> :
        <button onClick={this.forgotPassword}>Forgot password</button>
        }
        <div {...rowCSS}>
          or <a href='#' onClick={this.toggleSignUp}>{this.state.route !== 'login' ? 'Login' : 'Sign Up'}</a>
        </div>
        {
        this.state.route === 'login' ?
        <a href='#' onClick={this.toForgotPassword}>forgot password ?</a> : null
        }
      </div>
    </div>
  },

  renderForm () {
    return <div>
      <div className='error'>
        {this.props.error}
      </div>
      <div {...rowCSS}>
        <input ref={node => this.email = node} placeholder='email'/>
      </div>
      {this.state.route !== 'forgot' ?
      <div {...rowCSS}>
        <input type='password' ref={node => this.password = node} placeholder='password'/>
      </div> : null
      }
      {this.state.route === 'signup' ?
      <div {...rowCSS}>
        <input type='password' ref={node => this.confirmPassword = node} placeholder='confirm password'/>
      </div> : null
      }
    </div>
  },

  toForgotPassword() {
    this.setState({
      ...this.state,
      route: 'forgot'
    })
  },

  forgotPassword () {
    this.props.forgotPassword(this.email.value)
  },

  submit (e) {
    e.preventDefault()
    this.props.logIn(this.email.value, this.password.value)
  },

  logout () {
    this.setState({
      ...this.state,
      route: 'login'
    })
    this.props.logOut()
  },

  signUp () {
    const email = this.email.value
    const password = this.password.value
    const confirmPassword = this.confirmPassword.value
    this.props.signUp(email, password, confirmPassword)
  },

  toggleSignUp () {
    this.props.clearState()
    this.setState({
      ...this.state,
      route: this.state.route === 'login' ? 'signup' : 'login'
    })
  }

})

const select = state => ({
  error: selector.error(state),
  user: selector.user(state),
  forgotPasswordState: selector.mState(state).forgotPasswordState
})

const actionsMaping = {
  logIn: actions.logIn,
  logOut: actions.logOut,
  signUp: actions.signUp,
  forgotPassword: actions.forgotPassword,
  clearError: actions.clearError,
  clearState: actions.clearState
}

export default setup(connect(select, actionsMaping)(Index));
