import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ArbitraryJavascript = (props) => {
	const [executionResults, setExecutionResults] = useState('')
	const { 
		trigger, 
		script, 
		onNumberResults, 
		onStringResults, 
		onError, 
		editor,
		styles
	} = props
	console.log(props)
	const execute = () => {
		try {
			const results = new Function(script)
			Promise.resolve(results()).then(result => {
				if (onNumberResults) { 
					onNumberResults(JSON.stringify(+result));  }
					if (onStringResults) { 
					onStringResults(JSON.stringify(result));  }
				setExecutionResults(JSON.stringify(result))
			}).catch(error => {
				if (onError) { onError(JSON.stringify(error)); }
				setExecutionResults(JSON.stringify(error))
			})
		} catch(functionError) {
			if (editor) { 
				if (onError) { onError("There is an error in your function"); }
				setExecutionResults(JSON.stringify(result))
			}
		}
	}

	useEffect(() => {
		if (trigger === 'true') {
			execute()
		}
	}, [trigger, editor])
	
	return(
		<View>
			<Text style={{
				color: styles.script?.color,
				fontFamily: styles.script?.fontFamily,
				fontSize: styles.script?.fontSize,
				fontWeight: styles.script?.fontWeight,
				textAlign: styles.script?.textAlign
			}}>{executionResults}</Text>
		</View>
	)
}

export default ArbitraryJavascript
