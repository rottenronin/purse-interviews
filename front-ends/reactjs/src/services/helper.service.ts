function uniqueKey() {
  return Math.random().toString(32).slice(2)
}

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
  uniqueKey,
  resolveTagColor,
}