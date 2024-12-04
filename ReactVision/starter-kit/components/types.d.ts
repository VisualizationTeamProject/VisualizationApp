import { ButtonProps } from "@ui-kitten/components";

export type objectModel = {
  name: string;
  filename: string;
  asset: SVG
};

export interface AppMenuProps extends ButtonProps {
  menuState: boolean;
}

export interface ProductProps extends AppMenuProps {
  selectedGlobalModel: objectModel | undefined;
  handleObjectChange: (objectModel) => void;
}
