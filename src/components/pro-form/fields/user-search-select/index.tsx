import { searchUsers } from "@/services/user";
import { ProFormSelect, ProFormSelectProps } from "@ant-design/pro-components";
import { FC, useEffect, useMemo, useState } from "react";
import { isArray, isObject } from "lodash";

interface User {
  _id: string;
  username: string;
  email: string;
}

export interface UserSearchSelectProps extends ProFormSelectProps {
  value?: (number | string | User)[] | number | string | User;
}

const UserSearchSelect: FC<UserSearchSelectProps> = (props) => {
  const { fieldProps, value, ...rest } = props;

  const [init, setInit] = useState(false);

  const initialOptions = useMemo(() => {
    if (isObject(value) && !isArray(value) && value?._id) {
      return [value];
    }
    if (isArray(value) && value.length > 0 && value.every((i) => isObject(i))) {
      return value;
    }
    return undefined;
  }, [value]);

  const initialValues = useMemo(() => {
    if (isObject(value) && !isArray(value) && value?._id) {
      setInit(true);
      return value?._id;
    }
    if (isArray(value) && value.length > 0 && value.every((i) => isObject(i))) {
      setInit(true);
      return value.map((i) => i._id);
    }
    if (value === "") {
      return undefined;
    }
    return undefined;
  }, [value]);

  useEffect(() => {
    if (init && initialValues) {
      props?.onChange?.(initialValues);
    }
  }, [initialValues, init]);

  return (
    <ProFormSelect
      request={searchUsers}
      debounceTime={800}
      fieldProps={{
        showSearch: true,
        popupMatchSelectWidth: false,
        placeholder: "请输入姓名、账号或邮箱搜索用户",
        fieldNames: {
          label: "username",
          value: "_id",
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
        value: initialValues,
        options: initialOptions,
        ...fieldProps,
      }}
      {...rest}
    />
  );
};

export default UserSearchSelect;
