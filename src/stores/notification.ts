import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: number;
  type: NotificationType;
  message: string;
  timeout?: number;
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([])
  let nextId = 0

  function addNotification(notification: Omit<Notification, 'id'>) {
    const id = nextId++
    const newNotification = { ...notification, id }
    notifications.value.push(newNotification)
    setTimeout(() => removeNotification(id), notification.timeout || 4000)
    return id
  }

  function removeNotification(id: number) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  function success(message: string) {
    return addNotification({ type: 'success', message })
  }

  function error(message: string) {
    return addNotification({ type: 'error', message })
  }

  function info(message: string) {
    return addNotification({ type: 'info', message })
  }

  function warning(message: string) {
    return addNotification({ type: 'warning', message })
  }

  return { notifications, addNotification, removeNotification, success, error, info, warning }
})
