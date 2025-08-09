import { useState } from 'react'
import { Card } from 'antd'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num))
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
  }

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const Button = ({ onClick, className, children, ...props }) => (
    <button
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <Card className="w-full max-w-sm shadow-xl">
        <div className="space-y-4">
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <div className="text-right text-3xl font-mono overflow-hidden">
              {display}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            <Button
              onClick={clear}
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Clear
            </Button>
            <Button
              onClick={() => inputOperation('/')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ÷
            </Button>
            <Button
              onClick={() => inputOperation('*')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ×
            </Button>

            <Button
              onClick={() => inputNumber(7)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber(8)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber(9)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              9
            </Button>
            <Button
              onClick={() => inputOperation('-')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              −
            </Button>

            <Button
              onClick={() => inputNumber(4)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber(5)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber(6)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              6
            </Button>
            <Button
              onClick={() => inputOperation('+')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              +
            </Button>

            <Button
              onClick={() => inputNumber(1)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber(2)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber(3)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              3
            </Button>
            <Button
              onClick={performCalculation}
              className="row-span-2 bg-blue-500 hover:bg-blue-600 text-white"
            >
              =
            </Button>

            <Button
              onClick={() => inputNumber(0)}
              className="col-span-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            >
              .
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Calculator