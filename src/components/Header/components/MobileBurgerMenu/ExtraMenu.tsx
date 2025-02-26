import { IconCallCallingFilled, IconVideoCircleFilled } from '@/assets/icons/Filled'
import classNames from 'classnames'
import { NavLink, useLocation } from 'react-router-dom'
import {useTranslations} from "next-intl";
import './ExtraMenu.scss'

const items = [
  {
    title: 'videoServiceCinerama',
    path: 'https://cinerama.uz/uz',
    target: '_blank',
    icon: IconVideoCircleFilled,
  },
  {
    title: 'contacts',
    path: '/navigate-us',
    icon: IconCallCallingFilled,
  },
]

export const ExtraMenu = ({ onClose }: { onClose?: () => void }) => {
  const t = useTranslations()
  const { pathname } = useLocation()
  return (
    <ul className="extra-menu">
      {items.map((item, index) => {
        return (
          <li className="item" key={index}>
            <NavLink
              className={({ isActive }) => classNames('extra-menu-link', { active: isActive })}
              target={item.target}
              to={item.path}
              onClick={onClose}
            >
              {<item.icon color={pathname == item.path ? '#EB2343' : '#74767A'} />}
              {t(item.title)}
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
