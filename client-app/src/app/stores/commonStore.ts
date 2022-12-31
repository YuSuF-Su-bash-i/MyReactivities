import { makeAutoObservable, reaction } from 'mobx'
import { ServerError } from '../models/serverError'

export default class CommonStore {
   serverError: ServerError | null = null
   token: string | null = localStorage.getItem('jwt')
   appLoaded = false

   constructor() {
      makeAutoObservable(this)

      //this reaction coming from mobx and it react only when it changes (not first time initially it's setted.)
      reaction(
         () => this.token,
         (token) => {
            if (token) {
               localStorage.setItem('jwt', token)
            } else {
               localStorage.removeItem('jwt')
            }
         }
      )
   }

   setServerError = async (data: ServerError) => {
      this.serverError = data
   }

   setToken = (tkn: string | null) => {
      this.token = tkn
   }

   setAppLoaded = () => {
      this.appLoaded = true
   }
}
