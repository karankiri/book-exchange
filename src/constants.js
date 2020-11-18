export const RequestNextTimeoutInSeconds = 10;
export const InitialBooksData = [{
  author: 'Paulo Coelho',
  title: 'The Alchemist',
  lender: 'virat',
},
{
  author: 'Yuval Noah Harari',
  title: 'Sapiens',
  lender: 'rohit',
  id: 2
},
{
  author: 'James Clear',
  title: 'Atomic Habits',
  lender: 'ms',
}
]

export const BookActions = {
  borrow: 'BORROW',
  return: 'RETURN',
  requestNext: 'REQUEST_NEXT',
}