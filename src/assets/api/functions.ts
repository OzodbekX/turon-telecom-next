// Export specific API calls using the generic function
import api from './api'
import getRequest from 'Assets/api/axiosInstance'
import axiosInstanceChat from 'Assets/api/axiosInstanceChat'
import { cineramaCategoryListUrl, cineramaChannelListUrl } from 'Assets/volumes'
import { ApplicationEnumCategories, ApplicationEnumTypes } from 'Assets/types/settings'
import { TicketRequestType } from 'Assets/types/ticket'

export const getUserInfo = async () => {
  return await getRequest.get(api.getUserInfo).then((res) => {
    return res.data?.data
  })
}

export const getInternetTariffCategories = async () => {
  return await getRequest
    .get(api.getInternetTariffCategories, { params: { limit: 100, offset: 0 } })
    .then((res) => {
      return res.data?.data
    })
}

export const getAllStories = async () => {
  return await getRequest
    .get(api.storiesClient, { params: { limit: 100, offset: 0, types: 'INTERNET' } })
    .then((res) => {
      return res.data?.data
    })
}
export const createTicket = async (payload: TicketRequestType) => {
  return await getRequest.post(api.tickets, payload).then((res) => {
    return res.data
  })
}

export const loginRequest = async (credentials: { login: string; password: string }) => {
  return await getRequest.post(api.abonentLogin, credentials).then((res) => {
    return res.data
  })
}
export const loginWithPhoneRequest = async (credentials: { phone: string }) => {
  return await getRequest.post(api.sendSMSCode, credentials).then((res) => {
    return res.data
  })
}

export const verifyPhoneNumber = async (credentials: { phone: string; token?: string }) => {
  return await getRequest
    .post(api.sendVerifySmsCode, credentials, {
      headers: {
        Authorization: 'Bearer ' + credentials?.token,
      },
    })
    .then((res) => {
      return res.data
    })
}

export const checkSMSCode = async (credentials: { phone: string; code: string }) => {
  return await getRequest.post(api.checkSMSCode, credentials).then((res) => {
    return res.data
  })
}

export const checkSMSCodeToVerify = async (credentials: {
  phone: string
  code: string
  token?: string
}) => {
  return await getRequest
    .post(api.checkVerifySmsCode, credentials, {
      headers: {
        Authorization: 'Bearer ' + credentials?.token,
      },
    })
    .then((res) => {
      return res.data
    })
}

export const onVerifyWithYes = async (token?: string) => {
  return await getRequest
    .post(
      api.verifyWithYes,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      return res.data
    })
}

export const getCities = async () => {
  return getRequest.get(api.officesCity).then((res) => {
    return res.data?.data
  })
}
export const getOffices = async (params: {
  cityId?: string
  q?: string
  limit: number
  offset: number
}) => {
  return getRequest.get(api.officesOffice, { params: params }).then((res) => {
    return res.data?.data
  })
}

export const getTariffsInCategory = async (categoryId: string) => {
  if (categoryId !== 'all') {
    return await getRequest
      .get(api.internetTariffs, { params: { categoryId: categoryId, offset: 0, limit: 100 } })
      .then((res) => {
        return res.data?.data
      })
  } else {
    return await getRequest
      .get(api.internetTariffs, { params: { offset: 0, limit: 100 } })
      .then((res) => {
        return res.data?.data
      })
  }
}

export const getTariffById = async (tariffId: string | null) => {
  if (tariffId) {
    return await getRequest.get(api.internetTariff + `/${tariffId}/public`).then((res) => {
      return res.data?.data
    })
  }
}

export const getAllNavigation = async () => {
  return await getRequest
    .get(api.navigationCards, { params: { limit: 20, offset: 0 } })
    .then((res) => {
      return res.data?.data
    })
    .catch(() => {
      return []
    })
}
export const getBillingCities = async () => {
  return await getRequest
    .get(api.billingCities, { params: { limit: 1000, offset: 0 } })
    .then((res) => {
      return res.data?.data
    })
}

export const getBillingRegions = async (cityId?: number) => {
  return await getRequest
    .get(api.billingRegions, { params: { limit: 1000, offset: 0, cityId: cityId } })
    .then((res) => {
      return res.data?.data
    })
}

export const getRegionTypes = async () => {
  return await getRequest
    .get(api.regionTypes, { params: { limit: 1000, offset: 0 } })
    .then((res) => {
      return res.data?.data
    })
}
export const getRegionTypeAddresses = async ({
  type,
  districtId,
}: {
  type?: string
  districtId?: number
}) => {
  return await getRequest
    .get(api.regionTypeAddresses, { params: { limit: 1000, offset: 0, type, districtId } })
    .then((res) => {
      return res.data?.data
    })
}

export const postApplication = async (values: {
  fullName?: string
  phone?: string
  companyName?: string
  pageTitle?: string
  type: ApplicationEnumTypes
  category: ApplicationEnumCategories
}) => {
  const currentUrl = window.location?.pathname
  values.pageTitle = currentUrl?.replace('/', '')
  return await getRequest.post(api.postApplication, values).then((res) => {
    return res.data?.data
  })
}
export const onDeleteRate = async () => {
  return await axiosInstanceChat.delete(api.getRatingChat).then((res) => {
    return res.data?.data
  })
}

export const onClickChatWithOperator = async () => {
  return await axiosInstanceChat.post(api.reportConnectionWithOperator).then((res) => {
    return res.data?.data
  })
}

