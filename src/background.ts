import { homePage } from "~components/consts"
import { tasksData } from "~components/data"
import { TaskType, type Request, type Task } from "~components/models"
import { waitMiliSeconds } from "~components/utils"

let task: Task
let currentTabId = 0
let isRunning = false
let index = -1
let isCheckIn = false
let checkInList: string[] = []
let auth = false
let tasks: Task[] = []
let accept_task_types: TaskType[] = []
chrome.runtime.onMessage.addListener(
  async (request: Request, sender, sendResponse) => {
    switch (request.message) {
      case "login": {
        isRunning = true
        accept_task_types = request.accept_tasks ?? []
        console.log("task accepts", accept_task_types)
        openNewTab(homePage)
        break
      }
      case "getRunning": {
        sendResponse(isRunning)
        break
      }

      case "getAuth": {
        sendResponse(auth)
        break
      }
      case "logging": {
        console.log("logging", request.content)
        break
      }

      case "isCheckIn": {
        sendResponse(isCheckIn)
        break
      }
      case "getTask": {
        sendResponse(task)
        break
      }
      case "getCurrentTabId": {
        sendResponse(currentTabId)
        break
      }
      case "updateHref": {
        console.log("updateHref", request.href)
        await waitMiliSeconds(request.duration ?? 0)
        chrome.tabs.update({ url: request.href })
        break
      }
      case "reOpenCurrentTask": {
        console.log("updateHref", task.url)
        await waitMiliSeconds(request.duration ?? 0)
        chrome.tabs.update({ url: task.url })
        break
      }
      case "openNewTab": {
        console.log("openNewTab", request.href)
        await waitMiliSeconds(request.duration ?? 0)
        chrome.tabs.create({ url: request.href! }, (tab) => {
          currentTabId = tab.id
        })
        break
      }
      case "closeTab": {
        await closeTab(currentTabId)
        break
      }
      case "start": {
        console.log("start all tasks")
        tasks = [...tasksData]
        auth = true
        index = 0
        await run(0)
        break
      }
      case "next": {
        console.log("next")
        await run(index)
        sendResponse({ message: "ok" })
        break
      }
      case "stop": {
        isRunning = false
        index = -1
        currentTabId = 0
        task = null
        isCheckIn = false
        auth = false
        break
      }
      case "startCheckIn": {
        isCheckIn = true
        checkInList = request.checkInList ?? checkInList
        console.log("startCheckIn", checkInList)
        await startCheckIn()
        break
      }
      case "stopCheckIn": {
        isCheckIn = false
        break
      }
      default: {
        break
      }
    }

    return true
  }
)
/**
 *
 *                              run Task
 */
async function run(i: number) {
  await closeTab(currentTabId)
  if (i < tasks.length) {
    task = tasks[i]

    if (
      //
      accept_task_types.includes(task.type)
      //   task.type === TaskType.SHARE_SOCIALS || //
      //   task.type === TaskType.VERIFY_WALLET ||
      //   task.type === TaskType.VERIFY_ACTION ||
      //   task.type === TaskType.FEEBACK ||
      //   task.type === TaskType.CHECK_IN ||
      //   task.type === TaskType.VISIT
      /**
       *
       */
      // || task.type === TaskType.ACTIVITY_TELEGRAM
      // || task.type === TaskType.UPLOAD_JPG
      // || task.type === TaskType.LIKE_RT_X
      // || task.type === TaskType.COMPLETE_THIS_TASK

      //
    ) {
      chrome.tabs.create({ url: tasks[i].url }, (tab) => {
        currentTabId = tab.id
        console.log("open tab id", currentTabId)
      })
      index++
    } else {
      await run(index++)
    }
  }
}
/****
 *
 */
function openNewTab(href: string) {
  chrome.tabs.create({ url: href }, (tab) => {
    currentTabId = tab.id
  })
}
async function closeTab(id: number) {
  try {
    await waitMiliSeconds(200)
    //   await chrome.tabs.remove(request.tabId)

    await chrome.tabs.remove(id)
  } catch (error) {
    console.log("error close tab", error)
  }
}
async function startCheckIn() {
  if (checkInList.length > 0) {
    await closeTab(currentTabId)
    openNewTab(checkInList[0])
    checkInList.shift()
  } else {
    isCheckIn = false
    run(index)
  }
}
