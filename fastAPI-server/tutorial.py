# import time
# import numpy as np
# import datetime
# data = 11

# X_train = np.random.randn(100, 10) 
# y_train = np.random.randint(0, 2, (100,))  


# def train_model(X, y, epochs=10):
#     total_start_time = time.time()
#     for epoch in range(1, epochs + 1):
#         start_time = time.time()
        
       
#         time.sleep(1)
        
#         epoch_duration = time.time() - start_time
#         total_duration = time.time() - total_start_time
#         estimated_total_duration = epoch_duration * epochs
#         remaining_time = estimated_total_duration - total_duration
        
#         print(f"Epoch {epoch}/{epochs} texmini vaxt {remaining_time:.2f} saniye.")


# def memory_efficient_shuffle(melanoma_ds=str, no_melanoma_portion=str):
#   shuffle_rounds = 4
#   tmp_start = 0
#   batch_each_class = 2500
#   final_shuffle_ds = None

#   for i in range(shuffle_rounds):
#     tmp_start = batch_each_class * i
#     tmp_melanoma_ds = melanoma_ds.skip(tmp_start).take(batch_each_class)
#     tmp_no_melanoma_ds = no_melanoma_portion.skip(tmp_start).take(batch_each_class)
#     both_portions_ds = tmp_melanoma_ds.concatenate(tmp_no_melanoma_ds)
#     shuffled_portion_ds = both_portions_ds.shuffle(5000)
    
#     final_shuffled_ds = shuffled_portion_ds if final_shuffle_ds == None else final_shuffle_ds.concatenate(shuffled_portion_ds)
#   return final_shuffled_ds

# print(datetime.datetime.now().hour)

# print(f'''on: [Function: socketListenerWrap],
#     addListener: [Function: socketListenerWrap],
#     prependListener: [Function: socketListenerWrap],
#     setEncoding: [Function: socketSetEncoding],
#     _paused: false,
#     _httpMessage: ServerResponse 
#       _events: [Object: null prototype],
#       _eventsCount: 1,
#       _maxListeners: undefined,
#       outputData: [],
#       outputSize: 0,
#       writable: true,
#       destroyed: false,
#       _last: false,
#       chunkedEncoding: false,
#       shouldKeepAlive: true,
#       maxRequestsOnConnectionReached: false,
#       _defaultKeepAlive: true,
#       useChunkedEncodingByDefault: true,
#       sendDate: true,
#       _removedConnection: false,
#       _removedContLen: false,
#       _removedTE: false,
#       _contentLength: null,
#       _hasBody: true,
#       _trailer: '',
#       finished: false,
#       _headerSent: false,
#       _closed: false,
#       socket: [Circular *1],
#       _header: null,
#       __Epoch : 5000,
#       _onPendingData: [Function: bound updateOutgoingData],
#       req: [Circular *2],
#       _time_finished: {4010+((datetime.datetime.now().hour-data)*2)},
#       _expect_continue: false,
#       [Symbol(kCapture)]: false,
#       [Symbol(kNeedDrain)]: false,
#       [Symbol(corked)]: 0,
#       [Symbol(kOutHeaders)]: null,
#       [Symbol(kUniqueHeaders)]: null
#     ,
#     [Symbol(async_id_symbol)]: 19,
#     [Symbol(kHandle)]: TCP 
#       reading: true,
#       onconnection: null,
#       _consumed: true,
#       [Symbol(owner_symbol)]: [Circular *1]
# ,
#     [Symbol(lastWriteQueueSize)]: 0,
#     [Symbol(timeout)]: null,
#     [Symbol(kBuffer)]: null,
#     [Symbol(kBufferCb)]: null,
#     [Symbol(kBufferGen)]: null,
#     [Symbol(kCapture)]: false,
#     [Symbol(kSetNoDelay)]: true,
#     [Symbol(kSetKeepAlive)]: false,
#     [Symbol(kSetKeepAliveInitialDelay)]: 0,
#     [Symbol(kBytesRead)]: 0,
#     [Symbol(kBytesWritten)]: 0
#   ,
#   _consuming: false,
#   _dumped: false,
#   [Symbol(kCapture)]: false,
#   [Symbol(kHeaders)]: 
#     host: '127.0.0.1:8080',
#     connection: 'keep-alive',
#     'content-type': 'application/json',''')

from openai import OpenAI

api_key = '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'
client = OpenAI(api_key=api_key)

stream = client.chat.completions.create(
    model="text-davinci-003",
    messages=[{"role": "user", "content": "Say this is a test"}],
    stream=True,
)
for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")