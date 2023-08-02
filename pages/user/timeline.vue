<script setup>
import {useVirtualList, useInfiniteScroll,} from '@vueuse/core';
let currentOffset = ref(-5);
let staticData = ref([]);
let newteewtsAvailabe = ref(false);
console.log('here');
const userTokenObj = ref(localStorage.getItem('auth'));
const userToken = JSON.parse(userTokenObj.value).userSession.token

const reloadPage = () => {
  window.reloadPage();
}

const getFirstBadgeOfTeewts = async () => {

      try {
        let raw = JSON.stringify({
            query: `query{
              blogPosts(limit: 10,offset: 0){
                _id
                blogPostBody
                creationTimeStamp
                creator{
                  email
                }
              }
            }`});
          const teewtsResp = await $fetch('http://localhost:5000/graphql', {
            method: 'POST',
            body: raw,
            headers: {
              'Authorization': `Bearer ${userToken}`
            }
          });
          // console.log('tweet',teewtsResp);
          console.log('firstpost first badge', teewtsResp.data.blogPosts[0]);
          staticData.value = [...teewtsResp.data.blogPosts];
          console.log('staticdataLengthinfirstbadge',staticData.value.length);
          return teewtsResp.data.blogPosts
      } catch (error) {
        console.log(error);
      }
    }

    const createFirstBadgeOfTweets = async () => {
      console.log('firstbadge ended')
     return await getFirstBadgeOfTeewts();

}
let timer = null;
let lastCheckedForTeewts = null;
const getNextBadgeOfTeewts = async () => {
  try {
    let raw = JSON.stringify({
      query: `query{
        blogPosts(limit: 10,offset: ${currentOffset.value}){
          _id
          blogPostBody
          creationTimeStamp
          creator{
            email
          }
        }
      }`});
    const teewtsResp = await $fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: raw,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    // console.log('tweet',teewtsResp);
    console.log('firstpost next badge', teewtsResp.data.blogPosts[0]);

    // staticData.value = [...teewtsResp.data.blogPosts];
    console.log('staticdatalengthinnextbadge',staticData.value.length);
    return teewtsResp.data.blogPosts
  } catch (error) {
    console.log(error)
  }
  // console.Console(authStore);
  
  // return staticData;
}

const checkFornewTweets = async () => {
  
  try {
    let raw = JSON.stringify({
      query: `query{
        newBlogPosts(timeStamp: "${lastCheckedForTeewts}"){
          blogPostBody
          creationTimeStamp
        }
        }`});
        lastCheckedForTeewts = Date.now();
    const teewtsResp = await $fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: raw,
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    console.log('tweet',teewtsResp);
    // staticData.value = [...teewtsResp.data.blogPosts];
    console.log(staticData);
    // alert('new Tweet found')
    
    if(teewtsResp.data.newBlogPosts){
      staticData.value = [...teewtsResp.data.newBlogPosts,...staticData.value]
      newteewtsAvailabe = true
    }
  } catch (error) {
    console.log(error)
  }
}
onMounted(async () => {
  console.log('mounteddddd------===================')
  await createFirstBadgeOfTweets();
  timer = setInterval(async () => {
    console.log('counting start');
    await checkFornewTweets();
  }, 60000)
})

// onBeforeMount(async () => {
//   await createFirstBadgeOfTweets();
// })
//  const staticData = ref(Array.from(Array(50).keys(), () => 'Lorem ipsum'))

 const {list, containerProps, wrapperProps} = useVirtualList(staticData, {
  itemHeight: 96
 })
 useInfiniteScroll(
  containerProps.ref,
  async () => {
    //api call
    console.log('Infiniteeeeeeeeeeeeeeeeeeee ---------------')
    console.log('offset',currentOffset.value)
    currentOffset.value+=5
    console.log('extending list')
    // staticData.value.push(...Array.from(Array(20).keys(), () => 'Lorem ipsum'))
    staticData.value = [...staticData.value,...await getNextBadgeOfTeewts()];
    console.log('lengght',staticData.value.length);
  },
  {distance: 10}
 )

onBeforeUnmount(()=>{
  // console.log('dest')
  // alert('destoryed')
  clearInterval(timer);
})

 
const myMethod = () => {
  location.reload();
  // list.refresh();
  // window.scrollTo(0, 0);
  // scrollTo(0);
}


 </script>


<template>
  
  <div v-bind="containerProps" class="h-screen p-2 rounded"> 
    
    <div v-bind="wrapperProps" class="max-w-sm mx-auto">
      
        <div v-for="{index, data} in list" :key="index" >

        <br>
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ data.creator.email.split('@')[0] || 'test'}}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">{{ data.blogPostBody }}</p>
        </a>
        <br>
      </div>
    </div>
    
  </div>

  <div v-if="newteewtsAvailabe" class="justify-center" @click="myMethod">
        <!-- <button style="align-items: center;"> -->
          <NuxtLink 
                to="/user/timeline"
                class="px-3 py-2 rounded-md text-sm  text-black hover:text-black-300"
                >New teewts Avilable</NuxtLink
              ></div>
</template>
