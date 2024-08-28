export default class ApiService {
  private baseURL: string;
  private endPoint: string;

  constructor(baseURL: string, endPoint: string) {
    this.baseURL = baseURL;
    this.endPoint = endPoint;
  }

  async get() {
    try {
      const res = await fetch(`${this.baseURL}/${this.endPoint}`, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Get data fail ${error.message}`);
      }
    }
  }

  async post(data: object) {
    try {
      const res = await fetch(`${this.baseURL}/${this.endPoint}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Post data fail ${error.message}`);
      }
    }
  }

  async patch(payload: { id: string }) {
    try {
      const res = await fetch(
        `${this.baseURL}/${this.endPoint}/${payload.id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        return await res.json();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Path data fail ${error.message}`);
      }
    }
  }

  async delete(payload: string) {
    try {
      const res = await fetch(`${this.baseURL}/${this.endPoint}/${payload}`, {
        method: "DELETE",
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Delete data fail ${error.message}`);
      }
    }
  }
}
