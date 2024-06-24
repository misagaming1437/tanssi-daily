import { logging, provideClick, waitMiliSeconds } from "./utils"

export async function isAuthX() {
  const isAuth = await chrome.runtime.sendMessage({ message: "getAuth" })
  if (isAuth === true) return true

  await waitMiliSeconds(5000)
  //   const button = document.querySelector(".bg-primary")
  const button = document.getElementById("headlessui-popover-button-:rb:")
  if (button != null) chrome.runtime.sendMessage({ message: "setAuth" })
  logging({ buttonAuthX: button })
  return button != null
}

export async function authorizeX() {
  await waitMiliSeconds(5000)
  const button = document.querySelector('[data-testid="OAuth_Consent_Button"]')
  logging({ button })
  provideClick(button)
  await waitMiliSeconds(10000)
  chrome.runtime.sendMessage({
    message: "reOpenCurrentTask",
    duration: 5000
  })
  //   await chrome.runtime.sendMessage({
  //     message: "openNewTab",
  //     href: href,
  //     duration: 5000
  //   })
}
export async function loginX() {
  const buttonLogin = document.querySelector(".bg-primary")
  provideClick(buttonLogin)
}
