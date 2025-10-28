export type UserData = {
    username: string
}

export const userService = {
    get(): UserData | null {
        try {
            const stored = localStorage.getItem('user')
            return stored ? JSON.parse(stored) as UserData : null
        } catch {
            return null
        }
    },
    save(user: UserData | null): void {
        try {
            if (user === null) localStorage.removeItem('user')
            else localStorage.setItem('user', JSON.stringify(user))
        } catch { /* opzionale log */ }
    }
}