import "./dashboard.css";
import DiagramLanguage from "../../Lang/DiagramLang";
import React, { useState, useEffect } from "react";
import {
  Flowchart,
  FormWrapper,
  EdgeService,
  // GroupService,
  CanvasService,
  EditorPanels,
} from "@ant-design/flowchart";

const PREFIX = "flowchart-editor";
const {
  InputFiled,
  ColorPicker,
  Position,
  InputNumberFiled,
  Size,
  SelectField,
} = EditorPanels;

const NodeComponent = (props) => {
  const rs_ = DiagramLanguage().rightSideBar;
  const { config, plugin = {} } = props;
  const { updateNode } = plugin;
  const [nodeConfig, setNodeConfig] = useState({
    ...config,
  });
  const onNodeConfigChange = (key, value) => {
    setNodeConfig({
      ...nodeConfig,
      [key]: value,
    });
    updateNode({
      [key]: value,
    });
  };
  useEffect(() => {
    setNodeConfig({
      ...config,
    });
  }, [config]);
  
  return (
    <div className={`${PREFIX}-panel-body`}>
      <div className={`${PREFIX}-panel-group`}>
        <h5>{rs_.content}</h5>
        <InputFiled
          label={
            nodeConfig.name === "custom-node-image" ? rs_.title : rs_.title
          }
          value={nodeConfig.label}
          onChange={(value) => {
            onNodeConfigChange("label", value);
          }}
        />
      </div>
      <div className={`${PREFIX}-panel-group`} style={{ borderBottom: "none" }}>
        <h5>{rs_.style}</h5>
        <Position
          label={rs_.position}
          x={nodeConfig.x}
          y={nodeConfig.y}
          onChange={(key, value) => {
            onNodeConfigChange(key, value);
          }}
        />
        <Size
          label={rs_.size}
          width={nodeConfig.width}
          height={nodeConfig.height}
          onChange={(key, value) => {
            onNodeConfigChange(key, value);
          }}
        />
        <ColorPicker
          label={rs_.background}
          value={nodeConfig.fill}
          onChange={(value) => {
            onNodeConfigChange("fill", value);
          }}
        />
        <ColorPicker
          label={rs_.border}
          value={nodeConfig.stroke}
          onChange={(value) => {
            onNodeConfigChange("stroke", value);
          }}
        />
        <div className={`${PREFIX}-node-text-style`}>
          <InputNumberFiled
            label={rs_.fontSize}
            value={nodeConfig.fontSize}
            width={10}
            onChange={(value) => {
              onNodeConfigChange("fontSize", value);
            }}
          />
          <ColorPicker
            label={rs_.fontColor}
            value={nodeConfig.fontFill}
            onChange={(value) => {
              onNodeConfigChange("fontFill", value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const NodeService = (props) => {
  return (
    <FormWrapper {...props}>
      {(config, plugin) => (
        <NodeComponent {...props} plugin={plugin} config={config} />
      )}
    </FormWrapper>
  );
};


const GroupComponent = (props) => {
 const rs_ = DiagramLanguage().rightSideBar;
 const { config, plugin = {} } = props;
 const { updateNode } = plugin;
 const [nodeConfig, setNodeConfig] = useState({
   ...config,
 });
 const onNodeConfigChange = (key, value) => {
   setNodeConfig({
     ...nodeConfig,
    [key]: value,
    name :"Enter group name"
   });
   updateNode({
    [key]: value,
    name :"Enter group name"
   });
 };
 useEffect(() => {
   setNodeConfig({
    ...config,
    name :"Enter group name"
   });
 }, [config]);

 
 const [groupInputField, setGroupInputField] = useState("Enter group name")

 return (
   <div className={`${PREFIX}-panel-body`}>
     <div className={`${PREFIX}-panel-group`}>
       <h5>{rs_.content}</h5>
       <InputFiled
         label={
           nodeConfig.name === "custom-group-image" ? rs_.title : rs_.title
         }
         value={nodeConfig.name}
         onChange={(value) => {
          onNodeConfigChange("label", value);
          setGroupInputField(value)
          console.log(value);
         }}
       />
     </div>
     <div className={`${PREFIX}-panel-group`} style={{ borderBottom: "none" }}>
       <h5>{rs_.style}</h5>
       <Position
         label="jello"
         x={nodeConfig.x}
         y={nodeConfig.y}
         onChange={(key, value) => {
           onNodeConfigChange(key, value);
         }}
       />
       <Size
         label={rs_.size}
         width={nodeConfig.width}
         height={nodeConfig.height}
         onChange={(key, value) => {
           onNodeConfigChange(key, value);
         }}
       />
       <ColorPicker
         label={rs_.background}
         value={nodeConfig.fill}
         onChange={(value) => {
           onNodeConfigChange("fill", value);
         }}
       />
       <ColorPicker
         label={rs_.border}
         value={nodeConfig.stroke}
         onChange={(value) => {
           onNodeConfigChange("stroke", value);
         }}
       />
       <div className={`${PREFIX}-node-text-style`}>
         <InputNumberFiled
           label={rs_.fontSize}
           value={nodeConfig.fontSize}
           width={10}
           onChange={(value) => {
             onNodeConfigChange("fontSize", value);
           }}
         />
         <ColorPicker
           label={rs_.fontColor}
           value={nodeConfig.fontFill}
           onChange={(value) => {
             onNodeConfigChange("fontFill", value);
           }}
         />
       </div>
     </div>
   </div>
 );
};

const GroupService = (props) => {
 return (
   <FormWrapper {...props}>
     {(config, plugin) => (
       <GroupComponent {...props} plugin={plugin} config={config} />
     )}
   </FormWrapper>
 );
};


export const controlMapService = (controlMap) => {
  controlMap.set("custom-node-service", NodeService);
  controlMap.set("custom-edge-service", EdgeService);
  controlMap.set("custom-group-service", GroupService);
  controlMap.set("custom-canvas-service", CanvasService);
  return controlMap;
};

const formSchemaService = async (args) => {
  const rs_ = DiagramLanguage().rightSideBar;
  const { targetType } = args;
  const isGroup = args.targetData?.isGroup;
  const groupSchema = {
    tabs: [
      {
        name: rs_.edit + "1",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "edit 1",
                name: "custom-group-service",
                shape: "custom-group-service",
                placeholder: "Group name",
                tooltip: "hello",
              },
            ],
          },
        ],
      },
    ],
  };
  const nodeSchema = {
    tabs: [
      {
        name: rs_.edit + "2",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "edit 2",
                name: "custom-node-service",
                shape: "custom-node-service",
                placeholder: "Edit 2",
              },
            ],
          },
        ],
      },
    ],
  };
  const edgeSchema = {
    tabs: [
      {
        name: rs_.edit + "3",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "edit 3",
                name: "custom-edge-service",
                shape: "custom-edge-service",
                placeholder: "Edit 3",
              },
            ],
          },
        ],
      },
    ],
  };
  if (isGroup) {
    return groupSchema;
  }
  if (targetType === "node") {
    return nodeSchema;
  }
  if (targetType === "edge") {
    return edgeSchema;
  }
  return {
    tabs: [
      {
        name: rs_.setUp + "4",
        groups: [
          {
            name: "groupName",
            controls: [
              {
                label: "edit 4",
                name: "custom-canvas-service",
                shape: "custom-canvas-service",
              },
            ],
          },
        ],
      },
    ],
  };
};

export default function DemoFlowchart() {
  return (
    <div style={{ height: "calc(100% - 64px)" }}>
      <Flowchart
        onSave={(d) => {
          console.log(d);
        }}
        toolbarPanelProps={{
          position: {
            top: 0,
            left: 0,
            right: 0,
          },
        }}
        scaleToolbarPanelProps={{
          layout: "horizontal",
          position: {
            right: 0,
            top: -40,
          },
          style: {
            width: 150,
            height: 39,
            left: "auto",
            background: "transparent",
          },
        }}
        canvasProps={{
          position: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
        nodePanelProps={{
          position: { width: 200, top: 40, bottom: 0, left: 0 },
          registerNode: {
            title: "New tutle",
          },
          showHeader: true,
        }}
        detailPanelProps={{
          position: { width: 400, top: 40, bottom: 0, right: 0 },
          controlMapService,
          formSchemaService,
        }}
        contextMenuPanelProps={{
          style: {
            background: "red",
          },
        }}
      />
    </div>
  );
}
