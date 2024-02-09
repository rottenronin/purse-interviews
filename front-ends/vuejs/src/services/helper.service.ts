function resolveTagColor(status = 'pending') {
  if (status === 'pending') {
    return 'default'
  } else if (status === 'approved') {
    return 'success'
  } else {
    return 'error'
  }
}

export {
  resolveTagColor,
}