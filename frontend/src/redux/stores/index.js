import {configureStore} from '@reduxjs/toolkit'
import crudSlice from '../reducers/crudSlice'
import userSlice from '../reducers/userSlice'
import loginSlice from '../reducers/loginSlice'

export default configureStore({
    reducer: {
        crud: crudSlice,
        users: userSlice,
        login:loginSlice
    }
})