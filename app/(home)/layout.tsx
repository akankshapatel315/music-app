import SidebarLayout from '@/components/panel/sidebar-layout'
import React from 'react'

const layout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SidebarLayout>{children}</SidebarLayout>
  )
}

export default layout