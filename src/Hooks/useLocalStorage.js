import { useEffect, useState } from 'react'

const getSavedValue = (key, initialValue) => {
	const savedValue = JSON.parse(localStorage.getItem(key))
	if (savedValue) return savedValue

	if (initialValue instanceof Function) return initialValue()
	return initialValue
}

export const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(() =>
		getSavedValue(key, initialValue)
	)

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

	return [value, setValue]
}
