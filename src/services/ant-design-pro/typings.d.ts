// @ts-ignore
/* eslint-disable */

declare namespace API {
  /**
   * 通用返回类型
   */
  type BaseResponse<T> = {
    code: number;
    message: string;
    description: string;
    data: T;
  };

  type CurrentUser = {
    id?: number;
    userId: string;
    username: string;
    userAcount: string;
    avatarUrl?: string;
    gender: number;
    phone: string;
    email: string;
    userStauts: number;
    userRole: number;
    createTime: Date;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type DeleteResult = boolean;

  type DeleteId = number;

  type EditParams = {
    username?: string;
    userAcount?: string;
    avatarUrl?: string;
    gender?: number;
    phone?: string;
    email?: string;
    userStauts?: number;
    userRole?: number;
    createTime?: Date;
  }

  type EditResult = boolean;

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type RegisterParams = {
    usrId?: string;
    userAccount?: string;
    userPassword?: string;
    checkPassword?: string;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
