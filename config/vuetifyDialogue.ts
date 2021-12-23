export const vuetifyDialogue = {
  actions: {
    false: {
      text: '$dialog.cancel',
      color: 'warning',
      flat: true,
      elevation: 0,
    },
  },
  warning: {
    waitForResult: false,
    title: '$dialog.warning.title',
    color: 'primary',
    actions: {
      true: {
        text: '$dialog.ok',
        color: 'white',
        elevation: 0,
      },
    },
  },
  confirm: {
    waitForResult: false,
    title: '$dialog.confirm.title',
    actions: {
      true: {
        text: '$dialog.ok',
        elevation: 0,
      },
    },
  },
}
