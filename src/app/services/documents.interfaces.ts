export interface ObjClassIcon {
  t: string;
  label: string;
  tooltip: string;
  italic: boolean;
  uri: string;
  overlayUri: string;
}

export interface ObjBehavior {
  t: string;
  objId: number;
  activityId: number;
  methodId: number;
  parentId: number;
  methodName: string;
  parameters: {},
  presentation: {
    t: string;
    label: string;
    tooltip: string;
    italic: boolean;
    uri: string;
    overlayUri: string;
  },
  shortcut: string;
  reference: string;
  target: string;
  tempParamkeyObjlistViewed: string;
  tempParamkeyObjlistSelected: string;
}

export interface UserDocument {

  objId: number
  parentId: number;
  objName: string;
  objclass: {
    objclassId: number;
    type: string;
  };
  italic: boolean;
  type: string;
  sortLevel: number;
  classification: number;
  behaviors: ObjBehavior[];
  statusInfo: {
    label: string;
    color: string;
    tooltip: string;
    type: string;
  };
  objClassIcon: ObjClassIcon;
  attrValues: string[];
  onDoubleClick: any;
  onRightClick: any;
  onShortcut: any;
  onDragAndDrop: any;
  onRefreshObj: any;
  onPreview: any;
  tooltip: string;
  internalValue: string;
  displayValue: string;
  hasCheckbox: boolean;
  displayFormat: string;
}

export interface DocumentList {
  items: UserDocument[];
}
