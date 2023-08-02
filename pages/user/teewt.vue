
<script setup>

import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const serverError = ref(false);
const form = ref({teewt: ''});
const submitteewt = async function() {
  try {
    let formData = {};
    console.log(authStore.userSession.token);
    console.log(form.value.teewt);
    for (let [key, value] of Object.entries(form)) {
      formData[key]= value;
    }
    let raw = JSON.stringify({
      query: `mutation {
        createBlogPost(blogPostInput: {blogPostBody:"${form.value.teewt}"}){
          blogPostBody
          creator{
            email,
            _id
          }
        }
      }`
    });
    const userAuthResp = await $fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: raw,
      headers: {
        'Authorization': `Bearer ${authStore.userSession.token}`
      }
    });
    console.log(userAuthResp);
    // form.teewt=''
    const formElement = document.getElementById('teewtform');
    formElement.reset();
  } catch (error) {
    console.log(error)
    serverError.value = 'Something went wrong'
  }
}

</script>


<template>
<div class="h-screen flex items-center  justify-center">
<div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
    <form @submit.prevent="submitteewt" class="space-y-6" id="teewtform">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">We are Rettiwt</h5>
        <div>
            <label for="teewt" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What you thinking</label>
            <input v-model="form.teewt" type="text" name="teewt" id="teewt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="hmm..." required>
        </div>
        <button type="submit"  class="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">Shoot your teewt</button>
    </form>
</div>
</div>

</template>
