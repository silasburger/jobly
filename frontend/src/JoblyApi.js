import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

//handles api requests to server then to jobly database
class JoblyApi {
  static async request(endpoint, params = {}, verb = 'get') {
    // for now, hardcode a token for user "testuser"

    let _token = localStorage.getItem('token');

    console.log('API Call:', endpoint, params, verb);

    let q;

    if (verb === 'get') {
      q = axios.get(`${BASE_URL}/${endpoint}`, {
        params: { _token, ...params }
      });
    } else if (verb === 'post') {
      q = axios.post(`${BASE_URL}/${endpoint}`, { _token, ...params });
    } else if (verb === 'patch') {
      q = axios.patch(`${BASE_URL}/${endpoint}`, { _token, ...params });
    }

    try {
      return (await q).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(searchTerm) {
    let res = await JoblyApi.request(`jobs?search=${searchTerm}`);
    return res.jobs;
  }

  static async getCompanies(searchTerm) {
    let res = await JoblyApi.request(`companies?search=${searchTerm}`);
    return res.companies;
  }

  static async login(username, password) {
    let res = await JoblyApi.request(`login`, { username, password }, 'post');
    return res.token;
  }

  static async register(username, password, email, first_name, last_name) {
    let res = await JoblyApi.request(
      `users`,
      { username, password, email, first_name, last_name },
      'post'
    );
    return res.token;
  }

  static async getUser(username) {
    let res = await JoblyApi.request(`users/${username}`);
    return res.user;
  }

  static async patchUser({
    username,
    password,
    email,
    first_name,
    last_name,
    photo_url
  }) {
    let res = await JoblyApi.request(
      `users/${username}`,
      { password, email, first_name, last_name, photo_url },
      'patch'
    );
    return res.user;
  }

  // /:id/apply
  //(req.params.id, req.username, state)

  static async applyToJob(username, id, state) {
    let res = await JoblyApi.request(
      `jobs/${id}/apply`,
      { username, state },
      'post'
    );
    return res.message;
  }

  static async myJobApplications(username) {
    let res = await JoblyApi.request(`users/${username}/jobs-applied-to`);

    return res.jobsAppliedTo;
  }
}

export default JoblyApi;
