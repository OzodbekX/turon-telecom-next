import classNames from 'classnames'
import { Accordion } from './Accordion'
import { MenuItem } from '@/components/Header/types'
import {useTranslations} from "next-intl";
import './MainMenu.scss'
import NavLink from "@/components/NavLink";

interface mainMenuProps {
  mainMenu: MenuItem[]
  onClose: () => void
}

export const MainMenu = ({ onClose, mainMenu }: mainMenuProps) => {
  const t = useTranslations()

  return (
    <div className="burge-main-menu">
      <NavLink
        className={({ isActive }) => classNames('main-page-link', { active: isActive })}
        href={'/'}
        onClick={onClose}
      >
        {t('main')}
      </NavLink>
      <Accordion mainMenu={mainMenu} onLinkClick={onClose} />
    </div>
  )
}
