import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";

const ArbitraryJavascript = (props) => {
  const [executionResults, setExecutionResults] = useState("");
  const {
    trigger,
    script,
    onNumberResults,
    onStringResults,
    onError,
    editor,
    styles,
  } = props;
  const execute = () => {
    try {
      const results = new Function(script);
      Promise.resolve(results())
        .then((result) => {
          if (onNumberResults) {
            onNumberResults(+result);
						setExecutionResults(+result);
          }
					debugger
					if (typeof result === "string" || result instanceof String) {
						if (onStringResults) { onStringResults(result); }
						setExecutionResults(result);
					} else {
						if (onStringResults) { onStringResults(JSON.stringify(result)); }
						setExecutionResults(JSON.stringify(result));
					}
        })
        .catch((error) => {
          if (onError) {
            onError(JSON.stringify(error));
          }
          setExecutionResults(JSON.stringify(error));
        });
    } catch (functionError) {
      if (editor) {
        if (onError) {
          onError("There is an error in your function");
        }
				if (typeof result === "string" || result instanceof String) {
					setExecutionResults(result);
				} else {
					setExecutionResults(JSON.stringify(result));
				}
      }
    }
  };

  useEffect(() => {
    if (trigger === "true" && !editor) {
      execute();
    }
  }, [trigger, editor]);

  return (
    <View>
      <Text
        style={{
          color: styles.script?.color,
          fontFamily: styles.script?.fontFamily,
          fontSize: styles.script?.fontSize,
          fontWeight: styles.script?.fontWeight,
          textAlign: styles.script?.textAlign,
        }}
      >
        {`${executionResults}`}
      </Text>
    </View>
  );
};

export default ArbitraryJavascript;
