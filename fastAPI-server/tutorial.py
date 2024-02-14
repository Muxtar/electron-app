import time
import numpy as np
import datetime
import tensorflow as tf


f'''on: [Function: socketListenerWrap],
    addListener: [Function: socketListenerWrap],
    prependListener: [Function: socketListenerWrap],
    setEncoding: [Function: socketSetEncoding],
    _paused: false,
    _httpMessage: ServerResponse 
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      outputData: [],
      outputSize: 0,
      writable: true,
      destroyed: false,
      _last: false,
      chunkedEncoding: false,
      shouldKeepAlive: true,
      maxRequestsOnConnectionReached: false,
      _defaultKeepAlive: true,
      useChunkedEncodingByDefault: true,
      sendDate: true,
      _removedConnection: false,
      _removedContLen: false,
      _removedTE: false,
      _contentLength: null,
      _hasBody: true,
      _trailer: '',
      finished: false,
      _headerSent: false,
      _closed: false,
      socket: [Circular *1],
      _header: null,
      __Epoch : 
      _onPendingData: [Function: bound updateOutgoingData],
      req: [Circular *2],
      _time_finished: ,
      _expect_continue: false,
      [Symbol(kCapture)]: false,
      [Symbol(kNeedDrain)]: false,
      [Symbol(corked)]: 0,
      [Symbol(kOutHeaders)]: null,
      [Symbol(kUniqueHeaders)]: null
    ,
    [Symbol(async_id_symbol)]: 19,
    [Symbol(kHandle)]: TCP 
      reading: true,
      onconnection: null,
      _consumed: true,
      [Symbol(owner_symbol)]: [Circular *1]
,
    [Symbol(lastWriteQueueSize)]: 0,
    [Symbol(timeout)]: null,
    [Symbol(kBuffer)]: null,
    [Symbol(kBufferCb)]: null,
    [Symbol(kBufferGen)]: null,
    [Symbol(kCapture)]: false,
    [Symbol(kSetNoDelay)]: true,
    [Symbol(kSetKeepAlive)]: false,
    [Symbol(kSetKeepAliveInitialDelay)]: 0,
    [Symbol(kBytesRead)]: 0,
    [Symbol(kBytesWritten)]: 0
  ,
  _consuming: false,
  _dumped: false,
  [Symbol(kCapture)]: false,
  [Symbol(kHeaders)]: 
    host: '127.0.0.1:8080',
    connection: 'keep-alive',
    'content-type': 'application/json','''
num1 = 1
import time
import random
while num1 < 1000000:
  print(f''' _removedContLen: false,_Tenser.Keras: false,_TenserF: null, _hasBody: true,
        _trailer: '',finished: false,_headerSent: false,_closed: false,socket: [Circular *1],
        _header: null, __Epoch : 5002,_Sqlite_insert_into:{random.randint(1, 100120)}''')
  time.sleep(3)
  num1+=1
# from openai import OpenAI

# api_key = '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'
# client = OpenAI(api_key=api_key)

# stream = client.chat.completions.create(
#     model="text-davinci-003",
#     messages=[{"role": "user", "content": "Say this is a test"}],
#     stream=True,
# )
# for chunk in stream:
#     if chunk.choices[0].delta.content is not None:
#         print(chunk.choices[0].delta.content, end="")