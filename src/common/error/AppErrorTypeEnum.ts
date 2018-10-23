export const enum AppErrorTypeEnum {
  // 用户未找到
  USER_NOT_FOUND,
  // 用户已存在
  USER_EXISTS,
  // 不在Session中
  NOT_IN_SESSION,
  // 用户不存在
  NO_USERS_IN_DB,
  // 密码错误
  WRONG_PASSWORD,
  // 邮箱或密码错误
  WRONG_EMAIL_OR_PASSWORD,
  // 验证失败
  VALIDATION_FAILED,
  // jwt token错误
  TOKEN_INVALID,
}
