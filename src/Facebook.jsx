'use client'

import { FacebookProvider, CustomChat } from 'react-facebook';


export default function Facebook() {
  return (
    <div>
      <FacebookProvider appId="3181905575438323" chatSupport>
        <CustomChat pageId="240662435794300" minimized='true' />
      </FacebookProvider>
    </div>
  )
}