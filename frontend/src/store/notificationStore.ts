import { create } from "zustand"

export type Toast = {
  id: number
  message: string
  type: "success" | "error" | "info"
}

type NotificationState = {
  toasts: Toast[]
  addToast: (message: string, type?: Toast["type"]) => void
  removeToast: (id: number) => void
}

let nextId = 0

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],
  addToast: (message, type = "info") => {
    const id = nextId++
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
    }, 3000)
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))
