import moment from 'moment/moment'
import React from 'react'
import { FormInstance } from 'antd'

export const addNewLanguageToMoment = () => {
  moment.defineLocale('uz', {
    months: 'Yanvar_Fevral_Mart_Aprel_May_Iyun_Iyul_Avgust_Sentabr_Oktabr_Noyabr_Dekabr'.split('_'),
    monthsShort: 'Yan_Fev_Mar_Apr_May_Iyun_Iyul_Avg_Sen_Okt_Noy_Dek'.split('_'),
    weekdays: 'Yakshanba_Dushanba_Seshanba_Chorshanba_Payshanba_Juma_Shanba'.split('_'),
    weekdaysShort: 'Yak_Dush_Sesh_Chor_Pay_Jum_Shan'.split('_'),
    weekdaysMin: 'Ya_Du_Se_Cho_Pa_Ju_Sha'.split('_'),
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd, D MMMM YYYY HH:mm',
    },
    calendar: {
      sameDay: '[Bugun soat] LT',
      nextDay: '[Ertaga soat] LT',
      nextWeek: 'dddd [soat] LT',
      lastDay: '[Kecha soat] LT',
      lastWeek: "[O'tgan] dddd [soat] LT",
      sameElse: 'L',
    },
    relativeTime: {
      future: '%s ichida',
      past: '%s oldin',
      s: 'soniya',
      m: 'bir daqiqa',
      mm: '%d daqiqa',
      h: 'bir soat',
      hh: '%d soat',
      d: 'bir kun',
      dd: '%d kun',
      M: 'bir oy',
      MM: '%d oy',
      y: 'bir yil',
      yy: '%d yil',
    },
    week: {
      dow: 1, // Monday is the first day of the week
      doy: 7, // The week that contains Jan 1st is the first week of the year
    },
  })
}

export const scrollToElement = ({
  id,
  className,
  position = 'nearest',
}: {
  id: string
  className?: string
  position?: 'nearest' | 'center' | 'start' | 'end'
}) => {
  const element = document.getElementById(id)
  const elementContainer = document.querySelector(`.${className}`)
  if (elementContainer) {
    elementContainer?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  }

  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: position, inline: position })
  }
}

export function secondsToTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600) // Calculate the number of hours
  const mins = Math.floor((seconds % 3600) / 60) // Calculate the number of minutes
  // Format the result as "HH:MM" (adding leading zeroes if necessary)
  return [hrs.toString().padStart(2, '0'), mins.toString().padStart(2, '0')].join(':')
}

export function addSpaceEveryThreeChars(input: number) {
  // Convert the input to a string, in case it's a number
  const str = input?.toString()
  // Split the string into an array and reverse it to process from the end
  const reversed = str?.split('').reverse()
  // Add a space every three characters
  const spaced = reversed?.map((char, index) => {
    return index % 3 === 0 && index !== 0 ? char + ' ' : char
  })
  // Reverse the string back to its original order and join it
  return spaced?.reverse()?.join('')
}

export const allowNumbersInInput = (props: {
  event: React.KeyboardEvent<HTMLInputElement>
  form: FormInstance
  name: string
  isMinOne?: boolean
}) => {
  const allowedCharacters = props?.isMinOne ? /[1-9 ]/ : /[0-9 ]/
  const currentValue = props?.form?.getFieldValue(props?.name)
  const key = props?.event.key
  // If the key is a control key (Backspace, Delete, Arrow keys, Tab), allow it
  if (
    key === 'Backspace' ||
    key === 'Delete' ||
    key === 'ArrowLeft' ||
    key === 'ArrowRight' ||
    key === 'Tab'
  ) {
    return // Allow these keys to function normally
  }
  if (currentValue?.length > 0 && /[0-9 ]/.test(key)) {
    return
  }
  // If the key is not a digit or '+', prevent input
  if (!allowedCharacters.test(key)) {
    props?.event.preventDefault()
  }
}

export const handleOpenPolicyPDF = () => {
  // Dynamically construct the URL for the PDF
  const pdfPath = `${window.location.origin}/policy.pdf`
  openUrl(pdfPath)
}

export const getImageUrl = (name: string) => {
  return process.env.IMAGE_SERVER_URL + name
}

// Detect the device type (iOS or Android)
export const addClickEventToSpecificATags = () => {
  // Select all <a> tags with the specific id
  const aTags = document.querySelectorAll('[id*="navigate-to-page-policy"]')

  // Iterate over the selected elements
  aTags.forEach((aTag) => {
    aTag.addEventListener('click', (event) => {
      // navigateTo('/public-offer')
      handleOpenPolicyPDF()
      event.preventDefault() // Prevent default action (optional)
      // Your custom function or logic
    })
  })
}
// Detect the device type (iOS or Android)
export const removeClickEventToSpecificATags = () => {
  const aTags = document.querySelectorAll('[id*="navigate-to-page-policy"]')
  aTags.forEach((aTag) => {
    const clonedTag = aTag.cloneNode(true)
    if (aTag?.parentNode) aTag.parentNode.replaceChild(clonedTag, aTag)
  })
}

export const openUrl = (url: string) => {
  const isSafari = /Mac/i.test(navigator.userAgent)
  if (isSafari) {
    window.open(url, '_self') // Opens in a new tab for other browsers
  } else {
    window.open(url, '_blank') // Opens in a new tab for other browsers
  }
}

export function formatPhoneNumber(input: string) {
  // Remove all non-digit characters from the input
  const digits = input.replace(/\D/g, '')

  if (digits.length === 7) {
    // Format as ###-##-##
    return digits.replace(/(\d{3})(\d{2})(\d{2})/, '$1 $2 $3')
  } else if (digits.length === 9) {
    // Format as +998 ## ###-##-##
    return '+998 ' + digits.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
  } else if (digits.length === 12 && digits.startsWith('998')) {
    // Format as +998 ## ###-##-##
    return '+998 ' + digits.substring(3).replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
  } else {
    return input
  }
}
const userAgent = navigator.userAgent || navigator.vendor

export const isPlatformAndroid = /android/i.test(userAgent)
export const isPlatformIOS = /iPad|iPhone|iPod/i.test(userAgent)

export const makePhoneCall = () => {
  const userAgent = navigator.userAgent || navigator.vendor
  if (/Mobile/i.test(userAgent)) {
    openUrl('tel:1132')
  } else if (isPlatformAndroid) {
    openUrl('tel:1132')
  } else if (isPlatformIOS) {
    openUrl('tel:1132')
  } else {
    const isAppleDevice = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent)
    if (isAppleDevice) openUrl(`facetime:1132`)
  }
}
