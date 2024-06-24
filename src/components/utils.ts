export const waitMiliSeconds = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration))
export function provideClick(button: Element | HTMLElement) {
  const event = new Event("click", { bubbles: true })
  button.dispatchEvent(event)
}
export const logging = (message: any) =>
  chrome.runtime.sendMessage({ message: "logging", content: message })

export const findButtonClass = (text: string) => {
  const buttons = document.querySelectorAll("button")
  const specificButton = Array.from(buttons).find((button) =>
    button.classList.contains("modal-clickable-list-item-rounded")
  )

  if (specificButton) {
    specificButton.click()
    // your code to handle the specific button
  } else {
    console.log("Specific button not found.")
  }
  return specificButton
}

export const findButtonSubmid = function () {
  return Array.from(document.getElementsByTagName("button")).find(
    (button) => button.getAttribute("type") === "submit"
  )
}

export const findButtonByTypeAndText = function (text: string) {
  return Array.from(document.querySelectorAll("button")).find((button) =>
    button.textContent.trim().includes(text)
  )
}
