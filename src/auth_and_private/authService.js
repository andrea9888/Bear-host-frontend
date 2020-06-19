import apiCall from "../services/apiCall";
class AuthService {
    getAuthStatus() {
        let token = localStorage.getItem("bear-host-access");
        if (!!token) this.setJwt(token)
        return !!token ? true : false;
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
    logout() {
        localStorage.removeItem("bear-host-access");
        window.location.href = "/login";
    }
}
export const auth = new AuthService();