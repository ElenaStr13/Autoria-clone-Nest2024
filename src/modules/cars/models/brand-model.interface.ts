export interface Model {
  name: string;
}

export interface Brand {
  name: string;
}

export interface BrandModels {
  name: string;
  models: Model[];
}
export type IBrandModels = BrandModels[];
