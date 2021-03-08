import React, {useState} from 'react'
import {Form, Typography} from 'antd';
import { getCredsFromChrome } from '../main';

const {Title} = Typography

const Creds = ({}) => {
  const [load, setLoad] = useState(false)
  const [u, setU] = useState('')
  const [p, setP] = useState('')

  function getCreds() {
    setLoad(true)
    getCredsFromChrome()
      .then(r => {
        setU(r[0]);
        setP(r[1]);
      })
  }

  useEffect(()=> {
    getCreds()
  }, [])

  return(
    <div>
      <Title level={4}>
          LDAP Credentials
        </Title>
        {load ? <Spin /> : (
        <Form>
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