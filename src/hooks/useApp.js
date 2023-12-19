import React from 'react'

import { AppContext } from '@/context'

export const useApp = () => React.useContext(AppContext)
