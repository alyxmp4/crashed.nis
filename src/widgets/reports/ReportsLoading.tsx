import React from 'react'
import { Spinner } from '@phosphor-icons/react'

const ReportsLoading = () => {
  return (
    <div className="h-[43.5rem] w-full">
      <div className="relative top-1/2 mx-auto h-fit w-fit -translate-y-1/2 transform">
        <Spinner
          size={28}
          className="animate-spin-slow text-muted-foreground"
        />
      </div>
    </div>
  )
}

export default ReportsLoading
