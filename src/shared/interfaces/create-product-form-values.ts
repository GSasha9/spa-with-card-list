export interface CreateProductFormValues {
  id: number;
  name: string;
  gender: string;
  species: string;
  status: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
  image: string;
}
