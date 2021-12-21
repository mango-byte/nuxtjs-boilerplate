export interface Entity {
  id?: string
  createdAt?: string | Date
  updatedAt?: string | Date
}
export interface ValidatorEntity {
  rules: Record<string, any>
  messages?: Record<string, any>
  attributes?: Record<string, any>
}
