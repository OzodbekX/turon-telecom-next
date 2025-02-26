import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { Accordion } from './Accordion'
import { MenuItem } from 'Components/Header/types'
import './MainMenu.scss'

interface mainMenuProps {
  mainMenu: MenuItem[]
  onClose: () => void
}

export const MainMenu = ({ onClose, mainMenu }: mainMenuProps) => {
  const { t } = useTranslation()

  return (
    <div className="burge-main-menu">
      <NavLink
        className={({ isActive }) => classNames('main-page-link', { active: isActive })}
        to={'/'}
        onClick={onClose}
      >
        {t('main')}
      </NavLink>
      <Accordion mainMenu={mainMenu} onLinkClick={onClose} />
    </div>
  )
}
