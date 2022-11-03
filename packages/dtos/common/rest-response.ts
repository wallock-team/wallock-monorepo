export type RestResponse<Data> = {
  code: number
  message?: string
  data?: Data
}
