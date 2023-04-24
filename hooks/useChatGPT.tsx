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

const initChats = [
  { role: 'user', content: '' },
  { role: 'assistant', content: '' },
]
const initHistory = [
  {
    input: 'History',
    output: '最新30個までヒストリが表示されます',
    system: '',
    chats: initChats,
  },
]
const apikeyState = atom({ key: 'apikey', default: '' })
const modelState = atom({ key: 'model', default: 'gpt-3.5-turbo' })
const temperatureState = atom({ key: 'temperature', default: 0.9 })
const maxTokensState = atom({ key: 'maxTokens', default: 200 })
const chatModeState = atom({ key: 'chatMode', default: false })
const maxTokenCheckState = atom({ key: 'maxTokenCheck', default: true })
const inputState = atom({ key: 'input', default: 'こんにちは！' })
const outputState = atom({ key: 'output', default: '' })
const totalTokensState = atom({ key: 'totalTokens', default: 0 })
const systemState = atom({ key: 'system', default: '' })
const chatsState = atom({
  key: 'chatsState',
  default: initChats,
})
const historyState = atom({
  key: 'historyState',
  default: initHistory,
})

export const useChatGPT = () => {
  const [apikey, setApikey] = useRecoilState(apikeyState)
  const [model, setModel] = useRecoilState(modelState)
  const [temperature, setTemperature] = useRecoilState(temperatureState)
  const [maxTokens, setMaxTokens] = useRecoilState(maxTokensState)
  const [maxTokenCheck, setMaxTokenCheck] = useRecoilState(maxTokenCheckState)
  const [chatMode, setChatMode] = useRecoilState(chatModeState)
  const [input, setInput] = useRecoilState(inputState)
  const [output, setOutput] = useRecoilState(outputState)
  const [totalTokens, setTotalTokens] = useRecoilState(totalTokensState)
  const [history, setHistory] = useRecoilState(historyState)
  const [system, setSystem] = useRecoilState(systemState)
  const [chats, setChats] = useRecoilState(chatsState)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    try {
      setApikey(getLocalStrage('apikey', ''))
      setModel(getLocalStrage('model', 'gpt-3.5-turbo'))
      setTemperature(getLocalStrage('temperature', 0.9))
      setMaxTokens(getLocalStrage('maxTokens', 200))
      setTotalTokens(getLocalStrage('totalTokens', 0))
      setMaxTokenCheck(getLocalStrage('totalTokenCheck', true))
      setChatMode(getLocalStrage('chatMode', false))
      setHistory(getLocalStrage('history', initHistory))
      setSystem(getLocalStrage('system', ''))
    } catch (error) {
      console.log(error)
    }
  }, [])

  const requestChatGPT = async () => {
    const URL = 'https://api.openai.com/v1/chat/completions'
    const messages = []
    if (system != '') messages.push({ role: 'system', content: system })
    if (chats.length > 0) {
      chats.forEach((chat) => messages.push(chat))
    }
    messages.push({ role: 'user', content: input })

    setOutput('リクエスト中...')
    try {
      const response = await axios.post(
        URL,
        {
          model: model,
          messages: messages,
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
      const res = response.data.choices[0].message.content
      setOutput(res)
      saveHistory(res)
      if (chatMode) pushChat(input, res)
    } catch (error: any) {
      if (error.message) {
        console.error(error.message)
        setOutput('リクエストが失敗しました。\n\nerror: ' + error.message)
      } else if (error.response.data) {
        console.error(error.response.data.error.message)
        setOutput(
          'リクエストが失敗しました。\n\nerror: ' +
            error.response.data.error.message
        )
      }
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

  const toggleChatMode = () => {
    setChatMode(!chatMode)
    setLocalStrage('chatMode', !chatMode)
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
    const newArr = [
      ...history,
      { input: input, output: value, system: system, chats: chats },
    ].splice(-30)
    setHistory(newArr)
    setLocalStrage('history', newArr)
  }

  const addChat = () => {
    setChats([
      ...chats,
      { role: 'user', content: '' },
      { role: 'assistant', content: '' },
    ])
  }

  const removeChat = (index: number) => {
    setChats(chats.filter((_, i) => i !== index))
  }

  const updateChatContent = (index: number, content: string) => {
    const updatedChats = [...chats]
    updatedChats[index] = { ...updatedChats[index], content }
    setChats(updatedChats)
  }

  const pushChat = (user: string, assistant: string) => {
    setChats([
      ...chats,
      { role: 'user', content: user },
      { role: 'assistant', content: assistant },
    ])
  }

  return {
    apikey,
    model,
    temperature,
    maxTokenCheck,
    maxTokens,
    chatMode,
    system,
    input,
    output,
    chats,
    totalTokens,
    history,
    saveApikey,
    saveModel,
    saveTemperature,
    toggleMaxTokenCheck,
    toggleChatMode,
    saveMaxTokens,
    setSystem,
    setInput,
    setOutput,
    setChats,
    addChat,
    removeChat,
    updateChatContent,
    resetTotalTokens,
    requestChatGPT,
  }
}
