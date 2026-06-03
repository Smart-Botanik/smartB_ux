import { useState } from "react";
import { Typography } from "antd";

import { UxSemanticFieldController } from "./UxSemanticFieldController";
import type { UxSemanticFieldControllerProps } from "./types";

const { Text } = Typography;

export function SemanticFieldStoryPlayground(props: UxSemanticFieldControllerProps) {
  const [value, setValue] = useState<number | null>(props.value ?? null);
  const [unitValue, setUnitValue] = useState<string | null>(props.unitValue ?? null);

  return (
    <div style={{ maxWidth: 420 }}>
      <UxSemanticFieldController
        {...props}
        value={value}
        unitValue={unitValue}
        onChange={next => {
          setValue(next.value ?? null);
          setUnitValue(next.unit ?? null);
        }}
      />
      <Text type="secondary" style={{ display: "block", marginTop: 12, fontSize: 12 }}>
        state: value={value ?? "null"}, unit={unitValue ?? "null"}
      </Text>
    </div>
  );
}
