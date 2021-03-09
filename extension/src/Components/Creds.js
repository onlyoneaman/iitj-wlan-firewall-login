/*global chrome*/
import React, {useState, useEffect} from 'react'
import {Form, Spin, Input, Button} from 'antd';
import Heading from '../Components/Heading'
import ReactGA from 'react-ga'
import SendEvent from '../Common/Events/SendEvent'
import ApplicationConstants from '../Enums/ApplicationConstants';

const SAVE_MESSAGE = "Saving Credentials in your browser"
const GET_CREDS = "Retrieving your credentials from browser"

const Creds = () => {
  const [load, setLoad] = useState(true)
  const [form] = Form.useForm()
  const [message, setMessage] = useState('')
  const [empty, setEmpty] = useState(false)
  const [title, setTitle] = useState('')

  const startLoading = () => {setLoad(true)}
  const stopLoading = () => {setLoad(false)}

  async function getCreds() {
    setLoad(true)
    setMessage(GET_CREDS)
    getCredsFromChrome()
  }

  function setFormValues(u, p) {
    form.setFieldsValue({
      username: u,
      password: p
    })
  }

  function saveCreds(username, password) {
    SendEvent('Save Credentials', 'Saving Credentials in Chrome', 'Save Credentials')
    if(process.env.NODE_ENV !== "development") {
      chrome.storage.sync.set({
        wlan_us: username, 
        wlan_pd: password
      }, ()=>{
        console.log('Saved User Credentials username: ' + username);
        SendEvent('Save Credentials Successful', 'Saving Credentials Success '+ username, 'Save Credentials')
        getCredsFromChrome(true)
        showMessage('Credentials Saved 👍')
        stopLoading()
      }) 
    } else {
      console.log('Saved User Credentials');
      SendEvent('Save Credentials Successful', 'Saving Credentials Success '+ username, 'Save Credentials')
      stopLoading()
      showMessage('Credentials Saved 👍')
      getCredsFromChrome(true)
    }
  }

  function submit(values) {
    startLoading()
    setMessage(SAVE_MESSAGE)
    saveCreds(values.username, values.password)
  }

  function initializeGA() {
    let trackingCode = ApplicationConstants.googleAnalytics.trackingCode
    ReactGA.initialize(trackingCode, {
      debug: false,
      titleCase: false
    })
  }

  function getCredsFromChrome(show = false) {
    SendEvent(
      'Get Credentials',
      'Getting Credentials Popup',
      'Get Credentials'
    )
    let u, p;
    if( process.env.NODE_ENV !== 'development') {
      chrome.storage.sync.get([
        'wlan_us', 'wlan_pd' 
      ], (val)=>{
        u = val.wlan_us || '';
        p = val.wlan_pd || '';
        console.group("Get Creds")
        console.log('val: ', val);
        console.log('u: ', u)
        console.log('p: ', p)
        console.groupEnd()
        setCreds(u, p, show)
      })
    } else {
      [u,p] = dummyCreds()
      setCreds(u, p)
    }
  }

  function setCreds(u, p, show) {
    console.log('finish');
    if(!u || !p ) {
      showMessage('Enter Your LDAP Credntials.')
    } else {      
      !show && setEmpty(false);
      console.log('finish');
    }
    SendEvent('Get Credentials Successful', 'Successfully Retrieved Credentials ' + u, 'Get Credentials')
    setFormValues(u, p);
    stopLoading()
  }

  function showMessage(message) {
    setTitle(message)
    setEmpty(true)
  }

  function dummyCreds() {
    return ['', '']
  }

  useEffect(()=> {
    initializeGA()
    getCreds()
    console.log('Console logs are meant for debugging purposes only.')
  }, [])

  return(
    <div>
        <Heading 
          title="WLAN CRED"
        />
        {empty && (
          <div className="notification pt-1 pb-1 pr-1 pl-1 mb-2">
            {title}
          </div>
        )}
        {load ? (
          <div className="box">
            {message}...<Spin />
          </div>
        ) : (
        <Form
          className="has-text-left"
          hideRequiredMark
          onFinish={submit}
          onFinishFailed={r=>{console.log(r)}}
          layout="vertical"
          form={form}
        >
          <Form.Item
            noStyle
          >
            Username
            <Form.Item
              rules={[{required: true}]}
              className="mb-2"
              name="username"
            >
              <Input />
            </Form.Item>
          </Form.Item>
          <Form.Item
            noStyle
          >
            Password
            <Form.Item
              rules={[{required: true}]}
              className="mb-2"
              name="password"
            >
              <Input.Password />
            </Form.Item>
          </Form.Item>
          <Form.Item className="has-text-centered mb-2">
            <Button type="primary" htmlType="submit">
              SAVE
            </Button>
          </Form.Item>
        </Form>
        )}
    </div>
  )
}

export default Creds