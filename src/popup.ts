import { TaskType } from "~components/models"

let visit = true
let verify_wallet = true
let feedback = true
let verify_action = true
let activity_telegram = true
let share_socials = true
let checkin = true
let complete_this_task = true
let LIKE_RT_X = true
interface Checkbox {
  checked: boolean
}
document.getElementById("myButtonStart").addEventListener("click", function () {
  console.log("start")
  chrome.runtime.sendMessage({
    message: "login",
    accept_tasks: getChecks()
  })
})
document.getElementById("myButtonStop").addEventListener("click", function () {
  chrome.runtime.sendMessage({
    message: "stop"
  })
})
const unCheck = document.getElementById("uncheck_all") as HTMLInputElement
unCheck.addEventListener("change", function () {
  ;(document.getElementById("visit") as HTMLInputElement).checked = false
  ;(document.getElementById("verify_wallet") as HTMLInputElement).checked =
    false
  ;(document.getElementById("feedback") as HTMLInputElement).checked = false
  ;(document.getElementById("verify_action") as HTMLInputElement).checked =
    false
  ;(document.getElementById("activity_telegram") as HTMLInputElement).checked =
    false
  ;(document.getElementById("share_socials") as HTMLInputElement).checked =
    false
  ;(document.getElementById("checkin") as HTMLInputElement).checked = false
  ;(document.getElementById("complete_this_task") as HTMLInputElement).checked =
    false
  ;(document.getElementById("LIKE_RT_X") as HTMLInputElement).checked = false

  //   visit = unCheck.checked
  //   verify_wallet = this.checked
  //   feedback = unCheck.checked
  //   verify_action = unCheck.checked
  //   activity_telegram = unCheck.checked
  //   share_socials = unCheck.checked
  //   checkin = unCheck.checked
  //   complete_this_task = unCheck.checked
})

function getChecks() {
  visit = (document.getElementById("visit") as HTMLInputElement).checked
  verify_wallet = (document.getElementById("verify_wallet") as HTMLInputElement)
    .checked
  feedback = (document.getElementById("feedback") as HTMLInputElement).checked
  verify_action = (document.getElementById("verify_action") as HTMLInputElement)
    .checked
  activity_telegram = (
    document.getElementById("activity_telegram") as HTMLInputElement
  ).checked
  share_socials = (document.getElementById("share_socials") as HTMLInputElement)
    .checked
  checkin = (document.getElementById("checkin") as HTMLInputElement).checked
  complete_this_task = (
    document.getElementById("complete_this_task") as HTMLInputElement
  ).checked
  LIKE_RT_X = (document.getElementById("LIKE_RT_X") as HTMLInputElement).checked
  const accept_tasks = []
  if (visit) accept_tasks.push(TaskType.VISIT)
  if (verify_wallet) accept_tasks.push(TaskType.VERIFY_WALLET)
  if (feedback) accept_tasks.push(TaskType.FEEBACK)
  if (verify_action) accept_tasks.push(TaskType.VERIFY_ACTION)
  if (activity_telegram) accept_tasks.push(TaskType.ACTIVITY_TELEGRAM)
  if (share_socials) accept_tasks.push(TaskType.SHARE_SOCIALS)
  if (checkin) accept_tasks.push(TaskType.CHECK_IN)
  if (complete_this_task) accept_tasks.push(TaskType.COMPLETE_THIS_TASK)
  if (LIKE_RT_X) accept_tasks.push(TaskType.LIKE_RT_X)
  return accept_tasks
}
