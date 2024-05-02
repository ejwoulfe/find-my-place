export function capitalizeFirstLetter(searchTerm: string) {
  return searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
}
