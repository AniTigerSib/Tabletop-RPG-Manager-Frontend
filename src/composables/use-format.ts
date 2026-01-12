export const useFormat = () => {
  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .join('')
      .substring(0, 2)
  }

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    return new Date(dateString).toLocaleDateString('ru-RU', options)
  }

  return {
    getInitials,
    formatDate,
  }
}
