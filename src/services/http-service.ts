import apiClient from "./api-client";

interface Entity {
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getById<T>(id: number) {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint + "/" + id, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  getOne<T>(id: number) {
    const controller = new AbortController();
    const request = apiClient.get<T>(this.endpoint + "/" + id, {
      signal: controller.signal,
    });
    return { request, cancel: () => controller.abort() };
  }

  delete(id: number) {
    const controller = new AbortController();
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T, id: number) {
    return apiClient.patch(this.endpoint + "/" + id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
