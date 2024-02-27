export const UserTypeMap: {
  [x: number]: {
    label: string;
    color: string;
  };
} = {
  0: {
    label: "管理员",
    color: "red",
  },
  1: {
    label: "用户",
    color: "blue",
  },
};

export const getUserTypeLabel = (type: number) => {
  return UserTypeMap[type]?.label;
};

export const getUserTypeColor = (type: number) => {
  return UserTypeMap[type]?.color;
};

// 0:未验证邮箱 1:正常 2:禁用 用户状态
export const UserStatusMap: {
  [x: number]: {
    label: string;
    color: string;
  };
} = {
  0: {
    label: "未验证邮箱",
    color: "orange",
  },
  1: {
    label: "正常",
    color: "green",
  },
  2: {
    label: "禁用",
    color: "red",
  },
};

export const getUserStatusLabel = (status: number) => {
  return UserStatusMap[status]?.label;
};

export const getUserStatusColor = (status: number) => {
  return UserStatusMap[status]?.color;
};
