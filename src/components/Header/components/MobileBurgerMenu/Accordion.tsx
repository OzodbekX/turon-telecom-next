'use client'
import { IconChevronRight } from '@/assets/icons/Regular'
import classNames from 'classnames'
import { useState } from 'react'
import { MenuItem } from '@/components/Header/types'
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import NavLink from "@/components/NavLink";
import './Accordion.scss'

interface AccordionProps {
  onLinkClick?: () => void
  mainMenu: MenuItem[]
}

export const Accordion = ({ onLinkClick, mainMenu }: AccordionProps) => {
  const t = useTranslations()
  const [active, setActive] = useState(0)
  const pathname = usePathname()


  const openPanel = (index: number) => {
    if (index == active) {
      setActive(0)
    } else {
      setActive(index)
    }
  }

  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick()
    }
  }

  return (
    <ul className="accordion-list">
      {mainMenu?.map((item, index) => {
        if (!item.children)
          return (
            <li key={index} className={classNames('item', { active: active == index + 1 })}>
              <NavLink
                href={item.path as string}
                className={({ isActive }) => classNames('accordion-button', { active: isActive })}
                onClick={handleLinkClick}
              >
                <div className="label">{t(item.title)}</div>
              </NavLink>
            </li>
          )

        const hasActiveLink = item.children.find((child) =>
          child.children?.find((link) => link.path == pathname)
        )

        return (
          <li key={index} className={classNames('item', { active: active == index + 1 })}>
            <div
              className={classNames('accordion-button', { active: hasActiveLink })}
              onClick={() => openPanel(index + 1)}
            >
              <div className="label">{t(item.title)}</div>
              <IconChevronRight size={14} color={hasActiveLink ? '#FFF' : '#A5A8AD'} />
            </div>
            <div className="accordion-panel">
              {item?.children?.map((child, index) => {
                return (
                  <div key={index} className="panel-item">
                    <div className="title">{t(child.title)}</div>
                    {child.children?.map((child, index) => {
                      return (
                        <NavLink
                          key={index}
                          className={({ isActive }) =>
                            classNames('panel-link', { active: isActive })
                          }
                          href={child.path as string}
                          onClick={handleLinkClick}
                        >
                          {t(child.title)}
                        </NavLink>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
