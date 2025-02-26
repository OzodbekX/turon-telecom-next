import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConfirmationModalType } from '@/assets/types/settings'
import { CategoryType } from '@/assets/types/tariffs'
type DownloadAppType = {
  isOpenMobileAppModal: boolean
  links?: {
    android: string
    ios: string
  }
}

// Define a type for the slice state
interface SettingsState {
  language?: string
  mode: string
  openAuthentication: boolean
  downloadApp: DownloadAppType
  confirmationModal: ConfirmationModalType
  categoryList?: CategoryType[]
}

// Define the initial state using that type
export const initialRootStateSettings: SettingsState = {
  mode: 'light',
  downloadApp: {
    isOpenMobileAppModal: false,
  },
  confirmationModal: {
    isOpen: false,
  },
  openAuthentication: false,
}
const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialRootStateSettings,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
      // i18n.changeLanguage(state.language)
      return state
    },
    setOpenAuthentication: (state, action: PayloadAction<boolean>) => {
      state.openAuthentication = action.payload
      return state
    },
    setMode: (state, action: PayloadAction<string>) => {
      state.mode = action.payload
      return state
    },
    setCategoryList: (state, action: PayloadAction<CategoryType[]>) => {
      state.categoryList = action.payload
      return state
    },
    setConfirmationModal: (state, action: PayloadAction<ConfirmationModalType>) => {
      state.confirmationModal = action.payload
      return state
    },
    setMobileAppModal: (state, action: PayloadAction<DownloadAppType>) => {
      state.downloadApp = action.payload
      return state
    },
  },
})

export const {
  setCategoryList,
  setOpenAuthentication,
  setConfirmationModal,
  setMode,
  setLanguage,
  setMobileAppModal,
} = settingsSlice.actions

export default settingsSlice
