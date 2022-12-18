import { makeAutoObservable } from 'mobx'
import { ServerError } from '../models/serverError'

export default class CommonStore {
     serverError: ServerError | null = null

     constructor() {
          makeAutoObservable(this)
     }

     setServerError = async (data: ServerError) => {
          this.serverError = data
     }
}
