export function hideSidebarOn() {
    const sidebar = document.getElementById('side')
    if (sidebar) {
        sidebar.classList.add("sidebar-hide")
    }
    const main = document.getElementById('main')
    if (main) {
        main.classList.add("main-sidebar-hide")
    }
}

export function hideSidebarOff() {
    const sidebar = document.getElementById('side')
    if (sidebar) {
        sidebar.classList.remove("sidebar-hide")
    }
    const main = document.getElementById('main')
    if (main) {
        main.classList.remove("main-sidebar-hide")
    }
}