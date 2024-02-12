function resolveTagColor(status = 'pending') {
  if (status === 'pending') {
    return 'default'
  } else if (status === 'approved') {
    return 'green'
  } else {
    return 'red'
  }
}

export {
  resolveTagColor,
}