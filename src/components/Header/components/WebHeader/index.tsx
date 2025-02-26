import React, {FC, lazy, Suspense, useState} from 'react'
import {IconCallCallingFilled, IconVideoCircleFilled} from '@/assets/icons/Filled'
import CustomButton from '@/components/CustomButton'
import {IconUser} from '@/assets/icons/Regular'
import {formatPhoneNumber} from '@/assets/functions'
import {setOpenAuthentication} from '@/store/settingsSlice'
import {MenuItem} from '@/components/Header/types'
import classNames from 'classnames'
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {RootState} from "@/store/store";
import {useDispatch, useSelector} from "react-redux";
import './index.scss'

const DropDownPart = lazy(() => import('@/components/Header/components/WebHeader/DropDownPart'))
const MobileBurgerMenu = lazy(() => import('@/components/Header/components/MobileBurgerMenu'))

const WebHeader: FC<{
  setUserControllerModal: (v: boolean) => void
  setIsModalVisible: (v: { open: boolean; step: number }) => void
}> = ({ setUserControllerModal, setIsModalVisible }) => {
  const { mode } = useSelector((state:RootState) => state?.settings)
  const [openMenu, setOpenMenu] = useState<MenuItem>()
  const pathname = usePathname()

  const router  = useRouter()
  const dispatch = useDispatch()
  const t = useTranslations()
  const { turonId, userInfo } = useSelector((state:RootState) => state?.user)
  const mainMenu = [
    // {
    //   title: t('servicePackages'),
    //   children: [
    //     {
    //       title: t('tariffs'),
    //       children: [
    //         {
    //           title: t('forMovesAndOperas'),
    //           description: t('internetTvMovieTariff'),
    //           path: '/film-and-movies',
    //         },
    //         {
    //           title: t('allForApartment'),
    //           description: t('selectWhichTariffIsForYou'),
    //           path: 'apartment-service',
    //         },
    //         {
    //           title: t('allForPrivateHouse'),
    //           description: t('internetTvPrivateHouseTariff'),
    //           path: 'home-service',
    //         },
    //       ],
    //     },
    //   ],
    // },
    {
      title: t('internet'),
      id: 1,
      children: [
        {
          title: t('tariffs'),
          children: [
            {
              title: t('forOnlineGames'),
              description: t('lowPingGamesTariff'),
              path: '/internet-for-gamers',
            },
            // {
            //   title: t('forPrivateHouse'),
            //   description: t('unlimitedInternetTariff'),
            //   path: 'home-internet',
            // },
            // {
            //   title: t('forApartment'),
            //   description: t('reliableInternetChooseYours'),
            //   path: 'apartment-internet',
            // },
            {
              title: t('internetForNewcomers'),
              description: t('internetDuringRenovation'),
              path: '/new-settlers',
            },
          ],
        },
        {
          title: t('additionalTariff'),
          children: [
            {
              title: t('wifiRouters'),
              path: '/wifi-routers',
            },
          ],
        },
      ],
    },
    {
      title: t('television'),
      id: 2,

      children: [
        {
          title: t('tariffs'),
          children: [
            // {
            //   title: t('forMovesAndOperas'),
            //   description: t('internetTvMovieTariff'),
            //   path: '/film-and-movies',
            // },
            {
              title: t('subscriptionsAndPackagesTariff'),
              description: t('onlineTvServicesTariff'),
              path: '/telecom-tv-service',
            },
          ],
        },
        {
          title: t('additionalTariff'),
          children: [
            {
              title: t('tvChannelsTariff'),
              path: '/tv-channels',
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: t('equipment'),
      path: '/wifi-routers-main',
    },
    {
      id: 4,
      title: t('servicesMenu'),
      path: '/turon-telecom-service',
    },
    {
      id: 5,
      title: t('forBusiness'),
      path: '/for-business',
    },
  ]

  const closeMenu = () => {
    setOpenMenu(undefined)
  }

  const navigateTo = (page: string) => {
    closeMenu()
    if (pathname !== page) {
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

  const onClickOutside = () => {
    const box = document.getElementById('main-header')
    // Add an event listener to the document to detect clicks
    document.addEventListener('click', function (event) {
      // Check if the clicked element is outside the box
      if (!box?.contains(event?.target as Node)) {
        closeMenu()
        // You can perform any action you want here when clicked outside
      }
    })
  }

  const isPageOpen = (menu: MenuItem) => {
    if (pathname == menu.path) return true
    else if (
      menu.children?.some((i) => i.path == pathname) ||
      menu.children?.some((i) => i.children?.some((i) => i.path == pathname))
    )
      return true
    return false
  }

  const onClickMenu = (menu: MenuItem) => {
    if (menu?.children) {
      setOpenMenu(menu)
    } else if (menu?.path) {
      closeMenu()
      if (location.pathname !== menu?.path) {
        router.push(menu?.path)
      }
      const appElement = document.querySelector('.App')
      if (appElement) {
        appElement.scrollTo({
          top: 0,
          behavior: 'smooth', // Smooth scroll
        })
      }
    }
  }

  const writeMenus = () => {
    return mainMenu.map((menu: MenuItem, i) => {
      return (
        <div
          key={i}
          className={classNames('menu-item', {
            'selected-menu': openMenu?.title == menu.title,
            'is-page-open': isPageOpen(menu),
          })}
          onClick={() => {
            onClickMenu(menu)
          }}
        >
          {menu.title}
          {openMenu?.title == menu.title && <hr />}
        </div>
      )
    })
  }

  return (
    <div className={'header-container-wrapper'}>
      <div id={'headerContainer'} className="header-container">
        <div className="top-bar">
          <div className={'gap-32'}>
            {/*<div onClick={() => navigateTo('/for-business')} className={'d-flex pointer'}>*/}
            {/*  <IconBriefcaseFilled className={'top-header-icons'} size={16} />*/}
            {/*  <span> {t('forBusiness')}</span>*/}
            {/*</div>*/}
            <div className={'d-flex pointer'}>
              <IconVideoCircleFilled className={'top-header-icons'} size={16} />
              <a href={'https://cinerama.uz/uz'} target="_blank" rel="noreferrer">
                {t('onlineCinerama')}
              </a>
            </div>
            {/*<div onClick={() => navigateTo('/recommend-earn')} className={'d-flex pointer'}>*/}
            {/*  <IconWalletFilled className={'top-header-icons'} size={16} />*/}
            {/*  <span>{t('recommendAndEarn')}</span>*/}
            {/*</div>*/}
            <div onClick={() => navigateTo('navigate-us')} className={'d-flex pointer'}>
              <IconCallCallingFilled className={'top-header-icons'} size={16} />
              <span>{t('contacts')}</span>
            </div>
          </div>
          {/*<div className="gap-32"></div>*/}
        </div>
        <div onClick={onClickOutside} id={'main-header'} className="main-header">
          <div onClick={() => navigateTo('/')} className="logo">
            <img
              loading={'lazy'}
              src={mode == 'dark' ? 'logo_light.svg' : 'logo.svg'}
              alt="Turon Telecom"
            />
          </div>
          <Suspense fallback={<div></div>}>
            <MobileBurgerMenu mainMenu={mainMenu} setUserControllerModal={setUserControllerModal} />
          </Suspense>
          <nav className="nav-links">{writeMenus()}</nav>
          <div className="auth-buttons">
            {!turonId && (
              <CustomButton
                // onClick={() => window.open(privateCabinet)}
                onClick={() => {
                  closeMenu()
                  dispatch(setOpenAuthentication(true))
                }}
                color={mode == 'dark' ? 'black' : 'gray'}
                type={'primary'}
                size={'small'}
                className={'family-medium'}
              >
                {t('enter')}
              </CustomButton>
            )}
            {turonId ? (
              <CustomButton
                onClick={() => setUserControllerModal(true)}
                color={'blue'}
                type={'primary'}
                className={'user-icon-button'}
                size={'small'}
              >
                <div className={'user-icon-wrapper'}>
                  <IconUser color={'white'} size={24} />
                  <div className={'names'}>
                    <div>{formatPhoneNumber(userInfo?.phone || '')}</div>
                  </div>
                </div>
              </CustomButton>
            ) : (
              <CustomButton
                onClick={() => {
                  closeMenu()
                  setIsModalVisible({ open: true, step: 1 })
                }}
                color={'blue'}
                type={'primary'}
                size={'small'}
              >
                {t('connectTuronTelecom')}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
      <Suspense fallback={<div></div>}>
        <DropDownPart openMenu={openMenu} closeMenu={closeMenu} />
      </Suspense>
    </div>
  )
}

export default WebHeader
