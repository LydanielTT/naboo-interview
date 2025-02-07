import { City } from "@/utils";
import { axiosInstance } from "./axios";
import { AxiosResponse } from "axios";

export async function searchCity(search: string): Promise<City[]> {
  const response: AxiosResponse<City[]> = await axiosInstance.get(
    `/communes?nom=${search}&fields=departement&boost=population&limit=5`,
    { baseURL: process.env.NEXT_PUBLIC_BASE_URL_GEO_GOUV, withCredentials: false },
  );
  return response.data ?? [];
}
