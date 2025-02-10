import { searchUsers } from "@/services/user";
import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { FC } from "react";

export interface UserSearchSelectProps extends ProFormSelectProps {}

const UserSearchSelect: FC<UserSearchSelectProps> = (props) => {
  const { fieldProps, ...rest } = props;

  return (
    <ProFormSelect
      request={searchUsers}
      debounceTime={800}
      showSearch
      fieldProps={{
        popupMatchSelectWidth: false,
        placeholder: "请输入姓名、账号或邮箱搜索用户",
        fieldNames: {
          label: "username",
          value: "id",
        },
        optionRender: (option) => {
          const user = option.data;
          return (
            <div>
              <div>用户名: {user.username}</div>
              <div>邮箱: {user.email}</div>
            </div>
          );
        },
        filterOption: (input, option) =>
          option?.username?.indexOf(input) > -1 ||
          option?.email?.indexOf(input) > -1,
        ...fieldProps,
      }}
      {...rest}
    />
  );
};

export default UserSearchSelect;
