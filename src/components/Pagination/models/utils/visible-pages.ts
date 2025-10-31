export const visiblePages = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range: (number | '...')[] = [];
  let left = currentPage - delta;
  let right = currentPage + delta;

  if (left < 2) left = 2;

  if (right > totalPages - 1) right = totalPages - 1;

  range.push(1);

  if (left > 2) range.push('...');

  for (let i = left; i <= right; i++) {
    range.push(i);
  }

  if (right < totalPages - 1) range.push('...');

  if (totalPages > 1) range.push(totalPages);

  return range;
};
