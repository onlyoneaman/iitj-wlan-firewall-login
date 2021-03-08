import React, {useState, useEffect} from 'react'
import {Form, Spin, Input} from 'antd';
import { getCredsFromChrome } from '../main';
import Heading from '../Components/Heading'

const Creds = () => {
  const [load, setLoad] = useState(true)
  const [u, setU] = useState('')
  const [p, setP] = useState('')

  async function getCreds() {
    setLoad(true)
    getCredsFromChrome()
      .then(r => {
        console.log(r)
        setLoad(false)
        setU(r[0]);
        setP(r[1]);
      })
  }

  useEffect(()=> {
    getCreds()
  }, [])

  return(
    <div>
        <Heading 
          title="LDAP Credentials"
        />
        {load ? <Spin /> : (
        <Form
          initialValues={{
            username: u,
            password: p
          }}
        >
          <Form.Item
            label="Username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
          >
            <Input.Password />
          </Form.Item>
        </Form>
        )}
    </div>
  )
}

export default Creds