export enum TaskType {
  NONE,
  VISIT = "VISIT PAGE",
  FAUCET = "FAUCET", //The Task is Locked> Use this Account > Im not robot > Claim button
  VERIFY_WALLET = "VERIFY WALLET", // verify wallet button type submid
  LIKE_RT_X = "LIKE RT X",
  FEEBACK = "FEEBACK",
  VERIFY_ACTION = "VERIFY ACTION",
  ACTIVITY_TELEGRAM = "ACTIVITY TELEGRAM",
  SHARE_SOCIALS = "SHARE SOCIALS",
  UPLOAD_JPG = "UPLOAD JPG",
  CHECK_IN = "CHECK IN",
  COMPLETE_THIS_TASK = "COMPLETE THIS TASK"
}
export class Task {
  url: string
  match?: string
  type: TaskType
}
export class Request {
  message: string
  checkInList: string[]
  tabId?: number
  content?: any
  href?: string
  duration?: number
  accept_tasks?: TaskType[]
}
