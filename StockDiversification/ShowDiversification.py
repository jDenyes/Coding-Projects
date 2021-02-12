# To be run from teh desktop

tickers = []
quantities = []
marketValue = []
prices = []

# with open('Tickers.txt', 'r') as f:
#     data = f.read()
#     splitData = data.splitlines()
#     for line in splitData:
#         if line != 'Stock Tickers':
#             splitLine = line.split(", ")
#             ticker = splitLine[0]
#             quantity = splitLine[1]
#             tickers.append(ticker)
#             quantities.append(int(quantity))
#     f.close()

with open("TickerPrices.txt", 'r') as f:
    data = f.read()
    splitData = data.split('\n')
    # print(splitData)
    for line in splitData:
        if line != '':
            # print(line)
            lineSplit = line.split(", ")
            # print(lineSplit)
            tickers.append(lineSplit[0])
            quantities.append(int(lineSplit[1]))
            price = round(float(lineSplit[2]), 2)
            prices.append(price)
            marketValue.append(prices[-1] * quantities[-1])
        # marketValue.append(float)
    # line_num = 0
    # for line in splitData:
    #     lineSplit = data.split(", ")
    #     print(lineSplit)
    #     print()
    #     print()

        # prices.append(round(float(line), 2))
        # marketValue.append(prices[-1] * float(quantities[line_num]))
        # line_num += 1

# print(tickers)
# print(quantities)
# print(prices)
# print(marketValue)

import matplotlib.pyplot as plt
# import urllib
# from smb.SMBHandler import SMBHandler

# print("1")

# # opener = urllib.request.build_opener(SMBHandler)
# print(2)

# # fh = opener.open('smb://192.168.0.05/pi/homepi/Coding/Coding-Project/StockDiversification.Tickers.txt')
# print(3)

# data = fh.read()
# print(4)

# fh.close()
# print(5)

# print(data)


fig = plt.figure()
ax = fig.add_axes([0,0,1,1])
ax.bar(tickers, marketValue)
plt.show()