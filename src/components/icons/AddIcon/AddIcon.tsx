import { IIconProps } from "../index";

const Default = {
  SIZE: 16,
  COLOR: "#000",
};

export const AddIcon = (props: Pick<IIconProps, "size" | "color">) => {
  const { size, color } = props;

  const resultSize = size ?? Default.SIZE;
  const resultColor = color ?? Default.COLOR;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={resultSize}
      height={resultSize}
      fill={resultColor}
      viewBox="0 0 16 16"
    >
      <path d="M16 9.14286H9.14286V16H6.85714V9.14286H0V6.85714H6.85714V0H9.14286V6.85714H16V9.14286Z" />
    </svg>
  );
};
