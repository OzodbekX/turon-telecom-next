'use client'
import React, { lazy, Suspense, useState } from 'react'
import './index.scss'

const WebHeader = lazy(() => import('@/components/Header/components/WebHeader'))
// const ConnectionApplication = lazy(() => import('@/components/ConnectionApplication'))
// const UserControllerDropDown = lazy(() => import('@/components/UserControllerDropDown'))
// const LanguageModal = lazy(() => import('@/components/LanguageModal'))

const Header = () => {
  const [isModalVisible, setIsModalVisible] = useState({ open: false, step: 1 })
  const [userControllerModal, setUserControllerModal] = useState(false)
  const [isLangModalOpen, setIsLangModalOpen] = useState(false)

  return (
    <div className={'header'}>
      <Suspense fallback={<div className={'header-placeholder'}></div>}>
        <WebHeader
          setIsModalVisible={setIsModalVisible}
          setUserControllerModal={setUserControllerModal}
        />
      </Suspense>
      <Suspense fallback={<div></div>}>
        {/*<ConnectionApplication*/}
        {/*  isModalVisible={isModalVisible}*/}
        {/*  setIsModalVisible={setIsModalVisible}*/}
        {/*/>*/}
        {/*<UserControllerDropDown*/}
        {/*  setIsModalOpen={setUserControllerModal}*/}
        {/*  isModalOpen={userControllerModal}*/}
        {/*  onLangClick={setIsLangModalOpen}*/}
        {/*  // onPromocodeClick={setIsPromocodeModalOpen}*/}
        {/*/>*/}
        {/*<LanguageModal isModalOpen={isLangModalOpen} setIsModalOpen={setIsLangModalOpen} />*/}
      </Suspense>
    </div>
  )
}

export default Header
