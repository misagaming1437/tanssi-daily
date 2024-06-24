import { Task, TaskType } from "~components/models"

import { tasksData } from "./data"
import doTask from "./do_task"
import setting from "./setting"

export const runTaks1 = async () => {
  for (const task of tasksData) {
    chrome.runtime.sendMessage({ message: "index", url: task.url })
    if (setting.isStart === false) {
      break
    }
    await tasking(task)
  }
}
const tasking = (task: Task) =>
  new Promise(async (resolve) => {
    setting.setTaskType(task.type)
    switch (task.type) {
      case TaskType.VISIT:
        await doTask.visitPage(document)
        break
      case TaskType.FAUCET:
        break
      case TaskType.VERIFY_WALLET:
        break // button "Use this Account"
      default:
        break
    }
    resolve(null)
  })
