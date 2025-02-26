"use client"
import React from 'react'
import { Button as AntButton, ButtonProps } from 'antd'
import './index.scss'

interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
  color?: 'default' | 'primary' | 'danger' | 'gray' | 'blue' | 'black' | 'red' | 'white'
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, color, className, ...rest }) => {
  const composedClassName = className + ' ' + color + ' custom-btn'
  return (
    <AntButton className={composedClassName} {...rest}>
      {children}
    </AntButton>
  )
}

export default CustomButton
