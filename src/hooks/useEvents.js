import React from 'react'

import { EventsContext } from '@/context'

export const useEvents = () => React.useContext(EventsContext)
