import { InfoCircleOutlined } from "@ant-design/icons";
import {
  Button,
  ButtonProps,
  DropDownProps,
  Dropdown,
  Tooltip,
  TooltipProps,
} from "antd";
import { FC } from "react";

export interface OperationButtonProps extends ButtonProps {
  tooltip?: TooltipProps;
  dropdown?: DropDownProps;
  // 是否显示，Operation 处控制，此处声明参数实际无用，与 auth 作用不同，只有 auth 通过才会触发 show 判断
  show?: boolean;
  title?: string;
  // 权限控制，Operation 处控制，此处声明参数实际无用
  auth?: boolean | string | string[];
}

const OperationButton: FC<OperationButtonProps> = (props) => {
  const { tooltip, dropdown, children, title, ...rest } = props;

  const b = (
    <Button type="link" size="small" {...rest}>
      {title ?? children}
    </Button>
  );

  return (
    <>
      {dropdown ? <Dropdown {...dropdown}>{b}</Dropdown> : b}
      {tooltip?.title && (
        <Tooltip {...tooltip}>
          <InfoCircleOutlined className="cursor-pointer" />
        </Tooltip>
      )}
    </>
  );
};

export default OperationButton;
