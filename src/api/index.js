import axios from 'axios';

export default class Api {
  constructor(options = {}) {
    this.client = axios.create();
    this.token = options.token;
    this.refreshToken = options.refreshToken;
    this.refreshRequest = null;

    this.client.interceptors.request.use(
      config => {
        if (!this.token) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config
        };

        newConfig.headers.Authorization = `Bearer ${this.token}`;
        return newConfig;
      },
      e => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      r => r,
      async error => {
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post(
            'http://localhost:9000/api/auth/refresh',
            { refreshToken: this.refreshToken }
          );
        }

        const { data } = await this.refreshRequest;
        this.refreshRequest = null;

        this.token = data.token;
        this.refreshToken = data.refreshToken;

        const newRequest = {
          ...error.config,
          retry: true
        };

        return this.client(newRequest);
      }
    );
  }

  async login({ login, password }) {
    const { data } = await this.client.post(
      'http://localhost:9000/api/auth/login',
      { login, password }
    );
    this.token = data.token;
    this.refreshToken = data.refreshToken;
    localStorage.setItem('token', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
  }

  async logout() {
    const { refreshToken } = this;
    await this.client.post('http://localhost:9000/api/auth/logout', {
      refreshToken
    });
    this.token = null;
    this.refreshToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  getTrips(startWeek, endWeek) {
    return this.client.get('http://localhost:9000/api/trips', {
      params: {
        startWeek,
        endWeek
      }
    });
  }

  getRoutes(startWeek, endWeek) {
    return this.client.get('http://localhost:9000/api/routes', {
      params: {
        startWeek,
        endWeek
      }
    });
  }

  getFinances(params) {
    return this.client.get('http://localhost:9000/api/board/finances', {
      params
    });
  }

  addFinances(data) {
    return this.client.post('http://localhost:9000/api/board/finances', data);
  }

  getPackages(startDate, endDate) {
    return this.client.get('http://localhost:9000/api/board/packages', {
      params: {
        startDate,
        endDate
      }
    });
  }

  addPackages(data) {
    return this.client.post('http://localhost:9000/api/board/packages', data);
  }

  getSms(ids) {
    return this.client.get('http://localhost:9000/api/sms', {
      params: { ids }
    });
  }

  getSmssend(phones) {
    return this.client.get('http://localhost:9000/api/smssend', {
      params: { phones }
    });
  }
}