export const checkInternetCoverage = async (params: {
  cityName?: string
  districtName?: string
  regionType?: string
  regionName?: string
}) => {
  return await getRequest.get(api.checkInternetCoverage, { params: params }).then((res) => {
    return res.data?.data
  })
}
export const getAllNews = async (params: {
  limit: number
  offset: number
  subtitleLen: number
}) => {
  return await getRequest.get(api.news, { params: params }).then((res) => {
    return res.data
  })
}

export const getSingleNews = async (id?: string) => {
  return await getRequest.get(`api/v1/news/${id}/public`).then((res) => {
    return res.data?.data
  })
}

export const getAllDevise = async () => {
  return await getRequest.get(api.devices, { params: { limit: 100, offset: 0 } }).then((res) => {
    return res.data?.data
  })
}

export const getDeviceById = async (tariffId: string | null) => {
  return await getRequest.get(api.devicesById + `/${tariffId}/public`).then((res) => {
    return res.data?.data
  })
}

export const getDeviceCatalog = async () => {
  return await getRequest.get(api.deviceCatalog).then((res) => {
    return res.data?.data
  })
}

export const getNestedChannels = async () => {
  return await getRequest.get(api.nestedChannelCategories).then((res) => {
    return res.data?.data
  })
}

export const getTariffChannels = async () => {
  return await getRequest.get(api.nestedChannelTariffs).then((res) => {
    return res.data?.data
  })
}
export const getSelectedBanner = async (key: string) => {
  return await getRequest
    .get(api.getSelectedBannerBanners, { params: { resourceKey: key } })
    .then((res) => {
      return res.data?.data
    })
}
export const getDigitalChannelCategories = async () => {
  return await getRequest.get(api.getDigitalChannelCategory).then((res) => {
    return res.data?.data
  })
}

export const getFaqs = async () => {
  return await getRequest.get(api.faqs, { params: { limit: 100, offset: 0 } }).then((res) => {
    return res.data?.data
  })
}

//this two functions are from another server
export const getCineramaCategories = async (language: string) => {
  return fetch(cineramaCategoryListUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json, text/plain, */*',
      locale: language,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      return data?.data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

export const getCineramaChannels = async (language: string, selectedModuleId?: number) => {
  return fetch(
    selectedModuleId
      ? cineramaChannelListUrl + `?category_id=${selectedModuleId}`
      : cineramaChannelListUrl,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        locale: language,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      return data?.data
    })
    .catch((error) => {
      console.error('Error fetching data:', error)
    })
}

export const getServicesCatalog = async () => {
  return await getRequest
    .get(api.serviceCatalog, { params: { offset: 0, limit: 100 } })
    .then((res) => {
      return res.data?.data
    })
}
export const getServicesOptions = async (id: string) => {
  return await getRequest
    .get(api.serviceCatalog + `/${id}/options`, { params: { offset: 0, limit: 100 } })
    .then((res) => {
      return res.data?.data
    })
}

export const createRoom = async (values: {
  name: string
  phoneNumber: string
  faqCategoryId?: number
}) => {
  return await axiosInstanceChat
    .post(api.registerClientChat, { ...values, platformType: 'WEB' })
    .then((res) => {
      return res.data
    })
}

export const onCreateChatRequest = async (values: { faqCategoryId: number }) => {
  return await axiosInstanceChat
    .post(api.createChat, { ...values, platformType: 'WEB' })
    .then((res) => {
      return res.data
    })
}

export const rateOperator = async (values: {
  rateValue: number
  reasons?: number[]
  comment?: string
}) => {
  return await axiosInstanceChat.post(api.getRatingChat, { ...values }).then((res) => {
    return res.data
  })
}

export const getAllMessages = async () => {
  return axiosInstanceChat.get(api.getRoomMessages).then((res) => {
    return res.data?.data
  })
}

export const getRateOptions = async (starsCount: number) => {
  return axiosInstanceChat.get(api.getRatePattern, { params: { rate: starsCount } }).then((res) => {
    return res.data?.data
  })
}
export const getHistoryChat = async (params: { offset: number; limit: number }) => {
  return axiosInstanceChat.get(api.getArchivedChats, { params: params }).then((res) => {
    return res.data?.data
  })
}

export const getHistoryMessages = async (params: { chatId: number }) => {
  return axiosInstanceChat.get(api.getChatMessages, { params: params }).then((res) => {
    return res?.data?.data
  })
}

export const getAllFAQs = async (faqCategoryId?: number, parentFaqId?: number) => {
  return axiosInstanceChat
    .get(api.getFaqs, { params: { categoryId: faqCategoryId, parentFaqId } })
    .then((res) => {
      return res.data?.data
    })
}

export const getPendingRate = async () => {
  return axiosInstanceChat.get(api.getRatingChat).then((res) => {
    return res.data?.data
  })
}

export const fetchChatFAQsCategories = async () => {
  return axiosInstanceChat.get(api.faqCategory).then((res) => {
    return res.data?.data
  })
}
export const postSubcategory = async (faqId: number) => {
  return await axiosInstanceChat.post(api.postSetFaq, { faqId: faqId }).then((res) => {
    return res.data?.data
  })
}

export const getLastActiveChat = async () => {
  return await axiosInstanceChat.get(api.getLastActiveChat).then((res) => {
    return res.data
  })
}

export const checkOperatorSwitch = async () => {
  return await axiosInstanceChat.get(api.checkHasConnectionWithOperator).then((res) => {
    return res.data
  })
}

export const checkForCallBackExist = async () => {
  return await axiosInstanceChat.get(api.hasActiveCallback).then((res) => {
    return res.data
  })
}
