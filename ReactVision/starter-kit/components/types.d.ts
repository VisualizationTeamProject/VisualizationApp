import { ButtonProps } from "@ui-kitten/components";

export type objectModel = {
  name: string;
  filename: string;
  asset: SVG
};

export interface AppMenuProps {
  menuState: boolean;
  switchMenu: () => void;
  switchRotation: (boolean) => void;
}

export interface ProductProps extends AppMenuProps {
  selectedGlobalModel: objectModel | undefined;
  handleObjectChange: (objectModel) => void;
  switchRotation: null;
}
