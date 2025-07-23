export function useCurrentUser() {
  const event = useEvent()

  return event.context.currentUser
}
