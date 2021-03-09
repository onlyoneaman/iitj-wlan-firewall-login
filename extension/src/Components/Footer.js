import React from 'react'
import {Button, Space} from 'antd'
import { GithubOutlined, HomeOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons'
import SendEvent from '../Common/Events/SendEvent'

const Footer = () => {
  return(
    <div className="has-text-centered">
      Made with ❤️ by Aman
      <div>
        <Button type="link" target="_blank" title="Twitter" rel="noreferrer noopener" onClick={()=>{SendEvent('Click Aman', 'Twitter Link CLick', 'Click')}} href="https://twitter.com/onlyoneaman">
          <TwitterOutlined />
        </Button>
        <Button title="Medium" type="link" target="_blank" rel="noreferrer noopener" onClick={()=>{SendEvent('Click Aman', 'Medium Link CLick', 'Click')}} href="https://onlyoneaman.medium.com">
          <HomeOutlined />
        </Button>
        <Button type="link" title="Instagram" target="_blank" rel="noreferrer noopener" onClick={()=>{SendEvent('Click Aman', 'Instagram Link CLick', 'Click')}} href="https://instagram.com/_a_gryffindor">
          <InstagramOutlined />
        </Button>
      </div>
      <Space>
        <Button type="link" href="https://forms.gle/WztdHSSMpT4DMHbU6" target="_blank" rel="noreferrer noopener" className="pr-0" onClick={()=>SendEvent('Click Report Bug', 'Report A Bug', 'Click')}>
          Report A Bug
        </Button>
        |
        <Button type="link" target="_blank" rel="noreferrer noopener" href="https://github.com/onlyoneaman/iitj-wlan-firewall-login" className="pr-0 pl-0" onClick={()=>SendEvent('Click Github', 'Visit Source Code', 'Click')}>
          <GithubOutlined />
        </Button>
        |
        <Button type="link" target="_blank" rel="noreferrer noopener" href="https://onlyoneaman.medium.com/wlan-cred-6f77ed2fce5c" className="pl-0" onClick={()=>SendEvent('Click Github', 'Visit Source Code', 'Click')}>
          More Info
        </Button>
      </Space>
    </div>
  )
}

export default Footer