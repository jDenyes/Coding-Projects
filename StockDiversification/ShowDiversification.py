# To be run from teh desktop

tickers = []
quantities = []
marketValue = []
prices = []

with open('Tickers.txt', 'r') as f:
    data = f.read()
    splitData = data.splitlines()
    print(splitData)
    for line in splitData:
        if line != 'Stock Tickers':
            # print(line)
            splitLine = line.split(", ")
            ticker = splitLine[0]
            quantity = splitLine[1]
            # print(ticker, quantity)
            tickers.append(ticker)
            quantities.append(quantity)
    f.close()

with open("TickerPrices.txt", 'r') as f:
    data = f.read()
    splitData = data.splitlines()
    print(splitData)
    for line in splitData:
        prices.append(line.)
        print(line)

print(tickers)
print(quantities)
# import matplotlib.pyplot as plt
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


# fig = plt.figure()
# ax = fig.add_axes([0,0,1,1])
# stocks = ['MSFT', 'EMB', 'AMD']
# prices = [1, 4, 2]
# ax.bar(stocks, prices)
# plt.show()