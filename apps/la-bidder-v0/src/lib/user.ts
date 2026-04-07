export function getUserId(): string {
  if (typeof window === 'undefined') return ''; // Safety for SSR

  const storageKey = 'la-bidder-user-id';
  let userId = localStorage.getItem(storageKey);

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(storageKey, userId);
  }

  return userId;
}
