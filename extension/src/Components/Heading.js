import React from 'react'
import {Typography, Tooltip} from 'antd'
import {InfoCircleOutlined} from '@ant-design/icons'

const {Title} = Typography

const Info = ({show}) => {

  if(!show) {return null}

  return(
    <Tooltip
      title="WLAN Cred stores your login info in your browser only and never shares it."
    >
      <InfoCircleOutlined />
    </Tooltip>
  )
}

const Heading = ({title, info = true}) => {
  return(
    <Title level={4} >
      {title}&nbsp;
      <Info show={info} />
    </Title>
  )
}

export default Heading