import { Task, TaskType } from "@Components/models"

import { authorizeX, isAuthX, loginX } from "~components/auth"
import { homePage } from "~components/consts"
import doTask from "~components/do_task"

import { logging, waitMiliSeconds } from "./components/utils"

window.addEventListener(
  "load",
  async () => {
    const isRunning = await chrome.runtime.sendMessage({
      message: "getRunning"
    })
    if (!isRunning) return
    const homeUrl = window.location.href
    const auth = await chrome.runtime.sendMessage({ message: "getAuth" })
    if (auth == false) {
      if ((await isAuthX()) == false) {
        if (homeUrl === homePage) {
          logging("login twitter")
          await loginX()
        } else {
          logging("Authorize twitter")
          await authorizeX()
        }
      } else {
        chrome.runtime.sendMessage({ message: "start" })
      }
    } else {
      if (homeUrl === homePage) await sendListCheckIn()
      const task = await chrome.runtime.sendMessage({ message: "getTask" })
      logging("run task")
      await runTaks(task)
    }

    // run task
  }

  // kiểm tra nếu đang ở trang authorize twitter
)
async function runTaks(task: Task) {
  switch (task.type) {
    case TaskType.CHECK_IN: {
      await doTask.checkIn()
      break
    }
    case TaskType.VISIT: {
      console.log("start visit")
      await doTask.visitPage(document)
      break
    }
    case TaskType.VERIFY_WALLET: {
      await doTask.verifyWallet()
      break
    }
    case TaskType.FEEBACK: {
      await doTask.feedBack()
      break
    }
    case TaskType.SHARE_SOCIALS: {
      await doTask.shareSocials()
      break
    }
    case TaskType.VERIFY_ACTION: {
      await doTask.verifyAction()
      break
    }
    case TaskType.ACTIVITY_TELEGRAM: {
      //   await doTask.activityTelegram()
      break
    }
    case TaskType.LIKE_RT_X: {
      await doTask.likeAndRetweetX()
      break
    }
    default: {
      break
    }
  }
  if (task.type !== TaskType.CHECK_IN)
    chrome.runtime.sendMessage({ message: "next" })
}

export async function sendListCheckIn() {
  await waitMiliSeconds(5000)
  const urls = []
  const mainDiv = document.querySelectorAll(".grid")[1]
  const childDivs = mainDiv.children
  for (const childDiv of childDivs) {
    const url = childDiv.querySelector("a").href // Lấy href từ thẻ a bên trong div con
    if (url) {
      urls.push(url)
    }
  }
  logging({ "danh sach checkL": urls })
  chrome.runtime.sendMessage({ message: "startCheckIn", checkInList: urls })
}
