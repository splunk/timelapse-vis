import { useEffect, useState } from "react"

export default ({ startTime, endTime, step, frequency }) => {
	/** State hook of current time as a value in milliseconds */
	const [time, setTime] = useState(startTime.valueOf())

	/** State hook representing whether timer is playing or not */
	const [isPlaying, setIsPlaying] = useState(false)

	/** Effect hook that runs when state of isPlaying changes */
	useEffect(() => {
		let interval

		/** if the current state is playing.. */
		if (isPlaying) {
			/** set interval to run frequncy times every second */
			interval = setInterval(() => {
				/** increment the time by the step value */
				setTime(time => time + step)
			}, 1000 / frequency)
		}

		/** Cleanup effect by clearing interval */
		return () => clearInterval(interval)
	}, [isPlaying])

	/** Play function */
	const play = () => setIsPlaying(true)

	/** Stop function */
	const stop = () => setIsPlaying(false)

	/** Effect hook runs when time changes */
	useEffect(() => {
		/** if time is greater or equal to endTime, stop the timer from running */
		if (time >= endTime.valueOf()) stop()
	}, [time, endTime.valueOf()])

	return { time: new Date(time), play, stop }
}