export interface FilterParam {
  property: string
  value: undefined
  operator: string
}

export interface ArrayFilter {
  params: FilterParam[]
}
