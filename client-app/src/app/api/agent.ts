import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify'
import { Activity } from '../models/activity'
import { ServerError } from '../models/serverError'
import { router } from '../router/Routes'
import { store, useStore } from '../stores/store'

const sleep = (delay: number) => {
     return new Promise((resolve) => {
          setTimeout(resolve, delay)
     })
}

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.response.use(
     async (resp) => {
          await sleep(1000)
          return resp
     },
     (error: AxiosError) => {
          const { data, status, config } = error.response as AxiosResponse
          switch (status) {
               case 400:
                    if (
                         config.method === 'get' &&
                         data.errors.hasOwnProperty('id')
                    ) {
                         router.navigate('/not-found') //if the id para, that we sent is not a real guid, then it will keep in the loading spinner infinitely. So we need to redirect it to not-found so we can handle it gracefully.
                    }
                    if (data.errors) {
                         const modelStateErrors = []
                         for (const key in data.errors) {
                              if (data.errors[key]) {
                                   modelStateErrors.push(data.errors[key])
                              }
                         }
                         throw modelStateErrors.flat()
                    } else {
                         toast.error(data)
                    }
                    break
               case 401:
                    toast.error('unauthorized')
                    break
               case 403:
                    toast.error('forbidden')
                    break
               case 404:
                    router.navigate('/not-found')
                    break
               case 500:
                    store.commonStore.setServerError(data)
                    router.navigate('/server-error')
                    break
          }
          return Promise.reject(error)
     }
)

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
     get: <T>(url: string) => axios.get<T>(url).then(responseBody),
     post: <T>(url: string, body: {}) =>
          axios.post<T>(url, body).then(responseBody),
     put: <T>(url: string, body: {}) =>
          axios.put<T>(url, body).then(responseBody),
     del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
     list: () => requests.get<Activity[]>('/activities'),
     details: (id: string) => requests.get<Activity>(`/activities/${id}`),
     create: (activity: Activity) =>
          requests.post<Activity>(`/activities`, activity),
     update: (activity: Activity) =>
          requests.put<Activity>(`/activities/${activity.id}`, activity),
     delete: (id: string) => requests.del<void>(`/activities/${id}`),
}

const agent = {
     Activities,
}

export default agent
