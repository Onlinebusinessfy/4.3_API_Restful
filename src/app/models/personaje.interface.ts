export interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface RespuestaApi {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Personaje[];
}
