import axios from 'axios'
import config from '../config'
import CategoriesApi from './categories-api'
import TransactionsApi from './transactions-api'

export default class Api {
  public static async fromServer(context: any) {
    return new Api(context)
  }

  public static fromWeb() {
    return new Api()
  }

  public constructor(private readonly context?: any) {
    const configuredAxios = axios.create({
      baseURL: config.apiUrl,
      withCredentials: true
    })

    if (this.context) {
      configuredAxios.defaults.headers.get.Cookie = String(
        context.req.headers.cookie
      )
    }
    this.transactions = new TransactionsApi(configuredAxios)
    this.categories = new CategoriesApi(configuredAxios)
  }

  public get loginWithGoogleUrl() {
    return `${config.apiUrl}/login-with-google?success_url=${config.baseUrl}/transactions`
  }

  public readonly transactions: TransactionsApi
  public readonly categories: CategoriesApi
}
