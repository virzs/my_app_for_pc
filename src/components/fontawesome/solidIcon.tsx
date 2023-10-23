import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { FC } from "react";

export interface SolidIconProps {
  name: IconName;
}

const SolidIcon: FC<SolidIconProps> = (props) => {
  const { name } = props;

  return <FontAwesomeIcon icon={name} />;
};

export default SolidIcon;
