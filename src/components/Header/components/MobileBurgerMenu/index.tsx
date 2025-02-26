import {FC, useState} from 'react'
import classNames from 'classnames'
import {IconClose, IconMenu, IconUser} from 'Assets/icons/Regular'
import {useTranslation} from 'react-i18next'
import {ExtraMenu} from './ExtraMenu'
import {MainMenu} from './MainMenu'
import ConnectionApplication from 'Components/ConnectionApplication'
import {useLockBodyScroll} from '@/assets/hooks/useLockBodyScroll'
import CustomButton from '@/components/CustomButton'
import {formatPhoneNumber} from '@/assets/functions'
import {MenuItem} from '@/components/Header/types'
import {useSelector} from "react-redux";
import './index.scss'

const MobileBurgerMenu: FC<{
    mainMenu: MenuItem[]
    setUserControllerModal: (v: boolean) => void
}> = ({mainMenu, setUserControllerModal}) => {
    const {t} = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState({open: false, step: 1})
    const {turonId, userInfo} = useSelector((state) => state?.user)

    useLockBodyScroll({isLocked: isOpen})

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
        setUserControllerModal(false)
    }

    return (
        <>
            <div className="mobile-burger-menu">
                <div>
                    <button className="open-button" onClick={handleOpen}>
                        <IconMenu/>
                    </button>
                </div>
                <div
                    onClick={() => setUserControllerModal(false)}
                    className={classNames('modal', {open: isOpen})}
                >
                    <button className="close-button" onClick={handleClose}>
                        <IconClose size={16}/>
                    </button>
                    <MainMenu mainMenu={mainMenu} onClose={handleClose}/>
                    <div className="divider"/>
                    <ExtraMenu onClose={handleClose}/>
                    {turonId ? (
                        <CustomButton
                            onClick={(e) => {
                                e.stopPropagation()
                                setUserControllerModal(true)
                            }}
                            color={'blue'}
                            type={'primary'}
                            className={'user-icon-button'}
                            size={'small'}
                        >
                            <div className={'user-icon-wrapper'}>
                                <IconUser color={'white'} size={24}/>
                                <div className={'names'}>
                                    <div>{formatPhoneNumber(userInfo?.phone || '')}</div>
                                </div>
                            </div>
                        </CustomButton>
                    ) : (
                        <CustomButton
                            onClick={() => {
                                setIsModalVisible({open: true, step: 1})
                            }}
                            color={'blue'}
                            type={'primary'}
                            size={'large'}
                            className={'primary-button'}
                        >
                            {t('connectTuronTelecom')}
                        </CustomButton>
                    )}
                </div>
                {isOpen && <div className="overlay" onClick={handleClose}/>}
            </div>
            <ConnectionApplication
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
            />
        </>
    )
}
export default MobileBurgerMenu
