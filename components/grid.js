import { useEffect, useState } from 'react'
import { render } from 'react-dom'
import styles from '../styles/Home.module.css'

const Grid = ({props}) => {

    let Number = 0
    
    return (
        <div className={styles.container}>
            {props.TArray.map(x => (
            <div key={Number++} className={styles.items}>{x.map( y => {
                let render
                let i = x[0] / 10
                let j = y % x[0]
                if (x[0] === 0) {
                    j = y
                }
                let lol = props.Snake.map(l => l[0] === i && l[1] === j)
                let lel = props.Food[0] === i && props.Food[1] === j
                if (lol.includes(true)) {
                    render = true
                }
                else {
                    render = false
                }
                if (render === true) {
                    return (
                        <div key={y} className={styles.red}>{y}</div>
                    )
                }
                if (render === false && lel === false) {
                    return (
                        <div key={y} className={styles.blue}>{y}</div>
                    )
                }
                if (lel === true) {
                    return (
                        <div key={y} className={styles.green}>{y}</div>
                    )
                }
            }
        )}</div>
        ))}
        </div>
    )
}

export default Grid