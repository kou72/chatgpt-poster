import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'
import axios from 'axios'

const getLocalStrage = (key: string, init: any) => {
  if (typeof window === 'undefined') return
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : init
  } catch (error) {
    console.log(error)
  }
}

const setLocalStrage = (key: string, value: any) => {
  if (typeof window === 'undefined') console.error('window undefined')
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

const initHistory = [
  { input: 'History', output: '最新30個までヒストリが表示されます' },
]
export const apikeyState = atom({ key: 'apikey', default: '' })
export const modelState = atom({ key: 'model', default: 'gpt-3.5-turbo' })
export const temperatureState = atom({ key: 'temperature', default: 0.9 })
export const maxTokensState = atom({ key: 'maxTokens', default: 200 })
export const maxTokenCheckState = atom({ key: 'maxTokenCheck', default: true })
export const inputState = atom({ key: 'input', default: 'こんにちは！' })
export const outputState = atom({ key: 'output', default: '' })
export const totalTokensState = atom({ key: 'totalTokens', default: 0 })
export const historyState = atom({
  key: 'historyState',
  default: initHistory,
})
export const systemState = atom({ key: 'system', default: '' })

export const useChatGPT = () => {
  const [apikey, setApikey] = useRecoilState(apikeyState)
  const [model, setModel] = useRecoilState(modelState)
  const [temperature, setTemperature] = useRecoilState(temperatureState)
  const [maxTokens, setMaxTokens] = useRecoilState(maxTokensState)
  const [maxTokenCheck, setMaxTokenCheck] = useRecoilState(maxTokenCheckState)
  const [input, setInput] = useRecoilState(inputState)
  const [output, setOutput] = useRecoilState(outputState)
  const [totalTokens, setTotalTokens] = useRecoilState(totalTokensState)
  const [history, setHistory] = useRecoilState(historyState)
  const [system, setSystem] = useRecoilState(systemState)

  useEffect(() => {
    try {
      setApikey(getLocalStrage('apikey', ''))
      setModel(getLocalStrage('model', 'gpt-3.5-turbo'))
      setTemperature(getLocalStrage('temperature', 0.9))
      setMaxTokens(getLocalStrage('maxTokens', 200))
      setTotalTokens(getLocalStrage('totalTokens', 0))
      setMaxTokenCheck(getLocalStrage('totalTokenCheck', true))
      setHistory(getLocalStrage('history', initHistory))
      setSystem(
        getLocalStrage(
          'system',
          'あなたは対話型AIのChat-GPTです。質問に回答してください。'
        )
      )
    } catch (error) {
      console.log(error)
    }
  }, [])

  const requestChatGPT = async () => {
    const URL = 'https://api.openai.com/v1/chat/completions'
    setOutput('リクエスト中...')
    try {
      const response = await axios.post(
        URL,
        {
          model: model,
          messages: [{ role: 'user', content: input }],
          temperature: temperature,
          max_tokens: maxTokenCheck ? maxTokens : null,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apikey}`,
          },
        }
      )
      saveTotalTokens(response.data.usage.total_tokens)
      setOutput(response.data.choices[0].message.content)
      saveHistory(response.data.choices[0].message.content)
    } catch (error: any) {
      console.log(error.response.data.error.message)
      setOutput(
        'リクエストが失敗しました。\n\nerror: ' +
          error.response.data.error.message
      )
    }
  }

  const saveApikey = (value: string) => {
    setApikey(value)
    setLocalStrage('apikey', value)
  }

  const saveModel = (value: string) => {
    setModel(value)
    setLocalStrage('model', value)
  }

  const saveTemperature = (value: number) => {
    setTemperature(value)
    setLocalStrage('temperature', value)
  }

  const saveMaxTokens = (value: number) => {
    setMaxTokens(value)
    setLocalStrage('maxTokens', value)
  }

  const toggleMaxTokenCheck = () => {
    setMaxTokenCheck(!maxTokenCheck)
    setLocalStrage('totalTokenCheck', !maxTokenCheck)
  }

  const saveTotalTokens = (value: number) => {
    const sum = totalTokens + value
    setTotalTokens(sum)
    setLocalStrage('totalTokens', sum)
  }

  const resetTotalTokens = () => {
    setTotalTokens(0)
    setLocalStrage('totalTokens', 0)
  }

  const saveHistory = (value: any) => {
    const newArr = [...history, { input: input, output: value }].splice(-30)
    setHistory(newArr)
    setLocalStrage('history', newArr)
  }

  return {
    chatgpt: {
      apikey,
      model,
      temperature,
      maxTokens,
      input,
      output,
      totalTokens,
      maxTokenCheck,
      history,
      system,
    },
    handleChatgpt: {
      saveApikey,
      saveModel,
      saveTemperature,
      saveMaxTokens,
      toggleMaxTokenCheck,
      resetTotalTokens,
      setInput,
      setOutput,
      requestChatGPT,
      saveHistory,
    },
  }
}
