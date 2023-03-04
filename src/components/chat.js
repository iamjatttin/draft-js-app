import React from 'react'

const Chat = () => {
  return (
    <div class="bg-cyan-100 h-screen flex justify-center">
      <div class="bg-cyan-200 w-1/3 h-98 my-4 rounded-xl flex flex-col">
        <div class="bg-cyan-500 h-12 rounded-t-xl"></div>
        <div class="w-full h-12 rounded-xl flex items-center">
          <div class="bg-cyan-500 max-w-[75%] mx-2 rounded-xl my-auto flex items-center">
            <p class="px-2 py-1 pb-2">hello</p>
          </div>
        </div>
        <div class="w-full h-12 rounded-xl flex items-center">
          <div class="bg-cyan-500 max-w-[75%] mx-2 rounded-xl my-auto flex items-center">
            <p class="px-2 py-1 pb-2">hello</p>
          </div>
        </div>
        <div class="w-full h-12 rounded-xl flex items-center">
          <div class="bg-cyan-500 max-w-[75%] mx-2 rounded-xl my-auto flex items-center">
            <p class="px-2 py-1 pb-2">hello</p>
          </div>
        </div>
        <div class="flex-grow"></div>
        <div class="w-full flex justify-center items-center my-1">
          <input type="text" class="border h-full w-full ml-1 bg-cyan-50 rounded-xl px-2" />
          <button type="button" class="primary-btn rounded-xl mx-1 bg-gray-100 px-5 py-1 pb-2">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;