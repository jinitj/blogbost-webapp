<script setup>
import { reset } from '@formkit/core';
const serverError = ref(false)
const isSuccess = ref(false)
const submitRegistrationForm = async (formData) => {
  try{
    console.log(formData)
    let requestQuery = JSON.stringify({
      query: `mutation {createUser(userInput: {email: "${formData.email}" ,password: "${formData.password}"}){_id}}`
    });
    const userCreatedResp = await $fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: requestQuery
    });
    console.log('jinit',userCreatedResp);
    // authStore.setAuthenticated(userAuthResp.data);
    return navigateTo("/account/signIn", { replace: true });
  }catch(err){
    serverError.value = 'Incorrect username or password'
    console.log(err);
  }
  reset('registrationForm')

};
</script>

<template>
  <div class="my-32 w-96 mx-auto">
    <h1 class="text-center text-2xl font-bold mb-5">Create an Account</h1>
    
    <FormKit
      type="form"
      @submit="submitRegistrationForm"
      submit-label="Register"
      id="registrationForm"
      
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
      <FormKit
        type="password"
        name="re_password"
        label="Confirm Password"
        validation="required|confirm:password|required"
        placeholder="Re-enter your password..."
        validation-visibility="live"
        validation-label="Confirm Password"
      />
    </FormKit>
    <i class="text-gray-700 text-sm">
      Already have an Account ?
      <NuxtLink to="/account/signIn" class="text-black-1000 hover:text-blue-700"
        >Login</NuxtLink
      >
    </i>
    <div v-if="serverError">
      <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">Unable to Register</p>      
    </div>
    <div v-if="isSuccess" class="mt-2">
      <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative ">You have registered successfully !</p>
    </div>
  </div>
</template>

<style>
.submit-button-style{
    background-color: chartreuse;
}
[data-type="submit"] .formkit-input {
    background: #1F2937 !important;
  }
</style>