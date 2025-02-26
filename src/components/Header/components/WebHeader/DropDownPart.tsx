import React, { FC } from 'react'
import classNames from 'classnames'
import { MenuItem } from '@/components/Header/types'
import Link from "next/link";
import {useRouter} from "next/navigation";
import './dropDownPart.scss'

const DropDownPart: FC<{ closeMenu: () => void; openMenu?: MenuItem }> = ({
  closeMenu,
  openMenu,
}) => {
  const router  = useRouter()
  const navigateTo = (page: string) => {
    closeMenu()
    if (location.pathname !== page) {
      router.push(page)
    }
    const appElement = document.querySelector('.App')
    if (appElement) {
      appElement.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll
      })
    }
  }
  if (!openMenu?.children) {
    return null
  }
  return (
    <div id={'menu-inner-content'} onMouseLeave={closeMenu} className={'menu-inner-content'}>
      <div className="inner-content-body">
        <div className={'menu-inner-content__grid'}>
          {openMenu?.children?.map((menu, i) => (
            <div key={i}>
              <div className={classNames('menu-batch', { 'mb-40': i == 1 })}>{menu.title}</div>
              <div className={classNames('link-menu-item-wrapper', { 'second-column': i == 1 })}>
                {menu?.children?.map((child) => {
                  if (child.title) {
                    return (
                      <div className={'p-16'} key={child.title}>
                        {child?.path && (
                          <Link className={'link-menu-item'} href={child?.path || '/'}>
                            {child.title}
                          </Link>
                        )}
                        {child.description && (
                          <div
                            onClick={() => {
                              if (child?.path) navigateTo(child?.path)
                            }}
                            className={'text-muted pointer'}
                          >
                            {child.description}
                          </div>
                        )}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          ))}
        </div>
        {/*<div className={'header-add-image'}>*/}
        {/*  <img  loading={'lazy'}   */}
        {/*    width={167}*/}
        {/*    height={100}*/}
        {/*    className="image"*/}
        {/*    src={'./images/bonus_img.png'}*/}
        {/*  />*/}

        {/*  <div className={'gap-6'}>*/}
        {/*    <div className={'text-small-500 text-dark family-medium'}>*/}
        {/*      {t('internet1GbpsTariff')}*/}
        {/*    </div>*/}
        {/*    <div className={mode == 'light' ? 'text-muted' : 'text-dark' + ' description'}>*/}
        {/*      {t('speed1GbpsTariff')}*/}
        {/*    </div>*/}
        {/*    <div className={'arrow-right-text'}>*/}
        {/*      <span className={'mr-4'}>{t('more')}</span>*/}
        {/*      <IconArrowRight size={24} color={'#EB2343'} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  )
}

export default DropDownPart
