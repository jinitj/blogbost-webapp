<script setup>
import { useAuthStore } from "@/stores/auth";
// import { useTeewtStore } from "@/stores/teewt";
const authStore = useAuthStore();
// const teewtStore = useTeewtStore();
const serverError = ref(false);
const submitLoginForm = async (formData) => {
  console.log(formData)
  try{
    let raw = JSON.stringify({
      query: `query {login(email: "${formData.email}" ,password: "${formData.password}"){token, userId}}`
    });
    const userAuthResp = await $fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: raw
    });
    userAuthResp.data.login['email'] = formData.email;
    console.log('jinit',userAuthResp);

    authStore.setAuthenticated(userAuthResp.data);
    return navigateTo("/user/timeline", { replace: true });
  }catch(err){
    serverError.value = 'Incorrect username or password'
    console.log(err);
  }
};

onMounted(async () => {
  authStore.$reset();
})
</script>

<template>
  <div>
    <div class="mt-32 w-96 mx-auto">
      <h1 class="text-center text-2xl font-bold mb-5">User Login</h1>
      <FormKit
        type="form"
        @submit="submitLoginForm"
        submit-label="Login"
        id="loginForm"
      >
        <FormKit
          type="text"
          label="Email"
          name="email"
          validation="required|email"
          placeholder="Enter your email..."
        />

        <FormKit
          type="password"
          label="Password"
          name="password"
          validation="required"
          placeholder="Enter your password..."
        />
      </FormKit>
      <i class="text-gray-700 text-sm">
        Do not have Account ?
        <NuxtLink
          to="/account/signUp"
          class="text-black-1000 hover:text-blue-700"
          >Create an Account</NuxtLink
        >
      </i>
      <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">{{ serverError }}</p>      
    </div>
    </div>
  </div>
</template>

<style lang="css" scoped>

[data-type="submit"] .formkit-input {
    background: #1F2937 !important;
  }
</style>