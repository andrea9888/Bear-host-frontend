import apiCall from "../services/apiCall";
class AuthService {
    getAuthStatus() {
        let token = localStorage.getItem("bear-host-refresh");
        /*if (!!token) {
            await this.getAccessToken(token)
        }*/

        return false;
    }

    async getAccessToken(token){
        //pass
        //setJwt(token)
    }

    setJwt(token) {
        apiCall.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    async login(dataSent) {
        var result;
        await apiCall.post('/user/login', dataSent).then(res => {
            result = res.data;
            this.setJwt(res.refreshToken);

        }, () => {
            result = "error";
        });
        return result;
    }

    async signup(dataSent) {
        
        try {
            let res = await apiCall.post('/user/signup', dataSent)
        
            return "uspjesno";
          } catch (error) {
            return error.response.data.error; 
          }
    }

    logout(bool = false) {
        localStorage.removeItem("bear-host-access");
        if(!bool){
            localStorage.removeItem("bear-host-refresh");
        }
        window.location.href = "/login";
    }
}
export const auth = new AuthService();