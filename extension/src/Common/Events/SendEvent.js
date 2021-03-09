import ReactGA from 'react-ga'

function SendEvent(category, action, label) {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
}

export default SendEvent