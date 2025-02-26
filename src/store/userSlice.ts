import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SubscriberType } from '@/assets/types/user'

// Define a type for the slice state
interface UserState {
  isAgreeToUseCookie?: boolean
  userName?: string
  accessToken?: string
  refreshToken?: string
  turonId?: string
  role?: string
  phoneNumber?: string
  phoneMask?: string
  isVerifiedByTuron?: boolean
  isVerifiedByExBill?: boolean
  userInfo?: SubscriberType
}

// Define the initial state using that type
export const initialRootStateUser: UserState = {
  isAgreeToUseCookie: false,
}
const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialRootStateUser,
  reducers: {
    setUserInfo: (state, action: PayloadAction<SubscriberType | undefined>) => {
      state.userInfo = action.payload
      return state
    },
    setCookieAgreement: (state, action: PayloadAction<boolean>) => {
      state.isAgreeToUseCookie = action.payload
      return state
    },
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken?: string
        refreshToken?: string
        turonId?: string
        phoneMask?: string
        role?: string
        isVerifiedByTuron?: boolean
        isVerifiedByExBill?: boolean
      }>
    ) => {
      state.refreshToken = action.payload?.refreshToken
      state.accessToken = action.payload?.accessToken
      state.phoneMask = action.payload?.phoneMask
      state.isVerifiedByTuron = action.payload?.isVerifiedByTuron
      state.accessToken = action.payload?.accessToken
      state.isVerifiedByExBill = action.payload?.isVerifiedByExBill
      state.turonId = action.payload?.turonId
      state.role = action.payload?.role
      return state
    },
  },
})

export const { setAuth, setCookieAgreement, setUserInfo } = userSlice.actions

export default userSlice
