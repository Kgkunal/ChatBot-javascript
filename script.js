const chatInput = document.querySelector(" .chat-input textarea");
const sendChatBtn = document.querySelector(" .chat-input span");
const chatbox = document.querySelector(" .chatbox ");

let userMessage;
const API_KEY="";

createChatLi=(message , ClassName) => {
    const ChatLi= document.createElement("li");
    ChatLi.classList.add("chat", ClassName);
    let chatContent = ClassName === "outgoing" ? `<p> ${message} </p>` : ` <span class="material-symbols-outlined">smart_toy</span> <p> ${message} </p>`;
    ChatLi.innerHTML = chatContent;
    return ChatLi;
}

const generateResponse = ()=>{
    const API_URL= "https://api.openai.com/v1/chat/completions";

    const requestOptions ={
        method: "POST" ,
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
  messages: [ {"role": "user", "content": userMessage}]

        })
    }
}
const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage , "outgoing"));

    setTimeout(()=>{chatbox.appendChild(createChatLi("Thinking...." , "incoming"));

    generateResponse();


    },600);

}
sendChatBtn.addEventListener("click", handleChat);
