import { Task, TaskType } from "./models"

class Setting {
  private static instance: Setting
  private constructor() {}
  public static getInstance(): Setting {
    if (!this.instance) {
      this.instance = new Setting()
    }

    return this.instance
  }
  private _currentIndexTask = 0
  private _typeTask = TaskType.NONE
  private _isStart = false
  private _currentTabId = 0
  private _currentTask: Task | null = null
  get currentTask(): Task | null {
    return this._currentTask
  }
  get currentIndexTask(): number {
    return this._currentIndexTask
  }
  get isStart(): boolean {
    return this._isStart
  }
  get taskType(): TaskType {
    return this._typeTask
  }
  get currentTabId(): number {
    return this._currentTabId
  }
  setCurrentTask(value: Task) {
    this._currentTask = value
  }
  setCurrentIndexTask(value: number) {
    this._currentIndexTask = value
  }
  start(value: boolean) {
    this._isStart = value
  }
  setCurrentTabId(value: number) {
    this._currentTabId = value
  }
  setTaskType(value: TaskType) {
    this._typeTask = value
  }
  public next = () => {
    chrome.runtime.sendMessage({ message: "nextTask" })
  }
  public waitMiliSeconds = (duration: number) =>
    new Promise((resolve) => setTimeout(resolve, duration))

  public closeCurrentTab = async (tabId: number) => {
    await chrome.runtime.sendMessage({
      message: "closeCurrentTab",
      tabId: tabId
    })
  }
}
const setting = Setting.getInstance()
export default setting
