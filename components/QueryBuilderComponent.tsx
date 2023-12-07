"use client";

import { useState, useCallback, useEffect } from "react";

import type {
  JsonGroup,
  Config,
  ImmutableTree,
  BuilderProps,
} from "@react-awesome-query-builder/antd";
import {
  Query,
  Builder,
  Utils as QbUtils,
} from "@react-awesome-query-builder/antd";
import { AntdConfig } from "@react-awesome-query-builder/antd";
import "@react-awesome-query-builder/antd/css/styles.css";
const InitialConfig = AntdConfig;

// You need to provide your own config. See below 'Config format'
const config: Config = {
  ...InitialConfig,
  fields: {
    qty: {
      label: "Menge",
      type: "number",
      fieldSettings: {
        min: 0,
      },
      valueSources: ["value"],
      preferWidgets: ["number"],
    },
    price: {
      label: "Preis",
      type: "number",
      valueSources: ["value"],
      fieldSettings: {
        min: 10,
        max: 100,
      },
      preferWidgets: ["slider", "rangeslider"],
    },
    name: {
      label: "Name",
      type: "text",
    },
    color: {
      label: "Status",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        listValues: [
          { value: "yellow", title: "Yellow" },
          { value: "green", title: "Green" },
          { value: "orange", title: "Orange" },
        ],
      },
    },
    is_promotion: {
      label: "Promo?",
      type: "boolean",
      operators: ["equal"],
      valueSources: ["value"],
    },
  },
};

// You can load query value from your backend storage (for saving see `Query.onChange()`)
const queryValue: JsonGroup = { id: QbUtils.uuid(), type: "group" };

const DemoQueryBuilder = ({ userId }: { userId: string }) => {
  const [state, setState] = useState({
    tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), config),
    config: config,
  });
  const [status, setStatus] = useState("unsaved");
  const [history, setHistory] = useState([]);

  const onChange = useCallback(
    async (immutableTree: ImmutableTree, config: Config) => {
      setStatus("saving...");

      // Tip: for better performance you can apply `throttle` - see `examples/demo`
      setState((prevState) => ({
        ...prevState,
        tree: immutableTree,
        config: config,
      }));

      const jsonTree = QbUtils.getTree(immutableTree);

      // `jsonTree` can be saved to backend, and later loaded to `queryValue`

      // try {
      //   const response = await fetch("/api/calculation", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       jsonTree,
      //       userId,
      //     }),
      //   });

      //   if (!response.ok) throw new Error("Network response was not ok.");
      //   setStatus("saved");
      // } catch (error) {
      //   console.error("Failed to save jsonTree:", error);
      //   setStatus("error");
      // }
    },
    []
  );

  useEffect(() => {
    if (status === "saving...") {
      // 2 seconds delay
      const timer = setTimeout(() => {
        setStatus("saved");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const renderBuilder = useCallback(
    (props: BuilderProps) => (
      <div className="query-builder-container">
        <div className="query-builder qb-lite" style={{ margin: "1rem 0" }}>
          <Builder {...props} />
        </div>
      </div>
    ),
    []
  );

  return (
    <div className="px-8">
      <div className="mt-8 flex justify-end pr-2">Status: {status}</div>
      <Query
        {...config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />
      <div className="query-builder-result overflow-scroll">
        <div className=" max-w-md">
          JsonLogic:
          <p>
            {JSON.stringify(QbUtils.jsonLogicFormat(state.tree, state.config))}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DemoQueryBuilder;
