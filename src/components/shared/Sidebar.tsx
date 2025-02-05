import type * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useMainContext } from "@/context/MainContext"
import { NavTabs } from "@/constants/customerConstants"
import type { MainContextType } from "@/types"
import Logo from "./Logo"

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useMainContext() as MainContextType
  const { pathname } = useLocation()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={` inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-white transition-all duration-300 ${isSidebarOpen ? "w-[180px]" : "w-[70px]"
          } lg:block hidden`}
      >
        <div className={`flex  py-4 items-center ${isSidebarOpen ? 'justify-between' : 'justify-center'} border-b  px-3`}>
          <Logo isExpanded={isSidebarOpen} />
          {isSidebarOpen &&
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSidebar}>
              <ChevronLeft className="h-4 w-4" />
            </Button>}
        </div>

        <div className="flex flex-1 mt-4 flex-col gap-4 p-3 ">
          <nav className="flex flex-1 flex-col gap-1">
            {NavTabs.map((tab: any) => (
              <SidebarTab
                key={tab.path}
                path={tab.path}
                label={tab.label}
                icon={tab.icon}
                filledIcon={tab.filledIcon}
                isOpen={isSidebarOpen}
                isActive={pathname.startsWith(tab.path)}
              />
            ))}
          </nav>

            {!isSidebarOpen &&
              <div title="Toggle Sidebar" onClick={toggleSidebar} className="flex items-center absolute bottom-6 w-10  cursor-pointer gap-2 justify-center rounded-lg px-2 py-2 hover:bg-slate-100">

                <ChevronRight className="h-4 w-4" />
              </div>}

            {/* <div className="flex cursor-pointer select-none items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {isSidebarOpen && (
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">User Name</span>
                  <span className="text-xs text-slate-500">user@example.com</span>
                </div>
              )}
            </div> */}
          </div>
      </aside>

      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" className="fixed z-50 bottom-4 right-4 h-12 w-12 rounded-full shadow-lg lg:hidden">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-1 text-white">EP</div>
              <span>EazyPOS</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <nav className="flex flex-1 flex-col gap-1">
              {NavTabs.map((tab: any) => (
                <SidebarTab
                  key={tab.path}
                  path={tab.path}
                  label={tab.label}
                  icon={tab.icon}
                  filledIcon={tab.filledIcon}
                  isOpen={true}
                  isActive={pathname.startsWith(tab.path)}
                />
              ))}
            </nav>
            {/* <div className="mt-auto flex flex-col gap-4">

              <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm font-medium">User Name</span>
                  <span className="text-xs text-slate-500">user@example.com</span>
                </div>
              </div>
            </div> */}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

type SidebarTabProps = {
  path: string
  label: string
  icon: React.ComponentType | string
  filledIcon: React.ComponentType | string
  isOpen: boolean
  isActive: boolean
}

function SidebarTab({ path,  label, icon: Icon, filledIcon: FilledIcon, isOpen, isActive }: SidebarTabProps) {
  const navigate = useNavigate()

  const renderIcon = (IconComponent: React.ComponentType | string) => {
    if (typeof IconComponent === "string") {
      return <img src={IconComponent || "/placeholder.svg"} alt="" className="h-4 w-4" />
    }

    const Component = IconComponent as any
    return <Component className={`h-4 w-4 ${isActive ? "text-blue-1" : "text-slate-600"}`} />
  }

  return (
    <button
      onClick={() =>  navigate(path) }
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${isActive
        ? "bg-blue-50 text-blue-600 hover:bg-blue-50/80"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
    >
      {renderIcon(isActive ? FilledIcon : Icon)}
      {isOpen && <span>{label}</span>}
    </button>
  )
}

