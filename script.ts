const API  = "http://192.168.3.164:5000/api/v1"     
let initialResponseLoading = false
// To create element with classname
const createElement = <T extends keyof HTMLElementTagNameMap>(
  tag: T,
  classList?: string | string[]
): HTMLElementTagNameMap[T] => {
  let ele = document.createElement(tag);
  if (Array.isArray(classList)) {
    classList.forEach((data) => {
      ele.classList.add(data);
    });
  } else if (classList) {
    ele.setAttribute("class", classList);
  }
  return ele;
};




//  main chatbot container

const chatbotContainer = createElement("div", "chatbot-container")


//   chatbot header

const chatbotHeader = createElement("div", "chatbot-header")

const chatbotAvatar = createElement("div", "chatbot-avatar")

// chatbot image avatar
const chatbotImageAvatar  = createElement("img") 



chatbotImageAvatar.src = "https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"

chatbotImageAvatar.alt = "chatbot-avatar"

chatbotAvatar.append(chatbotImageAvatar)

chatbotHeader.append(chatbotAvatar)

// chatbot info
const chatbotInfo = createElement("div", "chatbot-info")

const chatbotName = createElement("h3","")
chatbotName.textContent="Megatron"

chatbotInfo.append(chatbotName)

const chatbotStatus = createElement("span","")
chatbotStatus.textContent="Online"

chatbotInfo.append(chatbotStatus)

chatbotHeader.append(chatbotInfo)

const chatbotClose = createElement("button","chatbot-close")
chatbotClose.innerHTML= "&times;"
 
chatbotHeader.append(chatbotClose)


// appending header to container

chatbotContainer.append(chatbotHeader)

// Chatbot message body

const chatbotBody = createElement("div","chatbot-body")

// welcome message
const chatbotWelcomeMsg = createElement("p","chatbot-welcome-msg")
chatbotWelcomeMsg.textContent = "Welcome Message"

chatbotBody.append(chatbotWelcomeMsg)

// chatbot initial prompts

const chatbotInitialPrompts = createElement("div", "chatbot-initial-prompts")


chatbotBody.append(chatbotInitialPrompts)

// appending chatbot message body to main container

chatbotContainer.append(chatbotBody)

// chatbot input section

const chatbotInputForm = createElement("form", "chatbot-input")

const chatbotInput = createElement("input") as HTMLInputElement


chatbotInput.type = "text"
chatbotInput.placeholder = "Type your message"

chatbotInputForm.append(chatbotInput)

const chatbotSendButton = createElement("button") as HTMLButtonElement
chatbotSendButton.textContent = "Send"

chatbotSendButton.type = "submit"

chatbotInputForm.append(chatbotSendButton)

// appending chatbot input form to main container

chatbotContainer.append(chatbotInputForm)

document.body.append(chatbotContainer)

// Megatron chatbot icon

const chatbotMegatronIcon = createElement("div", "chatbot-megatron-icon")

// megatron chatbot icon image

// chatbot image avatar
const chatbotImageIcon  = createElement("img") as HTMLImageElement

chatbotImageIcon.src = "https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg"

chatbotImageIcon.alt = "chatbot-icon"

chatbotMegatronIcon.append(chatbotImageIcon)



document.body.append(chatbotMegatronIcon)


chatbotMegatronIcon.addEventListener("click", openChatbot)
  


function openChatbot(){
  
  if(!chatbotContainer.classList.contains("chatbot-show-container")){
    chatbotContainer.classList.add("chatbot-show-container")
    chatbotContainer.querySelector(".chatbot-body")?.append(loader())
    getInitalResponse()
  }else {
    chatbotContainer.classList.remove("chatbot-show-container")
  }

}

const loader = () =>{
   const loader = createElement("span")
   loader.setAttribute("id","loader")
   loader.innerText="Please Wait..."
   return loader
}
// Initial response call
const getInitalResponse = () => {
  const loader = document.getElementById("loader")
  
  fetch(`${API}/services`)
    .then((json) => json.json())
    .then((response) => {
      loader?.remove()
      const data = response
      console.log(data);
      chatbotInitialPrompts.innerText = ""
      // chatbotBody.classList.add("chatbot-initial-prompts");
      const chatbotInitialResponse = data.data.forEach((element)=>{
    const html = optionTemplate(element);
    chatbotInitialPrompts.append(html)
        
      })
      
      // chatbotBody.innerHTML = chatbotInitialResponse.join()
      
       
      
    })
    .catch((error) => {
      loader?.remove()

      console.log('Error:', error);
      initialResponseLoading=true

    });
}


const optionTemplate = (data: { _id: string; serviceName:string}) => {
  const template = createElement("p");
  template.setAttribute("data-id",data._id)
  template.innerText = data.serviceName;
  template.addEventListener("click",(e)=>{
    // chatbotBody.append(registerUser())
    
    const parentElement  = (e.target as HTMLParagraphElement).parentElement
    console.log(parentElement);
    const tempP =createElement("p","temp")
    tempP.innerText =( e.target as HTMLParagraphElement).innerText
    parentElement && (parentElement.innerText ="")

    parentElement?.appendChild(tempP);
  })
  return template
};



const registerUser = () =>{
  const userForm = createElement("form","chatbot-user-info")

  const userName  = createElement("input","user-inputs") as HTMLInputElement
  userName.type = "text"
  userName.placeholder = "Enter your name"
  userForm.append(userName)

  const userEmail = createElement("input", "user-inputs") as HTMLInputElement
  userEmail.type = "email"
  userEmail.placeholder= "Enter your email"
  userForm.append(userEmail)

  const userNumber = createElement("input","user-inputs") as HTMLInputElement
  userNumber.type = "number"
  userNumber.placeholder = "Enter your mobile number"
  userForm.append(userNumber)

  const userInfoSubmit = createElement("button", "user-info-submit") as HTMLButtonElement
  userInfoSubmit.type = "submit"
  userInfoSubmit.textContent = "SUBMIT"
  userForm.append(userInfoSubmit)

  console.log(userForm);
  

  

}

