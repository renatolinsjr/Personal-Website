export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export function getYearsOfExperience(startYear: number = 2018): number {
  const currentYear = getCurrentYear();
  return currentYear - startYear;
}