import { Outlet, useLocation, useNavigate } from 'react-router'
import { useAuth } from '@/hooks/auth'
import { useEffect } from 'react'
import Loading from '@/pages/loading'
import Sidebar, { SidebarUserProfile, SidebarNavContainer, SidebarNavLink, SidebarNavGroup } from '@/components/ui/sidebar'
import { Calendar, FolderKanban, Home, NotebookText, SquareKanban, User } from 'lucide-react'
import BottomNavigator, { BottomNavButton } from '@/components/ui/bottom-navbar'

const navigations = [
  {
    label: "Home",
    route: "/app",
    icon: Home
  },
  {
    label: "Kanban",
    route: "/kanban",
    icon: FolderKanban,
    onlyMobile: true
  },
  {
    label: "Notes",
    route: "/notes",
    icon: NotebookText
  },
  {
    label: "Schedule",
    route: "/schedule",
    icon: Calendar
  },
  {
    label: "Profile",
    route: "/profile",
    icon: User,
    onlyMobile: true
  }
]

const boards = [
  {
    name: "Marketing",
  },
  {
    name: "Development",
  },
  {
    name: "Frontend Web Development",
  },
  {
    name: "Daily Task",
  }
]

export default function ProtectedLayout() {
  const location = useLocation()
  const { isLoggedIn, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate('/', { replace: true })
    }
  }, [loading, isLoggedIn, navigate])

  if (loading) {
    return <Loading />
  }

  return <div className="flex grid-cols-2">
    <Sidebar className='hidden sm:block'>
      <SidebarUserProfile />
      <SidebarNavContainer>
        {navigations.map((item) => {
          const Icon = item.icon

          return item.onlyMobile ?? <SidebarNavLink key={item.label} onClick={() => navigate(item.route)} active={location.pathname === item.route}>
            <Icon size={18} className='min-w-4.5'/>
            <span>{item.label}</span>
          </SidebarNavLink>
        })}
        <div className='border-t'/>
        <SidebarNavGroup label='Your Kanban' icon={FolderKanban} className='scrollbar-hidden'>
          {boards.map((item) => {
            return <SidebarNavLink key={item.name} onClick={() => { }} active={location.pathname === item.name}>
              <SquareKanban size={18} className='min-w-4.5'/>
              <span>{item.name}</span>
            </SidebarNavLink>
          })}
        </SidebarNavGroup>
      </SidebarNavContainer>
    </Sidebar>
    <div className='content-wrapper py-3 px-3 sm:px-0 sm:pr-3 w-full max-h-screen overflow-y-auto pb-15 sm:pb-0'>
      <Outlet />
    </div>
    <BottomNavigator className='sm:hidden'>
      {navigations.map((item) => {
        const Icon = item.icon

        return <BottomNavButton key={item.label} active={location.pathname === item.route} onClick={() => navigate(item.route, { replace: true })}>
          <Icon size={20}/>
        </BottomNavButton>
      })}
    </BottomNavigator>
  </div>
}
