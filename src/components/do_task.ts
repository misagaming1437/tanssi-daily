import setting from "./setting"
import {
  findButtonByTypeAndText as findButtonByContent,
  findButtonClass,
  findButtonSubmid,
  logging,
  provideClick,
  waitMiliSeconds
} from "./utils"

class DoTask {
  //------------------------------------------------------------------------------- CHECK IN
  public async checkIn() {
    await waitMiliSeconds(3000)
    const button = findButtonByContent("Mark Your daily presence")
    if (button) {
      button.click()
      await waitMiliSeconds(2000)
    }

    chrome.runtime.sendMessage({ message: "startCheckIn" })
  }
  //------------------------------------------------------------------------------- VISIT
  public visitPage = async (document: Document) => {
    await waitMiliSeconds(3000)

    const submidButton = findButtonSubmid()

    if (submidButton) {
      const button = findButtonByContent("Open link in a new tab")
      button.click()
      await waitMiliSeconds(1000)
      submidButton.click()
      await setting.waitMiliSeconds(5000)
    }
  }
  //------------------------------------------------------------------------------- VERIFY WALLET
  public verifyWallet = async () => {
    await waitMiliSeconds(3000)
    const useThisAccount = findButtonByContent("Use this account")
    logging({ useThisAccount: useThisAccount })
    if (useThisAccount) {
      useThisAccount.click()
      await waitMiliSeconds(3000)
    }
    const verifyBtn = findButtonByContent("Verify using")
    if (verifyBtn) {
      logging({ verifyBtn: verifyBtn })
      verifyBtn.click()
      await waitMiliSeconds(3000)
    }

    const submidBtn = findButtonSubmid()
    logging({ submidBtn: submidBtn })
    if (submidBtn) {
      submidBtn.click()
      await waitMiliSeconds(5000)
    } else {
      await waitMiliSeconds(200)
    }
  }
  //------------------------------------------------------------------------------- FEED BACK
  public feedBack = async () => {
    await waitMiliSeconds(3000)
    const txtBox = document.getElementsByTagName(
      "textarea"
    )[1] as HTMLTextAreaElement
    txtBox.value = "i'm feel good!"
    txtBox.focus()
    await waitMiliSeconds(1000)
    const submidBtn = findButtonSubmid()
    if (submidBtn) {
      submidBtn.click()
      await waitMiliSeconds(5000)
    }
  }

  public async faucet() {
    await waitMiliSeconds(2000)
    const useThisAccount = findButtonByContent("Faucet")
    if (useThisAccount) {
      useThisAccount.click()
      await waitMiliSeconds(3000)
    }
    // i 'm not robo
  }

  //--------------------------------------------------------------------------------- SHARE SOCIALS
  public async shareSocials() {
    logging("task share socials")
    await waitMiliSeconds(3000)
    logging("task share socials 2")
    const buttonX: HTMLButtonElement = Array.from(
      document.querySelectorAll("button")
    ).find((btn) => btn.getAttribute("aria-label") == "twitter")

    if (buttonX) {
      provideClick(buttonX)
      buttonX.click()
      await waitMiliSeconds(3000)
    }
    const submidBtn = findButtonSubmid()
    if (submidBtn) {
      submidBtn.click()
      await waitMiliSeconds(5000)
    }
  }
  //--------------------------------------------------------------------------------- VERIFY ACTION
  public async verifyAction() {
    await waitMiliSeconds(3000)
    const verifyBtn = findButtonSubmid()
    if (verifyBtn) {
      verifyBtn.click()
      await waitMiliSeconds(10000)
    }
  }
  /**
   * TODO--------------------------------------------------------------------------- COMPLTE THIS TASK
   */
  public async completeThisTask() {
    await waitMiliSeconds(3000)
    const submidBtn = findButtonSubmid()
    if (submidBtn) {
      submidBtn.click()
      await waitMiliSeconds(5000)
    }
  }
  /**
   * TODO--------------------------------------------------------------------------- Line and Retweet
   */
  public async likeAndRetweetX() {
    await waitMiliSeconds(5000)
    const useThisAccountBtn = findButtonByContent("Use this account")
    if (useThisAccountBtn) {
      useThisAccountBtn.click()
      await waitMiliSeconds(3000)
    }

    const likeBtn = findButtonByContent("Open Twitter to Like")
    if (likeBtn) {
      likeBtn.click()
    }
    const retweetBtn = findButtonByContent("Open Twitter to Retweet")
    if (retweetBtn) {
      retweetBtn.click()
      await waitMiliSeconds(500)
    }
    const submidBtn = findButtonByContent("Verify using")
    if (submidBtn) {
      submidBtn.click()
      await waitMiliSeconds(5000)
    }
  }
}
const doTask = new DoTask()
export const isCheckIn = async () => {
  return await chrome.runtime.sendMessage({ message: "isCheckIn" })
}
export default doTask
