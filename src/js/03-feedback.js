import throttle from 'lodash.throttle';

const feedBackFormRef = document.querySelector('.feedback-form');
const emailRef = feedBackFormRef.elements.email;
const messageRef = feedBackFormRef.elements.message;
const feedBackFormData = {};
const FEEDBACK_FORM_STATE = 'feedback-form-state';

feedBackFormRef.addEventListener('input', throttle(onFormInput, 500));

feedBackFormRef.addEventListener('submit', onFormSubmit);

getLocaleStorageData();

setFeedBackFormData();

function getLocaleStorageData() {
  if (localStorage.getItem(FEEDBACK_FORM_STATE)) {
    const storageData = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));
    emailRef.value = storageData.email;
    messageRef.value = storageData.message;
  }
}

function setFeedBackFormData() {
  feedBackFormData.email = emailRef.value;
  feedBackFormData.message = messageRef.value;
}

function onFormInput(e) {
  feedBackFormData[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(feedBackFormData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (feedBackFormData.email !== '' && feedBackFormData.message !== '') {
    console.log(feedBackFormData);

    e.currentTarget.reset();
    localStorage.removeItem(FEEDBACK_FORM_STATE);
    setFeedBackFormData();
  }
}
