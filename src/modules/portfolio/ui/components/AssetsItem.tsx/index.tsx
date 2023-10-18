import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { FC, FormEvent, useState } from "react";
import {
  EAssetsType,
  IAssetsItem,
  IAssetsItemValues,
} from "../../../store/interfaces";

import { AssetsParam } from "../AssetsParam";
import { EditButton } from "../../../../../shared/components/EditButton";
import { AddItemButton } from "../../../../../shared/components/AddItemButton";
import { DARK1, SUN2 } from "../../../../../app/themes/colors";
import { Formik } from "formik";
import { assetsFormSchema } from "../../validationSchemas";
import useStore from "../../../../../shared/hooks/useStore";
import { createPortal } from "react-dom";
import { useDialog } from "../../../../../shared/components/Dialog/hooks";
import { AddAssetDialogPayload } from "../../dialogs/AddAssetDialog/interfaces";
import { AssetsReadonlyParam } from "../AssetsReadonlyParam";

/*
  type: EAssetsType;
  name: string;
  valueInPortfolio: number;
  factualShare: number;
  targetShare: number;
  paymentPerMonth?: number;
  parent?: string;
*/

interface IProps extends IAssetsItem {
  children?: IProps[];
}

export const AssetsItem: FC<IProps> = ({
  type,
  name,
  valueInPortfolio,
  factualShare,
  targetShare,
  paymentPerMonth = 0,
  children,
}) => {
  const { portfolioStore } = useStore();
  const { updateAsset } = portfolioStore;

  const isAssets: boolean = type === EAssetsType.ASSETS;
  const theme = useTheme();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dialog = useDialog();

  const dialogPayload: AddAssetDialogPayload = {
    parentName: name,
  };

  const handleAddCategory = () => {
    dialog.setState("addAsset", dialogPayload);
  };
  const handleEdit = () => setIsEdit(!isEdit);

  const handleSubmit = (values: IAssetsItemValues) => {
    updateAsset(values);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setIsEdit(false);
  };

  const assetsItemInitialValues: IAssetsItemValues = {
    name,
    valueInPortfolio,
    targetShare,
  };

  const assetsItemHeader = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: isAssets ? 0 : "10px",
    marginRight: isAssets ? "10px" : 0,
  };

  const assetsItemHeaderName = {
    width: "150px",
    "& > p": {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
  };

  const assetsItemBody = {
    display: isAssets ? "flex" : "block",
    "& > div:not(:last-child)": {
      marginBottom: isAssets ? 0 : "10px",
      marginRight: isAssets ? "10px" : 0,
    },
  };

  const boxForRenderButton = document.getElementById(
    `buttonsContainer-${name}`
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          display: isAssets ? "flex" : "block",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: isAssets ? "400px" : "230px",
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "10px",
          padding: "16px",
          marginRight: isAssets ? 0 : "10px",
          border: `1px solid ${isEdit ? SUN2 : DARK1}`,
        }}
      >
        <Box sx={assetsItemHeader}>
          <Box sx={assetsItemHeaderName}>
            <Typography variant="h6">{name}</Typography>
          </Box>

          {!isAssets && (
            <Box sx={{ display: "flex" }}>
              <Box id={`buttonsContainer-${name}`}></Box>
              {!isEdit && (
                <AddItemButton
                  onClick={handleAddCategory}
                  tooltipText="Добавить категорию / актив"
                />
              )}
            </Box>
          )}
        </Box>

        <Formik
          onSubmit={handleSubmit}
          initialValues={assetsItemInitialValues}
          validationSchema={assetsFormSchema}
        >
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            touched,
            handleReset,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box sx={assetsItemBody}>
                  <AssetsParam
                    valueName="объем в портфеле"
                    renderValue={valueInPortfolio}
                    inputValue={values.valueInPortfolio}
                    isAssets={isAssets}
                    isEdit={isEdit}
                    inputName="valueInPortfolio"
                    handleChange={handleChange}
                    error={errors.valueInPortfolio}
                  />
                  <AssetsReadonlyParam
                    valueName="доля в портфеле"
                    renderValue={factualShare}
                    isAssets={isAssets}
                    isPercent={true}
                  />
                  <AssetsParam
                    valueName="целевая доля"
                    renderValue={targetShare}
                    inputValue={values.targetShare}
                    isAssets={isAssets}
                    isEdit={isEdit}
                    inputName="targetShare"
                    handleChange={handleChange}
                    error={errors.targetShare}
                    isPercent={true}
                  />
                  {paymentPerMonth !== 0 && (
                    <AssetsReadonlyParam
                      valueName="взнос"
                      renderValue={paymentPerMonth}
                      isAssets={isAssets}
                    />
                  )}
                  {isAssets ? (
                    <EditButton
                      isEdit={isEdit}
                      onClickEdit={handleEdit}
                      onClickSave={handleSubmit}
                      onClickCancel={handleCancel}
                    />
                  ) : (
                    boxForRenderButton &&
                    createPortal(
                      <EditButton
                        isEdit={isEdit}
                        onClickEdit={handleEdit}
                        onClickSave={handleSubmit}
                        onClickCancel={handleCancel}
                      />,
                      boxForRenderButton
                    )
                  )}
                </Box>
              </form>
            );
          }}
        </Formik>
      </Box>
      {children && (
        <Box
          sx={{
            "& > *:not(:last-child)": {
              marginBottom: "10px",
            },
          }}
        >
          {children.map((child) => {
            return <AssetsItem key={child.name} {...child} />;
          })}
        </Box>
      )}
    </Box>
  );
};
