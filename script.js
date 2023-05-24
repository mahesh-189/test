var API = "http://192.168.3.164:5000/api/v1";
var initialResponseLoading = false;
// To create element with classname
var createElement = function (tag, classList) {
    var ele = document.createElement(tag);
    if (Array.isArray(classList)) {
        classList.forEach(function (data) {
            ele.classList.add(data);
        });
    }
    else if (classList) {
        ele.setAttribute("class", classList);
    }
    return ele;
};
//  main chatbot container
var chatbotContainer = createElement("div", "chatbot-container");
//   chatbot header
var chatbotHeader = createElement("div", "chatbot-header");
var chatbotAvatar = createElement("div", "chatbot-avatar");
// chatbot image avatar
var chatbotImageAvatar = createElement("img");
chatbotImageAvatar.src = "https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg";
chatbotImageAvatar.alt = "chatbot-avatar";
chatbotAvatar.append(chatbotImageAvatar);
chatbotHeader.append(chatbotAvatar);
// chatbot info
var chatbotInfo = createElement("div", "chatbot-info");
var chatbotName = createElement("h3", "");
chatbotName.textContent = "Megatron";
chatbotInfo.append(chatbotName);
var chatbotStatus = createElement("span", "");
chatbotStatus.textContent = "Online";
chatbotInfo.append(chatbotStatus);
chatbotHeader.append(chatbotInfo);
var chatbotClose = createElement("button", "chatbot-close");
chatbotClose.innerHTML = "&times;";
chatbotHeader.append(chatbotClose);
// appending header to container
chatbotContainer.append(chatbotHeader);
// Chatbot message body
var chatbotBody = createElement("div", "chatbot-body");
// welcome message
var chatbotWelcomeMsg = createElement("p", "chatbot-welcome-msg");
chatbotWelcomeMsg.textContent = "Welcome Message";
chatbotBody.append(chatbotWelcomeMsg);
// chatbot initial prompts
var chatbotInitialPrompts = createElement("div", "chatbot-initial-prompts");
chatbotBody.append(chatbotInitialPrompts);
// appending chatbot message body to main container
chatbotContainer.append(chatbotBody);
// chatbot input section
var chatbotInputForm = createElement("form", "chatbot-input");
var chatbotInput = createElement("input");
chatbotInput.type = "text";
chatbotInput.placeholder = "Type your message";
chatbotInputForm.append(chatbotInput);
var chatbotSendButton = createElement("button");
chatbotSendButton.textContent = "Send";
chatbotSendButton.type = "submit";
chatbotInputForm.append(chatbotSendButton);
// appending chatbot input form to main container
chatbotContainer.append(chatbotInputForm);
document.body.append(chatbotContainer);
// Megatron chatbot icon
var chatbotMegatronIcon = createElement("div", "chatbot-megatron-icon");
// megatron chatbot icon image
// chatbot image avatar
var chatbotImageIcon = createElement("img");
chatbotImageIcon.src = "https://st3.depositphotos.com/8950810/17657/v/600/depositphotos_176577870-stock-illustration-cute-smiling-funny-robot-chat.jpg";
chatbotImageIcon.alt = "chatbot-icon";
chatbotMegatronIcon.append(chatbotImageIcon);
document.body.append(chatbotMegatronIcon);
chatbotMegatronIcon.addEventListener("click", openChatbot);
function openChatbot() {
    var _a;
    if (!chatbotContainer.classList.contains("chatbot-show-container")) {
        chatbotContainer.classList.add("chatbot-show-container");
        (_a = chatbotContainer.querySelector(".chatbot-body")) === null || _a === void 0 ? void 0 : _a.append(loader());
        getInitalResponse();
    }
    else {
        chatbotContainer.classList.remove("chatbot-show-container");
    }
}
var loader = function () {
    var loader = createElement("span");
    loader.setAttribute("id", "loader");
    loader.innerText = "Please Wait...";
    return loader;
};
// Initial response call
var getInitalResponse = function () {
    var loader = document.getElementById("loader");
    fetch("".concat(API, "/services"))
        .then(function (json) { return json.json(); })
        .then(function (response) {
        loader === null || loader === void 0 ? void 0 : loader.remove();
        var data = response;
        console.log(data);
        chatbotInitialPrompts.innerText = "";
        // chatbotBody.classList.add("chatbot-initial-prompts");
        var chatbotInitialResponse = data.data.forEach(function (element) {
            var html = optionTemplate(element);
            chatbotInitialPrompts.append(html);
        });
        // chatbotBody.innerHTML = chatbotInitialResponse.join()
    })
        .catch(function (error) {
        loader === null || loader === void 0 ? void 0 : loader.remove();
        console.log('Error:', error);
        initialResponseLoading = true;
    });
};
var optionTemplate = function (data) {
    var template = createElement("p");
    template.setAttribute("data-id", data._id);
    template.innerText = data.serviceName;
    template.addEventListener("click", function (e) {
        // chatbotBody.append(registerUser())
        var parentElement = e.target.parentElement;
        console.log(parentElement);
        var tempP = createElement("p", "temp");
        tempP.innerText = e.target.innerText;
        parentElement && (parentElement.innerText = "");
        parentElement === null || parentElement === void 0 ? void 0 : parentElement.appendChild(tempP);
    });
    return template;
};
var registerUser = function () {
    var userForm = createElement("form", "chatbot-user-info");
    var userName = createElement("input", "user-inputs");
    userName.type = "text";
    userName.placeholder = "Enter your name";
    userForm.append(userName);
    var userEmail = createElement("input", "user-inputs");
    userEmail.type = "email";
    userEmail.placeholder = "Enter your email";
    userForm.append(userEmail);
    var userNumber = createElement("input", "user-inputs");
    userNumber.type = "number";
    userNumber.placeholder = "Enter your mobile number";
    userForm.append(userNumber);
    var userInfoSubmit = createElement("button", "user-info-submit");
    userInfoSubmit.type = "submit";
    userInfoSubmit.textContent = "SUBMIT";
    userForm.append(userInfoSubmit);
    console.log(userForm);
};
