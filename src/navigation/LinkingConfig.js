import { DEEP_LINKING_SCHEMA } from '@/constants'

export default {
  prefixes: [`${DEEP_LINKING_SCHEMA}`, 'alleven://'],
  config: {
    screens: {
      TabNavigator: {
        screens: {
          Уведомления: 'notifications',
          Главная: {
            screens: {
              Detail: {
                path: 'eventDetail/:id',
              },
            },
          },
        },
      },
    },
  },
}
