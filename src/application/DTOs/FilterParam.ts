export interface FilterParam {
  property: string
  value: string 
  operator: string
}

export interface ArrayFilter {
  params: FilterParam[]
}
