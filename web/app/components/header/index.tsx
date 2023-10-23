'use client'

import Link from 'next/link'
import AccountDropdown from './account-dropdown'
import AppNav from './app-nav'
import DatasetNav from './dataset-nav'
import EnvNav from './env-nav'
import ExploreNav from './explore-nav'
import PluginNav from './plugin-nav'
import { WorkspaceProvider } from '@/context/workspace-context'
import { useAppContext } from '@/context/app-context'
import LogoSite from '@/app/components/base/logo/logo-site'

const navClassName = `
  flex items-center relative mr-3 px-3 h-8 rounded-xl
  font-medium text-sm
  cursor-pointer
`

const Header = () => {
  const { isCurrentWorkspaceManager } = useAppContext()
  
  return (
    <>
      <div className='flex items-center'>
        <Link href="/apps" className='flex items-center mr-4'>
          <LogoSite />
        </Link>
      </div>
      <div className='flex items-center'>
        <ExploreNav className={navClassName} />
        <AppNav />
        <PluginNav className={navClassName} />
        {isCurrentWorkspaceManager && <DatasetNav />}
      </div>
      <div className='flex items-center flex-shrink-0'>
        <EnvNav />
        <WorkspaceProvider>
          <AccountDropdown />
        </WorkspaceProvider>
      </div>
    </>
  )
}
export default Header
