const language = "eng";

export default function DiagramLanguage() {
  const eng = {
    topRightTool: {
      minScreen: "Minimize screen",
      fullScreen: "Full screen",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      scale: "Scale",
      center: "Center",
   },
   topLeftTool: {
    redo: "Redo",
    undo: "Undo",
    frontNode: "Bring front",
    backNode: "Bring back",
    multipleSelect: "Multiple select",
    addGroup: "Add group",
    deleteGroup: "Delete group",
    copy: "Copy",
    paste: "Paste",
    save: "Save",
   },
   rightSideBar: {
    setUp: "Set up",
    edit: "Edit",
    content: "Content",
    title: "Title",
    style: "Style",
    position: "Position",
    shapeSize: "Shape size",
    background: "Background",
    border: "Border",
    fontColor: "Font color",
    fontSize: "Font size",
   }
  };
  const ru = {
    topRightTool: {
      minScreen: "Minimize screen",
      fullScreen: "Full screen",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
  };
  const uz = {
    topRightTool: {
      minScreen: "Minimize screen",
      fullScreen: "Full screen",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
    },
  };

  if (language === "eng") {
    return eng;
  }
  if (language === "ru") {
    return ru;
  }
  if (language === "uz") {
    return uz;
  }
  return eng;
}
