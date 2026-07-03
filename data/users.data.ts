export const VALID_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
};

export const INVALID_USERS = [
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedError: 'Epic sadface: Sorry, this user has been locked out.',
  },
];
