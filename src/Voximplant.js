import axios from 'axios';

export default class Voximplant {
  static _instance;

  /**
   * Please, use Voximplant.get() instead constructor.
   */
  constructor() {
    if (Voximplant._instance) {
      console.warn('[pPBX] You can\'t create new instance of the Voximplant integration object. Use Voximplant.get()')
    } else {
      Voximplant._instance = this;
    }
  }

  /**
   * get Voximplant API instance
   * @returns {Voximplant}
   */
  static get() {
    if (typeof Voximplant._instance === "undefined") {
      Voximplant._instance = new Voximplant();
      Voximplant._instance.refreshLogin();
    }
    return Voximplant._instance;
  }

  authData = {
    accountId: null,
    sessionId: null,
  };

  checkAuth() {
    return !!(this.authData.accountId && this.authData.sessionId);
  }


  refreshLogin() {
    try {
      this.authData.accountId = localStorage.getItem('accountId');
      this.authData.sessionId = localStorage.getItem('sessionId');
    } catch (e) {
      console.warn(`[pPBX] localStorage got error: ${e.message}`);
    }
  }

  /**
   * Request any VoximplantApi
   * @param params
   * @returns {Promise<AxiosResponse | AxiosInterceptorManager<AxiosResponse>>}
   */
  async requestApi(params) {
    params.account_id = this.authData.accountId;
    params.session_id = this.authData.sessionId;
    try {
      const response = await axios.get('https://api.voximplant.com/platform_api/', {
        params: params
      });
      // Remove logon data if got the logon error
      if (response.data && response.data.error && response.data.error.code === 100) {
        this.onLoginError();
      }
      return response;
    } catch (e) {
      console.error(`[pPBX] Voximplant API got error: ${e.message}`);
      throw e;
    }
  }

  /**
   * Logout
   */
  onLoginError() {
    console.warn(`[pPBX] login error. Logout...`);
    this.authData.sessionId = null;
    this.authData.accountId = null;
    try {
      localStorage.removeItem('accountId');
      localStorage.removeItem('sessionId');
    } catch (e) {
      console.warn(`[pPBX] localStorage got error: ${e.message}`);
    }
  }

  async login(username, password) {
    let request = {cmd: 'Logon', account_password: password};
    if(username.indexOf('@')===-1){
      request.account_name = username;
    }else{
      request.account_email = username;
    }
    //TODO: detect email and change logintype
    const loginResult = await this.requestApi(request);
    console.log(loginResult);
    if(loginResult&&loginResult.data){
      if(loginResult.data.error){
        throw new Error(loginResult.data.error.msg);
      }else{
        this.authData.sessionId = loginResult.data.result;
        this.authData.accountId = loginResult.data.account_id;
        try {
          localStorage.setItem('accountId',this.authData.accountId);
          localStorage.setItem('sessionId',this.authData.sessionId);
        } catch (e) {
          console.warn(`[pPBX] localStorage got error: ${e.message}`);
        }
      }
    }else{
      console.error(`[pPBX] Voximplant return unexpected result.`);
    }
  }
}
