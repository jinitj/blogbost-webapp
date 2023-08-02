import { defineStore } from "pinia";


export const useAuthStore = defineStore("auth", () => {
    const userSession = ref({isAuthenticated: false});
    const setAuthenticated = (auth) => {
        userSession.value = {...auth.login, isAuthenticated: true};
    };

    const $reset = () => {
        userSession.value = {isAuthenticated: false};
    };

    return {userSession, setAuthenticated, $reset}
},
{
    persist: {
        storage: persistedState.localStorage
    }
})