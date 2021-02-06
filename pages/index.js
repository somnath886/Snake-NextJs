import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import Grid from '../components/grid';


export default function Home() {

  let TwoDArray = new Array()
  let n = 0
  let Eaten = false

  const [Food, setFood] = useState([])
  const [color, setColor] = useState(styles.blue)
  const [Snake, setSnake] = useState([[0, 0]])

  for (let i = 0; i < 10; i++) {
    TwoDArray.push(new Array());
  }

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      TwoDArray[i][j] = n
      n++
    }
  }

  const [Over, setOver] = useState(false)
  let Time = 17
  const [Screen, setScreen] = useState(0)
  const [Score, setScore] = useState(0)
  const [CurrentX, setCurrentX] = useState(0)
  const [CurrentY, setCurrentY] = useState(0)
  const [pressedKey, setPressedKey] = useState("")

  const CollectionOfProps = {
    TArray: TwoDArray,
    Snake: Snake,
    Color: color,
    Food: Food
  }

  if (CurrentX >= TwoDArray.length + 1 || CurrentX < -1) {
    setCurrentX(0)
    setCurrentY(0)
    setPressedKey("Reset")
    setScore(0)
    alert("Game Over")
  }
  else if (CurrentY >= TwoDArray[0].length + 1 || CurrentY < -1) {
    setCurrentX(0)
    setCurrentY(0)
    setPressedKey("Reset")
    setScore(0)
    alert("Game Over")
  }

  useEffect(() => {
    let match = 0
    Snake.map(p => {
      if (p[0] === Snake[0][0] && p[1] === Snake[0][1]) {
        match++
      }
    })
    if (match > 1) {
      setOver(true)
    }
    const interval = setInterval(() => {
      if (Over === true) {
        // setCurrentX(0)
        // setCurrentY(0)
        setPressedKey("Reset")
        setScore(0)
        alert("Game Over")
      }
      setOver(false)
      setScreen(p => p += 1)
      if (Screen === 20) {
        console.log(Screen)
        switch(pressedKey) {
          case "Up":
            setCurrentX(prev => prev -= 1)
            let pos1 = Snake
            pos1.pop()
            pos1.unshift([CurrentX - 1, CurrentY])
            setSnake(pos1)
            break
          case "Down":
            setCurrentX(prev => prev += 1)
            let pos2 = Snake
            pos2.pop()
            pos2.unshift([CurrentX + 1, CurrentY])
            setSnake(pos2)
            break
          case "Left":
            setCurrentY(prev => prev -= 1)
            let pos3 = Snake
            pos3.pop()
            pos3.unshift([CurrentX, CurrentY - 1])
            setSnake(pos3)
            break
          case "Right":
            setCurrentY(prev => prev += 1)
            let pos4 = Snake
            pos4.pop()
            pos4.unshift([CurrentX, CurrentY+1])
            setSnake(pos4)
            break
          case "Reset":
            setSnake([[CurrentX, CurrentY]])
            setPressedKey("")
            break
          default:
            setCurrentY(prev => prev += 1)
            let pos5 = Snake
            pos5.pop()
            pos5.unshift([CurrentX, CurrentY+1])
            setSnake(pos5)
            break
        }
        setScreen(0)
      }  
    }, Time)    
    return () => {
      clearInterval(interval)
    };
  }, [CurrentX, CurrentY, pressedKey, Snake, Screen])

  useEffect(() => {
    const intervalTwo = setInterval(() => {
      let i = Math.floor(Math.random() * 9) + 0 
      let j = Math.floor(Math.random() * 9) + 0
      setFood([i, j])
    }, 2000)
    return () => {
      clearInterval(intervalTwo)
    };
  }, [Food])

  if (Snake[0][0] === Food[0] && Snake[0][1] === Food[1]) {
    Eaten = true
    setScore(prev => prev += 1)
    if (pressedKey === "Up") {
      setSnake(prev => [...prev, [Snake[Snake.length - 1][0] + 1, Snake[Snake.length - 1][1]]])
    }
    if (pressedKey === "Down") {
      setSnake(prev => [...prev, [Snake[Snake.length - 1][0] - 1, Snake[Snake.length - 1][1]]])
    }
    if (pressedKey === "Left") {
      setSnake(prev => [...prev, [Snake[Snake.length - 1][0], Snake[Snake.length - 1][1]] + 1])
    }
    if (pressedKey === "Right") {
      setSnake(prev => [...prev, [Snake[Snake.length - 1][0], Snake[Snake.length - 1][1]] - 1])
    }
    setFood([])
  }

  if (Eaten === true) {
    Eaten = false
  }

  const handleKeyPress = (event) => {
    // event.preventDefault()
    if(event.keyCode === 40){
      setCurrentX(prev => prev += 1)
      let pos2 = Snake
      pos2.pop()
      pos2.unshift([CurrentX + 1, CurrentY])
      setSnake(pos2)
      setPressedKey("Down")
    }
    else if(event.keyCode === 38){
      setCurrentX(prev => prev -= 1)
      let pos2 = Snake
      pos2.pop()
      pos2.unshift([CurrentX - 1, CurrentY])
      setSnake(pos2)
      setPressedKey("Up")
    }
    else if(event.keyCode === 37){
      setCurrentY(prev => prev -= 1)
      let pos2 = Snake
      pos2.pop()
      pos2.unshift([CurrentX, CurrentY - 1])
      setSnake(pos2)
      setPressedKey("Left")
    }
    else if(event.keyCode === 39){
      setCurrentY(prev => prev += 1)
      let pos2 = Snake
      pos2.pop()
      pos2.unshift([CurrentX, CurrentY + 1])
      setSnake(pos2)
      setPressedKey("Right")
    }  
  }

  return (
    <div style={{margin:50, height:500, width:500}} onKeyDown={handleKeyPress} tabIndex="0">
      <h1>Score: {Score}</h1>
      <Grid props={CollectionOfProps} />
      {/* <div>{Snake.map(p => (<div>{p}</div>))}</div> */}
    </div>
  )
}